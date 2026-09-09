import { and, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/db/schema';
import { contentPages, contentRevisions } from '@/db/schema';
import { validateDocument } from './validation';
import type { CmsPage } from './types';

export type SaveContentInput = { action: 'save' | 'publish' | 'restore'; version: number; content?: unknown; revisionId?: string };
export async function saveCmsPage(database: Pick<NodePgDatabase<typeof schema>, 'transaction'>, page: CmsPage, body: SaveContentInput, actorId: string) {
    const slug = page.id;
    const draft = body.action === 'restore' ? null : validateDocument(page, body.content);
    return database.transaction(async tx => {
      await tx.insert(contentPages).values({ id: slug }).onConflictDoNothing();
      const [current] = await tx.select().from(contentPages).where(eq(contentPages.id, slug)).for('update');
      if (current.version !== body.version) throw new Error('CONFLICT');
      let content = draft;
      if (body.action === 'restore') {
        if (typeof body.revisionId !== 'string' || !/^[0-9a-f-]{36}$/i.test(body.revisionId)) throw new Error('Phiên bản không hợp lệ.');
        const [revision] = await tx.select().from(contentRevisions).where(and(eq(contentRevisions.id, body.revisionId), eq(contentRevisions.pageId, slug)));
        if (!revision) throw new Error('Không tìm thấy phiên bản.');
        // Retired fields are dropped when restoring older snapshots.
        const allowed = new Set(page.blocks.flatMap(block => block.fields.map(field => field.id)));
        content = validateDocument(page, Object.fromEntries(Object.entries(revision.content).filter(([id]) => allowed.has(id))));
      }
      if (!content) throw new Error('Nội dung không hợp lệ.');
      const version = current.version + 1;
      const now = new Date();
      if (body.action === 'publish') {
        // Save the original live snapshot too, so the first publish can be undone.
        if (!current.publishedAt) await tx.insert(contentRevisions).values({ pageId: slug, content: current.published, version: current.version, createdBy: actorId });
        await tx.insert(contentRevisions).values({ pageId: slug, content, version, createdBy: actorId });
      }
      await tx.update(contentPages).set({ draft: content, version, updatedAt: now, updatedBy: actorId,
        ...(body.action === 'publish' ? { published: content, publishedAt: now } : {}) }).where(eq(contentPages.id, slug));
      return { content, version };
    });
}

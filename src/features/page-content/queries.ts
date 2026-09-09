import 'server-only';
import { cache } from 'react';
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { contentPages, contentRevisions } from '@/db/schema';
import { publishedValues } from './catalog';

export const getPublishedPageContent = cache(async () => {
  try {
    const rows = await getDb().select({ id: contentPages.id, content: contentPages.published }).from(contentPages);
    return publishedValues(rows);
  } catch (error) {
    // New installations remain usable before their CMS migration is applied.
    console.error('[page-content] Unable to read published content:', error instanceof Error ? error.message : 'Database unavailable');
    return {};
  }
});

export async function getDraftPageContent() {
  const rows = await getDb().select({ id: contentPages.id, content: contentPages.draft }).from(contentPages);
  return publishedValues(rows);
}
export async function getPageForAdmin(id: string) {
  const db = getDb();
  const [row] = await db.select().from(contentPages).where(eq(contentPages.id, id));
  const revisions = await db.select({ id: contentRevisions.id, version: contentRevisions.version, createdAt: contentRevisions.createdAt })
    .from(contentRevisions).where(eq(contentRevisions.pageId, id)).orderBy(desc(contentRevisions.createdAt)).limit(20);
  return { draft: row?.draft ?? {}, version: row?.version ?? 0, publishedAt: row?.publishedAt?.toISOString() ?? null,
    revisions: revisions.map(revision => ({ ...revision, createdAt: revision.createdAt.toISOString() })) };
}

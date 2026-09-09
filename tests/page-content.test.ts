import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { eq } from 'drizzle-orm';
import { CMS_PAGES, findCmsPage, publishedValues } from '../src/features/page-content/catalog';
import { safeContentUrl, validateDocument } from '../src/features/page-content/validation';
import { resolveContent, resolveImage } from '../src/features/page-content/resolve';
import { saveCmsPage } from '../src/features/page-content/persistence';
import * as schema from '../src/db/schema';

const home = findCmsPage('home')!;
const heading = home.blocks.find(block => block.id === 'home.Hero')!.fields.find(field => field.defaultValue === 'Kiến tạo cảnh quan')!;

test('catalog defaults are valid and field IDs are unique within each page', () => {
  for (const page of CMS_PAGES) {
    const fields = page.blocks.flatMap(block => block.fields);
    assert.equal(new Set(fields.map(field => field.id)).size, fields.length, page.id);
    assert.doesNotThrow(() => validateDocument(page, Object.fromEntries(fields.map(field => [field.id, field.defaultValue]))), page.id);
  }
});

test('CMS rejects executable/protocol-relative URLs and undeclared fields', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,hi', '//evil.example', '/\\evil.example', 'https://example.com/\nfoo']) assert.equal(safeContentUrl(url), false);
  for (const url of ['/media/projects/a.jpg', 'https://example.com/image.jpg', '/projects', '#projects', 'mailto:hello@example.com', 'tel:+84123']) assert.equal(safeContentUrl(url), true);
  assert.equal(safeContentUrl('mailto:test@example.com', true), false);
  assert.throws(() => validateDocument(home, { unknown: 'no' }));
  assert.throws(() => validateDocument(home, { [heading.id]: 123 }));
});

test('published mapping updates copy without mutating structural IDs or defaults', () => {
  const data = { title: 'Original', slug: 'Original', id: 'Original', nested: ['Original'], count: 5 };
  assert.deepEqual(resolveContent(data, { Original: 'Edited' }), { title: 'Edited', slug: 'Original', id: 'Original', nested: ['Edited'], count: 5 });
  assert.equal(data.title, 'Original');
  assert.equal(resolveContent('toString', {}), 'toString');
  const publicContent = publishedValues([{ id: 'home', content: { [heading.id]: '' } }]);
  assert.equal(publicContent['home.Hero']['Kiến tạo cảnh quan'], '');
});

test('image remains attached to its block after editing its title', () => {
  const values = { 'home.FeaturedProjects': { 'Original project': 'Renamed project', '@image:Original project': '/media/photo.jpg', '@alt:Original project': 'Mô tả ảnh' } };
  assert.deepEqual(resolveImage(values, 'Renamed project', 'home.FeaturedProjects'), { src: '/media/photo.jpg', alt: 'Mô tả ảnh' });
});

test('real migrations and draft → publish → restore preserve live data and reject stale editors', async () => {
  const pg = new PGlite();
  try {
    for (const filename of readdirSync('drizzle').filter(file => file.endsWith('.sql')).sort()) await pg.exec(readFileSync(`drizzle/${filename}`, 'utf8'));
    const db = drizzle(pg, { schema });
    // Same Drizzle PostgreSQL query API, running on isolated PostgreSQL WASM.
    const database = db as unknown as Parameters<typeof saveCmsPage>[0];
    const [admin] = await db.insert(schema.adminUsers).values({ username: 'cms-test', passwordHash: 'not-a-login' }).returning();
    const draft = { [heading.id]: 'Tiêu đề nháp' };
    await saveCmsPage(database, home, { action: 'save', version: 0, content: draft }, admin.id);
    let [row] = await db.select().from(schema.contentPages).where(eq(schema.contentPages.id, 'home'));
    assert.deepEqual(row.draft, draft);
    assert.deepEqual(row.published, {});
    assert.equal(row.publishedAt, null);
    await assert.rejects(saveCmsPage(database, home, { action: 'publish', version: 0, content: draft }, admin.id), /CONFLICT/);
    await saveCmsPage(database, home, { action: 'publish', version: 1, content: draft }, admin.id);
    [row] = await db.select().from(schema.contentPages).where(eq(schema.contentPages.id, 'home'));
    assert.deepEqual(row.published, draft);
    assert.ok(row.publishedAt);
    const revisions = await db.select().from(schema.contentRevisions);
    assert.equal(revisions.length, 2);
    const original = revisions.find(revision => revision.version === 1)!;
    await saveCmsPage(database, home, { action: 'restore', version: 2, revisionId: original.id }, admin.id);
    [row] = await db.select().from(schema.contentPages).where(eq(schema.contentPages.id, 'home'));
    assert.deepEqual(row.draft, {});
    assert.deepEqual(row.published, draft, 'restoring only changes draft');
    await saveCmsPage(database, home, { action: 'publish', version: 3, content: {} }, admin.id);
    [row] = await db.select().from(schema.contentPages).where(eq(schema.contentPages.id, 'home'));
    assert.deepEqual(row.published, {});
    await assert.rejects(saveCmsPage(database, findCmsPage('factory')!, { action: 'restore', version: 0, revisionId: original.id }, admin.id), /Không tìm thấy/);
    assert.equal((await db.select().from(schema.contentPages).where(eq(schema.contentPages.id, 'factory'))).length, 0, 'failed restore rolls back initialization');
  } finally { await pg.close(); }
});

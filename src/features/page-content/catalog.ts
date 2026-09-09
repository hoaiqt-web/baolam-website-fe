import definitions from './catalog.json';
import type { CmsPage, CmsDocument, CmsPublished } from './types';
export const CMS_PAGES = definitions as CmsPage[];
export function findCmsPage(id: string) { return CMS_PAGES.find(page => page.id === id); }
export function publishedValues(rows: { id: string; content: CmsDocument }[]): CmsPublished {
  const result: CmsPublished = {};
  for (const row of rows) {
    const page = findCmsPage(row.id);
    if (!page) continue;
    for (const block of page.blocks) {
      const values = result[block.id] ??= {};
      for (const field of block.fields) {
        const value = row.content[field.id];
        if (typeof value === 'string') {
          const lookup = field.lookup ?? field.defaultValue;
          values[lookup] = value;
        }
      }
    }
  }
  return result;
}

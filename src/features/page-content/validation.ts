import type { CmsDocument, CmsPage } from './types';
export function safeContentUrl(value: string, image = false): boolean {
  if (!value) return true;
  if (/[\u0000-\u0020\\]/.test(value)) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  if (!image && (value.startsWith('#') || /^(mailto:|tel:)/i.test(value))) return true;
  try { const url = new URL(value); return url.protocol === 'https:'; } catch { return false; }
}
export function validateDocument(page: CmsPage, input: unknown): CmsDocument {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Nội dung không hợp lệ.');
  const fields = new Map(page.blocks.flatMap(block => block.fields.map(field => [field.id, field] as const)));
  const result: CmsDocument = {};
  for (const [id, value] of Object.entries(input)) {
    const field = fields.get(id);
    if (!field || typeof value !== 'string' || value.length > 20000) throw new Error('Trường nội dung không hợp lệ.');
    if (field.kind !== 'text' && !safeContentUrl(value, field.kind === 'image')) throw new Error(`${field.label}: đường dẫn không hợp lệ.`);
    result[id] = value;
  }
  return result;
}

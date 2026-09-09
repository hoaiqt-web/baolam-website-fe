import type { CmsPublished } from './types';
const structuralKey = /^(id|slug|group|className|span|aspect|icon|active|seed|n)$/;
export function resolveContent<T>(value: T, values: Record<string, string>): T {
  if (typeof value === 'string') return (Object.hasOwn(values, value) ? values[value] : value) as T;
  if (Array.isArray(value)) return value.map(item => resolveContent(item, values)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, structuralKey.test(key) ? item : resolveContent(item, values)])) as T;
  return value;
}
export function resolveImage(values: CmsPublished, label: string, scope?: string) {
  let original = label;
  const candidates = [scope ? values[scope] : undefined, ...Object.entries(values).filter(([key]) => !key.startsWith('visuals.')).map(([, value]) => value)];
  for (const block of candidates) {
    const entry = Object.entries(block ?? {}).find(([key, value]) => !key.startsWith('@') && value === label);
    if (entry) { original = entry[0]; break; }
  }
  const block = scope ? values[scope] : undefined;
  return { src: block?.['@image:' + original] ?? values['visuals.library']?.[original] ?? '', alt: block?.['@alt:' + original] ?? values['visuals.alt']?.[original] ?? label };
}

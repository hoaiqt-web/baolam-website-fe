export type CmsField = { id: string; label: string; kind: 'text' | 'image' | 'link'; defaultValue: string; lookup?: string };
export type CmsBlock = { id: string; label: string; fields: CmsField[] };
export type CmsPage = { id: string; label: string; path: string; blocks: CmsBlock[] };
export type CmsDocument = Record<string, string>;
export type CmsPublished = Record<string, Record<string, string>>;

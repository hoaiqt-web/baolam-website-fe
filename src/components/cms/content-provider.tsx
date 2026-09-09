'use client';
import { createContext, useContext, useMemo } from 'react';
import { resolveContent, resolveImage } from '@/features/page-content/resolve';
import type { CmsPublished } from '@/features/page-content/types';

export const ContentContext = createContext<CmsPublished>({});
export function ContentProvider({ values, children }: { values: CmsPublished; children: React.ReactNode }) {
  return <ContentContext.Provider value={values}>{children}</ContentContext.Provider>;
}

export function useCmsBlock(block: string) {
  const all = useContext(ContentContext);
  return useMemo(() => <T,>(value: T): T => resolveContent(value, all[block] ?? {}), [all, block]);
}
export function useCmsImage(label: string, scope?: string) {
  return resolveImage(useContext(ContentContext), label, scope);
}

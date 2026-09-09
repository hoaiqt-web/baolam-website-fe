import 'server-only';
import { draftMode } from 'next/headers';
import { requireAdmin } from '@/lib/auth/session';
import { getDraftPageContent, getPublishedPageContent } from './queries';
export async function getCmsMetadata(id: string, defaults: { title: string; description: string }) {
  const preview = (await draftMode()).isEnabled;
  if (preview) await requireAdmin();
  const values = preview ? await getDraftPageContent() : await getPublishedPageContent();
  const block = values[`${id}.Seo`] ?? {};
  return { title: block[defaults.title] ?? defaults.title, description: block[defaults.description] ?? defaults.description };
}

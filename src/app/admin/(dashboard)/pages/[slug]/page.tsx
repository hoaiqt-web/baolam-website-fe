import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/session';
import { findCmsPage } from '@/features/page-content/catalog';
import { getPageForAdmin } from '@/features/page-content/queries';
import { PageContentEditor } from '@/components/admin/page-content-editor';
export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const { slug } = await params;
  const page = findCmsPage(slug);
  if (!page) notFound();
  const state = await getPageForAdmin(slug);
  return <PageContentEditor page={page} initial={state} />;
}

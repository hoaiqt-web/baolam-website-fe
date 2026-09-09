import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/session';
import { findCmsPage } from '@/features/page-content/catalog';
export async function GET(request: Request) {
  await requireAdmin();
  const page = findCmsPage(new URL(request.url).searchParams.get('page') ?? 'home');
  if (!page) return new Response('Không tìm thấy trang', { status: 404 });
  (await draftMode()).enable();
  redirect(page.path);
}

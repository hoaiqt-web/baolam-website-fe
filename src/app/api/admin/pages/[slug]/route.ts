import { hasValidRequestOrigin } from '@/lib/security/request-origin';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth/session';
import { getDb } from '@/db';
import { findCmsPage } from '@/features/page-content/catalog';
import { saveCmsPage } from '@/features/page-content/persistence';

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Vui lòng đăng nhập.' }, { status: 401 });
  if (!hasValidRequestOrigin(request)) return NextResponse.json({ error: 'Yêu cầu không hợp lệ.' }, { status: 403 });
  const { slug } = await params;
  const page = findCmsPage(slug);
  if (!page) return NextResponse.json({ error: 'Không tìm thấy trang.' }, { status: 404 });
  let body;
  try { const raw = await request.text(); if (raw.length > 2_000_000) throw new Error(); body = JSON.parse(raw); }
  catch { return NextResponse.json({ error: 'Nội dung không hợp lệ hoặc quá lớn.' }, { status: 400 }); }
  if (!body || typeof body !== 'object' || Array.isArray(body) || !['save', 'publish', 'restore'].includes(body.action) || !Number.isInteger(body.version) || body.version < 0) {
    return NextResponse.json({ error: 'Thao tác không hợp lệ.' }, { status: 400 });
  }
  try {
    const result = await saveCmsPage(getDb(), page, body, session.userId);
    if (body.action === 'publish') revalidatePath('/', 'layout');
    revalidatePath('/admin/pages');
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'CONFLICT') return NextResponse.json({ error: 'Trang đã được sửa ở phiên khác. Tải lại trước khi lưu để tránh ghi đè.' }, { status: 409 });
    console.error('[page-content] Save failed', error);
    return NextResponse.json({ error: error instanceof Error && !error.message.includes('query') ? error.message : 'Không thể lưu nội dung. Vui lòng thử lại.' }, { status: 400 });
  }
}

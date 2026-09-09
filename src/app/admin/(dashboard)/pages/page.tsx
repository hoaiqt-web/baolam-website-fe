import Link from 'next/link';
import { CMS_PAGES } from '@/features/page-content/catalog';
import { requireAdmin } from '@/lib/auth/session';
export default async function PagesAdmin() {
  await requireAdmin();
  return <main className="mx-auto max-w-6xl p-5 lg:p-10">
    <p className="text-xs uppercase tracking-widest text-baolam-primary">Website Bảo Lâm</p>
    <h1 className="mt-2 text-3xl font-bold">Nội dung trang</h1>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-baolam-muted">Chọn trang, rồi chọn khối nội dung cần cập nhật. Bố cục website được giữ nguyên. Bản nháp chỉ hiển thị với bạn khi xem trước.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{CMS_PAGES.map(page => <Link key={page.id} href={`/admin/pages/${page.id}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-baolam-primary/50">
      <h2 className="text-lg font-semibold">{page.label}</h2>
      <p className="mt-2 text-sm text-baolam-muted">{page.blocks.length} khối nội dung</p>
      <span className="mt-5 block text-sm text-baolam-primary">Chỉnh sửa →</span>
    </Link>)}</div>
    <div className="mt-8 flex flex-wrap gap-5 text-sm text-baolam-primary"><Link href="/admin">Quản lý trang chi tiết dự án →</Link><Link href="/admin/settings">Hotline, địa chỉ và thông tin liên hệ →</Link></div>
  </main>;
}

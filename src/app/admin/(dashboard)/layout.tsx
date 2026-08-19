import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdmin } from "@/lib/auth/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-baolam-bg text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-baolam-border bg-[#06111e] lg:flex lg:flex-col">
        <Link href="/admin" className="flex h-20 items-center gap-3 border-b border-baolam-border px-6">
          <span className="grid size-10 place-items-center border-2 border-baolam-primary font-black text-baolam-primary">BL</span>
          <span><b className="block tracking-widest">BAOLAM</b><small className="text-baolam-muted">CONTENT CMS</small></span>
        </Link>
        <AdminNav />
        <div className="mt-auto border-t border-baolam-border p-4 text-sm">
          <p className="mb-3 text-baolam-muted">{session.username}</p>
          <form action="/admin/logout" method="post">
            <Button type="submit" variant="outline" className="w-full border-white/15 bg-transparent text-white hover:bg-white/10"><LogOut /> Đăng xuất</Button>
          </form>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-baolam-border bg-[#06111e]/90 px-4 backdrop-blur lg:px-8">
          <Link href="/admin" className="font-bold tracking-wide lg:hidden">BAOLAM CMS</Link>
          <span className="ml-auto text-sm text-baolam-muted">Đăng nhập: {session.username}</span>
        </header>
        {children}
      </div>
    </div>
  );
}

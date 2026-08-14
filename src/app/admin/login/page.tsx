import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export const metadata = { title: "Đăng nhập CMS | Bảo Lâm" };

export default async function AdminLoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.12),transparent_35%),#071522] px-4">
      <Card className="w-full max-w-md border-baolam-border bg-baolam-surface/80 text-white shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-4">
          <div className="flex size-12 items-center justify-center border-2 border-baolam-primary text-lg font-black text-baolam-primary">BL</div>
          <div>
            <CardTitle className="text-2xl">Bảo Lâm CMS</CardTitle>
            <CardDescription className="mt-2 text-baolam-muted">Quản lý nội dung dự án và trang chi tiết.</CardDescription>
          </div>
        </CardHeader>
        <CardContent><LoginForm /></CardContent>
      </Card>
    </main>
  );
}

import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { getSiteSettingsForAdmin } from "@/features/site-settings/queries";

export const dynamic = "force-dynamic";

export default async function AdminSiteSettingsPage() {
  const settings = await getSiteSettingsForAdmin();

  return (
    <main className="p-4 lg:p-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.25em] text-baolam-primary">CONTENT</p>
        <h1 className="mt-2 text-3xl font-bold">Thông tin liên hệ</h1>
        <p className="mt-2 text-baolam-muted">
          Email, hotline, địa chỉ và giờ làm việc hiển thị trên toàn bộ website và qua API công khai.
        </p>
      </div>
      <SiteSettingsForm settings={settings} />
    </main>
  );
}

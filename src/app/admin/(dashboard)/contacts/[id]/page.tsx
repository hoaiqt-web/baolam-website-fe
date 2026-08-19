import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactStatusSelect } from "@/components/admin/contact-status-select";
import { getContactRequestForAdmin } from "@/features/contact-requests/queries";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  quick: "Liên hệ nhanh",
  project_brief: "Project brief",
};

export default async function AdminContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = await getContactRequestForAdmin(id);
  if (!request) notFound();

  return (
    <main className="p-4 lg:p-8">
      <Link href="/admin/contacts" className="mb-6 flex items-center gap-2 text-sm text-baolam-muted hover:text-white">
        <ArrowLeft className="size-4" /> Quay lại danh sách
      </Link>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Badge className="bg-white/10 text-white">{TYPE_LABELS[request.type]}</Badge>
            <span className="text-xs text-baolam-muted">{request.createdAt.toLocaleString("vi-VN")}</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold">{request.fullName}</h1>
        </div>
        <ContactStatusSelect id={request.id} status={request.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-baolam-border bg-baolam-surface/65 text-white">
          <CardHeader><CardTitle>Thông tin liên hệ</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Field label="Họ và tên" value={request.fullName} />
            <Field label="Số điện thoại" value={request.phone} href={`tel:${request.phone.replace(/[^\d+]/g, "")}`} />
            {request.email && <Field label="Email" value={request.email} href={`mailto:${request.email}`} />}
            {request.company && <Field label="Công ty/đơn vị" value={request.company} />}
            <Field label="Nguồn" value={request.source || "—"} />
          </CardContent>
        </Card>

        <Card className="border-baolam-border bg-baolam-surface/65 text-white">
          <CardHeader><CardTitle>Thông tin dự án</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Field label="Tên dự án" value={request.projectName || "—"} />
            <Field label="Địa điểm" value={request.location || "—"} />
            <Field label="Loại dự án" value={request.projectType || "—"} />
            <Field label="Quy mô" value={request.scale || "—"} />
            <Field label="Giai đoạn" value={request.stage || "—"} />
            {request.scopes && request.scopes.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-baolam-muted">Phạm vi công việc</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {request.scopes.map((scope) => (
                    <Badge key={scope} className="bg-baolam-primary/10 text-baolam-primary">{scope}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {request.message && (
          <Card className="border-baolam-border bg-baolam-surface/65 text-white lg:col-span-2">
            <CardHeader><CardTitle>Nội dung</CardTitle></CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-[1.7] text-white/90">{request.message}</p>
            </CardContent>
          </Card>
        )}

        {request.attachments && request.attachments.length > 0 && (
          <Card className="border-baolam-border bg-baolam-surface/65 text-white lg:col-span-2">
            <CardHeader><CardTitle>Tệp đính kèm</CardTitle></CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2">
                {request.attachments.map((attachment) => (
                  <li key={attachment.objectKey}>
                    <a
                      href={`/api/admin/contact-attachments/${attachment.objectKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-baolam-primary hover:text-white"
                    >
                      <Paperclip className="size-4" /> {attachment.name}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

function Field({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-baolam-muted">{label}</p>
      {href ? (
        <a href={href} className="mt-1 block text-white hover:text-baolam-primary">{value}</a>
      ) : (
        <p className="mt-1 text-white">{value}</p>
      )}
    </div>
  );
}

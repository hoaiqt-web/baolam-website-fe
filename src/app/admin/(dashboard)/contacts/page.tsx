import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContactStatusSelect } from "@/components/admin/contact-status-select";
import { ContactReadToggle } from "@/components/admin/contact-read-toggle";
import { listContactRequestsForAdmin } from "@/features/contact-requests/queries";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  quick: "Liên hệ nhanh",
  project_brief: "Project brief",
};

export default async function AdminContactsPage() {
  const requests = await listContactRequestsForAdmin();

  return (
    <main className="p-4 lg:p-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.25em] text-baolam-primary">CONTENT</p>
        <h1 className="mt-2 text-3xl font-bold">Yêu cầu liên hệ</h1>
        <p className="mt-2 text-baolam-muted">Toàn bộ yêu cầu tư vấn gửi qua modal liên hệ và project brief.</p>
      </div>
      <Card className="overflow-hidden border-baolam-border bg-baolam-surface/60 text-white">
        <Table>
          <TableHeader>
            <TableRow className="border-baolam-border hover:bg-transparent">
              <TableHead />
              <TableHead>Người gửi</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Dự án / Công ty</TableHead>
              <TableHead>Nguồn</TableHead>
              <TableHead>Ngày gửi</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Đã đọc</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id} className={cn("border-baolam-border hover:bg-white/5", !request.isRead && "bg-baolam-primary/[0.04]")}>
                <TableCell>
                  {!request.isRead && <span className="block size-2 rounded-full bg-baolam-primary" aria-label="Chưa đọc" />}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/contacts/${request.id}`} className={cn("hover:text-baolam-primary", request.isRead ? "font-medium text-white/85" : "font-bold text-white")}>
                    {request.fullName}
                  </Link>
                  <span className="mt-1 block text-xs text-baolam-muted">{request.phone}</span>
                </TableCell>
                <TableCell>
                  <Badge className="bg-white/10 text-white">{TYPE_LABELS[request.type]}</Badge>
                </TableCell>
                <TableCell className="text-baolam-muted">
                  {request.projectName || request.company || "—"}
                </TableCell>
                <TableCell className="text-baolam-muted">{request.source || "—"}</TableCell>
                <TableCell className="text-baolam-muted">
                  {request.createdAt.toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  <ContactStatusSelect id={request.id} status={request.status} />
                </TableCell>
                <TableCell>
                  <ContactReadToggle id={request.id} isRead={request.isRead} />
                </TableCell>
                <TableCell>
                  <Link href={`/admin/contacts/${request.id}`} className="text-xs font-semibold text-baolam-primary hover:text-white">
                    Xem chi tiết →
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {!requests.length && (
              <TableRow>
                <TableCell colSpan={9} className="h-40 text-center text-baolam-muted">
                  Chưa có yêu cầu liên hệ nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}

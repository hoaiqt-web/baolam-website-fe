import Link from "next/link";
import { Eye, Plus } from "lucide-react";
import { ProjectStatusButton } from "@/components/admin/project-status-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listProjectsForAdmin } from "@/features/projects/queries";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await listProjectsForAdmin();
  return <main className="p-4 lg:p-8">
    <div className="mb-8 flex items-center justify-between gap-4">
      <div><p className="text-xs font-bold tracking-[0.25em] text-baolam-primary">CONTENT</p><h1 className="mt-2 text-3xl font-bold">Dự án</h1><p className="mt-2 text-baolam-muted">Quản lý nội dung trang detail project.</p></div>
      <Button render={<Link href="/admin/projects/new" />} className="bg-baolam-primary text-baolam-bg hover:bg-baolam-primary-hover"><Plus /> Tạo dự án</Button>
    </div>
    <Card className="overflow-hidden border-baolam-border bg-baolam-surface/60 text-white">
      <Table>
        <TableHeader><TableRow className="border-baolam-border hover:bg-transparent"><TableHead>Dự án</TableHead><TableHead>Địa điểm</TableHead><TableHead>Trạng thái</TableHead><TableHead>Cập nhật</TableHead><TableHead /></TableRow></TableHeader>
        <TableBody>
          {projects.map((project) => <TableRow key={project.id} className="border-baolam-border hover:bg-white/5">
            <TableCell><Link href={`/admin/projects/${project.id}/edit`} className="font-semibold hover:text-baolam-primary">{project.title}</Link><span className="mt-1 block text-xs text-baolam-muted">/{project.slug}</span></TableCell>
            <TableCell className="text-baolam-muted">{project.location || "—"}</TableCell>
            <TableCell><Badge className={project.status === "published" ? "bg-baolam-primary/15 text-baolam-primary" : "bg-white/10 text-white"}>{project.status}</Badge></TableCell>
            <TableCell className="text-baolam-muted">{project.updatedAt.toLocaleDateString("vi-VN")}</TableCell>
            <TableCell><div className="flex justify-end gap-2">
              <Button render={<Link href={`/preview/projects/${project.id}`} target="_blank" />} variant="outline" size="icon" className="border-white/15 bg-transparent text-white" aria-label={`Xem trước ${project.title}`} title="Xem trước"><Eye /></Button>
              <ProjectStatusButton projectId={project.id} status={project.status}/>
              <Button render={<Link href={`/admin/projects/${project.id}/edit`} />} variant="outline" className="border-white/15 bg-transparent text-white">Sửa</Button>
            </div></TableCell>
          </TableRow>)}
          {!projects.length && <TableRow><TableCell colSpan={5} className="h-40 text-center text-baolam-muted">Chưa có dự án nào.</TableCell></TableRow>}
        </TableBody>
      </Table>
    </Card>
  </main>;
}

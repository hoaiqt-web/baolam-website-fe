import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectEditor } from "@/components/admin/project-editor";
import { getProjectForAdmin } from "@/features/projects/queries";
import { deleteProjectAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  const { id } = await params;
  const { created } = await searchParams;
  const project = await getProjectForAdmin(id);
  if (!project) notFound();
  const deleteAction = deleteProjectAction.bind(null, project.id);

  return <main className="p-4 lg:p-8">
    <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-baolam-muted hover:text-baolam-primary"><ArrowLeft /> Danh sách dự án</Link>
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-3xl font-bold">{project.title}</h1><p className="mt-2 text-baolam-muted">Chỉnh nội dung và thứ tự section.</p></div><div className="flex gap-2"><Button render={<Link href={`/preview/projects/${project.id}`} target="_blank" />} variant="outline" className="border-baolam-primary/40 bg-baolam-primary/10 text-baolam-primary"><ExternalLink /> Xem trước</Button>{project.status === "published" && <Button render={<Link href={`/projects/${project.slug}`} target="_blank" />} variant="outline" className="border-white/15 bg-transparent text-white"><ExternalLink /> Trang public</Button>}<form action={deleteAction}><Button type="submit" variant="destructive"><Trash2 /> Xóa</Button></form></div></div>
    <ProjectEditor project={project} initialSuccessMessage={created === "1" ? "Đã tạo dự án thành công." : undefined}/>
  </main>;
}

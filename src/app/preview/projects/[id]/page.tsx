import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectDetailView } from "@/components/projects/project-detail-view";
import { getProjectForAdmin } from "@/features/projects/queries";
import { requireAdmin } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Xem trước dự án | Bảo Lâm CMS",
  robots: { index: false, follow: false, nocache: true },
};

export default async function ProjectPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const project = await getProjectForAdmin(id);
  if (!project) notFound();

  return <>
    <div className="fixed inset-x-0 top-0 z-[100] flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-baolam-primary/30 bg-[#030914]/95 px-4 py-2 text-white shadow-xl backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="rounded bg-baolam-primary px-2 py-1 text-[10px] font-black tracking-widest text-baolam-bg">PREVIEW</span>
        <span className="text-sm text-baolam-muted">{project.status === "published" ? "Bản đang chỉnh sửa" : "Chưa xuất bản"}</span>
      </div>
      <div className="flex items-center gap-4 text-sm font-semibold">
        <Link href={`/admin/projects/${project.id}/edit`} className="flex items-center gap-2 hover:text-baolam-primary"><ArrowLeft className="size-4"/> Quay lại chỉnh sửa</Link>
        {project.status === "published" && <Link href={`/projects/${project.slug}`} target="_blank" className="flex items-center gap-2 text-baolam-primary">Trang public <ExternalLink className="size-4"/></Link>}
      </div>
    </div>
    <ProjectDetailView project={project} preview/>
  </>;
}

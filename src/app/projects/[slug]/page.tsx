import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/projects/project-detail-view";
import { getPublishedProject } from "@/features/projects/queries";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return {};
  return {
    title: project.seoTitle || `${project.title} | Bảo Lâm`,
    description: project.seoDescription || project.excerpt,
    openGraph: { title: project.seoTitle || project.title, description: project.seoDescription || project.excerpt || undefined, images: [project.coverImage] },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();

  return <ProjectDetailView project={project}/>;
}

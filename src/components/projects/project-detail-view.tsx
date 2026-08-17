import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectBlock } from "@/db/schema";
import { isProjectMediaUrl } from "@/features/projects/media-path";
import { ProjectBlockRenderer } from "./project-block-renderer";

type ProjectDetail = Project & { blocks: ProjectBlock[] };

export function ProjectDetailView({ project }: { project: ProjectDetail }) {
  const facts = [
    ["Địa điểm", project.location],
    ["Hoàn thành", project.completionYear],
  ].filter(([, value]) => value);

  return <main className="min-h-screen bg-baolam-bg pt-16 text-white sm:pt-20">
    <section className="relative min-h-[78vh] overflow-hidden">
      <Image src={project.coverImage} alt={project.coverAlt || project.title} fill preload quality={85} sizes="100vw" unoptimized={isProjectMediaUrl(project.coverImage)} className="object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-t from-baolam-bg via-baolam-bg/20 to-black/15"/>
      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-end px-6 py-16 lg:px-12 lg:py-24">
        <div className="max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-baolam-primary">{project.eyebrow}</p>
          <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">{project.title}</h1>
          {project.location && <p className="mt-6 text-lg text-white/80">{project.location}</p>}
        </div>
      </div>
    </section>

    {facts.length > 0 && <section className="border-y border-baolam-border bg-baolam-surface/45">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-8 lg:px-12">
        {facts.map(([label, value]) => <div key={String(label)} className="border-l border-baolam-border px-4 py-3">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary">{label}</span>
          <strong className="mt-2 block text-sm font-medium">{value}</strong>
        </div>)}
      </div>
    </section>}

    {project.excerpt && <section className="mx-auto max-w-5xl px-6 py-20 text-center lg:py-28">
      <p className="text-2xl font-light leading-relaxed text-white/90 lg:text-4xl">{project.excerpt}</p>
    </section>}

    {project.blocks.filter((block) => block.isVisible).map((block) => <ProjectBlockRenderer key={block.id} block={block}/>)}

    <section className="border-t border-baolam-border bg-[#030914] px-6 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-baolam-primary">Bắt đầu một dự án mới</p>
      <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold lg:text-5xl">Biến ý tưởng thành một công trình tạo dấu ấn.</h2>
      <Link href="/#contact" className="mt-8 inline-flex bg-baolam-primary px-7 py-4 font-bold text-baolam-bg hover:bg-baolam-primary-hover">LIÊN HỆ TƯ VẤN →</Link>
    </section>
  </main>;
}

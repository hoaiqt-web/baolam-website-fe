import Link from "next/link";
import type { Project, ProjectBlock } from "@/db/schema";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ProjectBlockRenderer } from "./project-block-renderer";
import { ProjectHeroMedia } from "./project-hero-media";

type ProjectDetail = Project & { blocks: ProjectBlock[] };

export function ProjectDetailView({ project, preview = false }: { project: ProjectDetail; preview?: boolean }) {
  const headerSpacing = preview
    ? "pt-12"
    : "pt-16 sm:pt-20";
  const heroHeight = preview
    ? "h-[calc(100dvh-3rem)] min-h-[32rem]"
    : "h-[calc(100dvh-4rem)] min-h-[32rem] sm:h-[calc(100dvh-5rem)]";

  return <main className={`min-h-screen max-w-full overflow-x-clip bg-baolam-bg text-white ${headerSpacing}`}>
    <section className={`relative overflow-hidden ${heroHeight}`}>
      <ProjectHeroMedia src={project.coverImage} alt={project.coverAlt || project.title}/>
      <div className="absolute inset-0 bg-gradient-to-t from-baolam-bg via-baolam-bg/20 to-black/15"/>
      <div className="project-hero-glow absolute inset-0"/>
      <div className="relative flex h-full w-full items-end px-4 py-16 sm:px-6 lg:py-24 xl:px-12">
        <div className="max-w-5xl">
          <h1 className="motion-hero-title text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">{project.title}</h1>
          <p className="motion-hero-meta mt-5 text-xs font-bold uppercase tracking-[0.3em] text-baolam-primary">{project.eyebrow}</p>
          {project.location && <p className="motion-hero-location mt-4 text-lg text-white/80">{project.location}</p>}
        </div>
      </div>
      <div className="motion-scroll-cue absolute bottom-5 right-6 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 sm:flex lg:right-12"><span>Cuộn để khám phá</span><span className="relative h-10 w-px overflow-hidden bg-white/20"><span className="absolute inset-x-0 top-0 h-1/2 bg-baolam-primary"/></span></div>
    </section>

    {project.excerpt && <ScrollReveal direction="scale" delay={100}><section className="w-full px-4 py-20 text-left sm:px-6 lg:py-28 xl:px-12">
      <p className="text-xl font-light leading-[1.6] text-white/90 sm:text-2xl lg:text-3xl">{project.excerpt}</p>
    </section></ScrollReveal>}

    {project.blocks.filter((block) => block.isVisible).map((block, index) => <ScrollReveal key={block.id} direction={index % 2 ? "right" : "left"} delay={100}><ProjectBlockRenderer block={block}/></ScrollReveal>)}

    <ScrollReveal direction="scale" delay={100}><section className="border-t border-baolam-border bg-[#030914] px-6 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-baolam-primary">Bắt đầu một dự án mới</p>
      <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold lg:text-5xl">Biến ý tưởng thành một công trình tạo dấu ấn.</h2>
      <Link href="/#contact" className="mt-8 inline-flex bg-baolam-primary px-7 py-4 font-bold text-baolam-bg hover:bg-baolam-primary-hover">LIÊN HỆ TƯ VẤN →</Link>
    </section></ScrollReveal>
  </main>;
}

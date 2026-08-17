import Image from "next/image";
import { isProjectMediaUrl } from "@/features/projects/media-path";
import type { ProjectBlock } from "@/db/schema";
import { ProjectGallery } from "./project-gallery";

export function ProjectBlockRenderer({ block }: { block: ProjectBlock }) {
  const data = block.data;

  if (block.type === "highlights") return <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-28">
    <SectionHeading eyebrow="Dấu ấn dự án" title={data.heading} />
    <div><p className="max-w-3xl text-lg leading-8 text-baolam-muted">{data.body}</p>{data.items?.length ? <ul className="mt-8 grid gap-4 sm:grid-cols-2">{data.items.map((item, index) => <li key={item} className="border-l border-baolam-primary/50 pl-4"><span className="mb-2 block text-xs font-bold text-baolam-primary">0{index + 1}</span>{item}</li>)}</ul> : null}</div>
  </section>;

  if (block.type === "imageText" || block.type === "technical") return <section className="bg-baolam-surface/45 py-20 lg:py-28"><div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:px-12">{data.image && <Image src={data.image} alt={data.imageAlt || data.heading || "Ảnh dự án"} width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" unoptimized={isProjectMediaUrl(data.image)} className="aspect-[4/3] h-full w-full object-cover"/>}<div><SectionHeading eyebrow={block.type === "technical" ? "Giải pháp kỹ thuật" : "Câu chuyện dự án"} title={data.heading}/><p className="mt-6 whitespace-pre-line leading-7 text-baolam-muted">{data.body}</p>{data.items?.length ? <ul className="mt-7 space-y-3">{data.items.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-baolam-primary"/>{item}</li>)}</ul> : null}</div></div></section>;

  if (block.type === "gallery") return <section className="mx-auto max-w-[1600px] px-4 py-16 lg:px-8 lg:py-24"><SectionHeading eyebrow="Gallery" title={data.heading}/><ProjectGallery images={data.images ?? []} heading={data.heading} variant={block.variant}/></section>;

  if (block.type === "process") return <section className="bg-[#030914] py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-12"><SectionHeading eyebrow="Từ ý tưởng đến công trình" title={data.heading}/><div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{data.steps?.map((step, index) => <article key={`${step.title}-${index}`}><span className="text-3xl font-light text-baolam-primary">{String(index + 1).padStart(2, "0")}</span>{step.image && <Image src={step.image} alt={step.title} width={800} height={600} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" unoptimized={isProjectMediaUrl(step.image)} className="mt-5 aspect-[4/3] w-full object-cover"/>}<h3 className="mt-5 font-bold uppercase tracking-wide">{step.title}</h3><p className="mt-2 text-sm leading-6 text-baolam-muted">{step.description}</p></article>)}</div></div></section>;

  if (block.type === "testimonial") return <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:py-32"><span className="text-6xl leading-none text-baolam-primary">“</span><blockquote className="mt-4 text-2xl font-light leading-relaxed lg:text-4xl">{data.quote}</blockquote>{data.author && <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-baolam-primary">{data.author}</p>}</section>;

  return null;
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title?: string }) {
  return <div><p className="text-xs font-bold uppercase tracking-[0.28em] text-baolam-primary">{eyebrow}</p>{title && <h2 className="mt-4 text-3xl font-bold leading-tight lg:text-5xl">{title}</h2>}<span className="mt-6 block h-px w-20 bg-baolam-primary"/></div>;
}

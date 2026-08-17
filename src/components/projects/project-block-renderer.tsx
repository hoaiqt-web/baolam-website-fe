import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { isProjectMediaUrl } from "@/features/projects/media-path";
import type { ProjectBlock } from "@/db/schema";
import { ProjectGallery } from "./project-gallery";
import { ProjectImageViewer } from "./project-image-viewer";

export function ProjectBlockRenderer({ block }: { block: ProjectBlock }) {
  const data = block.data;

  if (block.type === "highlights") return <section className="grid w-full gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-28 xl:px-12">
    <SectionHeading eyebrow="Dấu ấn dự án" title={data.heading} />
    <div><p className="max-w-3xl text-lg leading-8 text-baolam-muted">{data.body}</p>{data.items?.length ? <ul className="mt-8 grid gap-4 sm:grid-cols-2">{data.items.map((item, index) => <li key={item} className="border-l border-baolam-primary/50 pl-4"><span className="mb-2 block text-xs font-bold text-baolam-primary">0{index + 1}</span>{item}</li>)}</ul> : null}</div>
  </section>;

  if (block.type === "imageText" || block.type === "technical") return <section className="bg-baolam-surface/45 py-20 lg:py-28"><div className="grid w-full items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 xl:px-12">{data.image && <ProjectImageViewer images={[{ src: data.image, alt: data.imageAlt || data.heading || "Ảnh dự án" }]}><ZoomableImage src={data.image} alt={data.imageAlt || data.heading || "Ảnh dự án"} sizes="(min-width: 1024px) 50vw, 100vw"/></ProjectImageViewer>}<div><SectionHeading eyebrow={block.type === "technical" ? "Giải pháp kỹ thuật" : "Câu chuyện dự án"} title={data.heading}/><p className="mt-6 whitespace-pre-line leading-7 text-baolam-muted">{data.body}</p>{data.items?.length ? <ul className="mt-7 space-y-3">{data.items.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-baolam-primary"/>{item}</li>)}</ul> : null}</div></div></section>;

  if (block.type === "gallery") return <section className="w-full px-4 py-16 sm:px-6 lg:py-24 xl:px-12"><SectionHeading eyebrow="Gallery" title={data.heading}/><ProjectGallery images={data.images ?? []} heading={data.heading} variant={block.variant}/></section>;

  if (block.type === "process") {
    const processImages = (data.steps ?? []).flatMap((step) => step.image ? [{ src: step.image, alt: step.title, caption: step.description }] : []);
    let imageIndex = -1;
    return <section className="bg-[#030914] py-20 lg:py-28"><div className="w-full px-4 sm:px-6 xl:px-12"><SectionHeading eyebrow="Từ ý tưởng đến công trình" title={data.heading}/><ProjectImageViewer images={processImages} className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{data.steps?.map((step, index) => {
      if (step.image) imageIndex += 1;
      return <article key={`${step.title}-${index}`}><span className="text-3xl font-light text-baolam-primary">{String(index + 1).padStart(2, "0")}</span>{step.image && <ZoomableImage src={step.image} alt={step.title} index={imageIndex} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="mt-5"/>}<h3 className="mt-5 font-bold uppercase tracking-wide">{step.title}</h3><p className="mt-2 text-sm leading-6 text-baolam-muted">{step.description}</p></article>;
    })}</ProjectImageViewer></div></section>;
  }

  if (block.type === "testimonial") return <section className="w-full px-4 py-24 text-left sm:px-6 lg:py-32 xl:px-12"><span className="block text-6xl leading-none text-baolam-primary">“</span><blockquote className="mt-4 text-xl font-light leading-[1.6] sm:text-2xl lg:text-3xl">{data.quote}</blockquote>{data.author && <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-baolam-primary">{data.author}</p>}</section>;

  return null;
}

function ZoomableImage({ src, alt, sizes, index = 0, className = "" }: { src: string; alt: string; sizes: string; index?: number; className?: string }) {
  return <button type="button" data-project-image-index={index} aria-label={`Xem ảnh ${alt} ở kích thước lớn`} className={`group relative block w-full cursor-zoom-in overflow-hidden text-left ${className}`}>
    <Image src={src} alt={alt} width={1200} height={900} sizes={sizes} unoptimized={isProjectMediaUrl(src)} className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] group-hover:brightness-75"/>
    <span className="pointer-events-none absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-black/65 opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100"><ZoomIn className="size-4"/></span>
  </button>;
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title?: string }) {
  return <div><p className="text-xs font-bold uppercase tracking-[0.28em] text-baolam-primary">{eyebrow}</p>{title && <h2 className="mt-4 text-3xl font-bold leading-tight lg:text-5xl">{title}</h2>}<span className="mt-6 block h-px w-20 bg-baolam-primary"/></div>;
}

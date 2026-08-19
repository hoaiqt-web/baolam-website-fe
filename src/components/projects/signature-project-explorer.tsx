"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { PlaceholderVisual } from "@/components/home/placeholder-visual";
import { cn } from "@/lib/utils";
import type { SignatureProject } from "@/data/signature-projects";

const ALL_FILTER = "TẤT CẢ";

const GROUP_LABELS: Record<SignatureProject["group"], string> = {
  landmark: "Công trình biểu tượng",
  artwork: "Artwork cảnh quan",
};

const CARD_PATTERN = [
  { span: "lg:col-span-12", aspect: "aspect-[16/8]" },
  { span: "lg:col-span-6", aspect: "aspect-[4/3]" },
  { span: "lg:col-span-6", aspect: "aspect-[4/3]" },
  { span: "lg:col-span-5", aspect: "aspect-[3/4]" },
  { span: "lg:col-span-7", aspect: "aspect-[4/3]" },
] as const;

function getCardLayout(index: number) {
  return CARD_PATTERN[index % CARD_PATTERN.length];
}

export function SignatureProjectExplorer({ projects }: { projects: SignatureProject[] }) {
  const groups = useMemo(() => {
    const seen = new Set<SignatureProject["group"]>();
    for (const project of projects) seen.add(project.group);
    return Array.from(seen);
  }, [projects]);

  const [active, setActive] = useState<string>(ALL_FILTER);

  const filtered = active === ALL_FILTER ? projects : projects.filter((p) => p.group === active);

  if (!projects.length) return null;

  return (
    <div>
      {groups.length > 1 && (
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setActive(ALL_FILTER)}
            aria-pressed={active === ALL_FILTER}
            className="contact-chip"
            data-selected={active === ALL_FILTER}
          >
            {ALL_FILTER}
          </button>
          {groups.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setActive(group)}
              aria-pressed={active === group}
              className="contact-chip"
              data-selected={active === group}
            >
              {GROUP_LABELS[group].toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <div className={cn("grid grid-cols-1 gap-5 lg:grid-cols-12", groups.length > 1 && "mt-10")}>
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: SignatureProject; index: number }) {
  const layout = getCardLayout(index);
  const meta = [project.location, project.category, project.completionYear]
    .filter(Boolean)
    .join(" · ");

  return (
    <ScrollReveal
      direction={layout.span === "lg:col-span-12" ? "scale" : index % 2 === 0 ? "left" : "right"}
      className={cn("group cursor-pointer", layout.span)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-baolam-primary/40",
          layout.aspect
        )}
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <PlaceholderVisual label={project.category} seed={index} className="h-full w-full" />
        </div>
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(180deg, transparent 35%, rgba(2,11,22,0.88) 100%)",
          }}
        />
        <span className="absolute left-4 top-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="block h-px w-0 bg-baolam-primary transition-all duration-500 group-hover:w-full" />
          <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-baolam-primary">
            Xem dự án
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-baolam-primary sm:text-lg">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-baolam-muted">{meta}</p>
      </div>
    </ScrollReveal>
  );
}

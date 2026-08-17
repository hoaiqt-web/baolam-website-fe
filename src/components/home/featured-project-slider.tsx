"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

type FeaturedProject = {
  id: string;
  slug: string;
  title: string;
  location?: string;
  category: string;
  thumbnail: string;
};

const AUTO_SCROLL_PX_PER_SECOND = 12;

export function FeaturedProjectSlider({ projects }: { projects: FeaturedProject[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || projects.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const setInitialPosition = () => { viewport.scrollLeft = viewport.scrollWidth / 3; };
    const frame = requestAnimationFrame(setInitialPosition);
    if (reduceMotion) return () => cancelAnimationFrame(frame);

    let animationFrame = 0;
    let previousTime = performance.now();
    const animate = (time: number) => {
      const segmentWidth = viewport.scrollWidth / 3;
      if (!pausedRef.current && segmentWidth > 0) {
        viewport.scrollLeft += ((time - previousTime) / 1000) * AUTO_SCROLL_PX_PER_SECOND;
        if (viewport.scrollLeft >= segmentWidth * 2) viewport.scrollLeft -= segmentWidth;
        if (viewport.scrollLeft < segmentWidth) viewport.scrollLeft += segmentWidth;
      }
      previousTime = time;
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(animationFrame);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [projects.length]);

  function pauseTemporarily() {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => { pausedRef.current = false; }, 1800);
  }

  function move(direction: -1 | 1) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    pauseTemporarily();
    viewport.scrollBy({ left: direction * Math.min(viewport.clientWidth * 0.8, 420), behavior: "smooth" });
  }

  if (!projects.length) return null;
  const repeatedProjects = [...projects, ...projects, ...projects];

  return <div className="relative min-w-0 flex-1">
    <div className="absolute -top-10 right-0 z-30 flex gap-1.5">
      <button type="button" onClick={() => move(-1)} aria-label="Dự án trước" className="grid size-7 place-items-center rounded-full border border-white/20 bg-[#030914] text-white transition hover:border-baolam-primary hover:text-baolam-primary"><ChevronLeft className="size-3.5"/></button>
      <button type="button" onClick={() => move(1)} aria-label="Dự án tiếp theo" className="grid size-7 place-items-center rounded-full border border-white/20 bg-[#030914] text-white transition hover:border-baolam-primary hover:text-baolam-primary"><ChevronRight className="size-3.5"/></button>
    </div>
    <div ref={viewportRef} onMouseEnter={() => { pausedRef.current = true; }} onMouseLeave={() => { pausedRef.current = false; }} onFocus={() => { pausedRef.current = true; }} onBlur={() => { pausedRef.current = false; }} onPointerDown={pauseTemporarily} className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-3 pr-3 lg:gap-4 lg:pr-4">
        {repeatedProjects.map((project, index) => {
          const isCanonicalSet = index >= projects.length && index < projects.length * 2;
          return <Link href={`/projects/${project.slug}`} key={`${project.id}-${index}`} aria-hidden={!isCanonicalSet} tabIndex={isCanonicalSet ? undefined : -1} className="group flex h-[200px] w-[calc(100vw-3rem)] shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg border border-white/20 bg-gradient-to-b from-[#071324] to-[#040D19] transition hover:border-baolam-primary/50 hover:shadow-[0_4px_20px_rgba(0,229,255,0.15)] sm:w-[42vw] lg:h-[150px] lg:w-[280px] xl:w-[320px]">
            <div className="relative h-[65%] w-full shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.thumbnail} alt={project.title} className="size-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              <span className="absolute bottom-0 left-0 rounded-tr-md bg-baolam-primary px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-baolam-bg">{project.category}</span>
            </div>
            <div className="flex flex-1 flex-col justify-center px-3 py-2">
              <h3 className="line-clamp-1 text-[11px] font-bold text-white transition-colors group-hover:text-baolam-primary">{project.title}</h3>
              <div className="mt-1 flex items-center gap-1 text-[9px] text-baolam-muted"><MapPin className="size-3 text-baolam-primary"/><span className="truncate">{project.location || "Bảo Lâm"}</span></div>
            </div>
          </Link>;
        })}
      </div>
    </div>
  </div>;
}

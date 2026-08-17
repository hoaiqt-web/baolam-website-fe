"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { isProjectMediaUrl } from "@/features/projects/media-path";

export function ProjectHeroMedia({ src, alt }: { src: string; alt: string }) {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const offset = Math.min(window.scrollY, window.innerHeight);
      media.style.transform = `translate3d(0, ${offset * 0.12}px, 0) scale(${1.045 + offset / window.innerHeight * 0.035})`;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={mediaRef} className="absolute inset-0 scale-[1.045] will-change-transform">
    <Image src={src} alt={alt} fill preload quality={85} sizes="100vw" unoptimized={isProjectMediaUrl(src)} className="object-cover"/>
  </div>;
}

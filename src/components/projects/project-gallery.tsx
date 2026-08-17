"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import { isProjectMediaUrl } from "@/features/projects/media-path";

type GalleryImage = { url: string; alt?: string; caption?: string };

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export function ProjectGallery({ images, heading, variant }: { images: GalleryImage[]; heading?: string; variant?: string | null }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const close = useCallback(() => {
    setActiveIndex(null);
    setZoom(MIN_ZOOM);
  }, []);

  const move = useCallback((offset: -1 | 1) => {
    setActiveIndex((current) => current === null ? null : (current + offset + images.length) % images.length);
    setZoom(MIN_ZOOM);
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft" && images.length > 1) move(-1);
      if (event.key === "ArrowRight" && images.length > 1) move(1);
      if (event.key === "+" || event.key === "=") setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP));
      if (event.key === "-") setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP));
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, images.length, move]);

  if (!images.length) return null;

  return <>
    <div className={`mt-10 grid gap-3 ${variant === "grid" ? "md:grid-cols-2" : "md:grid-cols-12"}`}>
      {images.map((image, index) => <figure key={`${image.url}-${index}`} className={variant === "grid" ? "" : index % 3 === 0 ? "md:col-span-7" : "md:col-span-5"}>
        <button type="button" onClick={() => { setActiveIndex(index); setZoom(MIN_ZOOM); }} className="group relative block w-full cursor-zoom-in overflow-hidden text-left" aria-label={`Xem ảnh ${index + 1} ở kích thước lớn`}>
          <Image src={image.url} alt={image.alt || `${heading || "Dự án"} ${index + 1}`} width={1200} height={900} sizes="(min-width: 768px) 60vw, 100vw" unoptimized={isProjectMediaUrl(image.url)} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02] group-hover:brightness-75"/>
          <span className="pointer-events-none absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-black/65 opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100"><ZoomIn className="size-5"/></span>
        </button>
        {image.caption && <figcaption className="mt-2 text-xs text-baolam-muted">{image.caption}</figcaption>}
      </figure>)}
    </div>

    {activeImage && activeIndex !== null && <div role="dialog" aria-modal="true" aria-label={`Xem ảnh ${activeIndex + 1} trên ${images.length}`} className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-3 sm:px-5">
        <span className="text-sm text-white/70">{activeIndex + 1} / {images.length}</span>
        <div className="flex items-center gap-1">
          <LightboxButton label="Thu nhỏ" onClick={() => setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP))} disabled={zoom === MIN_ZOOM}><ZoomOut/></LightboxButton>
          <span className="w-14 text-center text-xs tabular-nums text-white/70">{Math.round(zoom * 100)}%</span>
          <LightboxButton label="Phóng to" onClick={() => setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP))} disabled={zoom === MAX_ZOOM}><ZoomIn/></LightboxButton>
          <LightboxButton label="Đặt lại kích thước" onClick={() => setZoom(MIN_ZOOM)} disabled={zoom === MIN_ZOOM}><RotateCcw/></LightboxButton>
          <span className="mx-1 h-6 w-px bg-white/15"/>
          <LightboxButton label="Đóng" onClick={close}><X/></LightboxButton>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-auto">
        <div className="flex min-h-full min-w-full items-center justify-center p-4 sm:p-8">
          <Image src={activeImage.url} alt={activeImage.alt || `${heading || "Dự án"} ${activeIndex + 1}`} width={1800} height={1350} sizes="100vw" unoptimized={isProjectMediaUrl(activeImage.url)} className="max-h-[calc(100vh-9rem)] w-auto max-w-[calc(100vw-2rem)] object-contain transition-transform duration-200 sm:max-w-[calc(100vw-4rem)]" style={{ transform: `scale(${zoom})` }}/>
        </div>
      </div>

      {images.length > 1 && <>
        <LightboxButton label="Ảnh trước" onClick={() => move(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 sm:left-5"><ChevronLeft/></LightboxButton>
        <LightboxButton label="Ảnh tiếp theo" onClick={() => move(1)} className="absolute right-3 top-1/2 -translate-y-1/2 sm:right-5"><ChevronRight/></LightboxButton>
      </>}
      {activeImage.caption && <p className="shrink-0 px-5 pb-4 text-center text-sm text-white/70">{activeImage.caption}</p>}
    </div>}
  </>;
}

function LightboxButton({ label, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button type="button" aria-label={label} title={label} className={`grid size-10 place-items-center rounded-full border border-white/15 bg-black/55 text-white transition hover:border-baolam-primary hover:text-baolam-primary disabled:cursor-not-allowed disabled:opacity-35 ${className}`} {...props}/>;
}

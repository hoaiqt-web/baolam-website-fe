"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import { Captions, Counter, Fullscreen, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import { ZoomIn } from "lucide-react";
import { isProjectMediaUrl } from "@/features/projects/media-path";

type GalleryImage = { url: string; alt?: string; caption?: string };

export function ProjectGallery({ images, heading, variant }: { images: GalleryImage[]; heading?: string; variant?: string | null }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const slides = useMemo(() => images.map((image, index) => ({
    src: image.url,
    thumbnail: image.url,
    alt: image.alt || `${heading || "Dự án"} ${index + 1}`,
    description: image.caption,
  })), [heading, images]);

  if (!images.length) return null;

  return <>
    <div className={`mt-10 grid gap-3 ${variant === "grid" ? "md:grid-cols-2" : "md:grid-cols-12"}`}>
      {images.map((image, index) => <figure key={`${image.url}-${index}`} className={variant === "grid" ? "" : index % 3 === 0 ? "md:col-span-7" : "md:col-span-5"}>
        <button type="button" onClick={() => setActiveIndex(index)} className="group relative block w-full cursor-zoom-in overflow-hidden text-left" aria-label={`Xem ảnh ${index + 1} ở kích thước lớn`}>
          <Image src={image.url} alt={image.alt || `${heading || "Dự án"} ${index + 1}`} width={1200} height={900} sizes="(min-width: 768px) 60vw, 100vw" unoptimized={isProjectMediaUrl(image.url)} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02] group-hover:brightness-75"/>
          <span className="pointer-events-none absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-black/65 opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100"><ZoomIn className="size-5"/></span>
        </button>
        {image.caption && <figcaption className="mt-2 text-xs text-baolam-muted">{image.caption}</figcaption>}
      </figure>)}
    </div>

    <Lightbox
      open={activeIndex >= 0}
      close={() => setActiveIndex(-1)}
      index={Math.max(activeIndex, 0)}
      slides={slides}
      plugins={[Zoom, Fullscreen, Captions, Counter, Thumbnails]}
      on={{ view: ({ index }) => setActiveIndex(index) }}
      carousel={{ finite: false, imageFit: "contain", preload: 2 }}
      controller={{ closeOnBackdropClick: true }}
      zoom={{
        maxZoomPixelRatio: 4,
        zoomInMultiplier: 2,
        doubleClickMaxStops: 3,
        scrollToZoom: true,
        pinchZoomV4: true,
      }}
      thumbnails={{
        position: "bottom",
        width: 96,
        height: 64,
        borderRadius: 6,
        border: 1,
        gap: 10,
        padding: 3,
        showToggle: true,
      }}
      captions={{ descriptionTextAlign: "center", descriptionMaxLines: 3 }}
      counter={{ separator: " / " }}
      labels={{
        Close: "Đóng",
        Previous: "Ảnh trước",
        Next: "Ảnh tiếp theo",
        "Zoom in": "Phóng to",
        "Zoom out": "Thu nhỏ",
        "Enter Fullscreen": "Toàn màn hình",
        "Exit Fullscreen": "Thoát toàn màn hình",
        Thumbnails: "Ảnh thu nhỏ",
        "Show thumbnails": "Hiện ảnh thu nhỏ",
        "Hide thumbnails": "Ẩn ảnh thu nhỏ",
      }}
      className="baolam-lightbox"
      styles={{
        root: {
          "--yarl__color_backdrop": "rgba(3, 9, 20, 0.97)",
          "--yarl__color_button": "rgba(255, 255, 255, 0.78)",
          "--yarl__color_button_active": "#00E5FF",
          "--yarl__portal_zindex": 250,
        },
      }}
    />
  </>;
}

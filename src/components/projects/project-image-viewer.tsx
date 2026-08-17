"use client";

import { useMemo, useState, type MouseEvent, type ReactNode } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Captions, Counter, Fullscreen, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";

type ViewerImage = { src: string; alt: string; caption?: string };

export function ProjectImageViewer({ images, children, className = "" }: { images: ViewerImage[]; children: ReactNode; className?: string }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const slides = useMemo(() => images.map((image) => ({
    src: image.src,
    thumbnail: image.src,
    alt: image.alt,
    description: image.caption,
  })), [images]);

  function openFromTarget(event: MouseEvent<HTMLDivElement>) {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-project-image-index]");
    if (!target || !event.currentTarget.contains(target)) return;
    const index = Number(target.dataset.projectImageIndex);
    if (Number.isInteger(index) && index >= 0 && index < images.length) setActiveIndex(index);
  }

  return <>
    <div onClick={openFromTarget} className={className}>{children}</div>
    <Lightbox
      open={activeIndex >= 0}
      close={() => setActiveIndex(-1)}
      index={Math.max(activeIndex, 0)}
      slides={slides}
      plugins={[Zoom, Fullscreen, Captions, Counter, Thumbnails]}
      on={{ view: ({ index }) => setActiveIndex(index) }}
      carousel={{ finite: images.length < 2, imageFit: "contain", preload: 2 }}
      controller={{ closeOnBackdropClick: true }}
      zoom={{ maxZoomPixelRatio: 4, zoomInMultiplier: 2, doubleClickMaxStops: 3, scrollToZoom: true, pinchZoomV4: true }}
      thumbnails={{ position: "bottom", width: 96, height: 64, borderRadius: 6, border: 1, gap: 10, padding: 3, showToggle: images.length > 1 }}
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
      styles={{ root: {
        "--yarl__color_backdrop": "rgba(3, 9, 20, 0.97)",
        "--yarl__color_button": "rgba(255, 255, 255, 0.78)",
        "--yarl__color_button_active": "#00E5FF",
        "--yarl__portal_zindex": 250,
      } }}
    />
  </>;
}

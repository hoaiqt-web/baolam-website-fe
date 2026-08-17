"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealDirection = "up" | "left" | "right" | "scale";

export function ScrollReveal({ children, className = "", direction = "up", delay = 0 }: { children: ReactNode; className?: string; direction?: RevealDirection; delay?: number }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.visible = "true";
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    observer.observe(element);
    element.dataset.ready = "true";
    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef} data-direction={direction} className={`motion-reveal ${className}`} style={{ "--motion-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

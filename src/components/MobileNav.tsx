"use client";
import { useCmsBlock } from "@/components/cms/content-provider";

import { useState, useEffect } from "react";
import { useContactModal } from "@/components/contact/contact-modal-context";

interface NavLink {
  href: string;
  label: string;
  active?: boolean;
}

export default function MobileNav({ links }: { links: NavLink[] }) {
  const c = useCmsBlock("shared.MobileNav");
  const [open, setOpen] = useState(false);
  const { openContactModal } = useContactModal();

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button — only visible on mobile */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={c("Toggle menu")}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="lg:hidden flex flex-col gap-[5px] justify-center items-center w-10 h-10 rounded-lg border border-ink/20 hover:border-baolam-primary/60 hover:bg-baolam-primary/10 transition-all"
      >
        <span
          className={`block w-5 h-[2px] bg-ink transition-all duration-300 ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-ink transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-ink transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {/* Overlay backdrop */}
      {open && (
        <div
          className="lg:hidden fixed top-0 left-0 h-dvh w-full z-[9980] bg-black/70"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in drawer — fully opaque, above everything */}
      <div
        id="mobile-navigation"
        inert={!open}
        aria-hidden={!open}
        className={`lg:hidden fixed top-0 right-0 h-dvh w-[78vw] max-w-[320px] z-[9990] transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--menu-background)",
          borderLeft: "1px solid rgba(0,229,255,0.2)",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10 shrink-0">
          <span className="text-baolam-primary font-bold text-[12px] uppercase tracking-[3px]">{c("Menu")}</span>
          <button
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-ink/20 hover:border-baolam-primary/60 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 py-5 gap-1 flex-1 overflow-y-auto">
          {links.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl text-[13px] font-bold tracking-wider transition-all ${
                link.active
                  ? "bg-baolam-primary/15 text-baolam-primary border border-baolam-primary/30"
                  : "text-ink border border-transparent hover:bg-ink/8 hover:text-ink"
              }`}
            >
              {link.active && (
                <span className="w-2 h-2 rounded-full bg-baolam-primary shrink-0" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA at bottom */}
        <div className="px-4 pb-8 pt-3 shrink-0 border-t border-ink/10">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openContactModal("mobile-nav");
            }}
            className="w-full py-4 bg-baolam-primary text-primary-foreground font-bold text-[13px] tracking-wider flex items-center justify-center gap-2 rounded-xl hover:bg-baolam-primary-hover transition-colors shadow-[0_4px_20px_rgba(0,229,255,0.4)]"
          >{c("LIÊN HỆ TƯ VẤN &rarr;").replace("&rarr;", "→")}</button>
        </div>
      </div>
    </>
  );
}

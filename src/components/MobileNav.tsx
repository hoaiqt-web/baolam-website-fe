"use client";

import { useState, useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
  active?: boolean;
}

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
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
        aria-label="Toggle menu"
        className="md:hidden flex flex-col gap-[5px] justify-center items-center w-10 h-10 rounded-lg border border-white/10 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 transition-all"
      >
        <span
          className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {/* Overlay backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-[48] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[75vw] max-w-[300px] z-[49] transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "rgba(7, 18, 34, 0.98)", backdropFilter: "blur(20px)", borderLeft: "1px solid rgba(0,229,255,0.15)" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-[#00E5FF] font-bold text-[11px] uppercase tracking-[3px]">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#00E5FF]/50 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 py-6 gap-1">
          {links.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[12px] font-bold tracking-wider transition-all ${
                link.active
                  ? "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25"
                  : "text-white/80 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              {link.active && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shrink-0" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA at bottom of drawer */}
        <div className="px-4 mt-2">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="w-full py-4 bg-[#00E5FF] text-[#071324] font-bold text-[12px] tracking-wider flex items-center justify-center gap-2 rounded-xl hover:bg-[#2EF2FF] transition-colors shadow-[0_4px_20px_rgba(0,229,255,0.4)]"
          >
            LIÊN HỆ TƯ VẤN &rarr;
          </a>
        </div>
      </div>
    </>
  );
}

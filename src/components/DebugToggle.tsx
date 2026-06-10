"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SelectedEl {
  classes: string;
  tagName: string;
  width: number;
  height: number;
  top: number;
  left: number;
}

interface HoverInfo {
  tagName: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

const EDITOR_ATTR = "data-layout-editor-ui";

export default function DebugToggle() {
  const [debug, setDebug] = useState(false);
  const [selected, setSelected] = useState<SelectedEl | null>(null);
  const [hover, setHover] = useState<HoverInfo | null>(null);
  const [copied, setCopied] = useState(false);

  // Panel position (draggable)
  const [panelPos, setPanelPos] = useState({ x: 16, y: 76 });
  const isDraggingPanel = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // ──────────────────────────────────────────────────────────
  // Toggle body class for outline overlay
  // ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (debug) {
      document.body.classList.add("debug-layout");
    } else {
      document.body.classList.remove("debug-layout");
      setSelected(null);
      setHover(null);
    }
    return () => document.body.classList.remove("debug-layout");
  }, [debug]);

  // ──────────────────────────────────────────────────────────
  // Click → inspect element
  // ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!debug) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(`[${EDITOR_ATTR}]`)) return;

      e.preventDefault();
      e.stopPropagation();

      const rect = target.getBoundingClientRect();
      setSelected({
        classes: target.className || "(no classes)",
        tagName: target.tagName.toLowerCase(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left),
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [debug]);

  // ──────────────────────────────────────────────────────────
  // Mousemove → hover tooltip
  // ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!debug) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(`[${EDITOR_ATTR}]`)) {
        setHover(null);
        return;
      }
      const rect = target.getBoundingClientRect();
      setHover({
        tagName: target.tagName.toLowerCase(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        x: e.clientX + 12,
        y: e.clientY + 12,
      });
    };

    const handleMouseLeave = () => setHover(null);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [debug]);

  // ──────────────────────────────────────────────────────────
  // Panel drag-to-move
  // ──────────────────────────────────────────────────────────
  const handlePanelMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingPanel.current = true;
    dragOffset.current = {
      x: e.clientX - panelPos.x,
      y: e.clientY - panelPos.y,
    };
  }, [panelPos]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDraggingPanel.current) return;
      setPanelPos({
        x: Math.max(0, e.clientX - dragOffset.current.x),
        y: Math.max(0, e.clientY - dragOffset.current.y),
      });
    };
    const onUp = () => { isDraggingPanel.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // ──────────────────────────────────────────────────────────
  // Copy to clipboard
  // ──────────────────────────────────────────────────────────
  const copyClasses = () => {
    if (!selected) return;
    navigator.clipboard.writeText(selected.classes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* ── Global CSS for debug outlines ── */}
      {debug && (
        <style dangerouslySetInnerHTML={{
          __html: `
            body.debug-layout *:not([${EDITOR_ATTR}]):not([${EDITOR_ATTR}] *) {
              outline: 1px dashed rgba(255, 0, 0, 0.18) !important;
            }
            body.debug-layout div:not([${EDITOR_ATTR}]):not([${EDITOR_ATTR}] *) {
              outline: 1px solid rgba(0, 229, 255, 0.28) !important;
            }
            body.debug-layout img:not([${EDITOR_ATTR}]):not([${EDITOR_ATTR}] *) {
              outline: 2px solid rgba(255, 220, 0, 0.7) !important;
            }
            body.debug-layout p:not([${EDITOR_ATTR}] *),
            body.debug-layout span:not([${EDITOR_ATTR}] *),
            body.debug-layout h1:not([${EDITOR_ATTR}] *),
            body.debug-layout h2:not([${EDITOR_ATTR}] *),
            body.debug-layout h3:not([${EDITOR_ATTR}] *),
            body.debug-layout h4:not([${EDITOR_ATTR}] *) {
              outline: 1px solid rgba(0, 255, 100, 0.4) !important;
            }
            body.debug-layout *:not([${EDITOR_ATTR}]):not([${EDITOR_ATTR}] *):hover {
              outline: 2px solid rgba(0, 229, 255, 1) !important;
              cursor: crosshair !important;
            }
          `
        }} />
      )}

      {/* ── Element Highlight Overlay (selected) ── */}
      {debug && selected && (
        <div
          data-layout-editor-ui
          style={{
            position: "fixed",
            top: selected.top - window.scrollY,
            left: selected.left,
            width: selected.width,
            height: selected.height,
            pointerEvents: "none",
            zIndex: 9990,
            outline: "2px solid #00E5FF",
            boxShadow: "0 0 0 4px rgba(0,229,255,0.15), inset 0 0 0 1px rgba(0,229,255,0.3)",
            borderRadius: 2,
          }}
        >
          {/* Corner label */}
          <div
            style={{
              position: "absolute",
              top: -22,
              left: 0,
              background: "#00E5FF",
              color: "#071522",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: "3px 3px 3px 0",
              whiteSpace: "nowrap",
              fontFamily: "monospace",
            }}
          >
            &lt;{selected.tagName}&gt; {selected.width} × {selected.height}px
          </div>
        </div>
      )}

      {/* ── Hover Tooltip ── */}
      {debug && hover && !selected && (
        <div
          data-layout-editor-ui
          style={{
            position: "fixed",
            top: hover.y,
            left: hover.x,
            pointerEvents: "none",
            zIndex: 9995,
            background: "rgba(7,18,36,0.95)",
            border: "1px solid rgba(0,229,255,0.4)",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 10,
            fontFamily: "monospace",
            color: "#00E5FF",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
          }}
        >
          &lt;{hover.tagName}&gt; {hover.width} × {hover.height}px
        </div>
      )}

      {/* ── Floating Inspector Panel ── */}
      {debug && (
        <div
          data-layout-editor-ui
          style={{ left: panelPos.x, top: panelPos.y, position: "fixed" }}
          className="z-[9997] w-[300px] bg-[#071324]/98 backdrop-blur-xl border border-[#00E5FF]/30 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Header — drag handle */}
          <div
            onMouseDown={handlePanelMouseDown}
            className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#00E5FF]/15 to-transparent border-b border-[#00E5FF]/15 cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-[#00E5FF] font-bold text-[11px] uppercase tracking-[2px]">
                Layout Inspector
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#A5B4C7]/40">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 9h14M5 15h14" />
              </svg>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            {!selected ? (
              /* Empty state */
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l18 18M3 21l18-18" opacity="0" />
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <p className="text-white text-[12px] font-semibold mb-1">Click vào phần tử bất kỳ</p>
                <p className="text-[#A5B4C7]/60 text-[10px] leading-relaxed">
                  Hover để xem kích thước<br />Click để xem & copy className
                </p>
              </div>
            ) : (
              /* Inspected element */
              <div className="space-y-3">
                {/* Tag + dimensions badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#00E5FF]/15 text-[#00E5FF] text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border border-[#00E5FF]/25">
                      &lt;{selected.tagName}&gt;
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#A5B4C7] text-[10px] font-mono bg-white/5 px-2 py-1 rounded-lg">
                    <span className="text-[#00E5FF]">{selected.width}</span>
                    <span className="text-white/30">×</span>
                    <span className="text-[#00E5FF]">{selected.height}</span>
                    <span className="text-[#A5B4C7]/50">px</span>
                  </div>
                </div>

                {/* Dimensions grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#030914] border border-white/8 rounded-xl p-3 text-center">
                    <div className="text-[#00E5FF] font-mono text-[15px] font-bold leading-none">{selected.width}</div>
                    <div className="text-[#A5B4C7]/60 text-[9px] uppercase tracking-wider mt-1.5">Width (px)</div>
                  </div>
                  <div className="bg-[#030914] border border-white/8 rounded-xl p-3 text-center">
                    <div className="text-[#00E5FF] font-mono text-[15px] font-bold leading-none">{selected.height}</div>
                    <div className="text-[#A5B4C7]/60 text-[9px] uppercase tracking-wider mt-1.5">Height (px)</div>
                  </div>
                </div>

                {/* ClassName block */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#A5B4C7]/70 text-[10px] uppercase tracking-wider font-semibold">className</span>
                    <button
                      onClick={copyClasses}
                      className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 active:scale-95 transition-all border border-[#00E5FF]/25"
                    >
                      {copied ? (
                        <>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          Đã copy!
                        </>
                      ) : (
                        <>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          Copy class
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-[#030914] border border-white/8 rounded-xl p-3 max-h-[140px] overflow-y-auto custom-scroll">
                    <p className="text-[#A5B4C7] text-[10px] font-mono leading-[1.8] break-all whitespace-pre-wrap">
                      {selected.classes.split(" ").map((cls, i) => (
                        <span key={i}>
                          {i > 0 && " "}
                          <span className="hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded px-0.5 transition-colors cursor-default">
                            {cls}
                          </span>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Clear button */}
                <button
                  onClick={() => setSelected(null)}
                  className="w-full text-[10px] text-[#A5B4C7]/40 hover:text-[#A5B4C7] transition-colors py-1.5 flex items-center justify-center gap-1.5"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Bỏ chọn phần tử
                </button>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2.5 border-t border-white/5 bg-[#030914]/60">
            <p className="text-[#A5B4C7]/35 text-[9px] text-center tracking-wide">
              ☰ Kéo thanh tiêu đề để di chuyển panel
            </p>
          </div>
        </div>
      )}

      {/* ── Toggle Button ── */}
      <button
        data-layout-editor-ui
        onClick={() => setDebug(!debug)}
        className={`fixed bottom-6 right-6 z-[9999] px-5 py-3 rounded-xl font-bold text-[13px] flex items-center gap-2 cursor-pointer transition-all shadow-[0_4px_25px_rgba(0,229,255,0.5)] border-2 ${
          debug
            ? "bg-[#071324] border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#071324]"
            : "bg-[#00E5FF] border-[#00E5FF] text-[#071324] hover:bg-white hover:border-white"
        }`}
      >
        {debug ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            TẮT INSPECTOR
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            BẬT KHUNG BỐ CỤC
          </>
        )}
      </button>
    </>
  );
}

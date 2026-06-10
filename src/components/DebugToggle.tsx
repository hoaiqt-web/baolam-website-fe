"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const EDITOR_ATTR = "data-layout-editor-ui";

interface StyleState {
  fontSize: string;
  color: string;
  backgroundColor: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginBottom: string;
  opacity: string;
  letterSpacing: string;
  lineHeight: string;
}

interface ElementInfo {
  tagName: string;
  width: number;
  height: number;
  className: string;
}

function parsePx(val: string): number {
  return Math.round(parseFloat(val) || 0);
}

function toHex(rgb: string): string {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return rgb.startsWith("#") ? rgb : "#ffffff";
  return (
    "#" +
    [match[1], match[2], match[3]]
      .map((n) => parseInt(n).toString(16).padStart(2, "0"))
      .join("")
  );
}

export default function DebugToggle() {
  const [debug, setDebug] = useState(false);
  const [info, setInfo] = useState<ElementInfo | null>(null);
  const [styles, setStyles] = useState<StyleState | null>(null);
  const [panelPos, setPanelPos] = useState({ x: 12, y: 72 });
  const [copied, setCopied] = useState(false);
  const [hoverTip, setHoverTip] = useState<{ x: number; y: number; w: number; h: number; tag: string } | null>(null);
  const selectedEl = useRef<HTMLElement | null>(null);
  const isDragging = useRef(false);
  const dragOff = useRef({ x: 0, y: 0 });

  // ── Toggle body class ──
  useEffect(() => {
    debug
      ? document.body.classList.add("debug-layout")
      : document.body.classList.remove("debug-layout");
    if (!debug) {
      setInfo(null);
      setStyles(null);
      selectedEl.current = null;
    }
    return () => document.body.classList.remove("debug-layout");
  }, [debug]);

  // ── Click to select ──
  useEffect(() => {
    if (!debug) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(`[${EDITOR_ATTR}]`)) return;
      e.preventDefault();
      e.stopPropagation();

      selectedEl.current = t;
      const cs = window.getComputedStyle(t);
      const rect = t.getBoundingClientRect();
      setInfo({
        tagName: t.tagName.toLowerCase(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        className: t.className || "",
      });
      setStyles({
        fontSize: parsePx(cs.fontSize) + "",
        color: toHex(cs.color),
        backgroundColor: toHex(cs.backgroundColor),
        paddingTop: parsePx(cs.paddingTop) + "",
        paddingRight: parsePx(cs.paddingRight) + "",
        paddingBottom: parsePx(cs.paddingBottom) + "",
        paddingLeft: parsePx(cs.paddingLeft) + "",
        marginTop: parsePx(cs.marginTop) + "",
        marginBottom: parsePx(cs.marginBottom) + "",
        opacity: Math.round(parseFloat(cs.opacity || "1") * 100) + "",
        letterSpacing: parsePx(cs.letterSpacing) + "",
        lineHeight: parsePx(cs.lineHeight) + "",
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [debug]);

  // ── Hover tooltip ──
  useEffect(() => {
    if (!debug) return;
    const onMove = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(`[${EDITOR_ATTR}]`)) { setHoverTip(null); return; }
      const r = t.getBoundingClientRect();
      setHoverTip({ x: e.clientX + 12, y: e.clientY + 12, w: Math.round(r.width), h: Math.round(r.height), tag: t.tagName.toLowerCase() });
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [debug]);

  // ── Apply style change live ──
  const applyStyle = useCallback((key: keyof StyleState, val: string) => {
    setStyles((prev) => prev ? { ...prev, [key]: val } : prev);
    const el = selectedEl.current;
    if (!el) return;
    const map: Record<keyof StyleState, string> = {
      fontSize: "font-size",
      color: "color",
      backgroundColor: "background-color",
      paddingTop: "padding-top",
      paddingRight: "padding-right",
      paddingBottom: "padding-bottom",
      paddingLeft: "padding-left",
      marginTop: "margin-top",
      marginBottom: "margin-bottom",
      opacity: "opacity",
      letterSpacing: "letter-spacing",
      lineHeight: "line-height",
    };
    const cssProp = map[key];
    const isColor = key === "color" || key === "backgroundColor";
    const isOpacity = key === "opacity";
    if (isColor) el.style.setProperty(cssProp, val);
    else if (isOpacity) el.style.setProperty(cssProp, (parseFloat(val) / 100) + "");
    else el.style.setProperty(cssProp, val + "px");
  }, []);

  // ── Copy summary ──
  const copyChanges = () => {
    if (!styles || !info) return;
    const lines = [
      `/* <${info.tagName}> — ${info.width}×${info.height}px */`,
      `font-size: ${styles.fontSize}px;`,
      `color: ${styles.color};`,
      `background-color: ${styles.backgroundColor};`,
      `padding: ${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px ${styles.paddingLeft}px;`,
      `margin: ${styles.marginTop}px 0 ${styles.marginBottom}px 0;`,
      `opacity: ${parseFloat(styles.opacity) / 100};`,
      `letter-spacing: ${styles.letterSpacing}px;`,
      `line-height: ${styles.lineHeight}px;`,
      `/* className: ${info.className} */`,
    ].join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Reset element styles ──
  const resetStyles = () => {
    const el = selectedEl.current;
    if (!el) return;
    el.removeAttribute("style");
    // re-read computed styles
    const cs = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    setInfo(i => i ? { ...i, width: Math.round(rect.width), height: Math.round(rect.height) } : i);
    setStyles({
      fontSize: parsePx(cs.fontSize) + "",
      color: toHex(cs.color),
      backgroundColor: toHex(cs.backgroundColor),
      paddingTop: parsePx(cs.paddingTop) + "",
      paddingRight: parsePx(cs.paddingRight) + "",
      paddingBottom: parsePx(cs.paddingBottom) + "",
      paddingLeft: parsePx(cs.paddingLeft) + "",
      marginTop: parsePx(cs.marginTop) + "",
      marginBottom: parsePx(cs.marginBottom) + "",
      opacity: Math.round(parseFloat(cs.opacity || "1") * 100) + "",
      letterSpacing: parsePx(cs.letterSpacing) + "",
      lineHeight: parsePx(cs.lineHeight) + "",
    });
  };

  // ── Panel drag ──
  const onPanelMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragOff.current = { x: e.clientX - panelPos.x, y: e.clientY - panelPos.y };
  };
  useEffect(() => {
    const mv = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setPanelPos({ x: Math.max(0, e.clientX - dragOff.current.x), y: Math.max(0, e.clientY - dragOff.current.y) });
    };
    const up = () => { isDragging.current = false; };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
  }, []);

  // ── Small reusable input ──
  const NumInput = ({ label, stateKey, unit = "px" }: { label: string; stateKey: keyof StyleState; unit?: string }) => (
    <div className="flex flex-col gap-0.5">
      <label className="text-[9px] text-[#A5B4C7]/60 uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-1 bg-[#030914] border border-white/10 rounded-lg px-2 py-1.5 focus-within:border-[#00E5FF]/50">
        <input
          type="number"
          value={styles?.[stateKey] ?? ""}
          onChange={(e) => applyStyle(stateKey, e.target.value)}
          className="w-full bg-transparent text-white text-[11px] font-mono outline-none"
        />
        <span className="text-[#A5B4C7]/40 text-[9px] shrink-0">{unit}</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Global debug CSS */}
      {debug && (
        <style dangerouslySetInnerHTML={{ __html: `
          body.debug-layout *:not([${EDITOR_ATTR}]):not([${EDITOR_ATTR}] *) { outline: 1px dashed rgba(255,0,0,0.18) !important; }
          body.debug-layout div:not([${EDITOR_ATTR}]):not([${EDITOR_ATTR}] *) { outline: 1px solid rgba(0,229,255,0.25) !important; }
          body.debug-layout img:not([${EDITOR_ATTR}] *) { outline: 2px solid rgba(255,220,0,0.6) !important; }
          body.debug-layout *:not([${EDITOR_ATTR}]):not([${EDITOR_ATTR}] *):hover { outline: 2px solid rgba(0,229,255,1) !important; cursor: crosshair !important; }
        `}} />
      )}

      {/* Hover tooltip */}
      {debug && hoverTip && !info && (
        <div data-layout-editor-ui style={{ position: "fixed", top: hoverTip.y, left: hoverTip.x, pointerEvents: "none", zIndex: 9995 }}
          className="bg-[#071324]/95 border border-[#00E5FF]/40 rounded-md px-2 py-1 text-[10px] font-mono text-[#00E5FF] whitespace-nowrap shadow-lg">
          &lt;{hoverTip.tag}&gt; {hoverTip.w} × {hoverTip.h}px
        </div>
      )}

      {/* Highlight selected element */}
      {debug && info && (
        <div data-layout-editor-ui
          style={{ position: "fixed", pointerEvents: "none", zIndex: 9985,
            ...(selectedEl.current ? (() => { const r = selectedEl.current!.getBoundingClientRect(); return { top: r.top, left: r.left, width: r.width, height: r.height }; })() : {}) }}
          className="outline outline-2 outline-[#00E5FF] shadow-[0_0_0_4px_rgba(0,229,255,0.15)]" />
      )}

      {/* ── INSPECTOR PANEL ── */}
      {debug && (
        <div data-layout-editor-ui
          style={{ left: panelPos.x, top: panelPos.y, position: "fixed" }}
          className="z-[9997] w-[280px] bg-[#060f1e] border border-[#00E5FF]/25 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">

          {/* Header */}
          <div onMouseDown={onPanelMouseDown}
            className="flex items-center justify-between px-4 py-3 border-b border-white/8 cursor-grab active:cursor-grabbing select-none bg-[#00E5FF]/8 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/><div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"/><div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"/></div>
              <span className="text-[#00E5FF] font-bold text-[11px] uppercase tracking-[2px]">Inspector</span>
            </div>
            {info && <span className="text-[#A5B4C7]/50 text-[10px] font-mono">&lt;{info.tagName}&gt; {info.width}×{info.height}px</span>}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-200px)] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#00E5FF]/20 [&::-webkit-scrollbar-track]:bg-transparent">
            {!info ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </div>
                <p className="text-white text-[12px] font-semibold mb-1">Click vào phần tử bất kỳ</p>
                <p className="text-[#A5B4C7]/50 text-[10px]">để chỉnh sửa trực tiếp</p>
              </div>
            ) : styles ? (
              <>
                {/* Typography */}
                <div>
                  <div className="text-[10px] text-[#00E5FF] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
                    Chữ
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <NumInput label="Cỡ chữ" stateKey="fontSize" />
                    <NumInput label="Line height" stateKey="lineHeight" />
                    <NumInput label="Letter spacing" stateKey="letterSpacing" />
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] text-[#A5B4C7]/60 uppercase tracking-wider">Màu chữ</label>
                      <div className="flex items-center gap-1.5 bg-[#030914] border border-white/10 rounded-lg px-2 py-1 focus-within:border-[#00E5FF]/50">
                        <input type="color" value={styles.color} onChange={e => applyStyle("color", e.target.value)}
                          className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0" />
                        <span className="text-[10px] font-mono text-white">{styles.color}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background */}
                <div>
                  <div className="text-[10px] text-[#00E5FF] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                    Nền &amp; Opacity
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] text-[#A5B4C7]/60 uppercase tracking-wider">Màu nền</label>
                      <div className="flex items-center gap-1.5 bg-[#030914] border border-white/10 rounded-lg px-2 py-1 focus-within:border-[#00E5FF]/50">
                        <input type="color" value={styles.backgroundColor} onChange={e => applyStyle("backgroundColor", e.target.value)}
                          className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0" />
                        <span className="text-[9px] font-mono text-white truncate">{styles.backgroundColor}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] text-[#A5B4C7]/60 uppercase tracking-wider">Opacity (%)</label>
                      <div className="flex flex-col gap-1">
                        <input type="range" min="0" max="100" value={styles.opacity} onChange={e => applyStyle("opacity", e.target.value)}
                          className="w-full h-1.5 accent-[#00E5FF] cursor-pointer" />
                        <span className="text-[10px] font-mono text-[#00E5FF] text-right">{styles.opacity}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Padding */}
                <div>
                  <div className="text-[10px] text-[#00E5FF] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="1"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
                    Padding (khoảng trong)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <NumInput label="Trên" stateKey="paddingTop" />
                    <NumInput label="Phải" stateKey="paddingRight" />
                    <NumInput label="Dưới" stateKey="paddingBottom" />
                    <NumInput label="Trái" stateKey="paddingLeft" />
                  </div>
                </div>

                {/* Margin */}
                <div>
                  <div className="text-[10px] text-[#00E5FF] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
                    Margin (khoảng ngoài)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <NumInput label="Trên" stateKey="marginTop" />
                    <NumInput label="Dưới" stateKey="marginBottom" />
                  </div>
                </div>

                {/* Class */}
                <div>
                  <div className="text-[10px] text-[#00E5FF] font-bold uppercase tracking-widest mb-2">ClassName (chỉ xem)</div>
                  <div className="bg-[#030914] border border-white/8 rounded-xl p-3 max-h-[80px] overflow-y-auto">
                    <p className="text-[#A5B4C7] text-[9px] font-mono break-all leading-relaxed">{info.className || "(không có class)"}</p>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {/* Footer actions */}
          {info && styles && (
            <div className="px-4 py-3 border-t border-white/8 flex gap-2 shrink-0">
              <button onClick={resetStyles}
                className="flex-1 py-2 text-[10px] font-bold rounded-lg border border-white/15 text-[#A5B4C7] hover:border-red-400/50 hover:text-red-400 transition-all">
                ↩ Reset
              </button>
              <button onClick={copyChanges}
                className="flex-1 py-2 text-[10px] font-bold rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all flex items-center justify-center gap-1">
                {copied ? (
                  <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>Đã copy!</>
                ) : (
                  <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy CSS</>
                )}
              </button>
              <button onClick={() => { setInfo(null); setStyles(null); selectedEl.current = null; }}
                className="flex-1 py-2 text-[10px] font-bold rounded-lg border border-white/15 text-[#A5B4C7] hover:border-white/30 transition-all">
                ✕ Bỏ chọn
              </button>
            </div>
          )}

          <div className="px-4 py-2 border-t border-white/5 shrink-0">
            <p className="text-[#A5B4C7]/30 text-[9px] text-center">☰ Kéo thanh tiêu đề để di chuyển panel</p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button data-layout-editor-ui onClick={() => setDebug(!debug)}
        className={`fixed bottom-6 right-6 z-[9999] px-5 py-3 rounded-xl font-bold text-[13px] flex items-center gap-2 cursor-pointer transition-all shadow-[0_4px_25px_rgba(0,229,255,0.4)] border-2 ${
          debug ? "bg-[#071324] border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#071324]"
                : "bg-[#00E5FF] border-[#00E5FF] text-[#071324] hover:bg-white hover:border-white"}`}>
        {debug ? (
          <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>TẮT INSPECTOR</>
        ) : (
          <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>BẬT KHUNG BỐ CỤC</>
        )}
      </button>
    </>
  );
}

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
  objectPositionX: string;
  objectPositionY: string;
  width: string;   // px - 0 = auto
  height: string;  // px - 0 = auto
}

interface ElementInfo {
  tagName: string;
  width: number;
  height: number;
  className: string;
}

interface SaveResult {
  success: boolean;
  filesChanged: string[];
  message: string;
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

// ── Convert style value → Tailwind arbitrary class ──
const TW_GENERATORS: Record<keyof StyleState, (v: string) => string> = {
  fontSize:        (v) => `text-[${v}px]`,
  color:           (v) => `text-[${v}]`,
  backgroundColor: (v) => (v === "transparent" ? "" : `bg-[${v}]`),
  paddingTop:      (v) => (v === "0" ? "" : `pt-[${v}px]`),
  paddingRight:    (v) => (v === "0" ? "" : `pr-[${v}px]`),
  paddingBottom:   (v) => (v === "0" ? "" : `pb-[${v}px]`),
  paddingLeft:     (v) => (v === "0" ? "" : `pl-[${v}px]`),
  marginTop:       (v) => (v === "0" ? "" : `mt-[${v}px]`),
  marginBottom:    (v) => (v === "0" ? "" : `mb-[${v}px]`),
  opacity:         (v) => (v === "100" ? "" : `opacity-[${(parseFloat(v) / 100).toFixed(2)}]`),
  letterSpacing:   (v) => `tracking-[${v}px]`,
  lineHeight:      (v) => (v === "0" ? "" : `leading-[${v}px]`),
  objectPositionX: (_v) => "",
  objectPositionY: (_v) => "",
  width:           (v) => (v === "0" ? "" : `w-[${v}px]`),
  height:          (v) => (v === "0" ? "" : `h-[${v}px]`),
};

// ── Patterns to remove old Tailwind classes before adding new ones ──
const TW_REMOVE_PATTERNS: Record<keyof StyleState, RegExp> = {
  fontSize:        /\btext-\[\d+px\]|\btext-xs\b|\btext-sm\b|\btext-base\b|\btext-lg\b|\btext-xl\b|\btext-2xl\b|\btext-3xl\b|\btext-4xl\b|\btext-5xl\b|\btext-6xl\b|\btext-7xl\b|\btext-8xl\b|\btext-9xl\b/g,
  color:           /\btext-\[#[a-fA-F0-9]+\]|\btext-white\b|\btext-black\b/g,
  backgroundColor: /\bbg-\[#[a-fA-F0-9]+\]|\bbg-white\b|\bbg-black\b|\bbg-transparent\b/g,
  paddingTop:      /\bpt-\[\d+px\]|\bpt-\d+\b/g,
  paddingRight:    /\bpr-\[\d+px\]|\bpr-\d+\b/g,
  paddingBottom:   /\bpb-\[\d+px\]|\bpb-\d+\b/g,
  paddingLeft:     /\bpl-\[\d+px\]|\bpl-\d+\b/g,
  marginTop:       /\bmt-\[\d+px\]|\bmt-\d+\b/g,
  marginBottom:    /\bmb-\[\d+px\]|\bmb-\d+\b/g,
  opacity:         /\bopacity-\d+\b|\bopacity-\[[^\]]+\]/g,
  letterSpacing:   /\btracking-\[\d+px\]|\btracking-tighter\b|\btracking-tight\b|\btracking-normal\b|\btracking-wide\b|\btracking-wider\b|\btracking-widest\b/g,
  lineHeight:      /\bleading-\[\d+px\]|\bleading-none\b|\bleading-tight\b|\bleading-snug\b|\bleading-normal\b|\bleading-relaxed\b|\bleading-loose\b/g,
  objectPositionX: /(?!)/g,
  objectPositionY: /(?!)/g,
  width:           /\bw-\[\d+px\]|\bw-\d+\b|\bw-full\b|\bw-auto\b/g,
  height:          /\bh-\[\d+px\]|\bh-\d+\b|\bh-full\b|\bh-auto\b/g,
};

function buildNewClassName(original: string, orig: StyleState, curr: StyleState): string {
  let cls = original;
  const changed = (Object.keys(orig) as (keyof StyleState)[]).filter(k => orig[k] !== curr[k]);
  for (const key of changed) {
    cls = cls.replace(TW_REMOVE_PATTERNS[key], "").replace(/\s+/g, " ").trim();
    const newClass = TW_GENERATORS[key](curr[key]);
    if (newClass) cls = cls + " " + newClass;
  }
  return cls.replace(/\s+/g, " ").trim();
}

export default function DebugToggle() {
  const [debug, setDebug] = useState(false);
  const [info, setInfo] = useState<ElementInfo | null>(null);
  const [styles, setStyles] = useState<StyleState | null>(null);
  const [originalStyles, setOriginalStyles] = useState<StyleState | null>(null);
  const [panelPos, setPanelPos] = useState({ x: 12, y: 72 });
  const [hoverTip, setHoverTip] = useState<{ x: number; y: number; w: number; h: number; tag: string } | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveResult, setSaveResult] = useState<SaveResult | null>(null);
  const [saving, setSaving] = useState(false);

  const selectedEl = useRef<HTMLElement | null>(null);
  const isDragging = useRef(false);
  const dragOff = useRef({ x: 0, y: 0 });
  const [tick, setTick] = useState(0); // force re-render of handles on resize

  // Drag-to-reposition state
  const elDragActive = useRef(false);
  const elDragStart = useRef({ x: 0, y: 0 });
  const elDragStartObjX = useRef(50);
  const elDragStartObjY = useRef(50);
  const elDragStartTransX = useRef(0);
  const elDragStartTransY = useRef(0);
  const elDragMoved = useRef(false);

  // Resize state
  const resizeState = useRef<{
    handle: 'left'|'right'|'top'|'bottom';
    startX: number; startY: number;
    startW: number; startH: number;
  } | null>(null);

  // ── Toggle body class ──
  useEffect(() => {
    debug ? document.body.classList.add("debug-layout") : document.body.classList.remove("debug-layout");
    if (!debug) { setInfo(null); setStyles(null); setOriginalStyles(null); selectedEl.current = null; }
    return () => document.body.classList.remove("debug-layout");
  }, [debug]);

  // ── Click to select ──
  useEffect(() => {
    if (!debug) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(`[${EDITOR_ATTR}]`)) return;
      e.preventDefault(); e.stopPropagation();
      selectedEl.current = t;
      const cs = window.getComputedStyle(t);
      const rect = t.getBoundingClientRect();
      const s: StyleState = {
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
        objectPositionX: t.tagName === "IMG" ? (cs.objectPosition?.split(" ")[0]?.replace("%","") || "50") : "50",
        objectPositionY: t.tagName === "IMG" ? (cs.objectPosition?.split(" ")[1]?.replace("%","") || "50") : "50",
        width: "0",
        height: "0",
      };
      setInfo({ tagName: t.tagName.toLowerCase(), width: Math.round(rect.width), height: Math.round(rect.height), className: t.className || "" });
      setStyles(s);
      setOriginalStyles(s);
      setSaveResult(null);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [debug]);

  // ── Element drag-to-reposition ──
  useEffect(() => {
    if (!debug) return;

    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(`[${EDITOR_ATTR}]`)) return;
      // Only drag the SELECTED element
      if (t !== selectedEl.current) return;
      e.preventDefault();
      elDragActive.current = true;
      elDragMoved.current = false;
      elDragStart.current = { x: e.clientX, y: e.clientY };
      if (t.tagName === "IMG") {
        const cs = window.getComputedStyle(t);
        const pos = (cs.objectPosition || "50% 50%").split(" ");
        elDragStartObjX.current = parseFloat(pos[0]) || 50;
        elDragStartObjY.current = parseFloat(pos[1]) || 50;
      } else {
        // Read current transform translate
        const cs = window.getComputedStyle(t);
        const mat = new DOMMatrix(cs.transform);
        elDragStartTransX.current = mat.m41 || 0;
        elDragStartTransY.current = mat.m42 || 0;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!elDragActive.current || !selectedEl.current) return;
      const dx = e.clientX - elDragStart.current.x;
      const dy = e.clientY - elDragStart.current.y;
      if (!elDragMoved.current && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      elDragMoved.current = true;
      setHoverTip(null);
      const el = selectedEl.current;
      if (el.tagName === "IMG") {
        const rect = el.getBoundingClientRect();
        // Sensitivity: moving mouse by rect.width pixels = 100% shift
        const sensX = rect.width > 0 ? 100 / rect.width : 0.15;
        const sensY = rect.height > 0 ? 100 / rect.height : 0.15;
        const newX = Math.max(0, Math.min(100, elDragStartObjX.current - dx * sensX));
        const newY = Math.max(0, Math.min(100, elDragStartObjY.current - dy * sensY));
        el.style.objectPosition = `${newX.toFixed(1)}% ${newY.toFixed(1)}%`;
        setStyles(prev => prev ? { ...prev,
          objectPositionX: String(Math.round(newX)),
          objectPositionY: String(Math.round(newY)),
        } : prev);
      } else {
        const newX = elDragStartTransX.current + dx;
        const newY = elDragStartTransY.current + dy;
        el.style.transform = `translate(${newX.toFixed(0)}px, ${newY.toFixed(0)}px)`;
        setStyles(prev => prev ? { ...prev,
          marginTop: String(Math.round(newY > 0 ? newY : 0)),
          marginBottom: String(Math.round(newY < 0 ? -newY : 0)),
        } : prev);
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!elDragActive.current) return;
      elDragActive.current = false;
      // If mouse barely moved → it's a click, let click handler re-select
      if (!elDragMoved.current) return;
      e.stopPropagation();
    };

    document.addEventListener("mousedown", onMouseDown, true);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, true);
    return () => {
      document.removeEventListener("mousedown", onMouseDown, true);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp, true);
    };
  }, [debug]);

  // ── Resize handler ──
  const startResize = useCallback((e: React.MouseEvent, handle: 'left'|'right'|'top'|'bottom') => {
    e.stopPropagation();
    e.preventDefault();
    const el = selectedEl.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    resizeState.current = { handle, startX: e.clientX, startY: e.clientY, startW: rect.width, startH: rect.height };
  }, []);

  useEffect(() => {
    if (!debug) return;
    const onMove = (e: MouseEvent) => {
      if (!resizeState.current || !selectedEl.current) return;
      const el = selectedEl.current;
      const { handle, startX, startY, startW, startH } = resizeState.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let newW = startW, newH = startH;
      if (handle === 'right')  newW = Math.max(40, startW + dx);
      if (handle === 'left')   newW = Math.max(40, startW - dx);
      if (handle === 'bottom') newH = Math.max(20, startH + dy);
      if (handle === 'top')    newH = Math.max(20, startH - dy);
      el.style.width  = `${Math.round(newW)}px`;
      el.style.height = `${Math.round(newH)}px`;
      setStyles(prev => prev ? { ...prev, width: String(Math.round(newW)), height: String(Math.round(newH)) } : prev);
      setTick(t => t + 1);
    };
    const onUp = () => { if (resizeState.current) { resizeState.current = null; } };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
  }, [debug]);

  // ── Dynamic cursor for selected element ──
  useEffect(() => {
    const el = selectedEl.current;
    if (!el || !debug) return;
    el.style.cursor = "grab";
    const onMD = () => { el.style.cursor = "grabbing"; };
    const onMU = () => { el.style.cursor = "grab"; };
    el.addEventListener("mousedown", onMD);
    el.addEventListener("mouseup", onMU);
    return () => {
      el.style.removeProperty("cursor");
      el.removeEventListener("mousedown", onMD);
      el.removeEventListener("mouseup", onMU);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, debug]);

  // ── Hover tooltip ──
  useEffect(() => {
    if (!debug) return;
    const onMove = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(`[${EDITOR_ATTR}]`)) { setHoverTip(null); return; }
      const r = t.getBoundingClientRect();
      setHoverTip({ x: e.clientX + 14, y: e.clientY + 14, w: Math.round(r.width), h: Math.round(r.height), tag: t.tagName.toLowerCase() });
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [debug]);

  // ── Apply style change live ──
  const applyStyle = useCallback((key: keyof StyleState, val: string) => {
    setStyles(prev => prev ? { ...prev, [key]: val } : prev);
    const el = selectedEl.current;
    if (!el) return;
    const cssPropMap: Record<keyof StyleState, string> = {
      fontSize: "font-size", color: "color", backgroundColor: "background-color",
      paddingTop: "padding-top", paddingRight: "padding-right", paddingBottom: "padding-bottom", paddingLeft: "padding-left",
      marginTop: "margin-top", marginBottom: "margin-bottom",
      opacity: "opacity", letterSpacing: "letter-spacing", lineHeight: "line-height",
      objectPositionX: "object-position", objectPositionY: "object-position",
    };
    const cssProp = cssPropMap[key];
    if (key === "color" || key === "backgroundColor") el.style.setProperty(cssProp, val);
    else if (key === "opacity") el.style.setProperty(cssProp, (parseFloat(val) / 100) + "");
    else if (key === "objectPositionX") {
      const y = (selectedEl.current ? window.getComputedStyle(selectedEl.current).objectPosition?.split(" ")[1] : "50%") || "50%";
      el.style.setProperty("object-position", `${val}% ${y}`);
    } else if (key === "objectPositionY") {
      const x = (selectedEl.current ? window.getComputedStyle(selectedEl.current).objectPosition?.split(" ")[0] : "50%") || "50%";
      el.style.setProperty("object-position", `${x} ${val}%`);
    }
    else el.style.setProperty(cssProp, val + "px");
  }, []);

  // ── Reset ──
  const resetStyles = () => {
    const el = selectedEl.current;
    if (!el || !originalStyles) return;
    el.removeAttribute("style");
    setStyles(originalStyles);
    setSaveResult(null);
  };

  // ── Save to code ──
  const handleSave = async () => {
    if (!info || !styles || !originalStyles) return;
    const newClassName = buildNewClassName(info.className, originalStyles, styles);
    if (newClassName === info.className) {
      setSaveResult({ success: false, filesChanged: [], message: "Chưa có thay đổi nào để lưu" });
      setShowSaveModal(true);
      return;
    }
    setShowSaveModal(true);
    setSaving(true);
    setSaveResult(null);
    try {
      const res = await fetch("/api/inspector/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldClassName: info.className, newClassName }),
      });
      const data = await res.json();
      setSaveResult(data);
      if (data.success && data.filesChanged?.length > 0) {
        // Update local info to reflect new class
        setInfo(prev => prev ? { ...prev, className: newClassName } : prev);
        setOriginalStyles(styles);
      }
    } catch {
      setSaveResult({ success: false, filesChanged: [], message: "Lỗi kết nối đến server" });
    } finally {
      setSaving(false);
    }
  };

  // ── Panel drag ──
  const onPanelMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragOff.current = { x: e.clientX - panelPos.x, y: e.clientY - panelPos.y };
  };
  useEffect(() => {
    const mv = (e: MouseEvent) => { if (isDragging.current) setPanelPos({ x: Math.max(0, e.clientX - dragOff.current.x), y: Math.max(0, e.clientY - dragOff.current.y) }); };
    const up = () => { isDragging.current = false; };
    window.addEventListener("mousemove", mv); window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
  }, []);

  const hasChanges = styles && originalStyles && JSON.stringify(styles) !== JSON.stringify(originalStyles);
  const newClassName = info && styles && originalStyles ? buildNewClassName(info.className, originalStyles, styles) : "";

  // ── Reusable number input ──
  const NumInput = ({ label, stateKey }: { label: string; stateKey: keyof StyleState }) => (
    <div className="flex flex-col gap-0.5">
      <label className="text-[9px] text-[#A5B4C7]/60 uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-1 bg-[#030914] border border-white/10 rounded-lg px-2 py-1.5 focus-within:border-[#00E5FF]/50">
        <input type="number" value={styles?.[stateKey] ?? ""}
          onChange={e => applyStyle(stateKey, e.target.value)}
          className="w-full bg-transparent text-white text-[11px] font-mono outline-none" />
        <span className="text-[#A5B4C7]/40 text-[9px] shrink-0">px</span>
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
        <div data-layout-editor-ui
          style={{ position: "fixed", top: hoverTip.y, left: hoverTip.x, pointerEvents: "none", zIndex: 9995 }}
          className="bg-[#071324]/95 border border-[#00E5FF]/40 rounded-md px-2 py-1 text-[10px] font-mono text-[#00E5FF] whitespace-nowrap shadow-lg">
          &lt;{hoverTip.tag}&gt; {hoverTip.w} × {hoverTip.h}px
        </div>
      )}

      {/* Resize handles + selection highlight */}
      {debug && info && selectedEl.current && (() => {
        const r = selectedEl.current.getBoundingClientRect();
        void tick; // consume tick to re-render on resize
        const H = 10; // handle size px
        const hStyle = (cursor: string, style: React.CSSProperties): React.CSSProperties => ({
          position: 'absolute', width: H, height: H,
          background: '#00E5FF', border: '2px solid white',
          borderRadius: 2, cursor, pointerEvents: 'all',
          zIndex: 9990, ...style,
        });
        const edgeH: React.CSSProperties = { width: 10, height: 28 };
        const edgeV: React.CSSProperties = { width: 28, height: 10 };
        return (
          <div data-layout-editor-ui
            style={{ position: 'fixed', top: r.top, left: r.left, width: r.width, height: r.height, pointerEvents: 'none', zIndex: 9986 }}
            className="outline outline-2 outline-[#00E5FF] shadow-[0_0_0_4px_rgba(0,229,255,0.12)]"
          >
            {/* Right edge */}
            <div data-layout-editor-ui style={hStyle('ew-resize', { ...edgeH, right: -5, top: '50%', transform: 'translateY(-50%)' })} onMouseDown={e => startResize(e, 'right')} />
            {/* Left edge */}
            <div data-layout-editor-ui style={hStyle('ew-resize', { ...edgeH, left: -5, top: '50%', transform: 'translateY(-50%)' })} onMouseDown={e => startResize(e, 'left')} />
            {/* Bottom edge */}
            <div data-layout-editor-ui style={hStyle('ns-resize', { ...edgeV, bottom: -5, left: '50%', transform: 'translateX(-50%)' })} onMouseDown={e => startResize(e, 'bottom')} />
            {/* Top edge */}
            <div data-layout-editor-ui style={hStyle('ns-resize', { ...edgeV, top: -5, left: '50%', transform: 'translateX(-50%)' })} onMouseDown={e => startResize(e, 'top')} />
            {/* Corners */}
            <div data-layout-editor-ui style={hStyle('nwse-resize', { top: -5, left: -5 })} onMouseDown={e => { startResize(e, 'top'); startResize(e, 'left'); }} />
            <div data-layout-editor-ui style={hStyle('nesw-resize', { top: -5, right: -5 })} onMouseDown={e => { startResize(e, 'top'); startResize(e, 'right'); }} />
            <div data-layout-editor-ui style={hStyle('nesw-resize', { bottom: -5, left: -5 })} onMouseDown={e => { startResize(e, 'bottom'); startResize(e, 'left'); }} />
            <div data-layout-editor-ui style={hStyle('nwse-resize', { bottom: -5, right: -5 })} onMouseDown={e => { startResize(e, 'bottom'); startResize(e, 'right'); }} />
            {/* Size label */}
            <div data-layout-editor-ui style={{ position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', background: 'rgba(0,229,255,0.9)', color: '#071324', fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4, whiteSpace: 'nowrap' }}>
              {Math.round(r.width)} × {Math.round(r.height)} px
            </div>
          </div>
        );
      })()}

      {/* ── INSPECTOR PANEL ── */}
      {debug && (
        <div data-layout-editor-ui
          style={{ left: panelPos.x, top: panelPos.y, position: "fixed" }}
          className="z-[9997] w-[285px] bg-[#060f1e] border border-[#00E5FF]/25 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">

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
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-220px)] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#00E5FF]/20">
            {!info ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </div>
                <p className="text-white text-[12px] font-semibold mb-1">Click vào phần tử bất kỳ</p>
                <p className="text-[#A5B4C7]/50 text-[10px]">Chỉnh xong → Lưu vào code</p>
              </div>
            ) : styles ? (
              <>
                {/* ── PHÍM TẮT NHANH ── */}
                <div className="space-y-1.5">
                  {/* Nút chọn ảnh nền: tìm trong chính nó VÀ trong parent */}
                  {info.tagName !== "img" && (() => {
                    // Tìm img trong con, hoặc trong anh/chị em của phần tử cha
                    const findNearestImg = (el: HTMLElement | null): HTMLElement | null => {
                      if (!el) return null;
                      // 1. Tìm trong các con trực tiếp
                      const child = el.querySelector("img");
                      if (child) return child as HTMLElement;
                      // 2. Tìm trong anh chị em của phần tử cha
                      const parent = el.parentElement;
                      if (!parent) return null;
                      const siblingImg = parent.querySelector("img");
                      if (siblingImg && siblingImg !== el) return siblingImg as HTMLElement;
                      // 3. Thử ông nội
                      const grand = parent.parentElement;
                      if (grand) {
                        const grandImg = grand.querySelector("img");
                        if (grandImg) return grandImg as HTMLElement;
                      }
                      return null;
                    };
                    const nearImg = findNearestImg(selectedEl.current);
                    if (!nearImg) return null;
                    return (
                      <button
                        onClick={() => {
                          const img = nearImg;
                          selectedEl.current = img;
                          const cs = window.getComputedStyle(img);
                          const rect = img.getBoundingClientRect();
                          const pos = (cs.objectPosition || "50% 50%").split(" ");
                          setInfo({ tagName: "img", width: Math.round(rect.width), height: Math.round(rect.height), className: img.className || "" });
                          const s = {
                            fontSize: String(Math.round(parseFloat(cs.fontSize)||0)),
                            color: toHex(cs.color), backgroundColor: toHex(cs.backgroundColor),
                            paddingTop: "0", paddingRight: "0", paddingBottom: "0", paddingLeft: "0",
                            marginTop: "0", marginBottom: "0",
                            opacity: "100", letterSpacing: "0", lineHeight: "0",
                            objectPositionX: pos[0]?.replace("%","") || "50",
                            objectPositionY: pos[1]?.replace("%","") || "50",
                          };
                          setStyles(s); setOriginalStyles(s); setSaveResult(null);
                        }}
                        className="w-full py-2.5 text-[11px] font-bold rounded-xl bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 hover:bg-yellow-400/25 transition-all flex items-center justify-center gap-2"
                      >
                        🖼 Chọn ảnh nền gần nhất → chỉnh vị trí
                      </button>
                    );
                  })()}

                  {/* Nút lên phần tử cha */}
                  {selectedEl.current?.parentElement && !selectedEl.current.parentElement.closest(`[${EDITOR_ATTR}]`) && (
                    <button
                      onClick={() => {
                        const parent = selectedEl.current?.parentElement as HTMLElement;
                        if (!parent || parent.closest(`[${EDITOR_ATTR}]`)) return;
                        selectedEl.current = parent;
                        const cs = window.getComputedStyle(parent);
                        const rect = parent.getBoundingClientRect();
                        const s = {
                          fontSize: String(Math.round(parseFloat(cs.fontSize)||0)),
                          color: toHex(cs.color), backgroundColor: toHex(cs.backgroundColor),
                          paddingTop: String(Math.round(parseFloat(cs.paddingTop)||0)),
                          paddingRight: String(Math.round(parseFloat(cs.paddingRight)||0)),
                          paddingBottom: String(Math.round(parseFloat(cs.paddingBottom)||0)),
                          paddingLeft: String(Math.round(parseFloat(cs.paddingLeft)||0)),
                          marginTop: String(Math.round(parseFloat(cs.marginTop)||0)),
                          marginBottom: String(Math.round(parseFloat(cs.marginBottom)||0)),
                          opacity: String(Math.round(parseFloat(cs.opacity||"1")*100)),
                          letterSpacing: String(Math.round(parseFloat(cs.letterSpacing)||0)),
                          lineHeight: String(Math.round(parseFloat(cs.lineHeight)||0)),
                          objectPositionX: "50", objectPositionY: "50",
                        };
                        setInfo({ tagName: parent.tagName.toLowerCase(), width: Math.round(rect.width), height: Math.round(rect.height), className: parent.className || "" });
                        setStyles(s); setOriginalStyles(s); setSaveResult(null);
                      }}
                      className="w-full py-1.5 text-[9px] font-bold rounded-lg border border-white/10 text-[#A5B4C7]/50 hover:text-white hover:border-white/30 transition-all"
                    >
                      ↑ Lên phần tử cha ({selectedEl.current?.parentElement?.tagName?.toLowerCase()})
                    </button>
                  )}
                </div>

                {/* Typography */}
                <Section label="Chữ" icon="T">
                  <div className="grid grid-cols-2 gap-2">
                    <NumInput label="Cỡ chữ" stateKey="fontSize" />
                    <NumInput label="Line height" stateKey="lineHeight" />
                    <NumInput label="Letter spacing" stateKey="letterSpacing" />
                    <ColorInput label="Màu chữ" stateKey="color" styles={styles} applyStyle={applyStyle} />
                  </div>
                </Section>

                {/* Background */}
                <Section label="Nền & Opacity" icon="□">
                  <div className="grid grid-cols-2 gap-2">
                    <ColorInput label="Màu nền" stateKey="backgroundColor" styles={styles} applyStyle={applyStyle} />
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] text-[#A5B4C7]/60 uppercase tracking-wider">Opacity</label>
                      <input type="range" min="0" max="100" value={styles.opacity}
                        onChange={e => applyStyle("opacity", e.target.value)}
                        className="w-full accent-[#00E5FF] mt-2 cursor-pointer" />
                      <span className="text-[10px] font-mono text-[#00E5FF] text-right">{styles.opacity}%</span>
                    </div>
                  </div>
                </Section>

                {/* Padding */}
                <Section label="Padding (khoảng trong)" icon="▣">
                  <div className="grid grid-cols-2 gap-2">
                    <NumInput label="Trên" stateKey="paddingTop" />
                    <NumInput label="Phải" stateKey="paddingRight" />
                    <NumInput label="Dưới" stateKey="paddingBottom" />
                    <NumInput label="Trái" stateKey="paddingLeft" />
                  </div>
                </Section>

                {/* Margin */}
                <Section label="Margin (khoảng ngoài)" icon="⊞">
                  <div className="grid grid-cols-2 gap-2">
                    <NumInput label="Trên" stateKey="marginTop" />
                    <NumInput label="Dưới" stateKey="marginBottom" />
                  </div>
                </Section>

                {/* Image Position — only for <img> */}
                {info.tagName === "img" && (
                  <Section label="Vị trí ảnh (object-position)" icon="🖼">
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                          <label className="text-[9px] text-[#A5B4C7]/60 uppercase tracking-wider">← Trái / Phải →</label>
                          <span className="text-[10px] font-mono text-[#00E5FF]">{styles.objectPositionX}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={styles.objectPositionX}
                          onChange={e => applyStyle("objectPositionX", e.target.value)}
                          className="w-full accent-[#00E5FF] cursor-pointer" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                          <label className="text-[9px] text-[#A5B4C7]/60 uppercase tracking-wider">↑ Trên / Dưới ↓</label>
                          <span className="text-[10px] font-mono text-[#00E5FF]">{styles.objectPositionY}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={styles.objectPositionY}
                          onChange={e => applyStyle("objectPositionY", e.target.value)}
                          className="w-full accent-[#00E5FF] cursor-pointer" />
                      </div>
                      <p className="text-[9px] text-[#A5B4C7]/40">Kéo thanh để dịch chuyển ảnh nền</p>
                    </div>
                  </Section>
                )}

                {/* ClassName preview */}
                <Section label="ClassName gốc" icon="<>">
                  <div className="bg-[#030914] border border-white/8 rounded-xl p-3 max-h-[70px] overflow-y-auto">
                    <p className="text-[#A5B4C7]/60 text-[9px] font-mono break-all leading-relaxed">{info.className || "(không có)"}</p>
                  </div>
                </Section>

                {/* New className preview (if changed) */}
                {hasChanges && (
                  <Section label="ClassName sau khi lưu" icon="✓">
                    <div className="bg-green-950/40 border border-green-500/30 rounded-xl p-3 max-h-[70px] overflow-y-auto">
                      <p className="text-green-400 text-[9px] font-mono break-all leading-relaxed">{newClassName}</p>
                    </div>
                  </Section>
                )}
              </>
            ) : null}
          </div>

          {/* Footer actions */}
          {info && styles && (
            <div className="px-3 py-3 border-t border-white/8 flex gap-2 shrink-0">
              <button onClick={resetStyles}
                className="py-2 px-3 text-[10px] font-bold rounded-lg border border-white/15 text-[#A5B4C7] hover:border-red-400/50 hover:text-red-400 transition-all">
                ↩ Reset
              </button>
              <button onClick={handleSave} disabled={!hasChanges}
                className={`flex-1 py-2 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  hasChanges
                    ? "bg-[#00E5FF] text-[#071324] hover:bg-[#2EF2FF] shadow-[0_4px_15px_rgba(0,229,255,0.4)]"
                    : "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Lưu vào Code
              </button>
              <button onClick={() => { setInfo(null); setStyles(null); setOriginalStyles(null); selectedEl.current = null; setSaveResult(null); }}
                className="py-2 px-3 text-[10px] font-bold rounded-lg border border-white/15 text-[#A5B4C7] hover:border-white/30 transition-all">
                ✕
              </button>
            </div>
          )}

          <div className="px-4 py-2 border-t border-white/5 shrink-0">
            <p className="text-[#A5B4C7]/30 text-[9px] text-center">☰ Kéo thanh tiêu đề để di chuyển panel</p>
          </div>
        </div>
      )}

      {/* ── SAVE RESULT MODAL ── */}
      {showSaveModal && (
        <div data-layout-editor-ui className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSaveModal(false)} />
          <div className="relative z-10 bg-[#060f1e] border border-[#00E5FF]/25 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.9)] w-full max-w-[420px] p-6">
            {saving ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-[#00E5FF]/30 border-t-[#00E5FF] animate-spin" />
                <p className="text-white font-semibold">Đang lưu vào code...</p>
              </div>
            ) : saveResult ? (
              <>
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${saveResult.success && saveResult.filesChanged?.length > 0 ? "bg-green-500/20" : "bg-yellow-500/20"}`}>
                  {saveResult.success && saveResult.filesChanged?.length > 0 ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  )}
                </div>
                <p className="text-white text-center font-bold mb-2">{saveResult.message}</p>
                {saveResult.filesChanged?.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-[#A5B4C7]/60 text-[10px] uppercase tracking-wider mb-2">Files đã cập nhật:</p>
                    {saveResult.filesChanged.map(f => (
                      <div key={f} className="flex items-center gap-2 bg-green-950/30 border border-green-500/20 rounded-lg px-3 py-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                        <span className="text-green-400 text-[11px] font-mono">{f}</span>
                      </div>
                    ))}
                    <p className="text-[#A5B4C7]/50 text-[10px] text-center mt-3">↻ Tải lại trang để thấy thay đổi trong code</p>
                  </div>
                )}
                <button onClick={() => setShowSaveModal(false)}
                  className="w-full mt-5 py-3 bg-[#00E5FF] text-[#071324] font-bold rounded-xl hover:bg-[#2EF2FF] transition-colors">
                  Đóng
                </button>
              </>
            ) : null}
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

// ── Helper components ──
function Section({ label, icon, children }: { label: string; icon: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] text-[#00E5FF] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <span className="text-[11px]">{icon}</span> {label}
      </div>
      {children}
    </div>
  );
}

function ColorInput({ label, stateKey, styles, applyStyle }: {
  label: string; stateKey: keyof StyleState;
  styles: StyleState; applyStyle: (k: keyof StyleState, v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-[9px] text-[#A5B4C7]/60 uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-1.5 bg-[#030914] border border-white/10 rounded-lg px-2 py-1 focus-within:border-[#00E5FF]/50">
        <input type="color" value={styles[stateKey]} onChange={e => applyStyle(stateKey, e.target.value)}
          className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0 shrink-0" />
        <span className="text-[9px] font-mono text-white truncate">{styles[stateKey]}</span>
      </div>
    </div>
  );
}

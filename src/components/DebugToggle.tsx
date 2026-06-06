"use client";

import { useState, useEffect } from "react";

export default function DebugToggle() {
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    if (debug) {
      document.body.classList.add("debug-layout");
    } else {
      document.body.classList.remove("debug-layout");
    }
    // Cleanup
    return () => document.body.classList.remove("debug-layout");
  }, [debug]);

  return (
    <>
      {debug && (
        <style dangerouslySetInnerHTML={{ __html: `
          /* Viền đứt cho mọi phần tử */
          .debug-layout * {
            outline: 1px dashed rgba(255, 0, 0, 0.3) !important;
          }
          /* Viền xanh lơ đặc cho các khối div (container) */
          .debug-layout div {
            outline: 1px solid rgba(0, 229, 255, 0.4) !important;
          }
          /* Viền vàng rực cho hình ảnh */
          .debug-layout img {
            outline: 2px solid rgba(255, 255, 0, 0.8) !important;
          }
          /* Viền xanh lá cho văn bản */
          .debug-layout p, .debug-layout span, .debug-layout h1, .debug-layout h2, .debug-layout h3, .debug-layout h4 {
            outline: 1px solid rgba(0, 255, 0, 0.5) !important;
          }
          
          /* Thêm nhãn nhỏ hiển thị kích thước (tùy chọn nâng cao) */
          .debug-layout div:hover::after {
            content: attr(class);
            position: absolute;
            background: rgba(0,0,0,0.8);
            color: #00E5FF;
            font-size: 10px;
            padding: 2px 4px;
            z-index: 10000;
            top: 0;
            left: 0;
            pointer-events: none;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        `}} />
      )}
      <button 
        onClick={() => setDebug(!debug)}
        className="fixed bottom-6 right-6 z-[9999] bg-[#00E5FF] text-[#071324] px-5 py-3 rounded-md font-bold text-[14px] shadow-[0_4px_25px_rgba(0,229,255,0.6)] hover:bg-white transition-colors border-2 border-[#00E5FF] flex items-center gap-2 cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        {debug ? "TẮT KHUNG XƯƠNG" : "BẬT KHUNG BỐ CỤC"}
      </button>
    </>
  );
}

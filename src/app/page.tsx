import { HERO_DATA } from "@/data/hero";
import { LANDMARK_PROJECTS } from "@/data/projects";
import { ARTWORK_PROJECTS } from '@/data/artworks';
import DebugToggle from '@/components/DebugToggle';

export default function Home() {
  const allProjects = [...LANDMARK_PROJECTS, ...ARTWORK_PROJECTS].slice(0, 4);

  return (
    <main className="min-h-screen lg:h-screen w-full bg-[#030914] flex flex-col font-sans overflow-y-auto overflow-x-hidden lg:overflow-hidden">
      
      <DebugToggle />
      
      {/* ---------------- KHỐI TRÊN: HERO & THỐNG KÊ (78%) ---------------- */}
      <div className="relative min-h-[90vh] lg:min-h-0 lg:h-[78%] w-full shrink-0 bg-[#030914] overflow-hidden flex flex-col justify-center">
        
        {/* Lớp nền Blur lấp đầy các khoảng trống khi thu nhỏ ảnh chính */}
        <img 
          src="/hero/c0d0a44c-ab54-4601-9b6e-ac81907b850c.png" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110"
        />
        
        {/* Background Image - HẠ XUỐNG VÀ XÓA VIỀN BẰNG MASK TRỘN VÀO NỀN BLUR */}
        <div className="absolute inset-0 z-0 flex items-center justify-center scale-[0.85] translate-y-[90px]">
          <img 
            src="/hero/c0d0a44c-ab54-4601-9b6e-ac81907b850c.png" 
            alt="Baolam Hero - Cổng Thời Gian" 
            className="w-full h-full object-cover object-top"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at center, black 60%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 90% 90% at center, black 60%, transparent 100%)'
            }}
          />
        </div>
        
        {/* Lớp phủ Overlay Gradient */}
        <div 
          className="absolute inset-0 z-10" 
          style={{ 
            background: 'linear-gradient(to right, rgba(3,9,20,0.8) 0%, rgba(3,9,20,0.4) 40%, rgba(3,9,20,0.1) 100%)' 
          }} 
        />
        
        {/* Gradient nối mượt xuống khối dưới */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030914] via-[#030914]/80 to-transparent z-10" />

        {/* Content Container - FULL WIDTH CỰC ĐẠI */}
        <div className="relative z-20 h-full w-full mx-auto px-5 sm:px-6 xl:px-8 flex flex-col lg:flex-row justify-center lg:justify-between items-start lg:items-center pt-[90px] sm:pt-[88px] lg:pt-[60px]">
          
          {/* Trái: Nội dung Text */}
          <div className="w-full lg:w-[45%] max-w-[600px] mb-8 mt-6 sm:mt-8 lg:mt-0">
            <span className="text-[#A5B4C7] font-medium tracking-[1px] text-[9px] sm:text-[10px] uppercase mb-3 block drop-shadow-md leading-relaxed">
              NHÀ THẦU ARTWORK & KIẾN TRÚC ĐIỂM NHẤN CẢNH QUAN HÀNG ĐẦU VIỆT NAM
            </span>
            
            <h1 className="text-[clamp(28px,8vw,48px)] sm:text-[clamp(32px,6vw,48px)] lg:text-[48px] font-black mb-4 leading-[1.1] tracking-tight">
              <span className="text-white block">SÁNG TẠO</span>
              <span className="text-[#00E5FF] block drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">GIÁ TRỊ ĐÍCH THỰC</span>
            </h1>
            
            <p className="text-[#A5B4C7] text-[13px] sm:text-[14px] mb-6 sm:mb-8 leading-[1.6] max-w-[480px]">
              Từ ý tưởng đến biểu tượng. Bảo Lâm kiến tạo những công trình nghệ thuật có giá trị bền vững, nâng tầm không gian và tạo dấu ấn cho mọi công trình trên khắp Việt Nam.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto">
              <a href="#landmarks" className="w-full sm:w-auto px-6 py-3 bg-[#00E5FF] text-[#071522] font-bold rounded hover:bg-[#2EF2FF] transition-colors text-[11px] flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,229,255,0.3)] whitespace-nowrap">
                KHÁM PHÁ DỰ ÁN &rarr;
              </a>
              <a href="#capabilities" className="w-full sm:w-auto px-6 py-3 bg-transparent border border-white/20 text-white font-bold rounded hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all text-[11px] flex items-center justify-center gap-2 whitespace-nowrap">
                NĂNG LỰC CỦA CHÚNG TÔI &rarr;
              </a>
            </div>
          </div>

          {/* Phải: Thống kê Panel */}
          <div className="w-[240px] hidden lg:block shrink-0 mb-8">
            <div className="rounded-xl backdrop-blur-md border border-white/10 bg-[#071324]/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden p-6 space-y-5">
              
              {/* Stat 1 */}
              <div className="flex items-start gap-3">
                <div style={{ color: '#00E5FF' }} className="shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10"></path><path d="M17 4v8a5 5 0 0 1-10 0V4"></path><path d="M7 5H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h3"></path><path d="M17 5h3a2 2 0 0 1 2 2v1a2 2 0 0 1 2 2h-3"></path></svg>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold mb-0.5 leading-none text-white">15+</h3>
                  <p className="text-white text-[9px] font-bold tracking-widest mb-1 uppercase">NĂM KINH NGHIỆM</p>
                  <p className="text-[9px] text-[#A5B4C7]">Thiết kế & Thi công</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-start gap-3">
                <div style={{ color: '#00E5FF' }} className="shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold mb-0.5 leading-none text-white">500+</h3>
                  <p className="text-white text-[9px] font-bold tracking-widest mb-1 uppercase">CÔNG TRÌNH</p>
                  <p className="text-[9px] text-[#A5B4C7]">Trên toàn quốc</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-start gap-3">
                <div style={{ color: '#00E5FF' }} className="shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold mb-0.5 leading-none text-white">100+</h3>
                  <p className="text-white text-[9px] font-bold tracking-widest mb-1 uppercase">KỸ SƯ & NHÂN SỰ</p>
                  <p className="text-[9px] text-[#A5B4C7]">Tận tâm & sáng tạo</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-start gap-3">
                <div style={{ color: '#00E5FF' }} className="shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M17 18h1"></path><path d="M13 18h1"></path><path d="M9 18h1"></path></svg>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold mb-0.5 leading-none text-[#00E5FF]">20.000+</h3>
                  <p className="text-white text-[9px] font-bold tracking-widest mb-1 uppercase">M² NHÀ MÁY</p>
                  <p className="text-[9px] text-[#A5B4C7]">Sản xuất hiện đại</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ---------------- KHỐI DƯỚI: TÍNH NĂNG & DỰ ÁN ---------------- */}
      <div className="flex-1 w-full bg-[#030914] relative z-20 flex items-center justify-center pt-10 lg:pt-2 pb-12 lg:pb-6">
        
        {/* NỘI DUNG TRẢI ĐỀU 100% CHIỀU RỘNG CỰC ĐẠI */}
        <div className="w-full h-full mx-auto px-6 xl:px-8 flex flex-col justify-end">
          
          {/* FEATURES BAR */}
          <div className="w-full grid grid-cols-2 gap-y-6 gap-x-2 lg:flex lg:items-center lg:justify-between shrink-0 mb-8 lg:mb-4 px-2">
            
            <div className="flex items-center gap-2.5">
              <div className="text-[#00E5FF]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-[10px] mb-0.5 uppercase tracking-wider">THIẾT KẾ SÁNG TẠO</h4>
                <p className="text-[9px] text-[#A5B4C7]">Ý tưởng độc bản, khác biệt</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <div className="text-[#00E5FF]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-[10px] mb-0.5 uppercase tracking-wider">SẢN XUẤT HIỆN ĐẠI</h4>
                <p className="text-[9px] text-[#A5B4C7]">Công nghệ tiên tiến, chất lượng</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <div className="text-[#00E5FF]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"></path><path d="M3 12h18"></path><path d="M3 21h18"></path><path d="M16 3l-4 4-4-4"></path><path d="M3 7l9 5 9-5"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-[10px] mb-0.5 uppercase tracking-wider">THI CÔNG CHUYÊN NGHIỆP</h4>
                <p className="text-[9px] text-[#A5B4C7]">Đúng tiến độ, an toàn</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <div className="text-[#00E5FF]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-[10px] mb-0.5 uppercase tracking-wider">BẢO HÀNH BỀN VỮNG</h4>
                <p className="text-[9px] text-[#A5B4C7]">Đồng hành dài lâu</p>
              </div>
            </div>

          </div>

          {/* DỰ ÁN NỔI BẬT - 5 CỘT (1 Tiêu đề + 4 Dự án dàn đều 100% chiều ngang) */}
          <div className="w-full flex lg:grid lg:grid-cols-5 gap-4 items-end relative flex-1 overflow-x-auto snap-x snap-mandatory lg:overflow-visible pb-6 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 xl:mx-0 xl:px-0">
            
            {/* Nav Arrows */}
            <div className="absolute -top-10 right-6 xl:right-0 flex gap-1.5 z-30">
              <button className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all bg-[#030914]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all bg-[#030914]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            {/* Cột 1: Tiêu đề */}
            <div className="flex flex-col justify-end h-[200px] lg:h-[160px] pb-1 pr-2 min-w-[75vw] sm:min-w-[45vw] lg:min-w-0 snap-center lg:snap-align-none shrink-0">
              <span className="text-[#00E5FF] font-bold tracking-widest text-[9px] uppercase mb-1.5 block">
                DỰ ÁN NỔI BẬT
              </span>
              <h2 className="text-[20px] font-bold mb-2 text-white leading-[1.1]">
                Những công trình<br/>tạo dấu ấn
              </h2>
              <p className="text-[#A5B4C7] mb-3 text-[10px] leading-[1.5]">
                Mỗi công trình là một tác phẩm nghệ thuật.
              </p>
              <a href="#" className="text-[#00E5FF] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors w-fit">
                XEM TẤT CẢ <span className="text-[12px]">&rarr;</span>
              </a>
            </div>

            {/* Cột 2-5: Thẻ Dự Án (Hiển thị 4 dự án lấp đầy màn hình) */}
            {allProjects.slice(0, 4).map((p) => (
              <div key={p.id} className="group rounded-[8px] overflow-hidden cursor-pointer bg-gradient-to-b from-[#071324] to-[#040D19] flex flex-col hover:shadow-[0_4px_20px_rgba(0,229,255,0.15)] transition-all h-[200px] lg:h-[160px] min-w-[75vw] sm:min-w-[45vw] lg:min-w-0 snap-center lg:snap-align-none shrink-0">
                
                {/* Top Image Box */}
                <div className="relative h-[65%] w-full shrink-0 overflow-hidden">
                  <img 
                    src={p.thumbnail} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Badge */}
                  <div className="absolute bottom-0 left-0 bg-[#00E5FF] text-[#071522] text-[8px] font-bold px-2 py-1 uppercase tracking-wider rounded-tr-[6px]">
                    {p.category}
                  </div>
                </div>
                
                {/* Bottom Content Box */}
                <div className="flex-1 flex flex-col justify-center px-2.5 py-1.5">
                  <h3 className="text-[11px] font-bold mb-1 text-white leading-tight line-clamp-1 group-hover:text-[#00E5FF] transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-1 text-[#A5B4C7] text-[9px]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span className="truncate">{p.location || 'Bảo Lâm'}</span>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </main>
  );
}

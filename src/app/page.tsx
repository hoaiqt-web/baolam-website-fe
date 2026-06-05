import { HERO_DATA } from "@/data/hero";
import { LANDMARK_PROJECTS } from "@/data/projects";
import { ARTWORK_PROJECTS } from "@/data/artworks";

export default function Home() {
  const hero = HERO_DATA[0];
  const allProjects = [...LANDMARK_PROJECTS, ...ARTWORK_PROJECTS].slice(0, 4);

  return (
    <main className="min-h-screen bg-baolam-bg">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center pt-20">
        <div className="absolute inset-0 z-0 bg-[#071522]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#071522] via-[#071522]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071522] via-transparent to-transparent z-10" />
          <img 
            src="/hero/hero-bana.png" 
            alt="Cổng Thời Gian Bà Nà Hills - Baolam Hero" 
            className="w-full h-full object-cover opacity-70 mix-blend-luminosity"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row justify-between items-center h-full pb-10">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[65%] mt-20 lg:mt-0">
            <span className="text-baolam-primary font-semibold tracking-wide text-[0.65rem] md:text-[0.7rem] uppercase mb-4 block">
              NHÀ THẦU ARTWORK & KIẾN TRÚC ĐIỂM NHẤN CẢNH QUAN HÀNG ĐẦU VIỆT NAM
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-black mb-6 leading-[1.05] tracking-tight">
              <span className="text-white block whitespace-nowrap">SÁNG TẠO</span>
              <span className="text-baolam-primary block whitespace-nowrap">GIÁ TRỊ ĐÍCH THỰC</span>
            </h1>
            <p className="text-[#A5B4C7] text-sm md:text-base mb-10 max-w-lg leading-relaxed">
              Từ ý tưởng đến biểu tượng. Bảo Lâm kiến tạo những công trình nghệ thuật có giá trị bền vững, nâng tầm không gian và tạo dấu ấn cho mọi công trình trên khắp Việt Nam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#landmarks" className="px-6 py-3.5 bg-baolam-primary text-[#071522] font-bold rounded hover:bg-baolam-primary-hover transition-colors text-[13px] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] w-fit tracking-wide">
                KHÁM PHÁ DỰ ÁN BIỂU TƯỢNG <span>&rarr;</span>
              </a>
              <a href="#capabilities" className="px-6 py-3.5 bg-transparent border border-baolam-border text-white font-bold rounded hover:border-baolam-primary hover:text-baolam-primary transition-colors text-[13px] flex items-center justify-center gap-2 w-fit tracking-wide">
                NĂNG LỰC CỦA CHÚNG TÔI <span>&rarr;</span>
              </a>
            </div>
          </div>

          {/* RIGHT CONTENT (STATS PANEL) */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="glass-panel p-8 rounded-xl border border-white/10 shadow-2xl space-y-8 backdrop-blur-xl bg-baolam-surface/80">
              {/* Stat 1 */}
              <div className="flex items-start gap-5">
                <div className="mt-1 text-baolam-primary">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                </div>
                <div>
                  <h3 className="text-baolam-primary text-3xl font-bold mb-1">15+</h3>
                  <p className="text-white text-sm font-bold tracking-wider mb-1 uppercase">NĂM KINH NGHIỆM</p>
                  <p className="text-gray-400 text-xs">Thiết kế & Thi công</p>
                </div>
              </div>
              {/* Stat 2 */}
              <div className="flex items-start gap-5">
                <div className="mt-1 text-baolam-primary">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
                </div>
                <div>
                  <h3 className="text-baolam-primary text-3xl font-bold mb-1">500+</h3>
                  <p className="text-white text-sm font-bold tracking-wider mb-1 uppercase">CÔNG TRÌNH</p>
                  <p className="text-gray-400 text-xs">Trên toàn quốc</p>
                </div>
              </div>
              {/* Stat 3 */}
              <div className="flex items-start gap-5">
                <div className="mt-1 text-baolam-primary">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div>
                  <h3 className="text-baolam-primary text-3xl font-bold mb-1">100+</h3>
                  <p className="text-white text-sm font-bold tracking-wider mb-1 uppercase">KỸ SƯ & NHÂN SỰ</p>
                  <p className="text-gray-400 text-xs">Tận tâm & sáng tạo</p>
                </div>
              </div>
              {/* Stat 4 */}
              <div className="flex items-start gap-5">
                <div className="mt-1 text-baolam-primary">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M17 18h1"></path><path d="M13 18h1"></path><path d="M9 18h1"></path></svg>
                </div>
                <div>
                  <h3 className="text-baolam-primary text-3xl font-bold mb-1">20.000+</h3>
                  <p className="text-white text-sm font-bold tracking-wider mb-1 uppercase">M² NHÀ MÁY</p>
                  <p className="text-gray-400 text-xs">Sản xuất hiện đại</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Carousel indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-8 h-1.5 bg-baolam-primary rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="bg-[#0b101a] py-12 border-y border-white/5 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="text-baolam-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">THIẾT KẾ SÁNG TẠO</h4>
                <p className="text-baolam-muted text-xs">Ý tưởng độc bản, khác biệt</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-baolam-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">SẢN XUẤT HIỆN ĐẠI</h4>
                <p className="text-baolam-muted text-xs">Công nghệ tiên tiến, chất lượng cao</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-baolam-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"></path><path d="M3 12h18"></path><path d="M3 21h18"></path><path d="M16 3l-4 4-4-4"></path><path d="M3 7l9 5 9-5"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">THI CÔNG CHUYÊN NGHIỆP</h4>
                <p className="text-baolam-muted text-xs">Đúng tiến độ, an toàn tuyệt đối</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-baolam-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">BẢO HÀNH BỀN VỮNG</h4>
                <p className="text-baolam-muted text-xs">Đồng hành dài lâu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="landmarks" className="py-24 relative bg-gradient-to-b from-baolam-bg to-[#050810]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col xl:flex-row gap-12 items-center">
            
            {/* Left Content */}
            <div className="xl:w-1/4 max-w-md shrink-0">
              <span className="text-baolam-primary font-bold tracking-widest text-xs uppercase mb-4 block">
                DỰ ÁN NỔI BẬT
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Những công trình tạo dấu ấn
              </h2>
              <p className="text-baolam-muted mb-8 text-sm leading-relaxed">
                Mỗi công trình là một tác phẩm nghệ thuật, mang dấu ấn sáng tạo và tâm huyết của Bảo Lâm.
              </p>
              <a href="#" className="px-6 py-3 bg-transparent border border-white/20 text-white font-bold rounded-sm hover:border-baolam-primary hover:text-baolam-primary transition-colors text-xs flex items-center justify-center gap-2 inline-flex w-fit">
                XEM TẤT CẢ DỰ ÁN <span>&rarr;</span>
              </a>
            </div>

            {/* Right Content (Projects Grid) */}
            <div className="xl:w-3/4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {allProjects.map((p, index) => (
                  <div key={p.id} className="group relative rounded-xl overflow-hidden cursor-pointer bg-baolam-surface h-[380px] border border-white/5">
                    {/* Background Image */}
                    <img 
                      src={p.thumbnail} 
                      alt={p.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-baolam-bg via-baolam-bg/50 to-transparent z-10" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                      <div className="mb-3">
                        <span className="bg-baolam-primary text-baolam-bg text-[0.6rem] font-bold px-2 py-1 rounded-sm uppercase tracking-wider inline-block">
                          {p.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-white leading-tight">{p.title}</h3>
                      
                      <div className="flex items-center gap-1.5 text-baolam-muted text-xs mb-4">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>{p.location || 'Bảo Lâm'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-baolam-primary text-xs font-bold uppercase tracking-wider opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        XEM CHI TIẾT <span>&rarr;</span>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
            
          </div>
          
          {/* Navigation Controls (Mock) */}
          <div className="absolute right-6 top-24 hidden xl:flex gap-4">
            <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-baolam-primary transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>
            <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-baolam-primary transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}

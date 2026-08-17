import Link from "next/link";
import { LANDMARK_PROJECTS } from "@/data/projects";
import { ARTWORK_PROJECTS } from '@/data/artworks';
import DebugToggle from '@/components/DebugToggle';
import { FeaturedProjectSlider } from '@/components/home/featured-project-slider';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

export default function Home() {
  const allProjects = [...LANDMARK_PROJECTS, ...ARTWORK_PROJECTS];

  return (
    <main className="min-h-screen w-full bg-[#030914] flex flex-col font-sans overflow-x-hidden">
      
      <DebugToggle />
      
      {/* ---------------- KHỐI TRÊN: HERO & THỐNG KÊ (78%) ---------------- */}
      <div id="hero-section" className="relative min-h-[680px] lg:h-[68vh] lg:min-h-[620px] w-full shrink-0 bg-[#030914] overflow-hidden flex flex-col">
        
        {/* Lớp nền Blur lấp đầy các khoảng trống khi thu nhỏ ảnh chính */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/hero/c0d0a44c-ab54-4601-9b6e-ac81907b850c.png" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110"
        />
        
        {/* Background Image - Mobile: tự điều chỉnh theo chiều rộng, Desktop: cover */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-start lg:items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/hero/c0d0a44c-ab54-4601-9b6e-ac81907b850c.png" 
            alt="Baolam Hero - Cổng Thời Gian" 
            className="home-hero-kenburns w-full h-auto lg:h-full lg:w-full lg:object-cover lg:object-top"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
            }}
          />
        </div>
        
        {/* Lớp phủ Overlay Gradient - mạnh hơn ở mobile để đọc chữ */}
        <div 
          className="absolute inset-0 z-10" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(3,9,20,0.55) 0%, rgba(3,9,20,0.7) 70%, rgba(3,9,20,1) 100%)'
          }} 
        />
        {/* Desktop overlay - từ trái sang phải */}
        <div 
          className="absolute inset-0 z-10 hidden lg:block" 
          style={{ 
            background: 'linear-gradient(to right, rgba(3,9,20,0.8) 0%, rgba(3,9,20,0.4) 40%, rgba(3,9,20,0.1) 100%)'
          }} 
        />
        
        {/* Gradient nối mượt xuống khối dưới */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#030914] via-[#030914]/80 to-transparent z-10 w-[1432px] h-[29px]" />

        {/* Content Container - FULL WIDTH CỰC ĐẠI */}
        <div className="relative z-20 w-full mx-auto px-5 sm:px-6 xl:px-8 flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center pt-[80px] sm:pt-[88px] lg:pt-[60px] pb-10 lg:pb-0 lg:h-full">
          
          {/* Trái: Nội dung Text */}
          <div className="w-full lg:w-[45%] max-w-[600px] mb-4 mt-4 sm:mt-6 lg:mt-0">
            <span className="motion-hero-meta text-[#A5B4C7] font-medium tracking-[1px] text-[9px] sm:text-[10px] uppercase mb-3 block drop-shadow-md leading-relaxed">
              NHÀ THẦU ARTWORK & KIẾN TRÚC ĐIỂM NHẤN CẢNH QUAN HÀNG ĐẦU VIỆT NAM
            </span>
            
            <h1 className="motion-hero-title text-[14px] sm:text-[20px] md:text-[27px] lg:text-[48px] font-black mb-4 leading-[1.15] tracking-tight">
              <span className="text-white block">SÁNG TẠO</span>
              <span className="text-[#00E5FF] block drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">GIÁ TRỊ ĐÍCH THỰC</span>
            </h1>
            
            <p className="motion-hero-location text-[#A5B4C7] text-[11px] sm:text-[13px] lg:text-[14px] mb-4 sm:mb-6 leading-[1.6] max-w-[480px]">
              Từ ý tưởng đến biểu tượng. Bảo Lâm kiến tạo những công trình nghệ thuật có giá trị bền vững, nâng tầm không gian và tạo dấu ấn cho mọi công trình trên khắp Việt Nam.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 sm: w-[600px] h-[42px]">
              <a href="#landmarks" className="w-full sm:w-auto px-6 py-3 bg-[#00E5FF] text-[#071522] font-bold rounded hover:bg-[#2EF2FF] transition-colors text-[11px] flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,229,255,0.3)] whitespace-nowrap">
                KHÁM PHÁ DỰ ÁN &rarr;
              </a>
              <a href="#capabilities" className="w-full sm:w-auto px-6 py-3 border border-white/20 font-bold rounded hover:border-[#00E5FF] hover: transition-all text-[11px] flex items-center justify-center gap-2 whitespace-nowrap text-[#000000] bg-[#00e5ff]">
                NĂNG LỰC CỦA CHÚNG TÔI &rarr;
              </a>
            </div>
          </div>

          {/* Phải: Thống kê Panel */}
          <div className="w-[240px] hidden lg:block shrink-0 mb-8">
            <div className="rounded-xl backdrop-blur-md border border-white/10 bg-[#071324]/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden p-6 space-y-5 pr-[32px] pl-[50px] w-[250px] h-[314px]">
              
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
      <div className="w-full bg-[#030914] relative z-20 flex flex-col justify-start overflow-hidden pt-4 lg:pt-5 pb-12">
        
        {/* NỘI DUNG */}
        <div className="w-full mx-auto px-6 xl:px-8 flex flex-col justify-start gap-3">
          
          {/* FEATURES BAR */}
          <ScrollReveal><div id="capabilities" className="w-full scroll-mt-24 grid grid-cols-2 gap-y-3 gap-x-2 lg:flex lg:items-center lg:justify-between shrink-0 mb-2 lg:mb-5 px-2">
            
            <Link href="#creative-design" className="group flex items-center gap-2.5 rounded-lg p-2 transition hover:bg-white/5">
              <div className="text-[#00E5FF]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-[10px] mb-0.5 uppercase tracking-wider">THIẾT KẾ SÁNG TẠO</h4>
                <p className="text-[9px] text-[#A5B4C7]">Ý tưởng độc bản, khác biệt</p>
              </div>
            </Link>
            
            <Link href="#modern-production" className="group flex items-center gap-2.5 rounded-lg p-2 transition hover:bg-white/5">
              <div className="text-[#00E5FF]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-[10px] mb-0.5 uppercase tracking-wider">SẢN XUẤT HIỆN ĐẠI</h4>
                <p className="text-[9px] text-[#A5B4C7]">Công nghệ tiên tiến, chất lượng</p>
              </div>
            </Link>
            
            <Link href="#professional-construction" className="group flex items-center gap-2.5 rounded-lg p-2 transition hover:bg-white/5">
              <div className="text-[#00E5FF]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"></path><path d="M3 12h18"></path><path d="M3 21h18"></path><path d="M16 3l-4 4-4-4"></path><path d="M3 7l9 5 9-5"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-[10px] mb-0.5 uppercase tracking-wider">THI CÔNG CHUYÊN NGHIỆP</h4>
                <p className="text-[9px] text-[#A5B4C7]">Đúng tiến độ, an toàn</p>
              </div>
            </Link>
            
            <Link href="#sustainable-warranty" className="group flex items-center gap-2.5 rounded-lg p-2 transition hover:bg-white/5">
              <div className="text-[#00E5FF]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-[10px] mb-0.5 uppercase tracking-wider">BẢO HÀNH BỀN VỮNG</h4>
                <p className="text-[9px] text-[#A5B4C7]">Đồng hành dài lâu</p>
              </div>
            </Link>

          </div></ScrollReveal>

          <ScrollReveal delay={120}><div id="landmarks" className="flex w-full scroll-mt-24 flex-col gap-6 lg:flex-row lg:items-end lg:gap-5">
            <div className="flex h-[150px] w-full shrink-0 flex-col justify-end pb-1 pr-2 lg:w-[220px] xl:w-[250px]">
              <span className="text-[#00E5FF] font-bold tracking-widest text-[9px] uppercase mb-1.5 block">
                DỰ ÁN NỔI BẬT
              </span>
              <h2 className="text-[20px] font-bold mb-2 text-white leading-[1.1]">
                Những công trình<br/>tạo dấu ấn
              </h2>
              <p className="text-[#A5B4C7] mb-3 text-[10px] leading-[1.5]">
                Mỗi công trình là một tác phẩm nghệ thuật.
              </p>
              <Link href="#landmarks" className="text-[#00E5FF] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors w-fit">
                XEM TẤT CẢ <span className="text-[12px]">&rarr;</span>
              </Link>
            </div>
            <FeaturedProjectSlider projects={allProjects}/>
          </div></ScrollReveal>
        </div>
      </div>

      <CapabilitySections projects={allProjects}/>
    </main>
  );
}

const CAPABILITY_SECTIONS = [
  { id: "creative-design", eyebrow: "01 / Thiết kế", title: "THIẾT KẾ SÁNG TẠO", subtitle: "Ý tưởng độc bản, khác biệt", body: "Mỗi công trình bắt đầu từ việc thấu hiểu không gian, văn hóa và mục tiêu của chủ đầu tư. Đội ngũ Bảo Lâm phát triển ý tưởng, hình khối và giải pháp vật liệu để tạo nên dấu ấn riêng cho từng dự án." },
  { id: "modern-production", eyebrow: "02 / Sản xuất", title: "SẢN XUẤT HIỆN ĐẠI", subtitle: "Công nghệ tiên tiến, chất lượng", body: "Quy trình sản xuất được kiểm soát từ tạo mẫu, kết cấu đến hoàn thiện bề mặt. Công nghệ hiện đại giúp hiện thực hóa những thiết kế phức tạp với độ chính xác và chất lượng ổn định." },
  { id: "professional-construction", eyebrow: "03 / Thi công", title: "THI CÔNG CHUYÊN NGHIỆP", subtitle: "Đúng tiến độ, an toàn", body: "Đội ngũ kỹ thuật triển khai đồng bộ từ nhà máy đến công trường, kiểm soát chặt chẽ tiến độ, an toàn và chất lượng lắp đặt trong mọi điều kiện thực tế." },
  { id: "sustainable-warranty", eyebrow: "04 / Bảo hành", title: "BẢO HÀNH BỀN VỮNG", subtitle: "Đồng hành dài lâu", body: "Sau bàn giao, Bảo Lâm tiếp tục theo dõi, bảo trì và hỗ trợ kỹ thuật để công trình giữ được thẩm mỹ, độ bền và giá trị sử dụng lâu dài." },
] as const;

function CapabilitySections({ projects }: { projects: Array<{ id: string; thumbnail: string; title: string }> }) {
  return <div className="border-t border-white/10">
    {CAPABILITY_SECTIONS.map((section, index) => <section id={section.id} key={section.id} className="scroll-mt-20 overflow-hidden border-b border-white/10 bg-[#030914] py-20 lg:py-28">
      <ScrollReveal direction={index % 2 ? "right" : "left"}><div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className={index % 2 ? "lg:order-2" : ""}>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-baolam-primary">{section.eyebrow}</p>
          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl lg:text-6xl">{section.title}</h2>
          <p className="mt-4 text-xl text-white/80">{section.subtitle}</p>
          <span className="mt-7 block h-px w-20 bg-baolam-primary"/>
          <p className="mt-8 max-w-xl text-base leading-8 text-baolam-muted">{section.body}</p>
        </div>
        <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 ${index % 2 ? "lg:order-1" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={projects[index % projects.length]?.thumbnail} alt={projects[index % projects.length]?.title || section.title} className="size-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030914]/55 via-transparent to-transparent"/>
        </div>
      </div></ScrollReveal>
    </section>)}
  </div>;
}

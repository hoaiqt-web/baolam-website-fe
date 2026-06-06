import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "BAOLAM ART & LANDSCAPE",
  description: "Nhà thầu Artwork & Kiến trúc điểm nhấn cảnh quan hàng đầu Việt Nam. Sáng tạo giá trị đích thực.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased selection:bg-baolam-primary selection:text-[#071522]`}>
        <nav className="fixed w-full z-50 backdrop-blur-md border-b border-baolam-border transition-all duration-300" style={{ backgroundColor: 'rgba(7, 21, 34, 0.88)' }}>
          <div className="max-w-[1920px] w-full mx-auto px-6 xl:px-12 h-20 flex justify-between items-center">
            
            {/* LOGO */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative flex items-center justify-center border-2 border-baolam-primary">
                <div className="w-8 h-8 border-2 border-baolam-primary"></div>
                <div className="w-4 h-4 bg-baolam-primary absolute"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 leading-none">
                  <span className="text-xl font-black tracking-widest text-white">BAOLAM</span>
                </div>
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/80 uppercase mt-1">ART & LANDSCAPE</span>
                <span className="text-[0.5rem] tracking-widest text-baolam-muted uppercase mt-0.5">Sáng tạo giá trị đích thực</span>
              </div>
            </div>

            {/* MAIN MENU */}
            <div className="hidden lg:flex gap-4 xl:gap-6 items-center text-[0.7rem] xl:text-[0.75rem] font-bold tracking-wider">
              <a href="#" className="text-baolam-primary relative flex flex-col items-center">
                TRANG CHỦ
                <span className="absolute -bottom-2 w-full h-[2px] bg-baolam-primary shadow-[0_0_10px_rgba(0,217,255,0.8)]"></span>
              </a>
              <a href="#capabilities" className="hover:text-baolam-primary transition-colors whitespace-nowrap">NĂNG LỰC</a>
              <a href="#landmarks" className="hover:text-baolam-primary transition-colors whitespace-nowrap">DỰ ÁN BIỂU TƯỢNG</a>
              <a href="#artworks" className="hover:text-baolam-primary transition-colors whitespace-nowrap">ARTWORK CẢNH QUAN</a>
              <a href="#factory" className="hover:text-baolam-primary transition-colors whitespace-nowrap">NHÀ MÁY</a>
              <a href="#news" className="hover:text-baolam-primary transition-colors whitespace-nowrap">TIN TỨC</a>
              <a href="#about" className="hover:text-baolam-primary transition-colors whitespace-nowrap">VỀ BẢO LÂM</a>
              <a href="#contact" className="hover:text-baolam-primary transition-colors whitespace-nowrap">LIÊN HỆ</a>
            </div>

            {/* CTA BUTTON */}
            <div className="hidden md:block">
              <a href="#contact" className="px-4 xl:px-6 py-2.5 xl:py-3 bg-baolam-primary text-[#071522] font-bold text-[0.7rem] xl:text-sm tracking-wider flex items-center gap-2 hover:bg-baolam-primary-hover transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)] whitespace-nowrap">
                LIÊN HỆ TƯ VẤN <span>&rarr;</span>
              </a>
            </div>

          </div>
        </nav>
        
        {children}
        <Script type="module" src="https://unpkg.com/visbug" strategy="lazyOnload" />
        <div dangerouslySetInnerHTML={{ __html: '<vis-bug></vis-bug>' }} />
        
        {/* FOOTER ẨN ĐỂ ĐẢM BẢO GIAO DIỆN CHỈ CÓ 1 MÀN HÌNH DUY NHẤT KHÔNG SCROLL */}
        {/* <footer className="bg-baolam-surface border-t border-baolam-border py-12">
          <div className="container mx-auto px-6 text-center text-baolam-muted text-sm">
            <p className="font-bold text-white mb-2 tracking-wider">BAOLAM ART & LANDSCAPE</p>
            <p>&copy; {new Date().getFullYear()} BAOLAM Ecosystem. All rights reserved.</p>
          </div>
        </footer> */}
      </body>
    </html>
  );
}

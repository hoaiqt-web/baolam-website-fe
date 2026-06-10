import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MobileNav from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "BAOLAM ART & LANDSCAPE",
  description: "Nhà thầu Artwork & Kiến trúc điểm nhấn cảnh quan hàng đầu Việt Nam. Sáng tạo giá trị đích thực.",
};

const NAV_LINKS = [
  { href: "#", label: "TRANG CHỦ", active: true },
  { href: "#capabilities", label: "NĂNG LỰC" },
  { href: "#landmarks", label: "DỰ ÁN BIỂU TƯỢNG" },
  { href: "#artworks", label: "ARTWORK CẢNH QUAN" },
  { href: "#factory", label: "NHÀ MÁY" },
  { href: "#news", label: "TIN TỨC" },
  { href: "#about", label: "VỀ BẢO LÂM" },
  { href: "#contact", label: "LIÊN HỆ" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased selection:bg-baolam-primary selection:text-[#071522]`}>
        
        {/* ─────────────────── NAVBAR ─────────────────── */}
        <nav
          className="fixed w-full z-50 backdrop-blur-md border-b border-baolam-border transition-all duration-300"
          style={{ backgroundColor: "rgba(7, 21, 34, 0.92)" }}
        >
          <div className="w-full mx-auto px-4 sm:px-6 xl:px-12 h-16 sm:h-20 flex justify-between items-center">

            {/* LOGO */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 relative flex items-center justify-center border-2 border-baolam-primary">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-baolam-primary" />
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-baolam-primary absolute" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-xl font-black tracking-widest text-white">BAOLAM</span>
                <span className="text-[0.55rem] sm:text-[0.65rem] font-bold tracking-[0.2em] text-white/80 uppercase mt-0.5">
                  ART & LANDSCAPE
                </span>
                <span className="hidden sm:block text-[0.45rem] sm:text-[0.5rem] tracking-widest text-baolam-muted uppercase mt-0.5">
                  Sáng tạo giá trị đích thực
                </span>
              </div>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex gap-4 xl:gap-6 items-center text-[0.7rem] xl:text-[0.75rem] font-bold tracking-wider">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className={`relative flex flex-col items-center whitespace-nowrap transition-colors ${
                    link.active
                      ? "text-baolam-primary"
                      : "hover:text-baolam-primary"
                  }`}
                >
                  {link.label}
                  {link.active && (
                    <span className="absolute -bottom-2 w-full h-[2px] bg-baolam-primary shadow-[0_0_10px_rgba(0,217,255,0.8)]" />
                  )}
                </a>
              ))}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden md:block shrink-0">
              <a
                href="#contact"
                className="px-4 xl:px-6 py-2.5 xl:py-3 bg-baolam-primary text-[#071522] font-bold text-[0.7rem] xl:text-sm tracking-wider flex items-center gap-2 hover:bg-baolam-primary-hover transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)] whitespace-nowrap"
              >
                LIÊN HỆ TƯ VẤN <span>&rarr;</span>
              </a>
            </div>

            {/* MOBILE HAMBURGER (client component) */}
            <MobileNav links={NAV_LINKS} />

          </div>
        </nav>

        {children}
        <Script type="module" src="https://unpkg.com/visbug" strategy="lazyOnload" />
        <div dangerouslySetInnerHTML={{ __html: '<vis-bug></vis-bug>' }} />
      </body>
    </html>
  );
}

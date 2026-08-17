import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import SiteHeader from "@/components/SiteHeader";
import { ToastProvider } from "@/components/ui/toast-provider";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://noithatbaolam.com"),
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
        <ToastProvider>
          <SiteHeader />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

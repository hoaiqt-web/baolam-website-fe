import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

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
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}

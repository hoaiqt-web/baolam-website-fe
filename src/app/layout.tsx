import { draftMode } from 'next/headers';
import { requireAdmin } from '@/lib/auth/session';
import { getDraftPageContent, getPublishedPageContent } from '@/features/page-content/queries';
import { ContentProvider } from '@/components/cms/content-provider';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import SiteHeader from "@/components/SiteHeader";
import { ToastProvider } from "@/components/ui/toast-provider";
import { ContactModalProvider } from "@/components/contact/contact-modal-context";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://noithatbaolam.com"),
  title: "BAOLAM ART & LANDSCAPE",
  description: "Nhà thầu Artwork & Kiến trúc điểm nhấn cảnh quan hàng đầu Việt Nam. Sáng tạo giá trị đích thực.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const preview = (await draftMode()).isEnabled;
  if (preview) await requireAdmin();
  const content = preview ? await getDraftPageContent() : await getPublishedPageContent();
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased selection:bg-baolam-primary selection:text-[#071522]`}>
        <ContentProvider values={content}>
        {preview && <div className="fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 rounded-xl border border-cyan-300/40 bg-slate-950 px-5 py-3 text-sm text-white shadow-xl">Đang xem bản nháp ·{" "}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- must be a full browser navigation so the draft-mode cookie is cleared before the next render, not a soft RSC transition */}
          <a href="/api/admin/pages/preview/exit" className="underline">Thoát xem trước</a></div>}
        <ToastProvider>
          <ContactModalProvider>
            <SiteHeader />
            {children}
          </ContactModalProvider>
        </ToastProvider>
        </ContentProvider>
      </body>
    </html>
  );
}

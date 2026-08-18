import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInformation } from "@/components/contact/contact-information";
import { ProjectBriefForm } from "@/components/contact/project-brief-form";

export const metadata: Metadata = {
  title: "Liên hệ | Bảo Lâm",
  description: "Chia sẻ về khu đất, mục tiêu và bối cảnh dự án của bạn để đội ngũ Bảo Lâm cùng trao đổi về bước tiếp theo.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#030914] font-sans text-white">
      <ContactHero />
      <ContactInformation />
      <ProjectBriefForm />
    </main>
  );
}

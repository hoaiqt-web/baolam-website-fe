import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function ContactHero() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col justify-end overflow-hidden pt-24 lg:min-h-[85vh]">
      <Image
        src="/images/daiphunnuoc.jpg"
        alt="Khảo sát công trường Bảo Lâm"
        fill
        priority
        className="object-cover opacity-50"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(3,9,20,0.4) 0%, rgba(3,9,20,0.6) 55%, rgba(3,9,20,0.97) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-12 lg:pb-24">
        <ScrollReveal>
          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary">
            Contact / Start a project
          </span>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h1 className="text-3xl font-black leading-[1.1] sm:text-4xl lg:text-5xl">
              Hãy bắt đầu từ khu đất và mục tiêu của bạn.
            </h1>
            <p className="max-w-xl text-sm leading-[1.8] text-baolam-muted sm:text-base">
              Mỗi dự án bắt đầu bằng một cuộc trao đổi về bối cảnh, mục tiêu và khả năng triển khai.
            </p>
          </div>
          <a
            href="#project-brief"
            className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-baolam-primary hover:text-white"
          >
            Chia sẻ về dự án ↓
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

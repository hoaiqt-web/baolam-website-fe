import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { PlaceholderVisual } from "@/components/home/placeholder-visual";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#030914] font-sans text-white">
      <Hero />
      <PositioningIntro />
      <FeaturedProjects />
      <CaseStudySpotlight />
      <ProcessRail />
      <Differentiators />
      <StatsBar />
      <ClientsAndTestimonial />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className="relative flex min-h-dvh w-full items-end overflow-hidden pt-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/c0d0a44c-ab54-4601-9b6e-ac81907b850c.png"
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-3xl"
      />
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/c0d0a44c-ab54-4601-9b6e-ac81907b850c.png"
          alt="Baolam Landscape - Dự án cảnh quan"
          className="home-hero-kenburns h-full w-full object-cover object-top"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          }}
        />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to bottom, rgba(3,9,20,0.35) 0%, rgba(3,9,20,0.55) 55%, rgba(3,9,20,0.96) 100%)" }}
      />
      <div
        className="absolute inset-0 z-[1] hidden lg:block"
        style={{ background: "linear-gradient(to right, rgba(3,9,20,0.8) 0%, rgba(3,9,20,0.4) 40%, rgba(3,9,20,0.1) 100%)" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:pb-20 lg:px-12">
        <span className="motion-hero-meta mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary sm:text-xs">
          Landscape Architecture · Design &amp; Build
        </span>
        <h1 className="motion-hero-title max-w-3xl text-[34px] font-black leading-[1.08] sm:text-5xl lg:text-6xl">
          Kiến tạo cảnh quan
          <br />
          <span className="text-baolam-primary drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]">từ ý tưởng đến hiện thực.</span>
        </h1>
        <p className="motion-hero-location mt-5 max-w-xl text-sm leading-[1.7] text-baolam-muted sm:text-base">
          Chúng tôi cung cấp giải pháp cảnh quan toàn diện, từ quy hoạch, thiết kế đến thi công và chăm sóc sau bàn giao.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded bg-baolam-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#071522] shadow-[0_4px_15px_rgba(0,229,255,0.3)] transition-colors hover:bg-baolam-primary-hover"
          >
            Khám phá dự án →
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded border border-white/20 px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:border-baolam-primary hover:text-baolam-primary"
          >
            Trao đổi về dự án của bạn →
          </a>
        </div>
        <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/40">Hà Nội · TP. Hồ Chí Minh · Toàn quốc</p>
      </div>
    </section>
  );
}

/* ---------------------------- Positioning intro ---------------------------- */

function PositioningIntro() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h2 className="text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl">
              Thiết kế cùng thiên nhiên.
              <br />
              Xây dựng cho con người.
            </h2>
            <div>
              <p className="max-w-xl text-sm leading-[1.8] text-baolam-muted sm:text-base">
                Chúng tôi tiếp cận mỗi dự án từ đặc điểm riêng của khu đất, khí hậu, hệ sinh thái và nhu cầu sử dụng. Bằng
                việc kết nối thiết kế với năng lực triển khai thực tế, mỗi ý tưởng được phát triển đồng bộ từ bản vẽ đến
                công trình hoàn thiện.
              </p>
              <a href="#about" className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary hover:text-white">
                Tìm hiểu về chúng tôi <span>→</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="mt-12 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10">
            <PlaceholderVisual label="Không gian cảnh quan có người sử dụng" seed={1} className="h-full w-full" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------ Featured projects ------------------------------ */

const FEATURED_PROJECTS = [
  { id: "p1", name: "[Tên dự án Resort]", location: "[Địa điểm]", year: "2025", type: "Hospitality & Resort", scope: "Landscape Design & Build" },
  { id: "p2", name: "[Tên dự án Khu đô thị]", location: "[Địa điểm]", year: "2024", type: "Khu đô thị", scope: "Landscape Design" },
  { id: "p3", name: "[Tên dự án Công viên]", location: "[Địa điểm]", year: "2024", type: "Công viên & Quảng trường", scope: "Landscape Design & Build" },
  { id: "p4", name: "[Tên dự án Residential]", location: "[Địa điểm]", year: "2023", type: "Residential", scope: "Landscape Construction" },
  { id: "p5", name: "[Tên dự án Commercial]", location: "[Địa điểm]", year: "2023", type: "Commercial & Mixed-use", scope: "Landscape Design & Build" },
] as const;

function ProjectMeta({ project }: { project: (typeof FEATURED_PROJECTS)[number] }) {
  return (
    <div className="mt-3">
      <h3 className="text-base font-bold text-white sm:text-lg">{project.name}</h3>
      <p className="mt-1 text-xs text-baolam-muted">
        {project.location} · {project.type} · {project.year}
      </p>
      <span className="mt-2 inline-block rounded-full border border-baolam-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-baolam-primary">
        {project.scope}
      </span>
    </div>
  );
}

function FeaturedProjects() {
  const [big1, side1, side2, feature, big2] = FEATURED_PROJECTS;
  return (
    <section id="projects" className="scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary">Dự án nổi bật</span>
              <h2 className="text-3xl font-black leading-[1.1] sm:text-4xl">
                Những công trình
                <br />
                tạo dấu ấn
              </h2>
            </div>
            <a href="#projects" className="text-xs font-bold uppercase tracking-wider text-baolam-primary hover:text-white">
              Xem tất cả dự án →
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-12">
            <div className="aspect-[16/8] w-full overflow-hidden rounded-2xl border border-white/10">
              <PlaceholderVisual label={big1.type} seed={2} className="h-full w-full" />
            </div>
            <ProjectMeta project={big1} />
          </ScrollReveal>

          <ScrollReveal direction="left" className="lg:col-span-6">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
              <PlaceholderVisual label={side1.type} seed={3} className="h-full w-full" />
            </div>
            <ProjectMeta project={side1} />
          </ScrollReveal>
          <ScrollReveal direction="right" className="lg:col-span-6">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
              <PlaceholderVisual label={side2.type} seed={4} className="h-full w-full" />
            </div>
            <ProjectMeta project={side2} />
          </ScrollReveal>

          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10">
              <PlaceholderVisual label={feature.type} seed={5} className="h-full w-full" />
            </div>
            <ProjectMeta project={feature} />
          </ScrollReveal>
          <ScrollReveal direction="right" className="flex items-center lg:col-span-7">
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <span className="text-4xl font-black text-baolam-primary">“</span>
              <p className="mt-2 text-lg font-medium leading-[1.6] text-white/90 sm:text-xl">
                Mỗi công trình là một tác phẩm — được phát triển đồng bộ từ ý tưởng thiết kế đến năng lực thi công thực tế.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-12">
            <div className="aspect-[16/8] w-full overflow-hidden rounded-2xl border border-white/10">
              <PlaceholderVisual label={big2.type} seed={0} className="h-full w-full" />
            </div>
            <ProjectMeta project={big2} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Case study spotlight ---------------------------- */

const CASE_STUDY_STAGES = ["Hiện trạng", "Masterplan", "Render", "Thi công", "Hoàn thiện"];

function CaseStudySpotlight() {
  return (
    <section id="case-study" className="scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary">Case Study</span>
          <h2 className="max-w-2xl text-3xl font-black leading-[1.1] sm:text-4xl">[Tên dự án tiêu biểu]</h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal direction="left" className="space-y-7">
            <CaseStudyBlock title="Bối cảnh" body="Một khu nghỉ dưỡng nằm trên địa hình dốc, tiếp giáp hệ sinh thái tự nhiên nhạy cảm." />
            <CaseStudyBlock title="Thách thức" body="Bảo tồn thảm thực vật hiện trạng, hạn chế can thiệp địa hình và vẫn tạo được trải nghiệm cảnh quan riêng tư." />
            <CaseStudyBlock title="Giải pháp" body="Tổ chức tuyến tiếp cận theo cao độ tự nhiên, tái sử dụng cây bản địa và tích hợp hệ thống thu nước vào cấu trúc cảnh quan." />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-baolam-primary">Kết quả</h3>
              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["[XX] m²", "Diện tích cây xanh"],
                  ["[XX]", "Cây được bảo tồn"],
                  ["[XX] tháng", "Thời gian triển khai"],
                  ["[XX]%", "Tỷ lệ cây bản địa"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-lg font-black text-white">{value}</p>
                    <p className="mt-0.5 text-[10px] leading-tight text-baolam-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <a href="#case-study" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary hover:text-white">
              Khám phá toàn bộ dự án →
            </a>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex flex-col gap-3">
              {CASE_STUDY_STAGES.map((stage, i) => (
                <div key={stage} className="flex items-center gap-3">
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                    <PlaceholderVisual label={stage} tag="" seed={i} className="h-full w-full" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function CaseStudyBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-baolam-primary">{title}</h3>
      <p className="mt-2 text-sm leading-[1.7] text-baolam-muted">{body}</p>
    </div>
  );
}

/* --------------------------------- Process rail --------------------------------- */

const PROCESS_STEPS = [
  { n: "01", title: "Site Analysis", body: "Khảo sát địa hình, khí hậu, hệ sinh thái và nhu cầu sử dụng." },
  { n: "02", title: "Concept Design", body: "Chiến lược cảnh quan, masterplan và định hướng vật liệu." },
  { n: "03", title: "Design Development", body: "Thiết kế chi tiết hardscape, softscape, chiếu sáng, tưới và thoát nước." },
  { n: "04", title: "Cost & Technical Planning", body: "Bóc tách khối lượng, dự toán, lựa chọn vật liệu, cây và tiến độ." },
  { n: "05", title: "Construction", body: "Thi công hardscape, softscape, hệ thống kỹ thuật và kiểm soát chất lượng." },
  { n: "06", title: "Handover & Maintenance", body: "Nghiệm thu, bàn giao, bảo hành và chăm sóc cảnh quan dài hạn." },
] as const;

function ProcessRail() {
  return (
    <section id="process" className="scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary">Năng lực Design &amp; Build</span>
          <h2 className="max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl">
            Một quy trình thống nhất.
            <br />
            Một trách nhiệm xuyên suốt.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step, i) => (
            <ScrollReveal key={step.n} delay={i * 60}>
              <div className="border-t border-baolam-border pt-4">
                <span className="text-xs font-black text-baolam-primary">{step.n}</span>
                <h3 className="mt-2 text-sm font-bold uppercase tracking-wide text-white">{step.title}</h3>
                <p className="mt-2 text-xs leading-[1.7] text-baolam-muted">{step.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Differentiators ------------------------------- */

const DIFFERENTIATORS = [
  { title: "Design grounded in execution", body: "Thiết kế được phát triển dựa trên vật liệu, chi phí và khả năng thi công thực tế." },
  { title: "One integrated team", body: "Đội ngũ thiết kế, kỹ thuật và thi công phối hợp trong cùng một quy trình." },
  { title: "Local landscape knowledge", body: "Am hiểu khí hậu, thổ nhưỡng, nguồn cây và điều kiện xây dựng tại Việt Nam." },
  { title: "Long-term performance", body: "Không chỉ bàn giao một công trình đẹp mà còn tính đến sinh trưởng, bảo trì và vận hành lâu dài." },
] as const;

function Differentiators() {
  return (
    <section id="why" className="scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary">Điểm khác biệt</span>
          <h2 className="max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl">Vì sao chọn một đội ngũ Design &amp; Build</h2>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {DIFFERENTIATORS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 70}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <span className="text-xs font-black text-baolam-primary">0{i + 1}</span>
                <h3 className="mt-2 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-baolam-muted">{item.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- Stats ----------------------------------- */

const STATS = [
  ["15+", "Năm kinh nghiệm"],
  ["500+", "Công trình"],
  ["20.000+", "m² Nhà máy"],
  ["100+", "Kỹ sư & nhân sự"],
] as const;

function StatsBar() {
  return (
    <section className="border-t border-white/10 bg-[#030914] py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 items-center gap-x-16 gap-y-8 sm:grid-cols-4">
            {STATS.map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-baolam-primary sm:text-3xl">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-baolam-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Clients & testimonial --------------------------- */

function ClientsAndTestimonial() {
  return (
    <section id="clients" className="scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary">
            Khách hàng &amp; đối tác
          </span>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[3/2] items-center justify-center rounded-lg border border-dashed border-white/15 text-[9px] uppercase tracking-wider text-white/30"
              >
                Logo đối tác
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <blockquote className="mt-16 max-w-3xl">
            <span className="text-4xl font-black text-baolam-primary">“</span>
            <p className="text-lg font-medium leading-[1.7] text-white/90 sm:text-xl">
              [Trích dẫn phản hồi khách hàng — ví dụ: đội ngũ đã kiểm soát tốt sự thống nhất giữa ý tưởng thiết kế, ngân
              sách và chất lượng triển khai tại công trường.]
            </p>
            <footer className="mt-4 text-xs text-baolam-muted">— [Tên khách hàng], [Chức vụ · Công ty · Dự án]</footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------------ CTA ------------------------------------ */

function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-20 relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0">
        <PlaceholderVisual label="Bắt đầu một dự án mới" seed={4} className="h-full w-full" />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(3,9,20,0.9) 0%, rgba(3,9,20,0.72) 100%)" }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center lg:px-12 lg:py-32">
        <ScrollReveal>
          <h2 className="text-3xl font-black leading-[1.15] sm:text-4xl">Bắt đầu từ khu đất của bạn.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-[1.8] text-baolam-muted sm:text-base">
            Hãy trao đổi với chúng tôi từ giai đoạn đầu để cùng phát triển một giải pháp cân bằng giữa ý tưởng, ngân
            sách, kỹ thuật và giá trị vận hành lâu dài.
          </p>
          <a
            href="mailto:#"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded bg-baolam-primary px-8 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#071522] shadow-[0_4px_15px_rgba(0,229,255,0.3)] transition-colors hover:bg-baolam-primary-hover"
          >
            Bắt đầu một dự án →
          </a>
          <p className="mt-8 text-xs text-white/40">[Email liên hệ] · [Hotline] · [Địa chỉ văn phòng]</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ----------------------------------- Footer ----------------------------------- */

function SiteFooter() {
  const year = new Date().getFullYear();
  const columns = [
    { title: "Sitemap", links: [["Dự án", "#projects"], ["Năng lực", "#process"], ["Dịch vụ", "#services"], ["Liên hệ", "#contact"]] },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#030914] py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:flex-row sm:items-start sm:justify-between lg:px-12">
        <div>
          <span className="text-lg font-black tracking-widest text-white">BAOLAM</span>
          <p className="mt-2 max-w-xs text-xs leading-[1.7] text-baolam-muted">
            Landscape Architecture · Design &amp; Build. Kiến tạo cảnh quan từ ý tưởng đến hiện thực.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50">{col.title}</h4>
            <ul className="mt-3 space-y-2">
              {col.links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-xs text-baolam-muted hover:text-baolam-primary">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-[10px] text-white/30 lg:px-12">
        © {year} Bảo Lâm. All rights reserved.
      </div>
    </footer>
  );
}

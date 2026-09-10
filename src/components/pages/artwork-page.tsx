'use client';
import { useCmsBlock } from "@/components/cms/content-provider";

import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/home/placeholder-visual';
import { ContactModalTrigger } from '@/components/contact/contact-modal-trigger';
import { SiteFooter } from '@/components/site-footer';
import { ArtworkTypologyExplorer } from '@/components/artwork/artwork-typology-explorer';
import { ArtworkMaterialExplorer } from '@/components/artwork/artwork-material-explorer';
import { ARTWORK_PROJECTS } from '@/data/artworks';
import { ARTWORK_TYPOLOGIES } from '@/data/artwork-typologies';
import { ARTWORK_MATERIALS } from '@/data/artwork-materials';
import { FACTORY_INFO } from '@/data/factory';
import { cn } from '@/lib/utils';



export default function ArtworkPage() {
  const c = useCmsBlock("artwork.ArtworkPage");
  const spotlight = c(ARTWORK_PROJECTS)[0];

  return (
    <main className='min-h-screen w-full overflow-x-clip bg-canvas pt-16 font-sans text-ink sm:pt-20'>
      <Hero />
      <Definition />
      <Spotlight project={spotlight} />
      <Typologies />
      <Portfolio projects={c(ARTWORK_PROJECTS)} />
      <ConceptToInstallation />
      <MaterialAndCraft />
      <EngineeringBehind />
      <InHouseFabrication />
      <FeaturedCaseStudy />
      <StatsBar />
      <SiteFooter />
    </main>
  );
}

/* -------------------------------- Shared bits -------------------------------- */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className='mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary'>
      {children}
    </span>
  );
}

function ScopeList({ items, columns = 2 }: { items: readonly string[]; columns?: 1 | 2 | 3 }) {
  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-x-8 gap-y-3',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {items.map((item) => (
        <li key={item} className='flex items-start gap-2.5 text-sm leading-[1.6] text-baolam-muted'>
          <span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-baolam-primary' />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  const c = useCmsBlock("artwork.Hero");
  return (
    <section className='theme-media relative flex min-h-[85dvh] w-full items-end overflow-hidden'>
      <PlaceholderVisual cmsBlock="artwork.Hero" label={c("Landscape Artwork")} tag={c("Nghệ thuật × Cảnh quan × Kỹ thuật")} seed={0} className='absolute inset-0' />
      <div
        className='absolute inset-0'
        style={{
          background: 'linear-gradient(to bottom, rgba(3,9,20,0.3) 0%, rgba(3,9,20,0.55) 55%, rgba(3,9,20,0.96) 100%)',
        }}
      />
      <div className='relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:pb-20 lg:px-12'>
        <span className='motion-hero-meta mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary sm:text-xs'>{c("Landscape Artwork")}</span>
        <h1 className='motion-hero-title max-w-3xl text-[34px] font-black leading-[1.08] sm:text-5xl lg:text-6xl'>{c("Nghệ thuật trở thành")}<br />
          <span className='text-baolam-primary drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]'>{c("một phần của cảnh quan.")}</span>
        </h1>
        <p className='motion-hero-location mt-5 max-w-xl text-sm leading-[1.7] text-baolam-muted sm:text-base'>{c("Từ ý tưởng, nghiên cứu vật liệu đến sản xuất và lắp đặt, Bảo Lâm tạo nên những tác phẩm được phát triển riêng cho từng địa điểm và trải nghiệm không gian.")}</p>
        <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
          <a
            href={c("#definition")}
            className='inline-flex items-center justify-center gap-2 rounded bg-baolam-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-[0_4px_15px_rgba(0,229,255,0.3)] transition-colors hover:bg-baolam-primary-hover'
          >{c("Khám phá artwork ↓")}</a>
          <ContactModalTrigger
            source='artwork-hero'
            className='inline-flex items-center justify-center gap-2 rounded border border-ink/20 px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-ink transition-colors hover:border-baolam-primary hover:text-baolam-primary'
          >{c("Trao đổi ý tưởng →")}</ContactModalTrigger>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Definition -------------------------------- */

const DEFINITION_KEYWORDS = ['Place', 'Identity', 'Experience', 'Craft'];

function Definition() {
  const c = useCmsBlock("artwork.Definition");
  return (
    <section id='definition' className='scroll-mt-20 border-t border-ink/10 bg-canvas py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-[45%_55%] lg:gap-16'>
          <ScrollReveal direction='left'>
            <SectionEyebrow>{c("Landscape as Art")}</SectionEyebrow>
            <h2 className='max-w-md text-3xl font-black leading-[1.15] sm:text-4xl'>{c("Một tác phẩm không đứng ngoài không gian.")}</h2>
          </ScrollReveal>
          <ScrollReveal direction='right' delay={80}>
            <p className='max-w-xl text-sm leading-[1.8] text-baolam-muted sm:text-base'>{c("Artwork cảnh quan được phát triển trong mối quan hệ với kiến trúc, địa hình, cây xanh, ánh sáng và chuyển động của con người. Mỗi tác phẩm vừa mang giá trị nhận diện, vừa tham gia tổ chức trải nghiệm và bản sắc chung của dự án.")}</p>
            <div className='mt-8 flex flex-wrap items-center gap-x-2 gap-y-3'>
              {c(DEFINITION_KEYWORDS).map((word, i) => (
                <div key={word} className='flex items-center gap-2'>
                  <span className='rounded-full border border-baolam-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ink/80'>
                    {word}
                  </span>
                  {i < c(DEFINITION_KEYWORDS).length - 1 && <span className='text-baolam-primary/60'>→</span>}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Spotlight -------------------------------- */

function Spotlight({ project }: { project: (typeof ARTWORK_PROJECTS)[number] }) {
  const c = useCmsBlock("artwork.Spotlight");
  const meta = [project.location, project.completionYear].filter(Boolean).join(' · ');

  return (
    <section className='scroll-mt-20 border-t border-ink/10 bg-canvas py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[65%_35%] lg:gap-12'>
          <ScrollReveal direction='scale'>
            <div className='aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink/10 sm:aspect-[16/10]'>
              <PlaceholderVisual cmsBlock="artwork.Spotlight" imageKey={project.title} label={project.category} seed={5} className='h-full w-full' />
            </div>
          </ScrollReveal>
          <ScrollReveal direction='right' delay={100} className='flex flex-col justify-center'>
            <span className='text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary'>{c("01 / Featured Artwork")}</span>
            <h2 className='mt-3 text-2xl font-black leading-[1.1] sm:text-3xl'>{project.title}</h2>
            {meta && <p className='mt-3 text-sm text-baolam-muted'>{meta}</p>}
            <dl className='mt-5 space-y-3 text-sm'>
              <div>
                <dt className='text-[10px] font-bold uppercase tracking-wider text-subtle-50'>{c("Vật liệu")}</dt>
                <dd className='mt-1 text-baolam-muted'>{project.material}</dd>
              </div>
              <div>
                <dt className='text-[10px] font-bold uppercase tracking-wider text-subtle-50'>{c("Phạm vi Bảo Lâm thực hiện")}</dt>
                <dd className='mt-1 text-baolam-muted'>{c("Thiết kế sáng tạo · Sản xuất chính xác · Thi công chuyên nghiệp")}</dd>
              </div>
            </dl>
            {project.description && (
              <p className='mt-5 text-sm leading-[1.7] text-baolam-muted'>{project.description}</p>
            )}
            <span className='mt-6 inline-flex w-fit items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary'>{c("Xem artwork →")}</span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Typologies -------------------------------- */

function Typologies() {
  const c = useCmsBlock("artwork.Typologies");
  return (
    <section className='scroll-mt-20 border-t border-ink/10 bg-canvas py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>{c("Artwork Typologies")}</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>{c("Những hình thức chúng tôi phát triển")}</h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className='mt-12'>
            <ArtworkTypologyExplorer cmsBlock="artwork.Typologies" typologies={c(ARTWORK_TYPOLOGIES)} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -------------------------------- Portfolio -------------------------------- */

function Portfolio({ projects }: { projects: typeof ARTWORK_PROJECTS }) {
  const c = useCmsBlock("artwork.Portfolio");
  return (
    <section id='portfolio' className='scroll-mt-20 border-t border-ink/10 bg-canvas py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>{c("Portfolio")}</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>{c("Những tác phẩm đã thực hiện")}</h2>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12'>
          {projects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ project, index }: { project: (typeof ARTWORK_PROJECTS)[number]; index: number }) {
  const c = useCmsBlock("artwork.PortfolioCard");
  const isFullWidth = index % 3 === 0;
  const meta = [project.location, project.category, project.completionYear].filter(Boolean).join(' · ');

  return (
    <ScrollReveal
      direction={isFullWidth ? 'scale' : index % 2 === 0 ? 'left' : 'right'}
      className={cn('group cursor-pointer', isFullWidth ? 'lg:col-span-12' : 'lg:col-span-6')}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl border border-ink/10 transition-colors duration-500 group-hover:border-baolam-primary/40',
          isFullWidth ? 'aspect-[16/8]' : 'aspect-[4/3]'
        )}
      >
        <div className='h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]'>
          <PlaceholderVisual cmsBlock="artwork.PortfolioCard" imageKey={project.title} label={project.category} seed={index + 6} className='h-full w-full' />
        </div>
        <div
          className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
          style={{ background: 'linear-gradient(180deg, transparent 35%, rgba(2,11,22,0.88) 100%)' }}
        />
        <div className='absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
          <span className='block h-px w-0 bg-baolam-primary transition-all duration-500 group-hover:w-full' />
          <p className='mt-3 text-[11px] font-bold uppercase tracking-wider text-ink/80'>{project.material}</p>
          <span className='mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-baolam-primary'>{c("Xem chi tiết →")}</span>
        </div>
      </div>
      <div className='mt-3'>
        <h3 className='text-base font-bold text-ink transition-colors duration-300 group-hover:text-baolam-primary sm:text-lg'>
          {project.title}
        </h3>
        <p className='mt-1 text-xs text-baolam-muted'>{meta}</p>
      </div>
    </ScrollReveal>
  );
}

/* ---------------------------- Concept to Installation ---------------------------- */

const CONCEPT_STAGES = [
  {
    n: '01',
    title: 'Context & Brief',
    items: ['Bối cảnh dự án', 'Mục tiêu nhận diện', 'Vị trí đặt artwork', 'Trải nghiệm người sử dụng', 'Điều kiện môi trường'],
  },
  {
    n: '02',
    title: 'Concept Development',
    items: ['Nghiên cứu ý tưởng', 'Sketch', 'Moodboard', 'Hình khối', 'Tỷ lệ', 'Ngôn ngữ vật liệu'],
  },
  {
    n: '03',
    title: 'Design & Engineering',
    items: ['Mô hình 3D', 'Triển khai kỹ thuật', 'Kết cấu', 'Liên kết', 'Tải trọng', 'Giải pháp bề mặt', 'Chiếu sáng và hệ thống kỹ thuật'],
  },
  {
    n: '04',
    title: 'Prototype & Mockup',
    items: ['Mô hình tỷ lệ', 'Mẫu vật liệu', 'Mẫu màu', 'Kiểm tra bề mặt', 'Kiểm tra tỷ lệ'],
  },
  {
    n: '05',
    title: 'Fabrication',
    items: ['Chuẩn bị vật liệu', 'Gia công', 'Hàn/lắp ráp', 'Tạo hình', 'Hoàn thiện bề mặt', 'Kiểm tra chất lượng'],
  },
  {
    n: '06',
    title: 'Transportation & Installation',
    items: ['Kế hoạch vận chuyển', 'Chia module', 'Cẩu lắp', 'Liên kết tại công trường', 'Hoàn thiện', 'Nghiệm thu'],
  },
] as const;

const CONCEPT_VISUAL_STAGES = ['Sketch', 'Mô hình 3D', 'Mockup', 'Nhà máy', 'Vận chuyển', 'Công trình'];

function ConceptToInstallation() {
  const c = useCmsBlock("artwork.ConceptToInstallation");
  return (
    <section className='scroll-mt-20 border-t border-ink/10 bg-canvas py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>{c("From Concept to Installation")}</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>{c("Một hành trình thống nhất")}<br />{c("từ ý tưởng đến hiện thực.")}</h2>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
          {c(CONCEPT_STAGES).map((stage, i) => (
            <ScrollReveal key={stage.n} delay={i * 60}>
              <div className='h-full rounded-2xl border border-ink/10 bg-ink/[0.03] p-6'>
                <span className='text-xs font-black text-baolam-primary'>{stage.n}</span>
                <h3 className='mt-2 text-sm font-bold uppercase tracking-wide text-ink'>{stage.title}</h3>
                <ul className='mt-4 space-y-2'>
                  {stage.items.map((item) => (
                    <li key={item} className='flex items-start gap-2 text-xs leading-[1.6] text-baolam-muted'>
                      <span className='mt-1.5 h-1 w-1 shrink-0 rounded-full bg-baolam-primary/60' />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <div className='mt-14'>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
              {c(CONCEPT_VISUAL_STAGES).map((stage, i) => (
                <div key={stage} className='flex flex-col gap-2'>
                  <div className='aspect-square w-full overflow-hidden rounded-lg border border-ink/10'>
                    <PlaceholderVisual cmsBlock="artwork.ConceptToInstallation" label={stage} tag='' seed={i + 3} className='h-full w-full' />
                  </div>
                  <span className='text-center text-[10px] font-bold uppercase tracking-wider text-subtle-40'>
                    {i + 1}{c(". ")}{stage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------- Material & Craft ------------------------------- */

function MaterialAndCraft() {
  const c = useCmsBlock("artwork.MaterialAndCraft");
  return (
    <section className='scroll-mt-20 border-t border-ink/10 bg-canvas py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>{c("Material & Craft")}</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>{c("Vật liệu là một phần")}<br />{c("của ngôn ngữ nghệ thuật.")}</h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className='mt-12'>
            <ArtworkMaterialExplorer cmsBlock="artwork.MaterialAndCraft" materials={c(ARTWORK_MATERIALS)} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------------------- Engineering behind the artwork ---------------------------- */

const ENGINEERING_CONSIDERATIONS = [
  'Phân tích kết cấu',
  'Tải trọng gió',
  'Chống rung/lật',
  'Chia module',
  'Liên kết',
  'Chống ăn mòn',
  'Thoát nước',
  'Điện và chiếu sáng',
  'An toàn sử dụng',
  'Bảo trì và thay thế',
  'Vận chuyển và cẩu lắp',
] as const;

function EngineeringBehind() {
  const c = useCmsBlock("artwork.EngineeringBehind");
  return (
    <section className='scroll-mt-20 border-t border-ink/10 bg-canvas py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <ScrollReveal direction='left'>
            <SectionEyebrow>{c("Engineering Behind the Artwork")}</SectionEyebrow>
            <h2 className='max-w-md text-3xl font-black leading-[1.15] sm:text-4xl'>{c("Phía sau hình thức nghệ thuật là một bài toán kỹ thuật.")}</h2>
            <p className='mt-6 max-w-md text-sm leading-[1.8] text-baolam-muted sm:text-base'>{c("Một artwork ngoài trời phải đáp ứng đồng thời yêu cầu về hình thức, kết cấu, môi trường, an toàn và khả năng bảo trì. Các giải pháp kỹ thuật được phát triển song song với thiết kế, không phải bổ sung sau khi ý tưởng đã hoàn thành.")}</p>
          </ScrollReveal>
          <ScrollReveal direction='right' delay={80}>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>{c("Các yếu tố kỹ thuật được xem xét")}</h3>
            <div className='mt-4'>
              <ScopeList items={c(ENGINEERING_CONSIDERATIONS)} columns={2} />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={120}>
          <div className='mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {c(['Exploded view', 'Bản vẽ liên kết', 'Mô hình 3D', 'Ảnh cẩu lắp']).map((label, i) => (
              <div key={label} className='aspect-[4/3] overflow-hidden rounded-xl border border-ink/10'>
                <PlaceholderVisual cmsBlock="artwork.EngineeringBehind" label={label} tag='' seed={i + 2} className='h-full w-full' />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------- In-house fabrication ------------------------------- */

function InHouseFabrication() {
  const c = useCmsBlock("artwork.InHouseFabrication");
  return (
    <section className='scroll-mt-20 border-t border-ink/10 bg-canvas py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>{c("In-house Fabrication")}</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>{c("Nơi ý tưởng được hình thành")}<br />{c("bằng vật liệu thật.")}</h2>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {c([
            ['Địa điểm nhà máy', '[Cập nhật sau]'],
            ['Diện tích', '[XX] m²'],
            ['Đội ngũ kỹ thuật', '[XX] người'],
            ['Kích thước artwork tối đa', '[XX] m'],
          ]).map(([label, value]) => (
            <ScrollReveal key={label}>
              <div className='rounded-xl border border-ink/10 bg-ink/[0.03] p-5'>
                <p className='text-lg font-black text-baolam-primary'>{value}</p>
                <p className='mt-1 text-[10px] uppercase tracking-wider text-baolam-muted'>{label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={80}>
          <div className='mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2'>
            {c(FACTORY_INFO).map((item) => (
              <div key={item.id} className='rounded-2xl border border-ink/10 bg-ink/[0.03] p-6'>
                <h4 className='text-base font-bold text-ink'>{item.title}</h4>
                <p className='mt-2 text-sm leading-[1.7] text-baolam-muted'>{item.description}</p>
                <ul className='mt-4 flex flex-wrap gap-2'>
                  {(item.specs ?? []).map((spec) => (
                    <li
                      key={spec}
                      className='rounded-full border border-baolam-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-baolam-primary'
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <Link
            href={c("/factory")}
            className='mt-10 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary hover:text-ink'
          >{c("Khám phá nhà máy →")}</Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------- Featured case study ------------------------------- */

const CASE_STUDY_NARRATIVE = [
  {
    title: 'The Context',
    body: 'Artwork được đặt tại một điểm giao thông chính của dự án, nơi cần một điểm nhấn có thể nhận diện từ nhiều góc tiếp cận khác nhau.',
  },
  {
    title: 'The Idea',
    body: 'Ý tưởng hình khối được phát triển từ đặc trưng địa phương, kết hợp giữa ngôn ngữ điêu khắc hiện đại và cảm hứng bản địa.',
  },
  {
    title: 'The Challenge',
    body: 'Kích thước lớn, hình khối phức tạp và yêu cầu vận chuyển, lắp đặt trong không gian có nhiều hạng mục thi công song song.',
  },
  {
    title: 'The Making',
    body: 'Từ mô hình tỷ lệ, mẫu vật liệu đến gia công và hoàn thiện bề mặt tại nhà máy, mỗi giai đoạn đều được kiểm tra trước khi chuyển sang bước tiếp theo.',
  },
  {
    title: 'The Installation',
    body: 'Artwork được chia module để vận chuyển, cẩu lắp và liên kết tại công trường theo đúng bản vẽ kỹ thuật đã duyệt.',
  },
  {
    title: 'The Result',
    body: 'Tác phẩm trở thành điểm nhận diện của khu vực, đồng thời là nơi diễn ra các hoạt động check-in và trải nghiệm của cư dân, khách tham quan.',
  },
] as const;

const CASE_STUDY_VISUAL_STAGES = [
  'Ảnh bối cảnh',
  'Sketch',
  'Render',
  'Bản vẽ kỹ thuật',
  'Mockup',
  'Gia công',
  'Cẩu lắp',
  'Ảnh hoàn thiện',
];

function FeaturedCaseStudy() {
  const c = useCmsBlock("artwork.FeaturedCaseStudy");
  return (
    <section className='scroll-mt-20 border-t border-ink/10 bg-canvas py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>{c("Case Study")}</SectionEyebrow>
          <h2 className='max-w-2xl text-3xl font-black leading-[1.1] sm:text-4xl'>{c("[Tên artwork tiêu biểu]")}</h2>
        </ScrollReveal>

        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {c(CASE_STUDY_NARRATIVE).map((block, i) => (
            <ScrollReveal key={block.title} delay={i * 60}>
              <div className='h-full rounded-2xl border border-ink/10 bg-ink/[0.03] p-6'>
                <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>{block.title}</h3>
                <p className='mt-3 text-sm leading-[1.7] text-baolam-muted'>{block.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <div className='mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8'>
            {c(CASE_STUDY_VISUAL_STAGES).map((stage, i) => (
              <div key={stage} className='flex flex-col gap-2'>
                <div className='aspect-square w-full overflow-hidden rounded-lg border border-ink/10'>
                  <PlaceholderVisual cmsBlock="artwork.FeaturedCaseStudy" label={stage} tag='' seed={i + 1} className='h-full w-full' />
                </div>
                <span className='text-center text-[9px] font-bold uppercase tracking-wider text-subtle-40'>{stage}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <span className='mt-10 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary'>{c("Xem toàn bộ câu chuyện →")}</span>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ----------------------------------- Stats ----------------------------------- */

const STATS = [
  ['15+', 'Năm kinh nghiệm'],
  ['500+', 'Công trình'],
  ['20.000+', 'm² Nhà máy'],
  ['100+', 'Kỹ sư & nhân sự'],
] as const;

function StatsBar() {
  const c = useCmsBlock("artwork.StatsBar");
  return (
    <section className='border-t border-ink/10 bg-canvas py-14'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='flex items-center justify-center'>
          <div className='grid grid-cols-2 items-center gap-x-16 gap-y-8 sm:grid-cols-4'>
            {c(STATS).map(([value, label]) => (
              <div key={label} className='text-center'>
                <p className='text-2xl font-black text-baolam-primary sm:text-3xl'>{value}</p>
                <p className='mt-1 text-[10px] uppercase tracking-wider text-baolam-muted'>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/home/placeholder-visual';
import { SiteFooter } from '@/components/site-footer';
import { SignatureProjectExplorer } from '@/components/projects/signature-project-explorer';
import { SIGNATURE_PROJECTS, type SignatureProject } from '@/data/signature-projects';

export const metadata: Metadata = {
  title: 'Dự án biểu tượng | Bảo Lâm',
  description:
    'Những dự án đại diện cho cách Bảo Lâm kết nối thiết kế, kỹ thuật và năng lực triển khai để tạo nên các công trình có bản sắc và giá trị sử dụng lâu dài.',
};

export default function SignatureProjectsPage() {
  const [spotlight, ...rest] = SIGNATURE_PROJECTS;
  const caseStudy = rest[0];

  return (
    <main className='min-h-screen w-full overflow-x-clip bg-[#030914] pt-16 font-sans text-white sm:pt-20'>
      <Hero />
      {spotlight && <Spotlight project={spotlight} />}
      <ProjectIndex projects={SIGNATURE_PROJECTS} />
      {caseStudy && <CaseStudyBreak project={caseStudy} />}
      <StatsBar />
      <SiteFooter />
    </main>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className='relative w-full overflow-hidden border-b border-white/10'>
      <div className='relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]'>
        <PlaceholderVisual label='Signature Projects' tag='Dự án biểu tượng' seed={1} className='absolute inset-0' />
        <div
          className='absolute inset-0'
          style={{
            background: 'linear-gradient(to bottom, rgba(3,9,20,0.25) 0%, rgba(3,9,20,0.6) 60%, rgba(3,9,20,0.97) 100%)',
          }}
        />
        <div className='relative z-10 flex h-full w-full items-end'>
          <div className='mx-auto w-full max-w-7xl px-6 pb-10 lg:px-12'>
            <span className='motion-hero-meta mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary sm:text-xs'>
              Signature Projects
            </span>
            <h1 className='motion-hero-title max-w-3xl text-[32px] font-black leading-[1.1] sm:text-5xl lg:text-6xl'>
              Dự án
              <br />
              <span className='text-baolam-primary drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]'>
                biểu tượng.
              </span>
            </h1>
            <p className='motion-hero-location mt-5 max-w-xl text-sm leading-[1.7] text-baolam-muted sm:text-base'>
              Những dự án đại diện cho cách Bảo Lâm kết nối thiết kế, kỹ thuật
              và năng lực triển khai để tạo nên các công trình có bản sắc và
              giá trị sử dụng lâu dài.
            </p>
            <span className='mt-6 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/40'>
              Công trình biểu tượng · Kiến trúc điểm nhấn · Artwork cảnh quan
            </span>
            <a
              href='#index'
              className='mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:text-baolam-primary'
            >
              Khám phá dự án ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Spotlight -------------------------------- */

function Spotlight({ project }: { project: SignatureProject }) {
  const meta = [project.location, project.completionYear].filter(Boolean).join(' · ');
  const scope = [project.category, project.scopeLabel].filter(Boolean).join(' · ');

  return (
    <section className='scroll-mt-20 border-b border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[65%_35%] lg:gap-12'>
          <ScrollReveal direction='scale'>
            <div className='aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 sm:aspect-[16/10]'>
              <PlaceholderVisual label={project.category} seed={2} className='h-full w-full' />
            </div>
          </ScrollReveal>
          <ScrollReveal direction='right' delay={100} className='flex flex-col justify-center'>
            <span className='text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary'>
              01 / Featured Project
            </span>
            <h2 className='mt-3 text-2xl font-black leading-[1.1] sm:text-3xl'>{project.title}</h2>
            {meta && <p className='mt-3 text-sm text-baolam-muted'>{meta}</p>}
            {scope && (
              <span className='mt-3 inline-block w-fit rounded-full border border-baolam-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-baolam-primary'>
                {scope}
              </span>
            )}
            {project.description && (
              <p className='mt-5 text-sm leading-[1.7] text-baolam-muted'>{project.description}</p>
            )}
            <span className='mt-6 inline-flex w-fit items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary'>
              Khám phá dự án →
            </span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Project index ------------------------------- */

function ProjectIndex({ projects }: { projects: SignatureProject[] }) {
  return (
    <section id='index' className='scroll-mt-20 border-b border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <span className='mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary'>
            Project Index
          </span>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl'>
            Khám phá dự án
          </h2>
        </ScrollReveal>

        <div className='mt-10'>
          {projects.length ? (
            <SignatureProjectExplorer projects={projects} />
          ) : (
            <p className='text-sm text-baolam-muted'>
              Danh sách dự án biểu tượng sẽ sớm được cập nhật tại đây.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Case study break ------------------------------ */

function CaseStudyBreak({ project }: { project: SignatureProject }) {
  const meta = [project.client, project.location, project.completionYear].filter(Boolean).join(' · ');

  return (
    <section className='scroll-mt-20 border-b border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <ScrollReveal direction='left' className='space-y-6 lg:sticky lg:top-24 lg:self-start'>
            <div>
              <span className='mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary'>
                Case Study
              </span>
              <h2 className='max-w-md text-3xl font-black leading-[1.1] sm:text-4xl'>
                {project.title}
              </h2>
              {meta && <p className='mt-3 text-sm text-baolam-muted'>{meta}</p>}
            </div>
            <p className='max-w-md text-sm leading-[1.8] text-baolam-muted sm:text-base'>
              {project.description ||
                'Một hành trình đầy đủ từ ý tưởng thiết kế, phát triển kỹ thuật đến thi công và bàn giao.'}
            </p>
            <span className='inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary'>
              Xem case study →
            </span>
          </ScrollReveal>

          <ScrollReveal direction='right'>
            <div className='aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 sm:aspect-[4/3]'>
              <PlaceholderVisual label={project.category} seed={3} className='h-full w-full' />
            </div>
          </ScrollReveal>
        </div>
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
  return (
    <section className='border-b border-white/10 bg-[#030914] py-14'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='flex items-center justify-center'>
          <div className='grid grid-cols-2 items-center gap-x-16 gap-y-8 sm:grid-cols-4'>
            {STATS.map(([value, label]) => (
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

import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/home/placeholder-visual';
import { ContactModalTrigger } from '@/components/contact/contact-modal-trigger';
import { SiteFooter } from '@/components/site-footer';
import { ArtworkTypologyExplorer } from '@/components/artwork/artwork-typology-explorer';
import { ArtworkMaterialExplorer } from '@/components/artwork/artwork-material-explorer';
import { FACTORY_ZONES } from '@/data/factory-zones';
import { FACTORY_PRODUCT_GROUPS } from '@/data/factory-products';
import { FACTORY_MATERIALS } from '@/data/factory-materials';
import { SIGNATURE_PROJECTS } from '@/data/signature-projects';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Nhà máy | Bảo Lâm',
  description:
    'Nhà máy Bảo Lâm chủ động sản xuất artwork cảnh quan và cấu kiện kiến trúc theo thiết kế riêng — từ prototype, gia công đến hoàn thiện và lắp đặt.',
};

export default function FactoryPage() {
  const featuredProjects = SIGNATURE_PROJECTS.slice(0, 4);

  return (
    <main className='min-h-screen w-full overflow-x-clip bg-[#030914] pt-16 font-sans text-white sm:pt-20'>
      <Hero />
      <FactoryOverview />
      <StatsBar />
      <IntegratedDelivery />
      <FactoryZones />
      <ProductGroups />
      <MaterialAndCraft />
      <Equipment />
      <ProductionProcess />
      <PrototypeMockup />
      <QualityControl />
      <PeopleAndSafety />
      <FactoryToSite />
      <FeaturedProjects projects={featuredProjects} />
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

function FlowChips({ steps }: { steps: readonly string[] }) {
  return (
    <div className='flex flex-wrap items-center gap-x-2 gap-y-4'>
      {steps.map((step, i) => (
        <div key={step} className='flex items-center gap-2'>
          <span className='rounded-full border border-baolam-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/80'>
            {step}
          </span>
          {i < steps.length - 1 && <span className='text-baolam-primary/60'>→</span>}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className='relative flex min-h-[85dvh] w-full items-end overflow-hidden'>
      <PlaceholderVisual label='Manufacturing' tag='Nhà máy Bảo Lâm' seed={2} className='absolute inset-0' />
      <div
        className='absolute inset-0'
        style={{
          background: 'linear-gradient(to bottom, rgba(3,9,20,0.3) 0%, rgba(3,9,20,0.55) 55%, rgba(3,9,20,0.96) 100%)',
        }}
      />
      <div className='relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:pb-20 lg:px-12'>
        <span className='motion-hero-meta mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary sm:text-xs'>
          Manufacturing
        </span>
        <h1 className='motion-hero-title max-w-3xl text-[34px] font-black leading-[1.08] sm:text-5xl lg:text-6xl'>
          Nơi ý tưởng được hình thành
          <br />
          <span className='text-baolam-primary drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]'>
            bằng vật liệu thật.
          </span>
        </h1>
        <p className='motion-hero-location mt-5 max-w-xl text-sm leading-[1.7] text-baolam-muted sm:text-base'>
          Năng lực sản xuất nội bộ giúp Bảo Lâm chủ động phát triển các sản
          phẩm và artwork cảnh quan theo thiết kế riêng, từ prototype, gia
          công đến hoàn thiện và lắp đặt.
        </p>
        <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
          <a
            href='#overview'
            className='inline-flex items-center justify-center gap-2 rounded bg-baolam-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#071522] shadow-[0_4px_15px_rgba(0,229,255,0.3)] transition-colors hover:bg-baolam-primary-hover'
          >
            Khám phá nhà máy ↓
          </a>
          <ContactModalTrigger
            source='factory-hero'
            className='inline-flex items-center justify-center gap-2 rounded border border-white/20 px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:border-baolam-primary hover:text-baolam-primary'
          >
            Trao đổi về sản xuất →
          </ContactModalTrigger>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Factory overview ------------------------------- */

function FactoryOverview() {
  return (
    <section id='overview' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-[45%_55%] lg:gap-16'>
          <ScrollReveal direction='left'>
            <SectionEyebrow>Factory Overview</SectionEyebrow>
            <h2 className='max-w-md text-3xl font-black leading-[1.15] sm:text-4xl'>
              Một nền tảng sản xuất dành cho những thiết kế riêng.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction='right' delay={80}>
            <p className='max-w-xl text-sm leading-[1.8] text-baolam-muted sm:text-base'>
              Nhà máy Bảo Lâm được tổ chức để phục vụ các sản phẩm cảnh quan,
              artwork và cấu kiện kiến trúc có tính đặc thù. Thiết kế, kỹ
              thuật và sản xuất phối hợp trong cùng một quy trình nhằm kiểm
              soát khả năng chế tạo, chất lượng hoàn thiện và tiến độ giao
              hàng.
            </p>
            <div className='mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10'>
              <PlaceholderVisual label='Mặt bằng nhà máy' tag='Flycam' seed={3} className='h-full w-full' />
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
    <section className='border-t border-white/10 bg-[#030914] py-14'>
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

/* ---------------------------- Integrated delivery ---------------------------- */

const DELIVERY_STAGES = [
  'Concept Design',
  'Technical Development',
  'Prototype & Mockup',
  'Factory Production',
  'Quality Control',
  'Transportation',
  'Site Installation',
];

function IntegratedDelivery() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Integrated Delivery</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Kết nối thiết kế, sản xuất và công trường.
          </h2>
          <p className='mt-6 max-w-2xl text-sm leading-[1.8] text-baolam-muted sm:text-base'>
            Sự phối hợp sớm giữa đội ngũ thiết kế, kỹ thuật và nhà máy giúp
            phát hiện những vấn đề về vật liệu, kết cấu, kích thước và
            phương án lắp đặt trước khi sản xuất hàng loạt.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className='mt-10'>
            <FlowChips steps={DELIVERY_STAGES} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -------------------------------- Factory zones -------------------------------- */

function FactoryZones() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Factory Zones</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Một hệ thống được tổ chức theo từng công đoạn.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className='mt-12'>
            <ArtworkTypologyExplorer typologies={FACTORY_ZONES} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -------------------------------- Product groups -------------------------------- */

function ProductGroups() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>What We Make</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Sản xuất theo yêu cầu của từng dự án.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className='mt-12'>
            <ArtworkTypologyExplorer typologies={FACTORY_PRODUCT_GROUPS} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------- Material & craft ------------------------------- */

const FABRICATION_TECHNIQUES = [
  'Laser/plasma cutting',
  'Uốn, chấn, lốc',
  'Hàn',
  'Đúc',
  'CNC',
  'Tạo hình thủ công',
  'Đánh bóng',
  'Tạo texture',
  'Sơn hoàn thiện',
  'Xử lý chống ăn mòn',
  'Lắp ráp module',
] as const;

function MaterialAndCraft() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Material & Craft</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Hiểu vật liệu để kiểm soát hình thức.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className='mt-12'>
            <ArtworkMaterialExplorer materials={FACTORY_MATERIALS} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className='mt-14'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>Kỹ thuật gia công</h3>
            <div className='mt-4'>
              <ScopeList items={FABRICATION_TECHNIQUES} columns={3} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Equipment ---------------------------------- */

const EQUIPMENT_GROUPS = [
  {
    n: '01',
    tag: 'CUTTING',
    title: 'Laser & Plasma Cutting',
    body: 'Gia công các chi tiết kim loại theo bản vẽ kỹ thuật, phục vụ cấu kiện và artwork có hình dạng phức tạp.',
    specs: ['Working area: [Cập nhật sau]', 'Material thickness: [Cập nhật sau]'],
  },
  {
    n: '02',
    tag: 'FORMING',
    title: 'CNC Forming & Sculpting',
    body: 'Ứng dụng robot CNC đa trục vào tạo hình, gia công khối vật liệu lớn với độ chính xác cao, làm khuôn mẫu cho các tác phẩm quy mô.',
    specs: ['Robot gia công 5 trục', 'Độ chính xác 0.1mm', 'Kích thước phôi tối đa 10m'],
  },
  {
    n: '03',
    tag: 'WELDING',
    title: 'Welding & Structural Assembly',
    body: 'Hàn và lắp ráp kết cấu chịu lực, kiểm tra kích thước và lắp thử module trước khi chuyển sang hoàn thiện.',
    specs: ['Working area: [Cập nhật sau]', 'Tải trọng kết cấu: [Cập nhật sau]'],
  },
  {
    n: '04',
    tag: 'SURFACE',
    title: 'Surface Treatment',
    body: 'Mài, đánh bóng, tạo texture và xử lý chống ăn mòn cho bề mặt kim loại, đá và composite.',
    specs: ['Nhóm vật liệu: kim loại, đá, composite'],
  },
  {
    n: '05',
    tag: 'PAINTING',
    title: 'Painting & Finishing',
    body: 'Sơn tĩnh điện và phủ bảo vệ, đảm bảo độ bền màu và khả năng chịu điều kiện ngoài trời lâu dài.',
    specs: ['Công nghệ chống ăn mòn UV'],
  },
  {
    n: '06',
    tag: 'ASSEMBLY',
    title: 'Foundry & Composite Workshop',
    body: 'Hệ thống lò đúc và phân xưởng composite hiện đại, đáp ứng tiêu chuẩn khắt khe cho các công trình đặt ngoài trời, chịu tải trọng và thời tiết khắc nghiệt.',
    specs: ['Công suất 1000 tấn/năm'],
  },
] as const;

function Equipment() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Máy móc & thiết bị</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Năng lực gia công chính.
          </h2>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2'>
          {EQUIPMENT_GROUPS.map((item, i) => (
            <ScrollReveal key={item.n} delay={i * 60}>
              <div className='overflow-hidden rounded-2xl border border-white/10'>
                <div className='aspect-[16/9] w-full'>
                  <PlaceholderVisual label={item.tag} seed={i + 4} className='h-full w-full' />
                </div>
                <div className='border-t border-white/10 bg-white/[0.03] p-6'>
                  <span className='text-xs font-black text-baolam-primary'>
                    {item.n} / {item.tag}
                  </span>
                  <h3 className='mt-2 text-base font-bold text-white'>{item.title}</h3>
                  <p className='mt-2 text-sm leading-[1.7] text-baolam-muted'>{item.body}</p>
                  <ul className='mt-4 flex flex-wrap gap-2'>
                    {item.specs.map((spec) => (
                      <li
                        key={spec}
                        className='rounded-full border border-baolam-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-baolam-primary'
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Production process ------------------------------- */

const PRODUCTION_STEPS = [
  {
    n: '01',
    title: 'Tiếp nhận hồ sơ',
    items: ['Thiết kế', 'Yêu cầu vật liệu', 'Kích thước', 'Tiêu chuẩn hoàn thiện'],
  },
  {
    n: '02',
    title: 'Technical Review',
    items: ['Kiểm tra khả năng chế tạo', 'Kết cấu', 'Liên kết', 'Chia module', 'Phương án vận chuyển'],
  },
  {
    n: '03',
    title: 'Shop Drawing',
    items: ['Chi tiết sản xuất', 'Quy cách vật liệu', 'Dung sai', 'Trình tự lắp ráp'],
  },
  {
    n: '04',
    title: 'Material Approval',
    items: ['Mẫu vật liệu', 'Màu sắc', 'Texture', 'Mẫu bề mặt'],
  },
  {
    n: '05',
    title: 'Prototype & Mockup',
    items: ['Mẫu tỷ lệ', 'Prototype 1:1', 'Kiểm tra và điều chỉnh'],
  },
  {
    n: '06',
    title: 'Fabrication',
    items: ['Cắt', 'Tạo hình', 'Hàn', 'Lắp ráp', 'Hoàn thiện'],
  },
  {
    n: '07',
    title: 'Quality Control',
    items: ['Kích thước', 'Kết cấu', 'Bề mặt', 'Màu sắc', 'Lắp thử'],
  },
  {
    n: '08',
    title: 'Packing & Delivery',
    items: ['Chia module', 'Đánh mã', 'Bảo vệ bề mặt', 'Vận chuyển', 'Bàn giao công trường'],
  },
] as const;

function ProductionProcess() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Production Process</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Kiểm soát từng bước trước khi xuất xưởng.
          </h2>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
          {PRODUCTION_STEPS.map((step, i) => (
            <ScrollReveal key={step.n} delay={i * 50}>
              <div className='h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6'>
                <span className='text-xs font-black text-baolam-primary'>{step.n}</span>
                <h3 className='mt-2 text-sm font-bold uppercase tracking-wide text-white'>{step.title}</h3>
                <ul className='mt-4 space-y-2'>
                  {step.items.map((item) => (
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
      </div>
    </section>
  );
}

/* ------------------------------- Prototype & mockup ------------------------------- */

const PROTOTYPE_STAGES = ['Sketch', 'Mô hình nhỏ', 'Prototype 1:1', 'Sản phẩm hoàn chỉnh'];

function PrototypeMockup() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <ScrollReveal direction='left'>
            <SectionEyebrow>Prototype & Mockup</SectionEyebrow>
            <h2 className='max-w-md text-3xl font-black leading-[1.15] sm:text-4xl'>
              Thử nghiệm trước khi sản xuất hoàn chỉnh.
            </h2>
            <p className='mt-6 max-w-md text-sm leading-[1.8] text-baolam-muted sm:text-base'>
              Prototype và mockup giúp đánh giá tỷ lệ, vật liệu, màu sắc,
              liên kết và chất lượng bề mặt trước khi bước vào sản xuất chính
              thức. Những điều chỉnh được thực hiện trên mẫu thật giúp giảm
              rủi ro tại công trường.
            </p>
          </ScrollReveal>

          <ScrollReveal direction='right' delay={80}>
            <div className='grid grid-cols-2 gap-3'>
              {PROTOTYPE_STAGES.map((stage, i) => (
                <div key={stage} className='flex flex-col gap-2'>
                  <div className='aspect-square w-full overflow-hidden rounded-lg border border-white/10'>
                    <PlaceholderVisual label={stage} tag='' seed={i + 5} className='h-full w-full' />
                  </div>
                  <span className='text-center text-[10px] font-bold uppercase tracking-wider text-white/40'>
                    {i + 1}. {stage}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Quality control -------------------------------- */

const QC_CHECKPOINTS = [
  { title: 'IQC', body: 'Kiểm tra nguyên vật liệu đầu vào' },
  { title: 'IPQC', body: 'Kiểm tra trong quá trình sản xuất' },
  { title: 'Assembly Check', body: 'Kiểm tra kích thước và lắp thử' },
  { title: 'Surface Inspection', body: 'Kiểm tra màu sắc và bề mặt' },
  { title: 'Final Inspection', body: 'Kiểm tra trước khi đóng gói' },
  { title: 'Site Acceptance', body: 'Kiểm tra sau vận chuyển và lắp đặt' },
] as const;

const QC_EVIDENCE = [
  'Checklist',
  'Mẫu duyệt',
  'Ảnh đo kích thước',
  'Ảnh kiểm tra mối hàn',
  'Ảnh lắp thử',
  'Tem/mã kiểm soát',
] as const;

function QualityControl() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Quality Control</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Chất lượng được xây dựng trong từng công đoạn.
          </h2>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {QC_CHECKPOINTS.map((checkpoint, i) => (
            <ScrollReveal key={checkpoint.title} delay={i * 50}>
              <div className='rounded-2xl border border-white/10 bg-white/[0.03] p-5'>
                <h3 className='text-sm font-bold uppercase tracking-wide text-baolam-primary'>{checkpoint.title}</h3>
                <p className='mt-2 text-sm leading-[1.6] text-baolam-muted'>{checkpoint.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <div className='mt-14'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>Bằng chứng kiểm soát</h3>
            <div className='mt-4'>
              <ScopeList items={QC_EVIDENCE} columns={3} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -------------------------------- People & safety -------------------------------- */

const TEAM_ROLES = [
  'Kỹ sư sản xuất',
  'Kỹ thuật viên',
  'Thợ hàn',
  'Thợ hoàn thiện',
  'QC',
  'Quản lý nhà máy',
  'Đội đóng gói và vận chuyển',
] as const;

const SAFETY_PRACTICES = [
  'Trang bị bảo hộ',
  'Khu vực làm việc phân luồng',
  'Kiểm soát cháy nổ',
  'Huấn luyện thiết bị',
  'Quy trình nâng hạ',
  'Quản lý hóa chất và sơn',
] as const;

function PeopleAndSafety() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>People & Safety</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Tay nghề, kỷ luật và trách nhiệm.
          </h2>
        </ScrollReveal>

        <div className='mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <ScrollReveal delay={60}>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>Đội ngũ</h3>
            <div className='mt-4'>
              <ScopeList items={TEAM_ROLES} columns={2} />
            </div>
          </ScrollReveal>
          <ScrollReveal direction='right' delay={100}>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>An toàn</h3>
            <div className='mt-4'>
              <ScopeList items={SAFETY_PRACTICES} columns={2} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Factory to site -------------------------------- */

const LOGISTICS_STEPS = [
  'Chia module',
  'Đánh mã cấu kiện',
  'Bảo vệ bề mặt',
  'Thiết kế khung đóng gói',
  'Kế hoạch nâng hạ',
  'Vận chuyển hàng quá khổ nếu có',
  'Cẩu lắp',
  'Lắp ráp tại hiện trường',
  'Hoàn thiện và nghiệm thu',
] as const;

const LOGISTICS_VISUAL_STAGES = ['Lắp thử tại nhà máy', 'Đóng gói', 'Vận chuyển', 'Cẩu lắp', 'Công trình hoàn thiện'];

function FactoryToSite() {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>From Factory to Site</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Sản xuất hoàn chỉnh chưa phải là bước cuối.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className='mt-10'>
            <ScopeList items={LOGISTICS_STEPS} columns={3} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className='mt-12 grid grid-cols-2 gap-3 sm:grid-cols-5'>
            {LOGISTICS_VISUAL_STAGES.map((stage, i) => (
              <div key={stage} className='flex flex-col gap-2'>
                <div className='aspect-square w-full overflow-hidden rounded-lg border border-white/10'>
                  <PlaceholderVisual label={stage} tag='' seed={i + 6} className='h-full w-full' />
                </div>
                <span className='text-center text-[10px] font-bold uppercase tracking-wider text-white/40'>
                  {i + 1}. {stage}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -------------------------------- Featured projects -------------------------------- */

function FeaturedProjects({ projects }: { projects: typeof SIGNATURE_PROJECTS }) {
  return (
    <section className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Factory-built Projects</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Năng lực được chứng minh bằng sản phẩm thực tế.
          </h2>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2'>
          {projects.map((project, i) => {
            const meta = [project.location, project.completionYear].filter(Boolean).join(' · ');
            const scope = [project.category, project.scopeLabel].filter(Boolean).join(' · ');
            return (
              <ScrollReveal key={project.id} delay={i * 60}>
                <div className='overflow-hidden rounded-2xl border border-white/10'>
                  <div className='aspect-[4/3] w-full'>
                    <PlaceholderVisual label={project.category} seed={i + 7} className='h-full w-full' />
                  </div>
                  <div className='border-t border-white/10 bg-white/[0.03] p-6'>
                    <h3 className='text-lg font-bold text-white'>{project.title}</h3>
                    <p className='mt-1 text-xs text-baolam-muted'>{meta}</p>
                    {scope && (
                      <span className='mt-3 inline-block w-fit rounded-full border border-baolam-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-baolam-primary'>
                        {scope}
                      </span>
                    )}
                    <span className='mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary'>
                      Xem dự án →
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

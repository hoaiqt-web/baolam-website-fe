import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/home/placeholder-visual';
import { ContactModalTrigger } from '@/components/contact/contact-modal-trigger';
import { CapabilityOverviewGroups } from '@/components/capabilities/capability-overview-groups';
import { SiteFooter } from '@/components/site-footer';
import { FACTORY_INFO } from '@/data/factory';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Năng lực | Bảo Lâm',
  description:
    'Bảo Lâm kết nối kiến trúc cảnh quan, kỹ thuật, sản xuất và thi công trong một quy trình Design & Build thống nhất — từ ý tưởng thiết kế đến công trình hoàn thiện.',
};

export default function CapabilitiesPage() {
  return (
    <main className='min-h-screen w-full overflow-x-clip bg-[#030914] pt-16 font-sans text-white sm:pt-20'>
      <Hero />
      <CapabilityOverview />
      <DesignBuildChain />
      <DesignCapability />
      <ArtworkCapability />
      <TechnicalCapability />
      <FactoryCapability />
      <ConstructionCapability />
      <QualityControl />
      <TeamAndStats />
      <ProofProjects />
      <SiteFooter />
    </main>
  );
}

/* -------------------------------- Shared bits -------------------------------- */

function ScopeList({
  items,
  columns = 2,
}: {
  items: readonly string[];
  columns?: 1 | 2 | 3;
}) {
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

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className='mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary'>
      {children}
    </span>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

const HERO_STAGES = [
  'Sketch / Masterplan',
  'Mô hình 3D',
  'Sản xuất nhà máy',
  'Thi công hiện trường',
  'Công trình hoàn thiện',
];

function Hero() {
  return (
    <section className='relative w-full overflow-hidden border-b border-white/10'>
      <div className='relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]'>
        <PlaceholderVisual label='Capabilities' tag='Design & Build' seed={1} className='absolute inset-0' />
        <div
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(to bottom, rgba(3,9,20,0.2) 0%, rgba(3,9,20,0.55) 60%, rgba(3,9,20,0.97) 100%)',
          }}
        />
        <div className='relative z-10 flex h-full w-full items-end'>
          <div className='mx-auto w-full max-w-7xl px-6 pb-10 lg:px-12'>
            <span className='motion-hero-meta mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary sm:text-xs'>
              CAPABILITIES
            </span>
            <h1 className='motion-hero-title max-w-3xl text-[32px] font-black leading-[1.1] sm:text-5xl lg:text-6xl'>
              Từ ý tưởng thiết kế
              <br />
              <span className='text-baolam-primary drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]'>
                đến công trình hoàn thiện.
              </span>
            </h1>
            <p className='motion-hero-location mt-5 max-w-xl text-sm leading-[1.7] text-baolam-muted sm:text-base'>
              Bảo Lâm kết nối kiến trúc cảnh quan, kỹ thuật, sản xuất và thi
              công trong một quy trình thống nhất nhằm kiểm soát chất lượng,
              tiến độ và tính khả thi của từng dự án.
            </p>
            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <a
                href='#overview'
                className='inline-flex items-center justify-center gap-2 rounded bg-baolam-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#071522] shadow-[0_4px_15px_rgba(0,229,255,0.3)] transition-colors hover:bg-baolam-primary-hover'
              >
                Khám phá năng lực ↓
              </a>
              <ContactModalTrigger
                source='capabilities-hero'
                className='inline-flex items-center justify-center gap-2 rounded border border-white/20 px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:border-baolam-primary hover:text-baolam-primary'
              >
                Trao đổi về dự án →
              </ContactModalTrigger>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-white/10 bg-[#030914]'>
        <div className='mx-auto max-w-7xl px-6 py-6 lg:px-12'>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-5'>
            {HERO_STAGES.map((stage, i) => (
              <div key={stage} className='flex flex-col gap-2'>
                <div className='aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10'>
                  <PlaceholderVisual label={stage} tag='' seed={i + 2} className='h-full w-full' />
                </div>
                <span className='text-[10px] font-bold uppercase tracking-wider text-white/40'>
                  {String(i + 1).padStart(2, '0')} · {stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Capability overview ----------------------------- */

function CapabilityOverview() {
  return (
    <section id='overview' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <div className='grid gap-8 lg:grid-cols-2 lg:gap-16'>
            <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
              Một hệ thống năng lực
              <br />
              xuyên suốt vòng đời dự án.
            </h2>
            <p className='max-w-xl text-sm leading-[1.8] text-baolam-muted sm:text-base'>
              Chúng tôi tiếp cận dự án từ bối cảnh thực tế của khu đất, mục
              tiêu đầu tư và trải nghiệm sử dụng. Đội ngũ thiết kế, kỹ thuật,
              sản xuất và thi công phối hợp từ những giai đoạn đầu tiên để mỗi
              giải pháp vừa có giá trị thẩm mỹ, vừa phù hợp với ngân sách và
              điều kiện triển khai thực tế.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <CapabilityOverviewGroups />
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------ Design & Build chain ------------------------------ */

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Khảo sát và phân tích',
    items: [
      'Khảo sát hiện trạng',
      'Địa hình và cao độ',
      'Thổ nhưỡng, khí hậu',
      'Cây và hệ sinh thái hiện trạng',
      'Nhu cầu sử dụng',
      'Yêu cầu của chủ đầu tư',
    ],
  },
  {
    n: '02',
    title: 'Chiến lược và concept',
    items: [
      'Landscape masterplan',
      'Ý tưởng chủ đạo',
      'Phân khu chức năng',
      'Trải nghiệm và tuyến di chuyển',
      'Moodboard',
      'Định hướng cây và vật liệu',
    ],
  },
  {
    n: '03',
    title: 'Phát triển thiết kế',
    items: [
      'Thiết kế cơ sở',
      'Thiết kế chi tiết',
      'Hardscape và softscape',
      'Artwork cảnh quan',
      'Chiếu sáng',
      'Tưới và thoát nước',
      'Hồ nước và tiện ích',
    ],
  },
  {
    n: '04',
    title: 'Kỹ thuật và dự toán',
    items: [
      'Hồ sơ kỹ thuật',
      'Bóc tách khối lượng',
      'Lựa chọn vật liệu',
      'Biện pháp thi công',
      'Dự toán và tối ưu chi phí',
      'Lập kế hoạch tiến độ',
    ],
  },
  {
    n: '05',
    title: 'Sản xuất và thi công',
    items: [
      'Sản xuất tại nhà máy',
      'Gia công artwork',
      'Thi công hardscape',
      'Trồng cây và softscape',
      'Lắp đặt hệ thống kỹ thuật',
      'Kiểm soát hiện trường',
    ],
  },
  {
    n: '06',
    title: 'Bàn giao và bảo dưỡng',
    items: [
      'Kiểm tra chất lượng',
      'Nghiệm thu',
      'Bàn giao',
      'Bảo hành',
      'Chăm sóc và bảo dưỡng',
      'Đánh giá vận hành',
    ],
  },
] as const;

function DesignBuildChain() {
  return (
    <section id='process' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Chuỗi năng lực Design &amp; Build</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Một đầu mối.
            <br />
            Một trách nhiệm xuyên suốt.
          </h2>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
          {PROCESS_STEPS.map((step, i) => (
            <ScrollReveal key={step.n} delay={i * 60}>
              <div className='h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6'>
                <span className='text-xs font-black text-baolam-primary'>{step.n}</span>
                <h3 className='mt-2 text-sm font-bold uppercase tracking-wide text-white'>
                  {step.title}
                </h3>
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

        <ScrollReveal delay={120}>
          <div className='mt-14 border-t border-baolam-border pt-8 text-center'>
            <p className='mx-auto max-w-2xl text-lg font-medium leading-[1.6] text-white/90 sm:text-xl'>
              Thiết kế được kiểm chứng bởi khả năng triển khai.
              <br />
              Thi công được dẫn dắt bởi ý tưởng thiết kế.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------ Design capability ------------------------------ */

const DESIGN_SCOPE = [
  'Landscape masterplanning',
  'Site analysis',
  'Concept design',
  'Schematic design',
  'Design development',
  'Detailed design',
  'Planting design',
  'Hardscape design',
  'Landscape lighting',
  'Irrigation and drainage coordination',
  'Construction documentation',
  'Author supervision',
] as const;

function DesignCapability() {
  return (
    <section id='design' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <ScrollReveal direction='left' className='space-y-7 lg:sticky lg:top-24 lg:self-start'>
            <div>
              <SectionEyebrow>Landscape Architecture</SectionEyebrow>
              <h2 className='max-w-md text-3xl font-black leading-[1.15] sm:text-4xl'>
                Thiết kế bắt đầu từ khu đất.
              </h2>
            </div>
            <p className='max-w-md text-sm leading-[1.8] text-baolam-muted sm:text-base'>
              Mỗi phương án được phát triển dựa trên điều kiện tự nhiên, bản
              sắc địa điểm, yêu cầu vận hành và cách con người trải nghiệm
              không gian. Chúng tôi không áp đặt một ngôn ngữ thiết kế duy nhất
              lên mọi dự án.
            </p>
            <div>
              <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>
                Phạm vi công việc
              </h3>
              <div className='mt-4'>
                <ScopeList items={DESIGN_SCOPE} columns={2} />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction='right'>
            <div className='grid grid-cols-2 gap-3'>
              {[
                'Ảnh hiện trạng',
                'Masterplan',
                'Concept diagram',
                'Sketch',
                'Render',
                'Bản vẽ chi tiết',
              ].map((label, i) => (
                <div
                  key={label}
                  className={cn(
                    'aspect-[4/3] overflow-hidden rounded-xl border border-white/10',
                    i === 0 && 'col-span-2 aspect-[8/5]'
                  )}
                >
                  <PlaceholderVisual label={label} tag='' seed={i} className='h-full w-full' />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Artwork capability ------------------------------ */

const ARTWORK_CAPS = [
  'Concept artwork',
  'Sculpture',
  'Public art',
  'Water feature',
  'Installation art',
  'Landmark',
  'Lighting artwork',
  'Custom street furniture',
  'Prototype và mockup',
  'Gia công vật liệu',
  'Lắp đặt tại công trường',
] as const;

const ARTWORK_STAGES = ['Ý tưởng', 'Sketch', 'Mô hình', 'Gia công', 'Lắp đặt', 'Hoàn thiện'];

function ArtworkCapability() {
  return (
    <section id='artwork' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Landscape Artwork</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Nghệ thuật trở thành một phần
            <br />
            của không gian.
          </h2>
          <p className='mt-6 max-w-2xl text-sm leading-[1.8] text-baolam-muted sm:text-base'>
            Bảo Lâm phát triển các tác phẩm cảnh quan từ ý tưởng, thiết kế,
            nghiên cứu vật liệu đến gia công và lắp đặt tại công trình. Artwork
            không được đặt vào dự án như một vật thể trang trí độc lập, mà
            được phát triển trong mối quan hệ với không gian, cảnh quan và
            trải nghiệm người dùng.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className='mt-10'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>
              Năng lực
            </h3>
            <div className='mt-4'>
              <ScopeList items={ARTWORK_CAPS} columns={3} />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className='mt-12'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>
              Case study — một artwork, từ ý tưởng đến lắp đặt
            </h3>
            <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
              {ARTWORK_STAGES.map((stage, i) => (
                <div key={stage} className='flex flex-col gap-2'>
                  <div className='aspect-square w-full overflow-hidden rounded-lg border border-white/10'>
                    <PlaceholderVisual label={stage} tag='' seed={i + 3} className='h-full w-full' />
                  </div>
                  <span className='text-center text-[10px] font-bold uppercase tracking-wider text-white/40'>
                    {i + 1}. {stage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <Link
            href='/artwork'
            className='mt-10 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary hover:text-white'
          >
            Khám phá artwork cảnh quan →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------ Technical capability ------------------------------ */

const TECHNICAL_CAPS = [
  'Triển khai bản vẽ kỹ thuật',
  'Chi tiết cấu tạo',
  'Phối hợp kiến trúc, kết cấu và MEP',
  'Bóc tách khối lượng',
  'Dự toán',
  'Shop drawing',
  'Method statement',
  'Mẫu vật liệu',
  'Mockup',
  'Value engineering',
  'Kiểm soát thay đổi thiết kế',
] as const;

function TechnicalCapability() {
  return (
    <section id='technical' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <ScrollReveal direction='left'>
            <SectionEyebrow>Technical Development</SectionEyebrow>
            <h2 className='max-w-md text-3xl font-black leading-[1.15] sm:text-4xl'>
              Biến ý tưởng thành giải pháp
              <br />
              có thể xây dựng.
            </h2>
            <p className='mt-6 max-w-md text-sm leading-[1.8] text-baolam-muted sm:text-base'>
              Đội ngũ kỹ thuật phát triển thiết kế thành hệ thống hồ sơ đủ rõ
              ràng để dự toán, sản xuất và thi công. Các xung đột giữa kiến
              trúc, cảnh quan, kết cấu và hệ thống kỹ thuật được xem xét trước
              khi triển khai tại công trường.
            </p>
          </ScrollReveal>

          <ScrollReveal direction='right'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>
              Năng lực
            </h3>
            <div className='mt-4'>
              <ScopeList items={TECHNICAL_CAPS} columns={2} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Factory capability ------------------------------ */

const FACTORY_PRODUCT_GROUPS = [
  'Landscape artwork',
  'Cấu kiện kim loại',
  'Kết cấu trang trí',
  'Furniture cảnh quan',
  'Pergola',
  'Planter',
  'Biển chỉ dẫn',
  'Water feature',
  'Chi tiết composite/GRC/GRG',
] as const;

const FACTORY_VISUALS = [
  'Flycam nhà máy',
  'Máy móc',
  'Kỹ thuật viên',
  'Chi tiết đang gia công',
  'Mẫu vật liệu · QC',
  'Sản phẩm hoàn thiện',
];

function FactoryCapability() {
  return (
    <section id='factory' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Manufacturing</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Chủ động sản xuất.
            <br />
            Kiểm soát từng chi tiết.
          </h2>
          <p className='mt-6 max-w-2xl text-sm leading-[1.8] text-baolam-muted sm:text-base'>
            Năng lực sản xuất nội bộ giúp Bảo Lâm chủ động phát triển các cấu
            kiện và sản phẩm cảnh quan theo thiết kế riêng, đồng thời kiểm
            soát vật liệu, mẫu thử, chất lượng hoàn thiện và tiến độ trước khi
            đưa đến công trường.
          </p>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            ['Địa điểm nhà máy', '[Cập nhật sau]'],
            ['Diện tích', '[XX] m²'],
            ['Nhân sự sản xuất', '[XX] người'],
            ['Công suất', '[XX] tấn/năm'],
          ].map(([label, value]) => (
            <ScrollReveal key={label}>
              <div className='rounded-xl border border-white/10 bg-white/[0.03] p-5'>
                <p className='text-lg font-black text-baolam-primary'>{value}</p>
                <p className='mt-1 text-[10px] uppercase tracking-wider text-baolam-muted'>
                  {label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={80}>
          <div className='mt-12'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>
              Máy móc và năng lực gia công chính
            </h3>
            <div className='mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2'>
              {FACTORY_INFO.map((item) => (
                <div key={item.id} className='rounded-2xl border border-white/10 bg-white/[0.03] p-6'>
                  <h4 className='text-base font-bold text-white'>{item.title}</h4>
                  <p className='mt-2 text-sm leading-[1.7] text-baolam-muted'>
                    {item.description}
                  </p>
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
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className='mt-12'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>
              Nhóm sản phẩm
            </h3>
            <div className='mt-4'>
              <ScopeList items={FACTORY_PRODUCT_GROUPS} columns={3} />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <div className='mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
            {FACTORY_VISUALS.map((label, i) => (
              <div key={label} className='aspect-square overflow-hidden rounded-lg border border-white/10'>
                <PlaceholderVisual label={label} tag='' seed={i + 4} className='h-full w-full' />
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={220}>
          <Link
            href='/factory'
            className='mt-10 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-baolam-primary hover:text-white'
          >
            Khám phá nhà máy →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------ Construction capability ------------------------------ */

const CONSTRUCTION_GROUPS = [
  {
    title: 'Hardscape',
    items: [
      'San nền và xử lý cao độ',
      'Đường dạo',
      'Lát đá',
      'Bậc và tường cảnh quan',
      'Pergola',
      'Furniture',
      'Hồ nước',
      'Công trình phụ trợ',
    ],
  },
  {
    title: 'Softscape',
    items: [
      'Xử lý đất trồng',
      'Cây bóng mát',
      'Cây bụi và phủ nền',
      'Cỏ',
      'Di chuyển cây',
      'Chăm sóc cây sau trồng',
    ],
  },
  {
    title: 'Technical systems',
    items: ['Tưới', 'Thoát nước', 'Chiếu sáng', 'Hệ thống hồ nước', 'Điện cảnh quan'],
  },
  {
    title: 'Site management',
    items: [
      'Shop drawing',
      'Biện pháp thi công',
      'Kiểm soát vật liệu',
      'Kiểm soát tiến độ',
      'An toàn',
      'Nghiệm thu',
    ],
  },
] as const;

function ConstructionCapability() {
  return (
    <section id='construction' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Landscape Construction</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Kỷ luật tại công trường.
            <br />
            Chất lượng trong từng chi tiết.
          </h2>
          <p className='mt-6 max-w-2xl text-sm leading-[1.8] text-baolam-muted sm:text-base'>
            Đội ngũ hiện trường triển khai dự án theo hồ sơ, biện pháp và tiêu
            chuẩn chất lượng đã thống nhất. Quá trình thi công được phối hợp
            liên tục với đội ngũ thiết kế và sản xuất để xử lý những điều kiện
            thực tế tại công trường.
          </p>
        </ScrollReveal>

        <div className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {CONSTRUCTION_GROUPS.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 60}>
              <div className='h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6'>
                <h3 className='text-sm font-bold uppercase tracking-wide text-white'>
                  {group.title}
                </h3>
                <div className='mt-4'>
                  <ScopeList items={group.items} columns={1} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Quality control ------------------------------ */

const QUALITY_STAGES = [
  'Thiết kế',
  'Mẫu vật liệu',
  'Shop drawing',
  'Prototype/mockup',
  'Sản xuất',
  'Thi công',
  'Nghiệm thu',
  'Bàn giao',
];

const QUALITY_CHECKPOINTS = [
  'Phê duyệt vật liệu',
  'Phê duyệt mẫu',
  'Kiểm tra nguồn cây',
  'Kiểm tra tại nhà máy',
  'Kiểm tra đầu vào công trường',
  'Nghiệm thu từng công việc',
  'Kiểm tra hoàn thiện',
  'Hồ sơ bàn giao',
] as const;

function QualityControl() {
  return (
    <section id='quality' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <SectionEyebrow>Quality Control</SectionEyebrow>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Chất lượng không được kiểm tra
            <br />
            chỉ ở bước cuối cùng.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className='mt-12 flex flex-wrap items-center gap-x-2 gap-y-4'>
            {QUALITY_STAGES.map((stage, i) => (
              <div key={stage} className='flex items-center gap-2'>
                <span className='rounded-full border border-baolam-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/80'>
                  {stage}
                </span>
                {i < QUALITY_STAGES.length - 1 && (
                  <span className='text-baolam-primary/60'>→</span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className='mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <ScrollReveal delay={120}>
            <div>
              <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>
                Các điểm kiểm soát
              </h3>
              <div className='mt-4'>
                <ScopeList items={QUALITY_CHECKPOINTS} columns={2} />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction='right' delay={160}>
            <div className='grid grid-cols-2 gap-3'>
              {['Kiểm tra tại nhà máy', 'Nghiệm thu hiện trường', 'Mẫu và vật liệu', 'Hồ sơ bàn giao'].map(
                (label, i) => (
                  <div key={label} className='aspect-[4/3] overflow-hidden rounded-xl border border-white/10'>
                    <PlaceholderVisual label={label} tag='QC' seed={i + 5} className='h-full w-full' />
                  </div>
                )
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Team & stats ------------------------------ */

const TEAM_GROUPS = [
  'Landscape architects',
  'Architects',
  'Artists / designers',
  'Engineers',
  'Cost estimators',
  'Factory technicians',
  'Site managers',
  'Construction teams',
  'Maintenance teams',
] as const;

const STATS = [
  ['15+', 'Năm kinh nghiệm'],
  ['500+', 'Công trình'],
  ['20.000+', 'm² Nhà máy'],
  ['100+', 'Kỹ sư & nhân sự'],
  ['[XX]', 'Tỉnh / thành đã triển khai'],
  ['[XX]', 'Dự án Design & Build'],
] as const;

function TeamAndStats() {
  return (
    <section id='team' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl'>
            Một đội ngũ đa chuyên môn.
            <br />
            Một mục tiêu chung.
          </h2>
        </ScrollReveal>

        <div className='mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <ScrollReveal delay={80}>
            <div>
              <h3 className='text-xs font-bold uppercase tracking-wider text-baolam-primary'>
                Nhóm nhân sự
              </h3>
              <div className='mt-4'>
                <ScopeList items={TEAM_GROUPS} columns={2} />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction='right' delay={120}>
            <div className='flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-8'>
              <div className='rounded-lg border border-baolam-border px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white'>
                Design
              </div>
              <span className='text-baolam-primary'>↕</span>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg border border-baolam-border px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white'>
                  Engineering
                </div>
                <span className='text-baolam-primary'>↔</span>
                <div className='rounded-lg border border-baolam-border px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white'>
                  Factory
                </div>
              </div>
              <span className='text-baolam-primary'>↕</span>
              <div className='rounded-lg border border-baolam-border px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white'>
                Construction
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={160}>
          <div className='mt-16 border-t border-baolam-border pt-10'>
            <div className='grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:grid-cols-6'>
              {STATS.map(([value, label]) => (
                <div key={label} className='text-center sm:text-left'>
                  <p className='text-2xl font-black text-baolam-primary sm:text-3xl'>{value}</p>
                  <p className='mt-1 text-[10px] uppercase tracking-wider text-baolam-muted'>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------ Proof projects ------------------------------ */

const PROOF_PROJECTS = [
  {
    id: 'proof-1',
    tag: 'Design & Build',
    name: '[Tên dự án Design & Build]',
    location: '[Địa điểm]',
    scale: '[XX] ha / [XX] m² cảnh quan',
    scope: 'Thiết kế, kỹ thuật, sản xuất và thi công trọn gói.',
    challenge: 'Điều kiện địa hình phức tạp và tiến độ triển khai song song nhiều hạng mục.',
    result: 'Bàn giao đúng tiến độ với một đầu mối chịu trách nhiệm xuyên suốt.',
    proof: 'Chứng minh khả năng triển khai xuyên suốt.',
  },
  {
    id: 'proof-2',
    tag: 'Artwork',
    name: '[Tên dự án Artwork]',
    location: '[Địa điểm]',
    scale: '[XX] m artwork chính',
    scope: 'Concept, thiết kế, gia công và lắp đặt artwork cảnh quan.',
    challenge: 'Yêu cầu độ chính xác cao trong gia công và vận chuyển, lắp đặt cấu kiện lớn.',
    result: 'Tác phẩm trở thành điểm nhấn nhận diện của toàn bộ khu vực.',
    proof: 'Chứng minh năng lực sáng tạo, sản xuất và lắp đặt.',
  },
  {
    id: 'proof-3',
    tag: 'Dự án quy mô lớn',
    name: '[Tên dự án quy mô lớn]',
    location: '[Địa điểm]',
    scale: '[XX] ha, nhiều giai đoạn triển khai',
    scope: 'Quản lý kỹ thuật, dự toán, tiến độ và hiện trường cho toàn dự án.',
    challenge: 'Phối hợp nhiều nhà thầu và bộ môn trong cùng một mốc tiến độ tổng thể.',
    result: 'Kiểm soát chất lượng và tiến độ đồng bộ trên toàn bộ mặt bằng dự án.',
    proof: 'Chứng minh quản lý kỹ thuật, tiến độ và hiện trường.',
  },
] as const;

function ProofProjects() {
  return (
    <section id='proof' className='scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <ScrollReveal>
          <div className='mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
            <h2 className='max-w-xl text-3xl font-black leading-[1.15] sm:text-4xl'>
              Năng lực được chứng minh
              <br />
              bằng công trình thực tế.
            </h2>
            <Link
              href='/projects'
              className='text-xs font-bold uppercase tracking-wider text-baolam-primary hover:text-white'
            >
              Xem tất cả dự án →
            </Link>
          </div>
        </ScrollReveal>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {PROOF_PROJECTS.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 80}>
              <div className='flex h-full flex-col overflow-hidden rounded-2xl border border-white/10'>
                <div className='aspect-[4/3] w-full'>
                  <PlaceholderVisual label={project.tag} seed={i + 6} className='h-full w-full' />
                </div>
                <div className='flex flex-1 flex-col gap-3 border-t border-white/10 bg-white/[0.03] p-6'>
                  <span className='w-fit rounded-full border border-baolam-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-baolam-primary'>
                    {project.tag}
                  </span>
                  <h3 className='text-lg font-bold text-white'>{project.name}</h3>
                  <p className='text-xs text-baolam-muted'>
                    {project.location} · {project.scale}
                  </p>
                  <dl className='mt-2 space-y-3 text-xs leading-[1.6] text-baolam-muted'>
                    <div>
                      <dt className='font-bold uppercase tracking-wider text-white/60'>
                        Phạm vi Bảo Lâm thực hiện
                      </dt>
                      <dd className='mt-1'>{project.scope}</dd>
                    </div>
                    <div>
                      <dt className='font-bold uppercase tracking-wider text-white/60'>
                        Thách thức chính
                      </dt>
                      <dd className='mt-1'>{project.challenge}</dd>
                    </div>
                    <div>
                      <dt className='font-bold uppercase tracking-wider text-white/60'>Kết quả</dt>
                      <dd className='mt-1'>{project.result}</dd>
                    </div>
                  </dl>
                  <p className='mt-auto pt-3 text-[11px] font-medium italic text-baolam-primary/80'>
                    {project.proof}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ContactModalTrigger } from '@/components/contact/contact-modal-trigger';
import { useContactModal } from '@/components/contact/contact-modal-context';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import type { PublicSiteSettings } from '@/data/site-settings-defaults';

const EXPLORE_LINKS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Năng lực', href: '/capabilities' },
  { label: 'Dự án biểu tượng', href: '/projects' },
  { label: 'Artwork cảnh quan', href: '/artwork' },
  { label: 'Nhà máy', href: '/factory' },
  { label: 'Liên hệ', href: '/contact' },
];

const CAPABILITY_LINKS = [
  { label: 'Landscape Architecture', href: '/capabilities#design' },
  { label: 'Landscape Design & Build', href: '/capabilities#process' },
  { label: 'Artwork Design', href: '/capabilities#artwork' },
  { label: 'Technical Development', href: '/capabilities#technical' },
  { label: 'Manufacturing', href: '/capabilities#factory' },
  { label: 'Landscape Construction', href: '/capabilities#construction' },
];

const LEGAL_LINKS = [
  { label: 'Chính sách bảo mật', href: '/privacy' },
  { label: 'Điều khoản sử dụng', href: '/terms' },
];

export function SiteFooter() {
  const { siteSettings } = useContactModal();
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-footer-border bg-footer-bg text-footer-text'>
      <PreFooterCta />
      <FooterMain settings={siteSettings} />
      <BottomBar year={year} />
    </footer>
  );
}

/* ------------------------------- Pre-footer CTA ------------------------------- */

function PreFooterCta() {
  return (
    <section className='bg-footer-accent'>
      <div className='mx-auto max-w-7xl px-6 py-14 lg:px-12 lg:py-16'>
        <ScrollReveal>
          <div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <span className='mb-3 block text-[10px] font-bold uppercase tracking-[0.25em] text-footer-accent-ink/70'>
                Start a Project
              </span>
              <h2 className='text-3xl font-black leading-[1.1] text-footer-accent-ink sm:text-5xl'>
                Cùng tạo nên một không gian có giá trị lâu dài.
              </h2>
              <p className='mt-4 max-w-lg text-sm leading-[1.7] text-footer-accent-ink/80 sm:text-base'>
                Hãy chia sẻ với chúng tôi về bối cảnh, mục tiêu và giai đoạn
                hiện tại của dự án. Đội ngũ Bảo Lâm sẽ cùng bạn xác định phạm
                vi hợp tác phù hợp.
              </p>
            </div>
            <ContactModalTrigger
              source='footer-cta'
              className='group inline-flex w-full shrink-0 items-center justify-center gap-2 border-2 border-footer-accent-ink px-7 py-3.5 text-[11px] font-bold uppercase tracking-wider text-footer-accent-ink transition-colors hover:bg-footer-accent-ink hover:text-footer-accent sm:w-fit'
            >
              Liên hệ tư vấn
              <span className='transition-transform duration-300 group-hover:translate-x-1'>→</span>
            </ContactModalTrigger>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Footer main ---------------------------------- */

function FooterColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className='text-[11px] font-bold uppercase tracking-[0.2em] text-footer-accent'>{children}</h3>
      <div className='mt-4 h-px w-8 bg-footer-accent/50' />
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className='group flex min-h-11 items-center gap-1.5 text-[15px] text-footer-text/85 transition-colors hover:text-footer-accent'
    >
      <span className='transition-transform duration-200 group-hover:translate-x-1'>{children}</span>
      <ArrowUpRight className='size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100' />
    </Link>
  );
}

function BrandBlock({ facebookUrl }: { facebookUrl: string }) {
  return (
    <div>
      <Link href='/' className='flex items-center gap-3'>
        <Image
          src='/logo_baolam.jpg'
          alt='Bảo Lâm'
          width={44}
          height={44}
          className='size-11 w-auto object-contain'
        />
        <div className='flex flex-col leading-none'>
          <span className='text-lg font-black tracking-widest text-footer-text'>BAOLAM</span>
          <span className='mt-1 text-[10px] font-bold tracking-[0.2em] text-footer-muted'>ART &amp; LANDSCAPE</span>
        </div>
      </Link>
      <p className='mt-5 max-w-xs text-sm leading-[1.7] text-footer-muted'>
        Kiến trúc cảnh quan, artwork và giải pháp Design &amp; Build từ ý
        tưởng đến công trình hoàn thiện.
      </p>
      {facebookUrl && (
        <a
          href={facebookUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='group mt-6 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-footer-text/85 transition-colors hover:text-footer-accent'
        >
          <span className='relative'>
            Facebook
            <span className='absolute -bottom-1 left-0 h-px w-0 bg-footer-accent transition-all duration-300 group-hover:w-full' />
          </span>
          <ArrowUpRight className='size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100' />
        </a>
      )}
    </div>
  );
}

function ContactBlock({ settings }: { settings: PublicSiteSettings }) {
  return (
    <div>
      <div className='space-y-1'>
        <a
          href={`mailto:${settings.contactEmail}`}
          className='block text-lg font-bold text-footer-text transition-colors hover:text-footer-accent sm:text-xl'
        >
          {settings.contactEmail}
        </a>
        <a
          href={`tel:${settings.contactPhone.replace(/[^\d+]/g, '')}`}
          className='block text-lg font-bold text-footer-text transition-colors hover:text-footer-accent sm:text-xl'
        >
          {settings.contactPhone}
        </a>
      </div>
      <div className='mt-6'>
        <p className='text-[10px] font-bold uppercase tracking-wider text-footer-muted'>Hà Nội Office</p>
        <p className='mt-1.5 max-w-xs text-sm leading-[1.6] text-footer-text/80'>{settings.officeAddress}</p>
        <p className='mt-2 text-sm text-footer-muted'>{settings.workingHours}</p>
      </div>
      <Link
        href='/contact#project-brief'
        className='mt-6 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-footer-accent transition-colors hover:text-footer-text'
      >
        Gửi project brief →
      </Link>
    </div>
  );
}

function MobileAccordion({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <details className='group border-b border-footer-border py-4'>
      <summary className='flex cursor-pointer list-none items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-footer-accent [&::-webkit-details-marker]:hidden'>
        {title}
        <Plus className='size-4 text-footer-text transition-transform duration-200 group-open:rotate-45' />
      </summary>
      <div className='mt-2 flex flex-col'>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className='flex min-h-11 items-center text-[15px] text-footer-text/85 transition-colors hover:text-footer-accent'
          >
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

function FooterMain({ settings }: { settings: PublicSiteSettings }) {
  return (
    <div className='mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20'>
      {/* Desktop layout */}
      <div className='hidden lg:grid lg:grid-cols-12 lg:gap-8'>
        <ScrollReveal className='lg:col-span-4'>
          <BrandBlock facebookUrl={settings.facebookUrl} />
        </ScrollReveal>
        <ScrollReveal delay={50} className='lg:col-span-2'>
          <FooterColumnTitle>Khám phá</FooterColumnTitle>
          <div className='mt-5 flex flex-col'>
            {EXPLORE_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100} className='lg:col-span-3'>
          <FooterColumnTitle>Năng lực</FooterColumnTitle>
          <div className='mt-5 flex flex-col'>
            {CAPABILITY_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150} className='lg:col-span-3'>
          <FooterColumnTitle>Liên hệ</FooterColumnTitle>
          <div className='mt-5'>
            <ContactBlock settings={settings} />
          </div>
        </ScrollReveal>
      </div>

      {/* Mobile layout */}
      <div className='flex flex-col gap-8 lg:hidden'>
        <ScrollReveal>
          <BrandBlock facebookUrl={settings.facebookUrl} />
        </ScrollReveal>
        <ScrollReveal delay={50}>
          <ContactBlock settings={settings} />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className='border-t border-footer-border'>
            <MobileAccordion title='Khám phá' links={EXPLORE_LINKS} />
            <MobileAccordion title='Năng lực' links={CAPABILITY_LINKS} />
          </div>
        </ScrollReveal>
      </div>

      {/* Factory row */}
      <ScrollReveal delay={200}>
        <div className='mt-14 flex flex-col gap-3 border-t border-footer-border pt-8 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
            <span className='text-[11px] font-bold uppercase tracking-[0.2em] text-footer-accent'>Factory</span>
            <span className='text-sm text-footer-muted'>Nhà máy sản xuất Bảo Lâm</span>
          </div>
          <Link
            href='/factory'
            className='group inline-flex min-h-11 items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-footer-text transition-colors hover:text-footer-accent'
          >
            Khám phá nhà máy
            <span className='transition-transform duration-200 group-hover:translate-x-1'>→</span>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}

/* ---------------------------------- Bottom bar ---------------------------------- */

function BottomBar({ year }: { year: number }) {
  return (
    <div className='border-t border-footer-border'>
      <div className='mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-[11px] text-footer-muted sm:flex-row sm:items-center sm:justify-between lg:px-12'>
        <p>© {year} BAOLAM ART &amp; LANDSCAPE. ALL RIGHTS RESERVED.</p>
        <div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className='transition-colors hover:text-footer-accent'>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

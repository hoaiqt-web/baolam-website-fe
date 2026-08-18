'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import MobileNav from '@/components/MobileNav';
import { ContactModalTrigger } from '@/components/contact/contact-modal-trigger';

const NAV_LINKS = [
  { href: '/', label: 'TRANG CHỦ', active: true },
  { href: '/capabilities', label: 'NĂNG LỰC' },
  { href: '/#projects', label: 'DỰ ÁN BIỂU TƯỢNG' },
  { href: '/capabilities#artwork', label: 'ARTWORK CẢNH QUAN' },
  { href: '/capabilities#factory', label: 'NHÀ MÁY' },
  { href: '/contact', label: 'LIÊN HỆ' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (pathname.startsWith('/admin') || pathname.startsWith('/preview'))
    return null;

  return (
    <>
      <nav
        className={`fixed z-50 w-full border-b transition-[background-color,box-shadow,border-color] duration-500 ${scrolled ? 'border-baolam-border bg-[rgba(7,21,34,0.94)] shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl' : 'border-white/10 bg-[rgba(7,21,34,0.72)] backdrop-blur-md'}`}
      >
        <div className='mx-auto flex h-16 w-full items-center justify-between px-4 sm:h-20 sm:px-6 xl:px-12'>
          <Link href='/' className='flex shrink-0 items-center gap-3 sm:gap-4'>
            <Image
              src='/logo_baolam.png'
              alt='Bảo Lâm'
              width={60}
              height={60}
              priority
              className='size-15 w-auto object-contain'
            />
            <div className='flex flex-col leading-none'>
              <span className='text-base font-black tracking-widest text-white sm:text-xl'>
                BAOLAM
              </span>
              <span className='mt-0.5 text-[0.55rem] font-bold tracking-[0.2em] text-white/80 sm:text-[0.65rem]'>
                ART & LANDSCAPE
              </span>
            </div>
          </Link>
          <div className='hidden items-center gap-4 text-[0.7rem] font-bold tracking-wider lg:flex xl:gap-6 xl:text-[0.75rem]'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='whitespace-nowrap transition-colors hover:text-baolam-primary'
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ContactModalTrigger
            source='header'
            className='hidden bg-baolam-primary px-4 py-2.5 text-sm font-bold text-baolam-bg transition-colors hover:bg-baolam-primary-hover md:block xl:px-6 xl:py-3'
          >
            LIÊN HỆ TƯ VẤN →
          </ContactModalTrigger>
          <MobileNav links={NAV_LINKS} />
        </div>
      </nav>
      <Script
        type='module'
        src='https://unpkg.com/visbug'
        strategy='lazyOnload'
      />
      <div dangerouslySetInnerHTML={{ __html: '<vis-bug></vis-bug>' }} />
    </>
  );
}

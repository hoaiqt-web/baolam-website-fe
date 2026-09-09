'use client';
import { useContext } from 'react';
import { ContentContext } from './content-provider';
export function PartnerLogo({ index }: { index: number }) {
  const values = useContext(ContentContext)['home.Partners'] ?? {};
  const src = values[`image-${index}`] ?? '';
  const name = values[`name-${index}`] ?? 'Logo đối tác';
  const href = values[`link-${index}`] ?? '';
  const content = src ? <img src={src} alt={name} className="h-full max-h-24 w-full object-contain p-3" loading="lazy" /> : name; // eslint-disable-line @next/next/no-img-element
  return <div className="flex aspect-[3/2] items-center justify-center rounded-lg border border-dashed border-white/15 text-[9px] uppercase tracking-wider text-white/30">{href ? <a href={href} className="flex h-full w-full items-center justify-center">{content}</a> : content}</div>;
}

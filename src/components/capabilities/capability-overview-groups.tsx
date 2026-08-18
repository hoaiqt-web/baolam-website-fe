'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const GROUPS = [
  {
    n: '01',
    title: 'Landscape Design',
    body: 'Quy hoạch cảnh quan, concept, thiết kế chi tiết hardscape, softscape, chiếu sáng, tưới và thoát nước.',
  },
  {
    n: '02',
    title: 'Technical Development',
    body: 'Triển khai hồ sơ kỹ thuật, bóc tách khối lượng, dự toán và phối hợp đa bộ môn để đảm bảo tính khả thi.',
  },
  {
    n: '03',
    title: 'Landscape Artwork',
    body: 'Phát triển tác phẩm cảnh quan từ ý tưởng, nghiên cứu vật liệu đến gia công và lắp đặt tại công trình.',
  },
  {
    n: '04',
    title: 'Manufacturing',
    body: 'Sản xuất nội bộ cấu kiện, furniture và artwork cảnh quan theo thiết kế riêng tại nhà máy.',
  },
  {
    n: '05',
    title: 'Construction & Maintenance',
    body: 'Thi công hardscape, softscape, hệ thống kỹ thuật tại hiện trường và chăm sóc cảnh quan sau bàn giao.',
  },
] as const;

export function CapabilityOverviewGroups() {
  const [active, setActive] = useState<number>(0);

  return (
    <div className='mt-12 grid grid-cols-1 divide-y divide-baolam-border border-y border-baolam-border sm:grid-cols-1'>
      {GROUPS.map((group, i) => {
        const isActive = active === i;
        return (
          <button
            key={group.n}
            type='button'
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-expanded={isActive}
            className='group flex w-full flex-col gap-2 py-6 text-left transition-colors sm:flex-row sm:items-baseline sm:gap-8'
          >
            <span
              className={cn(
                'text-xs font-black transition-colors',
                isActive ? 'text-baolam-primary' : 'text-white/30'
              )}
            >
              {group.n}
            </span>
            <span className='flex flex-1 flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8'>
              <h3
                className={cn(
                  'shrink-0 text-lg font-bold transition-colors sm:text-xl',
                  isActive ? 'text-white' : 'text-white/50'
                )}
              >
                {group.title}
              </h3>
              <p
                className={cn(
                  'max-w-xl text-sm leading-[1.7] transition-colors',
                  isActive ? 'text-baolam-muted' : 'text-white/25'
                )}
              >
                {group.body}
              </p>
            </span>
          </button>
        );
      })}
    </div>
  );
}

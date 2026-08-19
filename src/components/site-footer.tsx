export function SiteFooter() {
  const year = new Date().getFullYear();
  const columns = [
    {
      title: 'Sitemap',
      links: [
        ['Dự án', '/projects'],
        ['Năng lực', '/capabilities'],
        ['Dịch vụ', '/#services'],
        ['Liên hệ', '/#contact'],
      ],
    },
  ];

  return (
    <footer className='border-t border-white/10 bg-[#030914] py-12'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:flex-row sm:items-start sm:justify-between lg:px-12'>
        <div>
          <span className='text-lg font-black tracking-widest text-white'>
            BAOLAM
          </span>
          <p className='mt-2 max-w-xs text-xs leading-[1.7] text-baolam-muted'>
            Landscape Architecture · Design &amp; Build. Kiến tạo cảnh quan từ ý
            tưởng đến hiện thực.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className='text-[10px] font-bold uppercase tracking-wider text-white/50'>
              {col.title}
            </h4>
            <ul className='mt-3 space-y-2'>
              {col.links.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className='text-xs text-baolam-muted hover:text-baolam-primary'
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-[10px] text-white/30 lg:px-12'>
        © {year} Bảo Lâm. All rights reserved.
      </div>
    </footer>
  );
}

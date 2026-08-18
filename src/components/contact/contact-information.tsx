import { ScrollReveal } from "@/components/motion/scroll-reveal";

const COLUMNS = [
  {
    title: "Project inquiries",
    rows: [
      { label: "Email", value: "project@baolam.vn", href: "mailto:project@baolam.vn" },
      { label: "Hotline", value: "+84 xxx xxx xxx" },
      { label: "Thời gian phản hồi", value: "Trong vòng 1 ngày làm việc" },
    ],
  },
  {
    title: "Văn phòng",
    rows: [
      { label: "Địa chỉ", value: "[Địa chỉ văn phòng], Hà Nội" },
      { label: "Google Maps", value: "Xem chỉ đường", href: "#" },
      { label: "Giờ làm việc", value: "Thứ 2 – Thứ 7, 8:00 – 17:30" },
    ],
  },
  {
    title: "Kết nối",
    rows: [
      { label: "Zalo", value: "Nhắn tin qua Zalo", href: "#" },
      { label: "LinkedIn", value: "Bảo Lâm Art & Landscape", href: "#" },
      { label: "Facebook", value: "Bảo Lâm Art & Landscape", href: "#" },
    ],
  },
];

export function ContactInformation() {
  return (
    <section className="border-t border-white/10 bg-[#030914] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {COLUMNS.map((column, i) => (
            <ScrollReveal key={column.title} delay={i * 70}>
              <div className="border-t border-baolam-border pt-4 sm:border-t-0 sm:pt-0">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.rows.map((row) => (
                    <li key={row.label} className="text-sm">
                      <span className="mr-2 text-baolam-muted">{row.label}:</span>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="text-white underline decoration-transparent underline-offset-4 transition-colors hover:text-baolam-primary hover:decoration-baolam-primary"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-white">{row.value}</span>
                      )}
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

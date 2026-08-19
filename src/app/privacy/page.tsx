import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật | Bảo Lâm',
  description: 'Chính sách bảo mật của Bảo Lâm về việc thu thập, sử dụng và bảo vệ thông tin bạn cung cấp qua website.',
};

export default function PrivacyPage() {
  return (
    <main className='min-h-screen w-full overflow-x-clip bg-[#030914] pt-16 font-sans text-white sm:pt-20'>
      <section className='border-b border-white/10 py-16 lg:py-20'>
        <div className='mx-auto max-w-3xl px-6 lg:px-12'>
          <span className='mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary'>
            Legal
          </span>
          <h1 className='text-3xl font-black leading-[1.15] sm:text-4xl'>Chính sách bảo mật</h1>
          <p className='mt-4 text-sm text-baolam-muted'>Cập nhật lần cuối: tháng 8/2026</p>
        </div>
      </section>

      <section className='py-16 lg:py-20'>
        <div className='mx-auto max-w-3xl space-y-10 px-6 lg:px-12'>
          <Block title='1. Thông tin chúng tôi thu thập'>
            <p>
              Khi bạn liên hệ với Bảo Lâm qua các biểu mẫu trên website, chúng
              tôi thu thập những thông tin bạn chủ động cung cấp, có thể bao
              gồm: họ tên, số điện thoại, email, tên công ty/đơn vị, thông
              tin về dự án (địa điểm, loại hình, quy mô, giai đoạn), nội dung
              trao đổi và các tệp đính kèm nếu bạn tải lên.
            </p>
            <p>Chúng tôi không thu thập thông tin thanh toán hay dữ liệu tài chính qua website.</p>
          </Block>

          <Block title='2. Mục đích sử dụng'>
            <p>Thông tin bạn cung cấp được sử dụng để:</p>
            <ul className='list-disc space-y-1.5 pl-5'>
              <li>Phản hồi và trao đổi về yêu cầu tư vấn của bạn.</li>
              <li>Đánh giá phạm vi hợp tác và chuẩn bị đề xuất phù hợp.</li>
              <li>Liên hệ lại khi cần làm rõ thông tin dự án.</li>
            </ul>
          </Block>

          <Block title='3. Chia sẻ thông tin'>
            <p>
              Thông tin liên hệ và yêu cầu dự án được chuyển đến đội ngũ kinh
              doanh và kỹ thuật nội bộ của Bảo Lâm để xử lý. Chúng tôi không
              bán hoặc cho thuê thông tin của bạn cho bên thứ ba vì mục đích
              tiếp thị. Thông tin chỉ được chia sẻ với bên thứ ba khi cần
              thiết để vận hành dịch vụ (ví dụ: hạ tầng lưu trữ) hoặc khi
              pháp luật yêu cầu.
            </p>
          </Block>

          <Block title='4. Cookie và theo dõi'>
            <p>
              Website hiện không sử dụng cookie hay công cụ theo dõi quảng
              cáo/phân tích của bên thứ ba. Một cookie phiên đăng nhập được
              sử dụng nội bộ cho khu vực quản trị nội dung, không áp dụng
              cho khách truy cập thông thường.
            </p>
          </Block>

          <Block title='5. Bảo mật dữ liệu'>
            <p>
              Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để
              bảo vệ thông tin bạn cung cấp khỏi truy cập, sử dụng hoặc tiết
              lộ trái phép. Tuy nhiên, không có phương thức truyền dữ liệu
              nào qua Internet là an toàn tuyệt đối.
            </p>
          </Block>

          <Block title='6. Quyền của bạn'>
            <p>
              Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin đã cung
              cấp cho Bảo Lâm bất cứ lúc nào bằng cách liên hệ trực tiếp qua
              trang{' '}
              <Link href='/contact' className='text-baolam-primary underline decoration-transparent underline-offset-4 hover:decoration-baolam-primary'>
                Liên hệ
              </Link>
              .
            </p>
          </Block>

          <Block title='7. Thay đổi chính sách'>
            <p>
              Chính sách này có thể được cập nhật theo thời gian. Phiên bản
              mới nhất luôn được đăng tải tại trang này.
            </p>
          </Block>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className='text-lg font-bold text-white'>{title}</h2>
      <div className='mt-3 space-y-3 text-sm leading-[1.8] text-baolam-muted'>{children}</div>
    </div>
  );
}

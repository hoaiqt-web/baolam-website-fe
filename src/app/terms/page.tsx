import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng | Bảo Lâm',
  description: 'Điều khoản sử dụng website của Bảo Lâm.',
};

export default function TermsPage() {
  return (
    <main className='min-h-screen w-full overflow-x-clip bg-[#030914] pt-16 font-sans text-white sm:pt-20'>
      <section className='border-b border-white/10 py-16 lg:py-20'>
        <div className='mx-auto max-w-3xl px-6 lg:px-12'>
          <span className='mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary'>
            Legal
          </span>
          <h1 className='text-3xl font-black leading-[1.15] sm:text-4xl'>Điều khoản sử dụng</h1>
          <p className='mt-4 text-sm text-baolam-muted'>Cập nhật lần cuối: tháng 8/2026</p>
        </div>
      </section>

      <section className='py-16 lg:py-20'>
        <div className='mx-auto max-w-3xl space-y-10 px-6 lg:px-12'>
          <Block title='1. Phạm vi website'>
            <p>
              Website này giới thiệu năng lực, dự án và thông tin liên hệ của
              Bảo Lâm. Nội dung mang tính chất thông tin và không cấu thành
              cam kết hợp đồng cho đến khi hai bên ký kết văn bản thỏa thuận
              chính thức.
            </p>
          </Block>

          <Block title='2. Quyền sở hữu nội dung'>
            <p>
              Toàn bộ hình ảnh, văn bản, thiết kế và tài liệu trên website
              thuộc quyền sở hữu của Bảo Lâm hoặc được sử dụng với sự cho
              phép của chủ sở hữu, trừ khi có ghi chú khác. Không sao chép,
              phân phối lại hoặc sử dụng cho mục đích thương mại khi chưa có
              sự đồng ý bằng văn bản.
            </p>
          </Block>

          <Block title='3. Độ chính xác của thông tin'>
            <p>
              Chúng tôi nỗ lực đảm bảo thông tin trên website chính xác và
              cập nhật, nhưng không đảm bảo tuyệt đối về tính đầy đủ hoặc
              không có sai sót. Hình ảnh dự án có thể được cập nhật theo thời
              gian.
            </p>
          </Block>

          <Block title='4. Sử dụng biểu mẫu liên hệ'>
            <p>
              Khi gửi thông tin qua biểu mẫu liên hệ hoặc project brief, bạn
              xác nhận thông tin cung cấp là chính xác và đồng ý để Bảo Lâm
              sử dụng thông tin đó theo{' '}
              <Link href='/privacy' className='text-baolam-primary underline decoration-transparent underline-offset-4 hover:decoration-baolam-primary'>
                Chính sách bảo mật
              </Link>{' '}
              nhằm phản hồi yêu cầu của bạn.
            </p>
          </Block>

          <Block title='5. Giới hạn trách nhiệm'>
            <p>
              Bảo Lâm không chịu trách nhiệm cho các thiệt hại phát sinh từ
              việc sử dụng hoặc không thể sử dụng website, ngoại trừ các
              trường hợp pháp luật hiện hành quy định khác.
            </p>
          </Block>

          <Block title='6. Luật áp dụng'>
            <p>Các điều khoản này được điều chỉnh theo pháp luật Việt Nam.</p>
          </Block>

          <Block title='7. Liên hệ'>
            <p>
              Nếu có câu hỏi về các điều khoản này, vui lòng liên hệ qua
              trang{' '}
              <Link href='/contact' className='text-baolam-primary underline decoration-transparent underline-offset-4 hover:decoration-baolam-primary'>
                Liên hệ
              </Link>
              .
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

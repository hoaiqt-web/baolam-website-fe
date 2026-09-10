'use client';
import { useCmsBlock } from "@/components/cms/content-provider";

import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';



export default function TermsPage() {
  const c = useCmsBlock("terms.TermsPage");
  return (
    <main className='min-h-screen w-full overflow-x-clip bg-canvas pt-16 font-sans text-ink sm:pt-20'>
      <section className='border-b border-ink/10 py-16 lg:py-20'>
        <div className='mx-auto max-w-3xl px-6 lg:px-12'>
          <span className='mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary'>{c("Legal")}</span>
          <h1 className='text-3xl font-black leading-[1.15] sm:text-4xl'>{c("Điều khoản sử dụng")}</h1>
          <p className='mt-4 text-sm text-baolam-muted'>{c("Cập nhật lần cuối: tháng 8/2026")}</p>
        </div>
      </section>

      <section className='py-16 lg:py-20'>
        <div className='mx-auto max-w-3xl space-y-10 px-6 lg:px-12'>
          <Block title={c("1. Phạm vi website")}>
            <p>{c("Website này giới thiệu năng lực, dự án và thông tin liên hệ của Bảo Lâm. Nội dung mang tính chất thông tin và không cấu thành cam kết hợp đồng cho đến khi hai bên ký kết văn bản thỏa thuận chính thức.")}</p>
          </Block>

          <Block title={c("2. Quyền sở hữu nội dung")}>
            <p>{c("Toàn bộ hình ảnh, văn bản, thiết kế và tài liệu trên website thuộc quyền sở hữu của Bảo Lâm hoặc được sử dụng với sự cho phép của chủ sở hữu, trừ khi có ghi chú khác. Không sao chép, phân phối lại hoặc sử dụng cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản.")}</p>
          </Block>

          <Block title={c("3. Độ chính xác của thông tin")}>
            <p>{c("Chúng tôi nỗ lực đảm bảo thông tin trên website chính xác và cập nhật, nhưng không đảm bảo tuyệt đối về tính đầy đủ hoặc không có sai sót. Hình ảnh dự án có thể được cập nhật theo thời gian.")}</p>
          </Block>

          <Block title={c("4. Sử dụng biểu mẫu liên hệ")}>
            <p>{c("Khi gửi thông tin qua biểu mẫu liên hệ hoặc project brief, bạn xác nhận thông tin cung cấp là chính xác và đồng ý để Bảo Lâm sử dụng thông tin đó theo")}{' '}
              <Link href={c("/privacy")} className='text-baolam-primary underline decoration-transparent underline-offset-4 hover:decoration-baolam-primary'>{c("Chính sách bảo mật")}</Link>{' '}{c("nhằm phản hồi yêu cầu của bạn.")}</p>
          </Block>

          <Block title={c("5. Giới hạn trách nhiệm")}>
            <p>{c("Bảo Lâm không chịu trách nhiệm cho các thiệt hại phát sinh từ việc sử dụng hoặc không thể sử dụng website, ngoại trừ các trường hợp pháp luật hiện hành quy định khác.")}</p>
          </Block>

          <Block title={c("6. Luật áp dụng")}>
            <p>{c("Các điều khoản này được điều chỉnh theo pháp luật Việt Nam.")}</p>
          </Block>

          <Block title={c("7. Liên hệ")}>
            <p>{c("Nếu có câu hỏi về các điều khoản này, vui lòng liên hệ qua trang")}{' '}
              <Link href={c("/contact")} className='text-baolam-primary underline decoration-transparent underline-offset-4 hover:decoration-baolam-primary'>{c("Liên hệ")}</Link>{c(".")}</p>
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
      <h2 className='text-lg font-bold text-ink'>{title}</h2>
      <div className='mt-3 space-y-3 text-sm leading-[1.8] text-baolam-muted'>{children}</div>
    </div>
  );
}

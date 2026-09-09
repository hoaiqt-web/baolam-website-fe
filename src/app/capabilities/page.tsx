import { getCmsMetadata } from '@/features/page-content/metadata';
import type { Metadata } from 'next';
import CapabilitiesPage from '@/components/pages/capabilities-page';
export async function generateMetadata(): Promise<Metadata> { return getCmsMetadata("capabilities", {
  title: 'Năng lực | Bảo Lâm',
  description:
    'Bảo Lâm kết nối kiến trúc cảnh quan, kỹ thuật, sản xuất và thi công trong một quy trình Design & Build thống nhất — từ ý tưởng thiết kế đến công trình hoàn thiện.',
}); }
export default CapabilitiesPage;

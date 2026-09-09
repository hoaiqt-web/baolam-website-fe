import { getCmsMetadata } from '@/features/page-content/metadata';
import type { Metadata } from 'next';
import FactoryPage from '@/components/pages/factory-page';
export async function generateMetadata(): Promise<Metadata> { return getCmsMetadata("factory", {
  title: 'Nhà máy | Bảo Lâm',
  description:
    'Nhà máy Bảo Lâm chủ động sản xuất artwork cảnh quan và cấu kiện kiến trúc theo thiết kế riêng — từ prototype, gia công đến hoàn thiện và lắp đặt.',
}); }
export default FactoryPage;

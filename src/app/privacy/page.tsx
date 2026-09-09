import { getCmsMetadata } from '@/features/page-content/metadata';
import type { Metadata } from 'next';
import PrivacyPage from '@/components/pages/privacy-page';
export async function generateMetadata(): Promise<Metadata> { return getCmsMetadata("privacy", {
  title: 'Chính sách bảo mật | Bảo Lâm',
  description: 'Chính sách bảo mật của Bảo Lâm về việc thu thập, sử dụng và bảo vệ thông tin bạn cung cấp qua website.',
}); }
export default PrivacyPage;

import { getCmsMetadata } from '@/features/page-content/metadata';
import type { Metadata } from 'next';
import TermsPage from '@/components/pages/terms-page';
export async function generateMetadata(): Promise<Metadata> { return getCmsMetadata("terms", {
  title: 'Điều khoản sử dụng | Bảo Lâm',
  description: 'Điều khoản sử dụng website của Bảo Lâm.',
}); }
export default TermsPage;

import { getCmsMetadata } from '@/features/page-content/metadata';
import type { Metadata } from 'next';
import SignatureProjectsPage from '@/components/pages/projects-page';
export async function generateMetadata(): Promise<Metadata> { return getCmsMetadata("projects", {
  title: 'Dự án biểu tượng | Bảo Lâm',
  description:
    'Những dự án đại diện cho cách Bảo Lâm kết nối thiết kế, kỹ thuật và năng lực triển khai để tạo nên các công trình có bản sắc và giá trị sử dụng lâu dài.',
}); }
export default SignatureProjectsPage;

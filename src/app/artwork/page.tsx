import { getCmsMetadata } from '@/features/page-content/metadata';
import type { Metadata } from 'next';
import ArtworkPage from '@/components/pages/artwork-page';
export async function generateMetadata(): Promise<Metadata> { return getCmsMetadata("artwork", {
  title: 'Artwork cảnh quan | Bảo Lâm',
  description:
    'Bảo Lâm phát triển artwork cảnh quan từ ý tưởng, nghiên cứu vật liệu đến sản xuất và lắp đặt — những tác phẩm được tạo riêng cho từng địa điểm và trải nghiệm không gian.',
}); }
export default ArtworkPage;

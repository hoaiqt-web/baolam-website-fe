import { getCmsMetadata } from '@/features/page-content/metadata';
import Home from '@/components/pages/home-page';

export default Home;

export async function generateMetadata() { return getCmsMetadata("home", {"title": "BAOLAM ART & LANDSCAPE", "description": "Nhà thầu Artwork & Kiến trúc điểm nhấn cảnh quan hàng đầu Việt Nam. Sáng tạo giá trị đích thực."}); }

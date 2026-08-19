import type { ArtworkTypology } from '@/data/artwork-typologies';

export const FACTORY_PRODUCT_GROUPS: ArtworkTypology[] = [
  {
    n: '01',
    slug: 'landscape-artwork',
    title: 'Landscape Artwork',
    description: 'Sculpture, landmark, installation và artwork tích hợp nước hoặc ánh sáng, phát triển theo thiết kế riêng cho từng dự án.',
    items: ['Sculpture', 'Landmark', 'Installation', 'Water artwork', 'Light artwork'],
  },
  {
    n: '02',
    slug: 'landscape-structures',
    title: 'Landscape Structures',
    description: 'Kết cấu cảnh quan quy mô vừa và lớn — từ pergola, pavilion đến cổng và cấu kiện trang trí.',
    items: ['Pergola', 'Pavilion', 'Canopy', 'Cổng và cấu kiện trang trí', 'Kết cấu đặc thù'],
  },
  {
    n: '03',
    slug: 'landscape-furniture',
    title: 'Landscape Furniture',
    description: 'Furniture cảnh quan sản xuất theo bộ hoặc theo thiết kế riêng cho từng dự án.',
    items: ['Bench', 'Planter', 'Bollard', 'Bin', 'Table', 'Custom furniture'],
  },
  {
    n: '04',
    slug: 'water-features',
    title: 'Water Features',
    description: 'Cấu kiện và hệ thống kỹ thuật liên quan đến nước, từ đài phun nước đến hồ cảnh quan.',
    items: ['Đài phun nước', 'Hồ cảnh quan', 'Cấu kiện tạo hiệu ứng nước', 'Hệ thống kỹ thuật liên quan'],
  },
  {
    n: '05',
    slug: 'signage-wayfinding',
    title: 'Signage & Wayfinding',
    description: 'Biển chỉ dẫn, biển tên dự án và cổng chào — các điểm nhận diện gắn với trải nghiệm di chuyển.',
    items: ['Biển chỉ dẫn', 'Biển tên dự án', 'Cổng chào', 'Landmark nhận diện'],
  },
  {
    n: '06',
    slug: 'bespoke-components',
    title: 'Bespoke Components',
    description: 'Cấu kiện và sản phẩm phi tiêu chuẩn, phát triển từ prototype đến sản xuất theo yêu cầu riêng.',
    items: ['Cấu kiện thiết kế riêng', 'Prototype', 'Sản phẩm phi tiêu chuẩn', 'Chi tiết tích hợp ánh sáng'],
  },
];

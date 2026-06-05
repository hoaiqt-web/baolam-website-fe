import { ArtworkProject } from '@/types';

export const ARTWORK_PROJECTS: ArtworkProject[] = [
  {
    id: 'a1',
    slug: 'teddy-bear-15m',
    title: 'Tượng Teddy Bear 15m',
    client: 'Vingroup',
    location: 'Grand World Phú Quốc',
    completionYear: 2021,
    category: 'Tượng Nghệ Thuật',
    material: 'Kết cấu thép, Composite cao cấp',
    thumbnail: 'https://images.unsplash.com/photo-1558231922-b9e735d4ff3a?w=800&q=80',
    description: 'Tượng gấu Teddy khổng lồ cao 15m, điểm nhấn check-in biểu tượng.'
  },
  {
    id: 'a2',
    slug: 'me-trai-dat',
    title: 'Tượng Mẹ Trái Đất',
    client: 'Sun Group',
    location: 'Phú Quốc',
    completionYear: 2023,
    category: 'Tượng Nghệ Thuật',
    material: 'Đồng nguyên khối',
    thumbnail: 'https://images.unsplash.com/photo-1576060416803-b0e6e969a531?w=800&q=80',
    description: 'Tác phẩm điêu khắc vĩ đại tôn vinh vẻ đẹp tự nhiên.'
  },
  {
    id: 'a3',
    slug: 'artwork-doi-rong',
    title: 'Artwork Cảnh Quan Đồi Rồng',
    client: 'Geleximco',
    location: 'Hải Phòng',
    completionYear: 2023,
    category: 'Artwork Cảnh Quan',
    material: 'Đa chất liệu',
    thumbnail: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=800&q=80',
    description: 'Cụm artwork trang trí cảnh quan quảng trường trung tâm Đồi Rồng.'
  }
];

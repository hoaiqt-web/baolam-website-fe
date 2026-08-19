export type ArtworkTypology = {
  n: string;
  slug: string;
  title: string;
  description: string;
  items: string[];
};

export const ARTWORK_TYPOLOGIES: ArtworkTypology[] = [
  {
    n: '01',
    slug: 'landmark',
    title: 'Landmark & Icon',
    description: 'Biểu tượng dự án, cổng chào và điểm nhận diện quy mô lớn tại lối vào hoặc trung tâm không gian.',
    items: ['Biểu tượng dự án', 'Cổng chào', 'Điểm nhận diện', 'Landmark quy mô lớn'],
  },
  {
    n: '02',
    slug: 'sculpture',
    title: 'Sculpture',
    description: 'Điêu khắc ngoài trời và tượng nghệ thuật, đơn lẻ hoặc theo cụm, tạo điểm nhấn trải nghiệm.',
    items: ['Điêu khắc ngoài trời', 'Tượng nghệ thuật', 'Cụm tác phẩm', 'Tác phẩm tương tác'],
  },
  {
    n: '03',
    slug: 'water',
    title: 'Water Artwork',
    description: 'Tác phẩm kết hợp nước, từ đài phun nước cổ điển đến màn nước và hiệu ứng chuyển động.',
    items: ['Đài phun nước', 'Water feature', 'Tác phẩm kết hợp nước', 'Màn nước và hiệu ứng chuyển động'],
  },
  {
    n: '04',
    slug: 'light',
    title: 'Light Artwork',
    description: 'Tác phẩm ánh sáng và chiếu sáng tương tác, biến artwork thành landmark riêng vào ban đêm.',
    items: ['Tác phẩm ánh sáng', 'Chiếu sáng tương tác', 'Landmark ban đêm', 'Media/light installation'],
  },
  {
    n: '05',
    slug: 'installation',
    title: 'Installation Art',
    description: 'Sắp đặt không gian phát triển riêng cho địa điểm, có thể theo mùa hoặc theo sự kiện.',
    items: ['Sắp đặt không gian', 'Tác phẩm theo địa điểm', 'Seasonal installation', 'Tác phẩm trải nghiệm'],
  },
  {
    n: '06',
    slug: 'bespoke',
    title: 'Bespoke Landscape Objects',
    description: 'Cấu kiện cảnh quan thiết kế riêng — nơi công năng và ngôn ngữ tạo hình gặp nhau.',
    items: ['Ghế cảnh quan', 'Planter', 'Pavilion', 'Pergola', 'Biển chỉ dẫn'],
  },
];

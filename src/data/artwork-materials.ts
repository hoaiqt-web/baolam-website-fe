export type ArtworkMaterial = {
  slug: string;
  title: string;
  description: string;
};

export const ARTWORK_MATERIALS: ArtworkMaterial[] = [
  {
    slug: 'stainless-steel',
    title: 'Stainless Steel',
    description:
      'Bề mặt hiện đại, phản chiếu ánh sáng tốt. Chống ăn mòn cao, phù hợp khí hậu ven biển. Hoàn thiện đánh bóng, mờ hoặc chải xước tùy ngôn ngữ thiết kế.',
  },
  {
    slug: 'corten-steel',
    title: 'Corten Steel',
    description:
      'Lớp gỉ bảo vệ tự nhiên tạo sắc cam đất đặc trưng theo thời gian. Bền ngoài trời, ít bảo trì, thường dùng cho artwork mang tinh thần mộc và gần gũi thiên nhiên.',
  },
  {
    slug: 'painted-steel',
    title: 'Painted Steel',
    description:
      'Linh hoạt về màu sắc và hình khối. Lớp sơn tĩnh điện chống ăn mòn, chịu tia UV. Cần kiểm tra và bảo dưỡng lớp phủ định kỳ theo điều kiện môi trường.',
  },
  {
    slug: 'bronze-copper',
    title: 'Bronze / Copper',
    description:
      'Chất liệu truyền thống cho tượng và điêu khắc, bền vững theo thời gian và lên màu patina tự nhiên. Đòi hỏi kỹ thuật đúc và hoàn thiện bề mặt chuyên sâu.',
  },
  {
    slug: 'aluminium',
    title: 'Aluminium',
    description:
      'Nhẹ, dễ gia công hình khối phức tạp, chống ăn mòn tốt. Phù hợp artwork treo, kết cấu module hoặc chi tiết cần vận chuyển và lắp đặt trên cao.',
  },
  {
    slug: 'stone',
    title: 'Stone',
    description:
      'Cảm giác bền vững và tự nhiên, phù hợp không gian mang tính lâu dài. Gia công bằng cắt, mài, chạm khắc; hầu như không cần bảo trì sau lắp đặt.',
  },
  {
    slug: 'composite-grc',
    title: 'Composite / GRC',
    description:
      'Cho phép tạo hình phức tạp với trọng lượng nhẹ hơn kim loại hoặc đá. Bề mặt có thể giả lập nhiều chất liệu khác, phù hợp artwork quy mô lớn.',
  },
  {
    slug: 'mixed-media',
    title: 'Mixed Media',
    description:
      'Kết hợp nhiều vật liệu — kim loại, ánh sáng, nước, cây xanh — trong cùng một tác phẩm để tạo lớp trải nghiệm và chiều sâu thị giác.',
  },
];

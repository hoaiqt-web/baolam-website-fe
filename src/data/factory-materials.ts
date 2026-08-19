import type { ArtworkMaterial } from '@/data/artwork-materials';

export const FACTORY_MATERIALS: ArtworkMaterial[] = [
  {
    slug: 'steel',
    title: 'Thép',
    description:
      'Vật liệu nền cho phần lớn kết cấu và cấu kiện quy mô lớn. Gia công bằng cắt, uốn, chấn, hàn; hoàn thiện bằng sơn hoặc mạ tùy điều kiện sử dụng.',
  },
  {
    slug: 'stainless-steel',
    title: 'Thép không gỉ',
    description:
      'Chống ăn mòn cao, phù hợp khí hậu ven biển và khu vực ẩm. Hoàn thiện đánh bóng, mờ hoặc chải xước tùy ngôn ngữ thiết kế.',
  },
  {
    slug: 'corten-steel',
    title: 'Thép Corten',
    description:
      'Lớp gỉ bảo vệ tự nhiên tạo sắc cam đất đặc trưng theo thời gian, ít cần bảo trì, thường dùng cho artwork và kết cấu mang tinh thần mộc.',
  },
  {
    slug: 'aluminium',
    title: 'Nhôm',
    description:
      'Nhẹ, dễ tạo hình phức tạp, chống ăn mòn tốt. Phù hợp cấu kiện treo, module cần vận chuyển và lắp đặt trên cao.',
  },
  {
    slug: 'bronze',
    title: 'Đồng',
    description:
      'Chất liệu truyền thống cho tượng và điêu khắc, bền vững theo thời gian và lên màu patina tự nhiên. Đòi hỏi kỹ thuật đúc và hoàn thiện chuyên sâu.',
  },
  {
    slug: 'stone',
    title: 'Đá',
    description:
      'Cảm giác bền vững, tự nhiên, phù hợp không gian mang tính lâu dài. Gia công bằng cắt, mài, chạm khắc; hầu như không cần bảo trì.',
  },
  {
    slug: 'wood',
    title: 'Gỗ',
    description:
      'Mang lại cảm giác ấm áp, gần gũi. Yêu cầu xử lý chống mối mọt, chống ẩm kỹ lưỡng khi sử dụng ngoài trời và bảo dưỡng định kỳ.',
  },
  {
    slug: 'glass',
    title: 'Kính',
    description:
      'Tạo hiệu ứng thị giác nhẹ nhàng, thường kết hợp với kim loại hoặc ánh sáng. Cần tính toán an toàn và khả năng chịu lực khi dùng ngoài trời.',
  },
  {
    slug: 'composite',
    title: 'Composite',
    description:
      'Cho phép tạo hình phức tạp với trọng lượng nhẹ hơn kim loại hoặc đá, linh hoạt về màu sắc và bề mặt hoàn thiện.',
  },
  {
    slug: 'grc-grp',
    title: 'GRC/GRP',
    description:
      'Vật liệu composite gốc sợi thủy tinh, phù hợp cấu kiện kiến trúc quy mô lớn cần trọng lượng nhẹ và có thể đúc chi tiết phức tạp.',
  },
  {
    slug: 'mixed-materials',
    title: 'Vật liệu hỗn hợp',
    description:
      'Kết hợp nhiều vật liệu trong cùng một sản phẩm để cân bằng giữa thẩm mỹ, độ bền và khả năng thi công thực tế.',
  },
];

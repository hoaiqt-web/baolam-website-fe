import type { ArtworkTypology } from '@/data/artwork-typologies';

export const FACTORY_ZONES: ArtworkTypology[] = [
  {
    n: '01',
    slug: 'material-receiving',
    title: 'Material Receiving',
    description: 'Tiếp nhận, kiểm tra và phân loại nguyên vật liệu đầu vào trước khi đưa vào sản xuất.',
    items: ['Tiếp nhận nguyên vật liệu', 'Kiểm tra đầu vào', 'Phân loại và lưu kho'],
  },
  {
    n: '02',
    slug: 'cutting-forming',
    title: 'Cutting & Forming',
    description: 'Cắt và tạo hình vật liệu theo bản vẽ kỹ thuật — bước đầu tiên định hình sản phẩm.',
    items: ['Cắt', 'Uốn', 'Chấn', 'Lốc', 'Tạo hình'],
  },
  {
    n: '03',
    slug: 'welding-assembly',
    title: 'Welding & Assembly',
    description: 'Hàn, lắp ráp kết cấu và kiểm tra kích thước trước khi chuyển sang hoàn thiện bề mặt.',
    items: ['Hàn', 'Lắp ráp kết cấu', 'Kiểm tra kích thước', 'Lắp thử module'],
  },
  {
    n: '04',
    slug: 'surface-treatment',
    title: 'Surface Treatment',
    description: 'Xử lý bề mặt để đạt độ hoàn thiện và khả năng chịu điều kiện ngoài trời.',
    items: ['Mài', 'Đánh bóng', 'Làm sạch', 'Tạo texture', 'Chống ăn mòn'],
  },
  {
    n: '05',
    slug: 'painting-finishing',
    title: 'Painting & Finishing',
    description: 'Sơn, phủ bảo vệ và hoàn thiện màu sắc theo yêu cầu thiết kế.',
    items: ['Sơn', 'Phủ bảo vệ', 'Hoàn thiện màu sắc', 'Kiểm tra bề mặt'],
  },
  {
    n: '06',
    slug: 'prototype-mockup',
    title: 'Prototype & Mockup',
    description: 'Làm mẫu tỷ lệ và prototype 1:1 để kiểm tra hình thức và kỹ thuật trước sản xuất hàng loạt.',
    items: ['Mẫu tỷ lệ', 'Mẫu vật liệu', 'Prototype 1:1', 'Kiểm tra hình thức và kỹ thuật'],
  },
  {
    n: '07',
    slug: 'quality-control',
    title: 'Quality Control',
    description: 'Kiểm tra kích thước, liên kết, bề mặt và độ hoàn thiện trước khi đóng gói.',
    items: ['Kiểm tra kích thước', 'Liên kết', 'Bề mặt', 'Độ hoàn thiện', 'Lắp thử'],
  },
  {
    n: '08',
    slug: 'packing-dispatch',
    title: 'Packing & Dispatch',
    description: 'Đóng gói, chia module và chuẩn bị vận chuyển đến công trường.',
    items: ['Đóng gói', 'Chia module', 'Gắn mã', 'Chuẩn bị vận chuyển'],
  },
];

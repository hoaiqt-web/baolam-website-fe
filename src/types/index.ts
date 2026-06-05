export interface BaseProject {
  id: string;
  slug: string;
  title: string;
  client?: string;
  location?: string;
  completionYear: number;
  thumbnail: string;
  images?: string[];
  description?: string;
}

export interface LandmarkProject extends BaseProject {
  category: 'Công Trình Biểu Tượng' | 'Kiến Trúc Điểm Nhấn';
  scale?: string; // Ví dụ: 'Cao 35m', 'Diện tích 5000m2'
}

export interface ArtworkProject extends BaseProject {
  category: 'Artwork Cảnh Quan' | 'Tượng Nghệ Thuật' | 'Công Viên Nghệ Thuật';
  material?: string; // Ví dụ: 'Đồng đúc', 'Composite', 'Thép không gỉ'
}

export interface FactoryInfo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  specs?: string[];
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  intent: 'Tư vấn thiết kế Artwork' | 'Thi công Tượng quy mô lớn' | 'Hợp tác dự án Landmark' | 'Khác';
  message?: string;
}

export interface HeroData {
  id: string;
  title: string;
  subtitle: string;
  videoUrl?: string;
  imageUrl?: string;
}

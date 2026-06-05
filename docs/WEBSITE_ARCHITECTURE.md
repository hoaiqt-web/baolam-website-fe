# WEBSITE ARCHITECTURE

## 1. Công nghệ nền tảng (Tech Stack)
- Framework: Next.js (App Router)
- Ngôn ngữ: TypeScript
- Styling: Tailwind CSS
- Quản lý trạng thái/Dữ liệu: React Hooks, Fetch API

## 2. Sitemap
1. **Trang chủ** (`/`)
2. **Năng lực** (`#capabilities`)
   - Quy trình Thiết kế - Sản xuất - Thi công
3. **Dự án biểu tượng** (`#landmarks`)
4. **Artwork cảnh quan** (`#artworks`)
5. **Nhà máy sản xuất** (`#factory`)
6. **Khách hàng tiêu biểu** (`#clients`)
7. **Tin tức** (`#news`)
8. **Liên hệ** (`#contact`)
9. **Portal khách hàng** (Giai đoạn sau)

## 3. Data Models (src/types/index.ts)
Hệ thống sử dụng các kiểu dữ liệu sau:
- `Project`: Thông tin dự án chung (cả Landmark và Artwork)
- `LandmarkProject` (Mở rộng Project): Dành cho công trình biểu tượng
- `ArtworkProject` (Mở rộng Project): Dành cho tượng/artwork cảnh quan
- `Factory`: Thông tin và hình ảnh nhà máy, thiết bị máy móc
- `Client`: Đối tác, chủ đầu tư (Vingroup, Sun Group, Ecopark...)
- `News`: Bài viết tin tức
- `Lead / ContactRequest`: Dữ liệu form liên hệ

## 4. Tích hợp (Integrations)
- Biểu mẫu liên hệ được kết nối trực tiếp với hệ thống BAOLAM ERP.
- Chuyển hướng dữ liệu khách hàng tiềm năng đến BaoLam Messenger / CRM.

# IMAGE LIBRARY STRUCTURE

Tất cả hình ảnh tĩnh và tài sản truyền thông được lưu trữ trong thư mục `public/`.
Mô hình cấu trúc này bắt buộc phải được tuân thủ nghiêm ngặt để đảm bảo khả năng quản lý và mở rộng.

## Cây thư mục

```text
public/
├── hero/                   # Hình ảnh/video cho Hero section (ảnh cover chất lượng cao)
│   ├── hero-bana.jpg
│   └── hero-grandworld.jpg
│
├── projects/               # Dự án biểu tượng (Landmarks)
│   ├── grandworld/
│   ├── bana-hills/
│   ├── ecopark/
│   ├── oceanpark/
│   └── doi-rong/
│
├── artworks/               # Dự án Artwork cảnh quan (Statues, etc)
│   ├── teddy-bear/
│   └── me-trai-dat/
│
├── factory/                # Hình ảnh xưởng sản xuất, máy móc, quy trình
│
├── clients/                # Hình ảnh đối tác khách hàng (như dự án lúc thi công)
│
├── logos/                  # Logo của Bảo Lâm và logo Khách hàng
│   ├── baolam-logo.svg
│   └── partners/
│       ├── vingroup.svg
│       └── sungroup.svg
│
└── news/                   # Ảnh thumbnail cho các bài báo, tin tức
```

## Quy tắc sử dụng
- Component Hero chỉ đọc file từ `public/hero/`.
- Component Landmark/Projects đọc file từ `public/projects/`.
- Tên file viết thường, cách nhau bằng dấu gạch ngang (kebab-case).
- Sử dụng định dạng .webp, .jpg (cho ảnh) và .svg (cho logo/vector) để tối ưu hóa hiệu suất.

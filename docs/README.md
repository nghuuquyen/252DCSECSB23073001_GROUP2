# 📚 Calorie Web - Tài Liệu Dự Án

Folder này chứa **tài liệu dự án** được xây dựng bằng **Astro Starlight**.

## 📖 Nội Dung Tài Liệu

Tài liệu cung cấp hướng dẫn chi tiết về:
- **Bắt đầu nhanh** - Setup và cài đặt
- **Kiến trúc** - Cấu trúc dự án và thiết kế
- **Kiểu dữ liệu** - Các interface TypeScript
- **Hướng dẫn phát triển** - Quy trình và convention
- **State Management** - Zustand store
- **Storage Layer** - Quản lý localStorage
- **Tiến độ** - Tính năng hoàn thành và sắp làm

## 🔗 Liên Kết Nhanh

- **Tài liệu chính:** Xem `src/content/docs/index.mdx`
- **README dự án:** Xem `../README.md`
- **Hướng dẫn:** `src/content/docs/guides/`
- **Tham khảo:** `src/content/docs/reference/`

## 🛠️ Phát Triển Tài Liệu

### Build Tài Liệu

```bash
cd docs
npm install
npm run dev      # Start dev server
npm run build    # Build static site
```

### Cấu Trúc Folder

```
docs/
├── src/
│   ├── content/
│   │   └── docs/
│   │       ├── index.mdx          # Tài liệu chính
│   │       ├── guides/            # Hướng dẫn
│   │       └── reference/         # Tham khảo
│   └── content.config.ts          # Cấu hình nội dung
│
├── astro.config.mjs               # Cấu hình Astro
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies
```

## 🛠️ Công Nghệ

- **Astro** - Static site generator
- **Starlight** - Documentation theme
- **MDX** - Markdown + React components
- **TypeScript** - Type safety

## ✍️ Viết Tài Liệu

### Template Trang

```mdx
---
title: Tiêu Đề Trang
description: Mô tả ngắn
---

# Tiêu Đề Trang

Nội dung tại đây...

## Phần

Nội dung thêm...
```

### Ví Dụ Code

```typescript
// TypeScript code
interface Example {
  name: string
}
```

### Bảng

| Cột 1 | Cột 2 |
|-------|-------|
| Dữ liệu | Dữ liệu |

## 🚀 Deploy

Tài liệu có thể được build và deploy như static site:

```bash
npm run build   # Tạo dist/ folder
```

---

**Cập nhật lần cuối:** 08/05/2026  
**Phiên bản:** 0.1.0

---

##  Cấu trúc thư mục (Project Structure)

```bash
app/          # Routing và layout chính (Next.js App Router)
components/   # UI components (Button, Card, Chart,...)
lib/          # Xử lý logic, helper functions
store/        # Quản lý state (Zustand)
types/        # Định nghĩa TypeScript types

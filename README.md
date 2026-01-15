# Carpedia - Bách khoa toàn thư Ô tô dành cho trẻ em

Carpedia là một nền tảng kiến thức về ô tô được thiết kế đặc biệt cho trẻ em từ 3-7 tuổi. Dự án tập trung vào việc cung cấp thông tin về các thương hiệu xe, quốc gia sản xuất và các loại kiểu dáng xe một cách trực quan và dễ hiểu.

![Carpedia Banner](/public/static/images/twitter-card.png)

## 🌟 Tính năng nổi bật

- **Kiến thức dựa trên thực thể (Entity-driven):** Quản lý thông tin theo Hãng xe, Quốc gia và Loại xe.
- **Nội dung MDX:** Nội dung bài viết phong phú, hỗ trợ định dạng markdown và các component React.
- **Tìm kiếm nhanh:** Hỗ trợ tìm kiếm nhanh các thực thể (Cmd+K hoặc Ctrl+K).
- **Giao diện thân thiện:** Thiết kế sạch sẽ, hiện đại, tối ưu cho việc đọc và xem hình ảnh.
- **Tối ưu hiệu năng:** Xây dựng trên Next.js 15 với tốc độ tải trang cực nhanh.

## 🛠 Công nghệ sử dụng

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Content:** [MDX](https://mdxjs.com/) với `@next/mdx` và `next-mdx-remote`
- **Search:** Client-side JSON index với Headless UI
- **Deployment:** Tối ưu cho Vercel hoặc các nền tảng hosting tĩnh khác

## 🚀 Bắt đầu nhanh

### Cài đặt dependencies

```bash
yarn install
```

### Chạy môi trường phát triển (Development)

```bash
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem kết quả.

### Xây dựng bản sản xuất (Production Build)

```bash
yarn build
```

## 📂 Cấu trúc dự án

- `/data/entities`: Chứa các file nội dung chính dưới dạng `.mdx`.
  - `/brands`: Các hãng xe (Toyota, Honda...).
  - `/countries`: Các quốc gia (Nhật Bản, Đức...).
  - `/body-types`: Các loại xe (SUV, Sedan...).
- `/lib`: Chứa các tiện ích xử lý dữ liệu và MDX.
- `/components`: Các thành phần giao diện React.
- `/public`: Chứa tài nguyên tĩnh như hình ảnh, logo.

## 📝 Biên tập nội dung

Dự án sử dụng hệ thống filesystem-based MDX. Để thêm một hãng xe mới, chỉ cần tạo một file `.mdx` mới trong thư mục `/data/entities/brands/` với các trường frontmatter cần thiết.

---

Dự án được phát triển dựa trên [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) và đã được refactor hoàn toàn để phù hợp với giáo dục trẻ em.

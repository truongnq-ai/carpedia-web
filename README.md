# Carpedia - Bách khoa toàn thư Ô tô cho trẻ em

**Carpedia** là một dự án **Car Wiki giáo dục, phi lợi nhuận**, được thiết kế ưu tiên cho **trẻ em và gia đình**, nhằm giúp trẻ làm quen với thế giới ô tô một cách **trực quan – hệ thống – an toàn**.

Dự án được xây dựng theo hướng **data-driven**, **frontend-only**, và có khả năng mở rộng lâu dài cùng sự phát triển của trẻ.

---

## 🎯 Mục tiêu dự án

- Giúp trẻ em (đặc biệt 3–7 tuổi) nhận biết:
  - Hãng xe (Brand)
  - Quốc gia xuất xứ (Country)
  - Loại xe (Body Type)
- Tạo một nền tảng học tập:
  - Ít chữ, nhiều hình ảnh
  - Dễ hiểu với trẻ nhỏ
  - Có chiều sâu để phụ huynh cùng học
- Xây dựng một **Car Wiki phi lợi nhuận**, không quảng cáo, không thương mại

---

## 🧱 Phạm vi MVP

- **10 hãng xe đầu tiên** (Cập nhật thường xuyên)
- **Tập trung vào Brand, Country, Body Type**
- Nội dung viết **cho trẻ em**:
  - Câu ngắn, đơn giản
  - Tránh thuật ngữ kỹ thuật nặng
  - Hình ảnh trực quan

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Content:** MDX / YAML
- **Assets:** Optimized images for children

---

## 📂 Thư mục chính

- `/data/entities`: Chứa dữ liệu MDX (Brands, Countries, Body Types).
- `/app`: Cấu trúc trang sử dụng Next.js App Router.
- `/components`: Các UI component thân thiện với trẻ em.
- `/public`: Hình ảnh, logo và tài nguyên tĩnh.

---

## 🚀 Khởi chạy dự án

### Cài đặt

```bash
yarn install
```

### Phát triển

```bash
yarn dev
```

### Xây dựng bản sản xuất

```bash
yarn build
```

---

## 🌱 Triết lý phát triển

- **Phi lợi nhuận & Không quảng cáo**
- **An toàn cho trẻ em:** Không tracking, không thu thập dữ liệu cá nhân.
- **Giáo dục là ưu tiên:** Website phát triển lớn lên cùng con.

---

## 🤝 Đóng góp

Hiện dự án đang ở giai đoạn **MVP sớm**. Chúng tôi sẽ sớm công bố hướng dẫn đóng góp nội dung và hình ảnh cho cộng đồng.

---

## 📜 License

Dự án sử dụng license **MIT**. Bản quyền thuộc về **Carpedia Team**.

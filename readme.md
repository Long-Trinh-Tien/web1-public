# Bootstrap 5 Components Cheat Sheet

## Components & Shortcuts

| Component | Likely Shortcut | Description |
|-----------|-----------------|-------------|
| Navbar (`<nav class="navbar...">`) | `bs5-navbar-default` | Generates the responsive navigation bar structure. |
| Carousel (`<div id="carousel...">`) | `bs5-carousel` | Generates the image slider with indicators and controls. |
| Modal (`<div class="modal fade">`) | `bs5-modal` | Generates the popup modal structure (used for Login). |
| Grid Layout (`.container, .row, .col`) | `bs5-grid-row-col` | Generates the basic grid structure. |
| Form (`<form>`, `.form-control`) | `bs5-form-input` | Generates form groups and inputs (used in Search, Login). |
| Buttons (`.btn`) | `bs5-button` | Generates button classes. |
| Card (if used in other pages) | `bs5-card` | Generates a card component. |

---

## Usage Notes
- Các shortcut trên giúp bạn nhanh chóng tạo cấu trúc Bootstrap 5 trong HTML.
- Có thể copy trực tiếp vào file HTML và chỉnh sửa theo nhu cầu.
- README này dùng như tài liệu tham khảo nhanh khi code.

---

## Hướng dẫn Cài đặt và Tạo Project

### 1. Cài đặt Môi trường (VS Code)
1. Tải và cài đặt [Visual Studio Code](https://code.visualstudio.com/).
2. Mở VS Code, vào tab Extensions (Ctrl+Shift+X), cài đặt các extension sau:
   - **Live Server**: Để chạy web server local và tự động reload khi sửa code.
   - **Bootstrap 5 Quick Snippets**: Để sử dụng các phím tắt (shortcut) như đã liệt kê ở trên.

### 2. Khởi tạo Project
1. Tạo một thư mục mới trên máy tính (ví dụ: `web1-public`).
2. Mở thư mục này bằng VS Code (`File` -> `Open Folder`).

### 3. Tạo Cấu trúc File
Tạo các thư mục và file theo cấu trúc sau:
- `css/`: Chứa file style (ví dụ: `23880249.css`).
- `js/`: Chứa file script (ví dụ: `23880249.js`).
- `images/`: Chứa hình ảnh của dự án.
- Các file HTML chính: `index.html`, `about.html`, `blogs.html`, `contacts.html`, `gallery.html`, `search.html`.

### 4. Bắt đầu Code
1. Mở file `index.html`, gõ `!` và nhấn `Tab` để tạo khung HTML5 cơ bản.
2. Thêm liên kết Bootstrap 5 (CDN) vào thẻ `<head>` và cuối thẻ `<body>`.
3. Link file CSS và JS của bạn vào.
4. Sử dụng các **Shortcut** đã liệt kê ở phần trên để tạo nhanh các thành phần như Navbar, Carousel, Grid, v.v.

### 5. Chạy Dự án
1. Chuột phải vào file `index.html`.
2. Chọn **Open with Live Server**.
3. Trình duyệt sẽ tự động mở trang web của bạn.

# 📘 JAPANESE LEARNING WEB – TECH & FUNCTION SPEC

## 1. MỤC TIÊU DỰ ÁN
Xây dựng một nền tảng web học tiếng Nhật toàn diện, phục vụ:
- Người mới bắt đầu đến luyện thi JLPT N5–N1
- Học từ vựng, ngữ pháp, kanji, nghe – nói
- Ôn tập thông minh (random + SRS)
- Luyện đề JLPT như thi thật
- Có khả năng mở rộng AI Tutor và Mobile App trong tương lai

---

## 2. ĐỐI TƯỢNG SỬ DỤNG
- Người tự học tiếng Nhật
- Người luyện thi JLPT
- Người học cần hệ thống hoá kiến thức (kanji, trợ từ, thể)

---

## 3. STACK CÔNG NGHỆ

### 3.1 Frontend
- Ngôn ngữ: TypeScript
- Framework: Next.js (React)
- Styling: Tailwind CSS
- Audio Player: HTML5 Audio (custom UI)
- Kanji Stroke: SVG / animated SVG

### 3.2 Backend
- Ngôn ngữ: TypeScript
- Framework:
  - NestJS (khuyến nghị) hoặc
  - API Routes của Next.js (MVP)
- API: RESTful

### 3.3 Database
- PostgreSQL
- ORM: Prisma

### 3.4 Authentication
- Supabase Auth hoặc Firebase Auth
- Hỗ trợ:
  - Email / Password
  - OAuth (Google – optional)

### 3.5 Storage
- Supabase Storage / AWS S3 / Cloudflare R2
- Lưu:
  - Hình ảnh từ vựng
  - Audio nghe
  - SVG stroke kanji

---

## 4. CHỨC NĂNG CHI TIẾT

---

## 4.1 HỌC TỪ VỰNG (VOCABULARY)

### Mỗi từ vựng gồm:
- id
- kanji
- furigana
- romaji (optional)
- meaning_vi
- image_url
- jlpt_level (N5–N1)
- audio_url

### Hiển thị:
- Kanji lớn + furigana
- Phát âm audio
- Hình ảnh minh hoạ
- Nghĩa tiếng Việt
- Ví dụ:
  - Câu JP
  - Dịch VI

### Quiz nhanh:
- JP → VI
- Nghe → chọn nghĩa

---

## 4.2 HỌC KANJI

### Mỗi kanji gồm:
- id
- kanji
- on_yomi (array)
- kun_yomi (array)
- meaning_vi
- stroke_count
- stroke_svg_url
- jlpt_level

### Chức năng:
- Xem thứ tự nét (stroke order)
- Ví dụ theo từng âm On / Kun
- Quiz:
  - Nhận mặt chữ
  - Chọn cách đọc đúng

---

## 4.3 NGỮ PHÁP

### Mỗi điểm ngữ pháp:
- id
- title
- description
- jlpt_level
- example_jp
- example_vi

### Hiển thị:
- Giải thích ngắn gọn
- Ví dụ đúng / sai
- Lưu ý khi dùng

---

## 4.4 TRỢ TỪ

### Mỗi trợ từ:
- particle
- usage
- when_to_use
- when_not_to_use
- example_correct
- example_wrong
- memory_tip

### Chức năng:
- So sánh trợ từ (は vs が, に vs で…)
- Quiz chọn trợ từ đúng

---

## 4.5 THA ĐỘNG TỪ & TỰ ĐỘNG TỪ

### Bảng dữ liệu:
- id
- intransitive_verb
- transitive_verb
- meaning_vi

### Chức năng:
- Filter
- So sánh ví dụ trong câu
- Quiz phân biệt

---

## 4.6 CÁC THỂ & CÁCH CHIA ĐỘNG TỪ

### Bao gồm:
- Thể ます
- Thể て
- Thể ない
- Thể た
- Thể 意向形
- Thể 命令形
- Thể 受身
- Thể 使役

### Chức năng:
- Chọn động từ → hệ thống tự chia
- Quiz điền đúng dạng

---

## 4.7 LUYỆN NGHE

### Mỗi bài nghe:
- id
- audio_url
- script_jp
- script_vi
- jlpt_level

### Chức năng:
- Nghe tốc độ thường / chậm
- Toggle ẩn hiện script
- Quiz nghe hiểu

---

## 4.8 LUYỆN NÓI (PHASE 2)

### Flow:
- User nói → Speech to Text
- So sánh với câu mẫu
- Phát hiện:
  - Sai trợ từ
  - Sai thì
  - Sai trật tự câu
- Gợi ý sửa + giải thích

---

## 4.9 ÔN TẬP RANDOM (SRS)

### Logic:
- Ưu tiên:
  - Câu/từ hay sai
  - Lâu chưa ôn
- Áp dụng Spaced Repetition

### Dữ liệu theo user:
- last_review
- correct_count
- wrong_count

---

## 4.10 LUYỆN ĐỀ JLPT

### Cấu trúc:
- N5 → N1
- Các phần:
  - Từ vựng
  - Ngữ pháp
  - Đọc hiểu
  - Nghe

### Chức năng:
- Random đề từ question bank
- Set thời gian như thi thật
- Chấm điểm tự động
- Phân tích lỗi sau khi nộp bài

---

## 5. DATABASE CORE TABLES

### users
- id
- email
- level
- created_at

### vocabularies
- id
- kanji
- furigana
- meaning_vi
- image_url
- jlpt_level

### kanji
- id
- kanji
- on_yomi
- kun_yomi
- stroke_svg_url
- jlpt_level

### grammar
- id
- title
- description
- jlpt_level

### listening
- id
- audio_url
- script_jp
- script_vi
- jlpt_level

### questions
- id
- type
- question
- options (JSON)
- correct_answer
- jlpt_level

### user_progress
- user_id
- item_type
- item_id
- last_review
- correct_count
- wrong_count

---

## 6. LỘ TRÌNH PHÁT TRIỂN

### Phase 1 (MVP)
- Từ vựng
- Kanji
- Ngữ pháp
- Ôn tập random

### Phase 2
- Nghe
- Nói
- JLPT mock test

### Phase 3
- AI Tutor
- Mobile App
- Subscription

---

## 7. GHI CHÚ CHO DEV
- Không hardcode dữ liệu
- Tách media khỏi database
- Chuẩn hoá jlpt_level
- Viết API theo module
- Ưu tiên mở rộng về sau

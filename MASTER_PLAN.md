# 🎯 MASTER PLAN - HOÀN THIỆN TRANG WEB HỌC TIẾNG NHẬT CHUẨN JLPT

**Leader IT**: Antigravity  
**Ngày tạo**: 2026-02-10  
**Dự án**: NihongoMaster - Nền tảng học tiếng Nhật  
**Mục tiêu**: Hoàn thiện chỉnh chu theo đúng tiêu chuẩn JLPT (N5 → N1)

---

## 📊 TỔNG QUAN HIỆN TRẠNG

### ✅ Đã có (Working)
| Module | Trạng thái | Chi tiết |
|--------|-----------|----------|
| **Vocabulary** | ⚠️ Thiếu N3/N2/N1 | N5: ~150 từ, N4: ~80 từ, N3/N2/N1: 0 từ |
| **Kanji** | ✅ Đầy đủ N5→N1 | N5: 80, N4: ~170, N3/N2/N1: có data |
| **Grammar** | ⚠️ Chưa đủ | N5: 20, N4: 15, N3: 10, N2: 7, N1: 5 |
| **Listening** | ✅ Tốt | 30 bài nghe N5→N1 |
| **Mock Test** | ⚠️ Chỉ có N5 | Chỉ 1 đề thi thử N5 (ít câu hỏi) |
| **Quiz/Practice** | ✅ Có | 4 chế độ quiz |
| **SRS (Leitner)** | ✅ Hoàn chỉnh | Hệ thống ôn tập thông minh |
| **AI Tutor (Kiko)** | ✅ Có | Chat AI hỗ trợ học |
| **Dashboard** | ✅ Có | Theo dõi tiến độ |
| **Placement Test** | ✅ Có | Test xếp lớp |

### ❌ Các vấn đề cần sửa
1. **Vocabulary N3/N2/N1 = TRỐNG** → Thiếu nghiêm trọng
2. **Grammar quá ít** → JLPT chuẩn cần ~180 mẫu N5 đến N1
3. **Mock Test chỉ có N5** → Cần N4, N3, N2, N1
4. **Câu hỏi thi thử rất ít** → N5 chỉ 12 câu, N4 chỉ 4 câu trong `jlpt_questions.ts`
5. **Có lỗi data** → `grammar_n4.ts` - `～他（ほか）ない` là N2 chứ không phải N4
6. **Kanji thiếu trường** → Thiếu `examples` (từ ghép), `radical`, `mnemonic`  
7. **Listening thiếu audio thật** → Tất cả `audio_url: ''`
8. **Thiếu Reading module** → JLPT bắt buộc có đọc hiểu
9. **Grammar thiếu detail page** → Link `/grammar/[id]` nhưng chưa có page

---

## 🏗️ KẾ HOẠCH THỰC HIỆN - 8 GIAI ĐOẠN

---

### 📌 GIAI ĐOẠN 1: SỬA LỖI DỮ LIỆU & CẤU TRÚC CƠ BẢN
**Ưu tiên**: 🔴 Cao nhất  
**Thời gian ước tính**: 2-3 giờ  

#### Bước 1.1: Sửa lỗi phân loại grammar sai level
- [ ] `grammar_n4.ts` → Chuyển `～他（ほか）ない` (n4_003) sang N2 vì đây là mẫu N2
- [ ] Kiểm tra lại toàn bộ grammar N3-N1 có bị phân sai level không

#### Bước 1.2: Sửa lỗi trong `jlpt_questions.ts`
- [ ] `n5_vocab_5` - correctAnswer = 2 nhưng **thiếu context** cho "高い の反対". Cần thêm context rõ ràng (giá vs chiều cao)
- [ ] `n5_gram_3` - Câu hỏi word_order không hoạt động đúng (comment nói "Makes no sense"), cần viết lại hoàn toàn

#### Bước 1.3: Chuẩn hóa ID và cấu trúc dữ liệu
- [ ] Vocabulary ID bị trùng giữa `vocab_n5.ts` và `kanji_n5.ts` (cùng `n5_001`...) → Đổi prefix vocab thành `voc_n5_001`
- [ ] Grammar ID  thống nhất: `gram_n5_001`, `gram_n4_001`...
- [ ] Kanji ID: `kan_n5_001`, `kan_n4_001`...

#### Bước 1.4: Cập nhật Type definitions
```typescript
// Bổ sung cho Kanji type
export interface Kanji {
    id: string;
    kanji: string;
    on_yomi: string[];
    kun_yomi: string[];
    meaning_vi: string;
    meaning_en?: string;        // NEW: Nghĩa tiếng Anh
    stroke_count: number;
    jlpt_level: 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
    radical?: string;           // NEW: Bộ thủ
    radical_meaning?: string;   // NEW: Nghĩa bộ thủ
    examples?: {                // NEW: Từ ghép
        word: string;
        reading: string;
        meaning: string;
    }[];
    mnemonic?: string;          // NEW: Mẹo nhớ
}

// Bổ sung cho Vocabulary type
export interface Vocabulary {
    // ... existing fields
    word_type?: 'noun' | 'verb' | 'adjective-i' | 'adjective-na' | 'adverb' | 'particle' | 'expression' | 'counter';  // NEW
    conjugation_group?: 1 | 2 | 3;  // NEW: Nhóm chia động từ (ichidan/godan/irregular)
}
```

---

### 📌 GIAI ĐOẠN 2: BỔ SUNG TỪ VỰNG CHUẨN JLPT
**Ưu tiên**: 🔴 Cao nhất  
**Thời gian ước tính**: 8-10 giờ  

#### Tiêu chuẩn JLPT chính thức:
| Level | Số từ yêu cầu | Hiện có | Cần thêm |
|-------|---------------|---------|----------|
| N5 | ~800 | ~150 | ~650 |
| N4 | ~1,500 (tổng) | ~80 | ~700 |
| N3 | ~3,750 (tổng) | 0 | ~2,250 |
| N2 | ~6,000 (tổng) | 0 | ~2,250 |
| N1 | ~10,000 (tổng) | 0 | ~4,000 |

> ⚠️ **Lưu ý thực tế**: Không cần đạt đủ 10,000 từ. Tập trung vào **core vocabulary** hay gặp nhất. Mục tiêu thực tế:

#### Mục tiêu thực tế:
| Level | Mục tiêu | Phân chia file |
|-------|----------|---------------|
| N5 | 300 từ | `vocab_n5.ts` + thư mục `vocabulary/n5/` (theo category) |
| N4 | 300 từ | `vocab_n4.ts` + thư mục `vocabulary/n4/` (theo category) |
| N3 | 300 từ | `vocab_n3.ts` + thư mục `vocabulary/n3/` (MỚI) |
| N2 | 200 từ | `vocab_n2.ts` + thư mục `vocabulary/n2/` (MỚI) |
| N1 | 200 từ | `vocab_n1.ts` + thư mục `vocabulary/n1/` (MỚI) |

#### Bước 2.1: Mở rộng N5 Vocabulary (~150 từ nữa)
Bổ sung các chủ đề còn thiếu:
- [ ] **Đồ ăn & Đồ uống** (食べ物・飲み物): すし, みそしる, パン, ジュース, ケーキ...
- [ ] **Quần áo** (服): シャツ, くつ, ぼうし, コート...
- [ ] **Giao thông** (交通): でんしゃ, タクシー, ちかてつ, ひこうき...
- [ ] **Đồ dùng hàng ngày** (日用品): かさ, かばん, さいふ, かぎ...
- [ ] **Hành động cơ bản** (動詞): おきる, ねる, はたらく, あそぶ, すむ...
- [ ] **Tính từ-na** (形容動詞): きれい, しずか, にぎやか, べんり, たいへん...

#### Bước 2.2: Mở rộng N4 Vocabulary (~220 từ nữa)
- [ ] **Cảm xúc & Tính cách**: うれしい, かなしい, こわい, まじめ, やさしい...
- [ ] **Công việc**: しゃちょう, かいぎ, しゅっちょう, きゅうりょう...
- [ ] **Sức khỏe**: びょうき, ねつ, くすり, びょういん, けが...
- [ ] **Thể thao & Giải trí**: サッカー, テニス, りょこう, えいが...
- [ ] **Động từ phức hợp**: ～はじめる, ～おわる, ～つづける, ～なおす...

#### Bước 2.3: Tạo N3 Vocabulary (300 từ - MỚI HOÀN TOÀN)
Tạo thư mục `src/data/vocabulary/n3/`:
- [ ] `abstract_concepts.ts` - 概念, 影響, 原因, 結果, 目的...
- [ ] `business.ts` - 経験, 責任, 説明, 相談, 連絡...
- [ ] `emotions.ts` - 感動, 不安, 期待, 緊張, 満足...
- [ ] `society.ts` - 社会, 政治, 経済, 環境, 文化...
- [ ] `verbs_advanced.ts` - 比べる, 調べる, 届ける, 伝える, 断る...
- [ ] `adverbs.ts` - 必ず, まさか, なるべく, いきなり, さすがに...

#### Bước 2.4: Tạo N2 Vocabulary (200 từ)
- [ ] `vocab_n2.ts` + `vocabulary/n2/` với các category: academic, news, formal expressions

#### Bước 2.5: Tạo N1 Vocabulary (200 từ)
- [ ] `vocab_n1.ts` + `vocabulary/n1/` với các category: literature, philosophy, technical

#### Bước 2.6: Cập nhật `vocab.ts` index
```typescript
export const vocabularyByLevel = {
    N5: vocabN5,
    N4: vocabN4,
    N3: vocabN3,  // NEW
    N2: vocabN2,  // NEW
    N1: vocabN1,  // NEW
};
```

---

### 📌 GIAI ĐOẠN 3: BỔ SUNG NGỮ PHÁP CHUẨN JLPT
**Ưu tiên**: 🔴 Cao  
**Thời gian ước tính**: 6-8 giờ  

#### Tiêu chuẩn JLPT:
| Level | Mẫu ngữ pháp yêu cầu | Hiện có | Cần thêm |
|-------|----------------------|---------|----------|
| N5 | ~45 | 20 | ~25 |
| N4 | ~55 | 15 | ~40 |
| N3 | ~60 | 10 | ~50 |
| N2 | ~65 | 7 | ~58 |
| N1 | ~55 | 5 | ~50 |

#### Bước 3.1: Bổ sung Grammar N5 (thêm ~25 mẫu)
- [ ] ～ましょうか (Tôi giúp nhé?)
- [ ] ～より～のほうが (So sánh)
- [ ] ～でしょう (Có lẽ)
- [ ] ～と思います (Tôi nghĩ rằng)
- [ ] ～時（とき） (Khi)
- [ ] ～前に/後に (Trước khi/Sau khi)
- [ ] ～ながら (Vừa... vừa...)
- [ ] ～て形 các quy tắc (五段, 一段, 不規則)
- [ ] Thể phủ định: ～ません, ～くない, ～じゃない
- [ ] Thể quá khứ: ～ました, ～かった, ～だった
- [ ] ～が (Nhưng mà)
- [ ] ～に行く/来る/帰る (Đi để làm gì)
- [ ] ～あげる/もらう/くれる (Cho/Nhận)
- [ ] ... và các mẫu còn thiếu

#### Bước 3.2: Bổ sung Grammar N4 (thêm ~40 mẫu)
- [ ] ～ている (Trạng thái vs Tiếp diễn)
- [ ] 受身形 (Thể bị động)
- [ ] 使役形 (Thể sai khiến)
- [ ] ～ことがある (Đã từng)
- [ ] ～ようになる (Trở nên có thể)
- [ ] ～させてください (Xin cho phép)
- [ ] ～と (Nếu... thì tự nhiên...)
- [ ] ～ので (Bởi vì - nguyên nhân khách quan)
- [ ] ～のに (Mặc dù - nuối tiếc)
- [ ] ～ても (Dù... vẫn...)
- [ ] ～てあげる/もらう/くれる
- [ ] 命令形 & 禁止形 (Thể mệnh lệnh & cấm)
- [ ] ～つもりです (Dự định)
- [ ] ～ことにする/なる (Quyết định)
- [ ] ... và các mẫu còn thiếu

#### Bước 3.3: Bổ sung Grammar N3 (thêm ~50 mẫu)
- [ ] ～ように (Để mà / Giống như)
- [ ] ～として (Với tư cách)
- [ ] ～ことになっている (Quy định)
- [ ] ～わけではない (Không phải là)
- [ ] ～ものだ (Nên / Đáng lẽ)
- [ ] ～ことにする (Quyết định)
- [ ] ～ようにする (Cố gắng)
- [ ] ～っけ (Nhỉ... - hỏi lại)
- [ ] ～向け (Dành cho)
- [ ] ～最中に (Đang giữa lúc)
- [ ] ... và các mẫu chuẩn N3

#### Bước 3.4: Bổ sung Grammar N2 (thêm ~58 mẫu)
- [ ] ～というものだ (Đó chính là...)
- [ ] ～に限り (Chỉ riêng...)
- [ ] ～どころではない (Không thể nghĩ tới chuyện...)
- [ ] ～を問わず (Bất kể...)
- [ ] ～にもかかわらず (Mặc dù vậy)
- [ ] ～に伴い (Cùng với / Theo đó)
- [ ] ～一方（で） (Mặt khác)
- [ ] ... và các mẫu chuẩn N2

#### Bước 3.5: Bổ sung Grammar N1 (thêm ~50 mẫu)
- [ ] ～を余儀なくされる (Bị buộc phải)
- [ ] ～にほかならない (Chẳng gì khác ngoài)
- [ ] ～をもって (Bằng cách / Kể từ)
- [ ] ～に至る (Đi đến mức)
- [ ] ～が故に (Chính vì)
- [ ] ～極まりない (Vô cùng)
- [ ] ... và các mẫu chuẩn N1

---

### 📌 GIAI ĐOẠN 4: XÂY DỰNG ĐỀ THI THỬ (MOCK TEST) CHUẨN JLPT
**Ưu tiên**: 🔴 Cao  
**Thời gian ước tính**: 8-10 giờ  

#### Cấu trúc đề thi JLPT chuẩn:

##### N5 (105 phút, 180 điểm):
| Phần | Nội dung | Thời gian | Số câu |
|------|----------|-----------|--------|
| 1 | 文字・語彙 (Chữ & Từ vựng) | 25 phút | 25 câu |
| 2 | 文法・読解 (Ngữ pháp & Đọc hiểu) | 50 phút | 26 câu |
| 3 | 聴解 (Nghe hiểu) | 30 phút | 24 câu |

##### N4 (125 phút, 180 điểm):
| Phần | Nội dung | Thời gian | Số câu |
|------|----------|-----------|--------|
| 1 | 文字・語彙 (Chữ & Từ vựng) | 30 phút | 30 câu |
| 2 | 文法・読解 (Ngữ pháp & Đọc hiểu) | 60 phút | 33 câu |
| 3 | 聴解 (Nghe hiểu) | 35 phút | 28 câu |

##### N3 (140 phút, 180 điểm):
| Phần | Nội dung | Thời gian | Số câu |
|------|----------|-----------|--------|
| 1 | 文字・語彙 (Chữ & Từ vựng) | 30 phút | 33 câu |
| 2 | 文法・読解 (Ngữ pháp & Đọc hiểu) | 70 phút | 37 câu |
| 3 | 聴解 (Nghe hiểu) | 40 phút | 28 câu |

##### N2 (155 phút, 180 điểm):
| Phần | Nội dung | Thời gian | Số câu |
|------|----------|-----------|--------|
| 1 | 文字・語彙 (Chữ & Từ vựng) | 35 phút | 32 câu |
| 2 | 文法・読解 (Ngữ pháp & Đọc hiểu) | 75 phút | 39 câu |
| 3 | 聴解 (Nghe hiểu) | 50 phút | 32 câu |

##### N1 (170 phút, 180 điểm):
| Phần | Nội dung | Thời gian | Số câu |
|------|----------|-----------|--------|
| 1 | 文字・語彙 (Chữ & Từ vựng) | 35 phút | 27 câu |
| 2 | 文法・読解 (Ngữ pháp & Đọc hiểu) | 80 phút | 41 câu |
| 3 | 聴解 (Nghe hiểu) | 55 phút | 37 câu |

#### Bước 4.1: Tạo cấu trúc đề thi mới
```
src/data/mock_tests/
├── n5_full_test.ts      ← CẬP NHẬT (tăng câu hỏi)
├── n5_test_02.ts        ← MỚI
├── n4_full_test.ts      ← MỚI  
├── n4_test_02.ts        ← MỚI
├── n3_full_test.ts      ← MỚI
├── n2_full_test.ts      ← MỚI
├── n1_full_test.ts      ← MỚI
└── index.ts             ← MỚI (export tất cả)
```

#### Bước 4.2: Cập nhật `n5_full_test.ts`
- [ ] Tăng từ 10 câu → **75 câu** (25 vocab + 26 grammar/reading + 24 listening)
- [ ] Duration: 105 phút (đúng chuẩn JLPT)
- [ ] Pass score: 80/180 (sectionwise: mỗi section tối thiểu 38% = 19/60)
- [ ] Thêm các dạng câu hỏi chuẩn:
  - 漢字読み (đọc kanji)
  - 文脈規定 (chọn từ theo ngữ cảnh)
  - 言い換え類義 (paraphrasing)
  - 用法 (cách dùng từ)
  - 文の文法1 (Grammar trong câu)
  - 文の文法2 (Grammar sắp xếp câu ★)
  - 文章の文法 (Grammar trong đoạn văn)
  - 内容理解 短文 (Đọc hiểu ngắn)
  - 内容理解 中文 (Đọc hiểu trung)
  - 情報検索 (Tìm thông tin)

#### Bước 4.3: Tạo đề thi N4, N3, N2, N1
- [ ] Mỗi level tối thiểu 1 đề thi đầy đủ
- [ ] Theo đúng cấu trúc JLPT (phần/thời gian/số câu)
- [ ] Thêm `passScore` theo sectional scoring (mỗi section phải đạt tối thiểu)

#### Bước 4.4: Cập nhật `jlpt_questions.ts`
- [ ] Tăng N5 questions từ 12 → 50+ câu
- [ ] Tăng N4 questions từ 4 → 50+ câu
- [ ] Thêm N3, N2, N1 questions pool

---

### 📌 GIAI ĐOẠN 5: XÂY DỰNG MODULE ĐỌC HIỂU (READING)
**Ưu tiên**: 🟡 Trung bình-Cao  
**Thời gian ước tính**: 6-8 giờ  

#### JLPT Reading yêu cầu:
- **N5**: Hiểu thông tin đơn giản (biển báo, thông báo, email ngắn)
- **N4**: Hiểu đoạn văn 100-200 chữ về chủ đề quen thuộc
- **N3**: Hiểu bài viết ~300-500 chữ, tin tức đơn giản
- **N2**: Hiểu bài báo, essay ~500-800 chữ
- **N1**: Hiểu văn bản phức tạp 800-1000+ chữ

#### Bước 5.1: Tạo type cho Reading
```typescript
// src/types/reading.ts
export interface ReadingPassage {
    id: string;
    title: string;
    jlpt_level: 'N5' | 'N4' | 'N3' | 'N4' | 'N5';
    category: string;  // 'email' | 'notice' | 'article' | 'essay' | 'letter'
    content_jp: string;
    content_furigana?: string; // Optional: full furigana version
    vocabulary_hints?: { word: string; reading: string; meaning: string }[];
    questions: ReadingQuestion[];
}

export interface ReadingQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}
```

#### Bước 5.2: Tạo dữ liệu Reading
```
src/data/reading/
├── reading_n5.ts    (10 bài)
├── reading_n4.ts    (8 bài)
├── reading_n3.ts    (6 bài)
├── reading_n2.ts    (5 bài)
├── reading_n1.ts    (4 bài)
└── index.ts
```

Nội dung mẫu N5:
- Email từ bạn bè
- Biển báo ở nhà ga, cửa hàng
- Thông báo lớp học
- Menu nhà hàng
- Lịch trình du lịch

#### Bước 5.3: Tạo trang Reading `/reading`
- [ ] Tạo `src/app/reading/page.tsx`
- [ ] Filter theo JLPT level
- [ ] Hiển thị passage + câu hỏi
- [ ] Furigana toggle
- [ ] Vocabulary hints
- [ ] Kết quả & giải thích

---

### 📌 GIAI ĐOẠN 6: CẢI THIỆN UI/UX
**Ưu tiên**: 🟡 Trung bình  
**Thời gian ước tính**: 4-5 giờ  

#### Bước 6.1: Font tiếng Nhật chuyên dụng
- [ ] Thêm Google Fonts `Noto Sans JP` vào `layout.tsx`
```tsx
import { Noto_Sans_JP } from 'next/font/google';
const notoSansJP = Noto_Sans_JP({ 
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-jp' 
});
```
- [ ] Áp dụng class `font-jp` cho tất cả text tiếng Nhật

#### Bước 6.2: Furigana Toggle Component
- [ ] Tạo `src/components/FuriganaText.tsx`
```tsx
interface FuriganaTextProps {
    kanji: string;
    furigana: string;
    showFurigana?: boolean;
}
// Sử dụng <ruby> HTML tag
```
- [ ] Thêm toggle button trên Navbar hoặc Settings
- [ ] Mặc định: N5-N4 hiện furigana, N2-N1 ẩn

#### Bước 6.3: Tạo trang Grammar Detail `/grammar/[id]`
- [ ] Tạo `src/app/grammar/[id]/page.tsx`
- [ ] Hiển thị chi tiết mẫu ngữ pháp:
  - Title + Formation
  - Giải thích chi tiết
  - Ví dụ minh họa (nhiều hơn)
  - Bài tập nhanh (quick quiz)
  - Mẫu ngữ pháp liên quan

#### Bước 6.4: Cải thiện Navigation
- [ ] Thêm **Reading** vào Navbar
- [ ] Thêm **Breadcrumb** cho các trang con
- [ ] Thêm **Progress indicator** cho mỗi level (% hoàn thành)
- [ ] Thêm **Quick access** từ Dashboard đến các module

#### Bước 6.5: Responsive Design Check
- [ ] Kiểm tra mobile responsiveness cho tất cả trang
- [ ] Đặc biệt: Kanji stroke animation, Quiz, Test phải hoạt động tốt trên mobile
- [ ] Card layout: Grid 1 col trên mobile, 2-3 col trên desktop

---

### 📌 GIAI ĐOẠN 7: NÂNG CẤP TÍNH NĂNG HỌC TẬP
**Ưu tiên**: 🟢 Trung bình  
**Thời gian ước tính**: 5-7 giờ  

#### Bước 7.1: Particle Drill (Luyện trợ từ)
- [ ] Tạo `src/data/particle_exercises.ts`
- [ ] 100+ câu hỏi điền trợ từ (は, が, を, に, で, と, も, から, まで, の, へ, よ, ね)
- [ ] Tạo trang `/practice/particles`
- [ ] Phân theo level: N5 particles → N3 particles nâng cao

#### Bước 7.2: Conjugation Drill (Luyện chia động từ)
- [ ] Tạo `src/data/conjugation_exercises.ts`
- [ ] Luyện chia: ます形, て形, た形, ない形, 可能形, 受身形, 使役形, 命令形, 条件形, 意向形
- [ ] Tạo trang `/practice/conjugation`
- [ ] Interactive: nhập đáp án, kiểm tra ngay

#### Bước 7.3: Sentence Builder (Sắp xếp câu)
- [ ] Dạng bài ★ trong JLPT: sắp xếp từ thành câu đúng
- [ ] Drag & drop hoặc click-to-arrange
- [ ] Tạo `src/data/sentence_exercises.ts`

#### Bước 7.4: Kanji Writing Practice
- [ ] Tận dụng `KanjiStrokeAnimation` hiện có
- [ ] Thêm chế độ luyện viết: hiện stroke order → user vẽ theo
- [ ] Tích hợp canvas drawing

#### Bước 7.5: Daily Challenge / Streak Enhancement
- [ ] Tạo "Bài tập hàng ngày" tự động từ pool câu hỏi
- [ ] Mix: 5 vocab + 3 grammar + 2 listening mỗi ngày
- [ ] Streak counter với animation khi duy trì streak

---

### 📌 GIAI ĐOẠN 8: KIỂM TRA CHẤT LƯỢNG & DEPLOY
**Ưu tiên**: 🟢 Cuối cùng  
**Thời gian ước tính**: 3-4 giờ  

#### Bước 8.1: Kiểm tra dữ liệu
- [ ] Cross-check vocabulary với danh sách từ JLPT chính thức
- [ ] Kiểm tra tất cả kanji: on_yomi, kun_yomi, stroke_count chính xác
- [ ] Kiểm tra tất cả grammar: formation, examples đúng ngữ pháp
- [ ] Kiểm tra listening: script_jp và script_vi khớp nhau
- [ ] Kiểm tra mock tests: correctAnswer đúng

#### Bước 8.2: Build & Fix Errors
- [ ] Chạy `npm run build` để kiểm tra errors
- [ ] Fix tất cả TypeScript errors
- [ ] Fix tất cả lint warnings
- [ ] Test tất cả routes hoạt động

#### Bước 8.3: Performance
- [ ] Lazy load data files lớn (vocabulary, kanji)
- [ ] Sử dụng dynamic imports cho các page ít dùng
- [ ] Optimize images nếu có

#### Bước 8.4: SEO & Metadata
- [ ] Thêm metadata đầy đủ cho mỗi page
- [ ] Thêm Open Graph tags
- [ ] Sitemap
- [ ] Title + Description tiếng Việt

---

## 📋 TỔNG KẾT ƯU TIÊN THỰC HIỆN

| # | Giai đoạn | Ưu tiên | Ước tính | Lý do |
|---|-----------|---------|----------|-------|
| 1 | Sửa lỗi dữ liệu | 🔴🔴🔴 | 2-3h | Foundation - phải đúng trước |
| 2 | Bổ sung từ vựng | 🔴🔴🔴 | 8-10h | Core content thiếu nghiêm trọng |
| 3 | Bổ sung ngữ pháp | 🔴🔴 | 6-8h | JLPT bắt buộc có grammar |
| 4 | Đề thi thử | 🔴🔴 | 8-10h | Mục đích chính của web là ôn thi |
| 5 | Module Đọc hiểu | 🟡🟡 | 6-8h | JLPT section bắt buộc |
| 6 | Cải thiện UI/UX | 🟡 | 4-5h | Nâng cao trải nghiệm |
| 7 | Tính năng học tập | 🟢 | 5-7h | Nice to have |
| 8 | Kiểm tra & Deploy | 🟢 | 3-4h | Cuối cùng |

**Tổng thời gian ước tính**: ~42-55 giờ làm việc

---

## 🎯 MILU TIÊN BẮT ĐẦU NGAY

### Sprint 1 (Hôm nay): Giai đoạn 1 - Sửa lỗi
1. Sửa grammar phân loại sai level
2. Sửa JLPT questions lỗi
3. Chuẩn hóa ID scheme
4. Update type definitions

### Sprint 2: Giai đoạn 2 - Vocabulary  
*(Lớn nhất, có thể chia thành nhiều sessions)*

### Sprint 3: Giai đoạn 3+4 - Grammar + Mock Tests

### Sprint 4: Giai đoạn 5+6 - Reading + UI

### Sprint 5: Giai đoạn 7+8 - Features + QA

---

> **Sẵn sàng bắt đầu? Hãy nói "bắt đầu giai đoạn X" để tôi triển khai ngay!** 🚀

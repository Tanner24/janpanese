# 📚 KẾ HOẠCH MỞ RỘNG DỮ LIỆU TOÀN DIỆN

## 🎯 OBJECTIVE: Comprehensive Data Expansion

**Target**: Mở rộng dữ liệu cho 4 module chính
1. **HỌC** (Learning/Vocabulary)
2. **ÔN** (Review/Practice)  
3. **NGHE** (Listening)
4. **VIẾT** (Writing)

---

## 📊 HIỆN TRẠNG (Current State)

| Module | Hiện có | Cần mở rộng đến |
|--------|---------|-----------------|
| Vocabulary | 80 từ (N5+N4) | 500+ từ (N5-N3) |
| Listening | 30 bài | 50-80 bài |
| Grammar | 0 | 100+ điểm ngữ pháp |
| Writing | 0 | 50+ bài tập |
| Kanji | 0 | 200+ chữ (N5-N4) |
| Reading | 0 | 30+ bài đọc |

---

## 1️⃣ MODULE HỌC (LEARNING) - VOCABULARY

### 🎯 **Target: 500 từ vựng (N5-N3)**

#### **Phase 1: Expand N5 (Beginner)** - 150 từ
**Current**: 50 từ  
**Target**: 150 từ (+100 từ)

**Categories cần thêm**:
```typescript
interface VocabCategory {
    // Đã có (50 từ)
    - Basic nouns (20 từ): 水, 本, 車...
    - Basic verbs (15 từ): 食べる, 飲む, 行く...
    - Basic adj (15 từ): 大きい, 小さい...
    
    // CẦN THÊM (+100 từ)
    - Time & Date (20 từ): 今日, 昨日, 明日, 朝, 昼, 夜, 月曜日...
    - Numbers & Counters (15 từ): 一つ, 二つ, 一人, 二人...
    - Family (10 từ): 父, 母, 兄, 姉, 弟, 妹...
    - Body parts (10 từ): 頭, 目, 耳, 口, 手, 足...
    - Colors (10 từ): 赤い, 青い, 白い, 黒い...
    - Animals (10 từ): 犬, 猫, 鳥, 魚...
    - Weather (10 từ): 晴れ, 雨, 雪, 曇り...
    - Places (15 từ): 学校, 病院, 駅, 銀行, 郵便局...
}
```

**Example data structure**:
```typescript
{
    id: 'vocab_n5_051',
    kanji: '今日',
    furigana: 'きょう',
    romaji: 'kyou',
    meaning_vi: 'Hôm nay',
    jlpt_level: 'N5',
    category: 'Time',
    example_sentence_jp: '今日は暑いです。',
    example_sentence_vi: 'Hôm nay nóng.',
    audio_url: '',
    image_url: '/images/vocab/today.jpg'
}
```

---

#### **Phase 2: Expand N4** - 200 từ
**Current**: 30 từ  
**Target**: 200 từ (+170 từ)

**Categories**:
```typescript
- Verbs (50 từ): 
  - Te-form verbs: 食べて, 飲んで, 行って...
  - Potential form: 食べられる, 見られる...
  - Passive form: 食べられる, 見られる...
  
- Adjectives (30 từ):
  - Na-adj: 便利, 親切, 静か...
  - I-adj adverbs: 早く, 遅く...
  
- Adverbs (20 từ): とても, 少し, たくさん, ちょっと...

- Expressions (30 từ):
  - ~と思います
  - ~かもしれません  
  - ~つもりです
  
- Work/School (20 từ): 会議, 試験, 宿題, レポート...

- Technology (15 từ): パソコン, スマホ, メール, インターネット...

- Hobbies (15 từ): 読書, 映画, 音楽, スポーツ...
```

---

#### **Phase 3: Add N3** - 200 từ (MỚI)
**Target**: 200 từ N3

**Categories**:
```typescript
- Abstract concepts (40 từ):
  - 意見 (opinion), 経験 (experience), 理由 (reason)
  - 文化 (culture), 社会 (society), 環境 (environment)
  
- Keigo - Honorifics (30 từ):
  - いらっしゃる, おっしゃる, 召し上がる...
  - お~になる, ご~になる
  
- Business (30 từ):
  - 会社, 営業, 契約, 商品, サービス...
  
- Academic (30 từ):
  - 研究, 論文, 実験, 理論, 分析...
  
- Expressions (40 từ):
  - ~について
  - ~によって
  - ~に対して
  - ~に関して
  
- Idioms & Proverbs (30 từ):
  - 石橋を叩いて渡る
  - 猫の手も借りたい
```

---

### 📁 **File Structure for Vocabulary**

```
src/data/
├── vocab_n5.ts (150 words) ← EXPAND
├── vocab_n4.ts (200 words) ← EXPAND
├── vocab_n3.ts (200 words) ← NEW
└── vocab.ts (combined 550 words)

src/data/categories/
├── n5_time.ts
├── n5_family.ts
├── n5_colors.ts
├── n4_verbs.ts
├── n4_expressions.ts
├── n3_business.ts
└── n3_keigo.ts
```

---

## 2️⃣ MODULE ÔN (REVIEW/PRACTICE)

### 🎯 **Target: Diverse practice methods**

#### **A. Grammar Practice (100 points)**

**Structure**:
```typescript
interface GrammarPoint {
    id: string;
    pattern: string;
    jlpt_level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
    meaning_vi: string;
    formation: string;
    examples: {
        jp: string;
        vi: string;
    }[];
    notes: string;
    exercises: {
        type: 'fill-blank' | 'choose' | 'translate';
        question: string;
        options?: string[];
        answer: string;
    }[];
}
```

**Example**:
```typescript
{
    id: 'grammar_n4_001',
    pattern: '〜た方がいい',
    jlpt_level: 'N4',
    meaning_vi: 'Nên làm..., tốt hơn là nên...',
    formation: 'Verb (past tense) + 方がいい',
    examples: [
        {
            jp: '毎日練習した方がいいですよ。',
            vi: 'Bạn nên luyện tập mỗi ngày đấy.'
        },
        {
            jp: '早く寝た方がいいです。',
            vi: 'Tốt hơn là nên ngủ sớm.'
        }
    ],
    notes: 'Dùng để khuyên ai đó nên làm gì',
    exercises: [
        {
            type: 'fill-blank',
            question: '風邪ですから、病院に___。(行く)',
            answer: '行った方がいい'
        }
    ]
}
```

**Grammar points to add**:

**N5 (20 points)**:
- です/ます
- ~ません/~ませんでした
- ~い adjectives
- ~な adjectives  
- Particles: は, が, を, に, で, と, の
- ~たい
- ~ている
- ~てください
- ~ましょう
- ~ませんか

**N4 (30 points)**:
- ~た方がいい
- ~つもり
- ~ことができる
- ~なら
- ~し
- ~そうです (hearsay)
- ~そうです (appearance)
- ~みたいです
- ~ようです
- ~らしいです
- ~でしょう
- ~かもしれません
- ~はずです
- ~ばかり
- ~くらい/ぐらい

**N3 (50 points)**:
- ~について
- ~によって
- ~に対して
- ~に関して
- ~のに
- ~ために (purpose)
- ~ために (reason)
- ~上で
- ~際に
- ~たびに
- ~限り
- ~うちに
- ~間に
- Passive form
- Causative form
- ~させられる (causative-passive)

---

#### **B. Particle Drills (50 exercises)**

```typescript
interface ParticleDrill {
    id: string;
    sentence_jp: string; // With blank
    particles: string[]; // Options
    correct_particle: string;
    explanation_vi: string;
}
```

**Example**:
```typescript
{
    id: 'particle_001',
    sentence_jp: '私は学校___行きます。',
    particles: ['に', 'へ', 'で', 'を'],
    correct_particle: 'に', // or 'へ'
    explanation_vi: 'に/へ dùng để chỉ hướng đi đến (destination)'
}
```

**Topics**:
- は vs が (10 exercises)
- に vs で (10 exercises)  
- を vs が (5 exercises)
- から vs まで (5 exercises)
- と vs や vs か (5 exercises)
- の usage (5 exercises)
- Mixed (10 exercises)

---

#### **C. Reading Comprehension (30 passages)**

```typescript
interface ReadingPassage {
    id: string;
    title: string;
    jlpt_level: 'N5' | 'N4' | 'N3';
    text_jp: string;
    text_vi: string; // Translation for reference
    questions: {
        id: string;
        question_vi: string;
        options: string[];
        correct: number;
    }[];
    vocabulary: {
        word: string;
        meaning: string;
    }[];
}
```

**Distribution**:
- N5: 10 passages (100-150 characters each)
- N4: 10 passages (200-300 characters)
- N3: 10 passages (400-600 characters)

**Example N5**:
```typescript
{
    id: 'read_n5_001',
    title: 'My Family',
    jlpt_level: 'N5',
    text_jp: '私の家族は四人です。父と母と姉と私です。父は会社員です。母は主婦です。姉は大学生です。私は高校生です。',
    text_vi: 'Gia đình tôi có 4 người. Bố, mẹ, chị gái và tôi. Bố là nhân viên công ty. Mẹ là nội trợ. Chị học đại học. Tôi học cấp 3.',
    questions: [
        {
            id: 'q1',
            question_vi: 'Gia đình có mấy người?',
            options: ['3 người', '4 người', '5 người', '6 người'],
            correct: 1
        },
        {
            id: 'q2',
            question_vi: 'Mẹ làm nghề gì?',
            options: ['Nhân viên công ty', 'Nội trợ', 'Giáo viên', 'Bác sĩ'],
            correct: 1
        }
    ],
    vocabulary: [
        { word: '会社員', meaning: 'nhân viên công ty' },
        { word: '主婦', meaning: 'nội trợ' }
    ]
}
```

---

## 3️⃣ MODULE NGHE (LISTENING)

### 🎯 **Target: 80 bài nghe (hiện có 30)**

#### **Cần thêm: +50 bài**

**Distribution mới**:

| Level | Hiện có | Mục tiêu | Cần thêm |
|-------|---------|----------|----------|
| N5 | 8 | 20 | +12 |
| N4 | 8 | 20 | +12 |
| N3 | 6 | 15 | +9 |
| N2 | 4 | 15 | +11 |
| N1 | 4 | 10 | +6 |
| **Total** | **30** | **80** | **+50** |

---

### **N5 Listening - Thêm 12 bài**

**New topics**:
1. Mua vé tàu
2. Hỏi giờ
3. Đặt bàn nhà hàng (extended)
4. Mua quần áo
5. Hỏi đường (variation 2)
6. Ở siêu thị
7. Gọi món ăn
8. Giới thiệu bạn bè
9. Nói về sở thích (extended)
10. Hỏi về thời tiết
11. Ở bưu điện
12. Ở ngân hàng

---

### **N4 Listening - Thêm 12 bài**

**New topics**:
1. Lên kế hoạch du lịch
2. Xin phép nghỉ việc
3. Hỏi đường (phức tạp hơn)
4. Trao đổi về công việc
5. Nói về kỳ nghỉ
6. Bàn về phim/sách
7. Đặt phòng khám bệnh
8. Thuê nhà/apartment
9. Mua điện thoại
10. Hỏi về học phí
11. Nói về tương lai
12. Kể về trải nghiệm

---

### **N3 Listening - Thêm 9 bài**

**New topics**:
1. Meeting discussion (simple)
2. Customer service call
3. Job application phone call
4. Discussing plans with friends
5. Explaining problems
6. Giving directions (detailed)
7. Talking about experiences
8. Making suggestions
9. Discussing options

---

### **N2 Listening - Thêm 11 bài**

**New topics**:
1. Business presentation
2. Academic lecture (intro level)
3. News report
4. Podcast discussion
5. Interview (job/media)
6. Panel discussion
7. Research findings
8. Product launch
9. Policy explanation
10. Survey results
11. Debate segment

---

### **N1 Listening - Thêm 6 bài**

**New topics**:
1. Economic analysis (detailed)
2. Political commentary
3. Scientific research presentation
4. Literary criticism (extended)
5. Legal discussion
6. Medical conference

---

## 4️⃣ MODULE VIẾT (WRITING) - MỚI 100%

### 🎯 **Target: 50 bài tập viết**

#### **A. Sentence Building (15 exercises)**

```typescript
interface SentenceBuilding {
    id: string;
    jlpt_level: 'N5' | 'N4' | 'N3';
    prompt_vi: string;
    words_jp: string[]; // Words to use
    sample_answer: string;
    variations: string[]; // Other correct answers
}
```

**Example**:
```typescript
{
    id: 'write_sent_001',
    jlpt_level: 'N5',
    prompt_vi: 'Viết câu: "Tôi đi học vào 8 giờ sáng"',
    words_jp: ['私', '学校', '行きます', '八時', '朝'],
    sample_answer: '私は朝八時に学校に行きます。',
    variations: [
        '朝八時に私は学校に行きます。',
        '私は学校に朝八時に行きます。'
    ]
}
```

**Distribution**:
- N5: 5 exercises (Simple present)
- N4: 5 exercises (Past, ~たい, ~たことがある)
- N3: 5 exercises (Complex sentences)

---

#### **B. Grammar Pattern Practice (15 exercises)**

```typescript
interface GrammarWriting {
    id: string;
    pattern: string;
    jlpt_level: 'N4' | 'N3';
    instruction_vi: string;
    prompts: string[]; // Multiple prompts
    sample_answers: string[];
}
```

**Example**:
```typescript
{
    id: 'write_gram_001',
    pattern: '〜た方がいい',
    jlpt_level: 'N4',
    instruction_vi: 'Dùng 〜た方がいい để viết lời khuyên',
    prompts: [
        'Bạn bè bị cảm (khuyên đi bác sĩ)',
        'Bạn muốn giỏi tiếng Nhật (khuyên học mỗi ngày)',
        'Trời lạnh (khuyên mặc áo ấm)'
    ],
    sample_answers: [
        '病院に行った方がいいですよ。',
        '毎日勉強した方がいいです。',
        '暖かい服を着た方がいいです。'
    ]
}
```

---

#### **C. Short Composition (10 topics)**

```typescript
interface Composition {
    id: string;
    jlpt_level: 'N4' | 'N3';
    topic_vi: string;
    word_limit: number;
    guidelines: string[];
    sample_composition: string;
    sample_translation: string;
}
```

**Example**:
```typescript
{
    id: 'write_comp_001',
    jlpt_level: 'N4',
    topic_vi: 'Giới thiệu bản thân',
    word_limit: 100,
    guidelines: [
        'Tên, quốc tịch, tuổi',
        'Công việc/học tập',
        'Sở thích',
        'Lý do học tiếng Nhật'
    ],
    sample_composition: 'はじめまして。私はグエンと申します。ベトナム人で、二十歳です。今、大学生です。趣味は読書と音楽を聞くことです。日本の文化が大好きですから、日本語を勉強しています。将来、日本で働きたいです。どうぞよろしくお願いします。',
    sample_translation: 'Xin chào. Tôi tên là Nguyen. Tôi là người Việt Nam, 20 tuổi. Hiện tôi là sinh viên đại học. Sở thích của tôi là đọc sách và nghe nhạc. Vì tôi rất thích văn hóa Nhật Bản nên đang học tiếng Nhật. Tương lai tôi muốn làm việc ở Nhật. Rất hân hạnh.'
}
```

**Topics** (10):
1. Tự giới thiệu (N4)
2. Gia đình của tôi (N4)
3. Sở thích (N4)
4. Một ngày của tôi (N4)
5. Kỳ nghỉ hè (N4)
6. Thành phố tôi sống (N4)
7. Công việc mơ ước (N4)
8. Kinh nghiệm đáng nhớ (N3)
9. Ưu điểm và nhược điểm của... (N3)
10. Ý kiến về vấn đề xã hội (N3)

---

#### **D. Diary/Email Writing (10 exercises)**

```typescript
interface PracticalWriting {
    id: string;
    type: 'diary' | 'email' | 'message';
    jlpt_level: 'N4' | 'N3';
    scenario_vi: string;
    requirements: string[];
    sample: string;
}
```

**Example - Email**:
```typescript
{
    id: 'write_email_001',
    type: 'email',
    jlpt_level: 'N4',
    scenario_vi: 'Gửi email xin nghỉ học vì bị bệnh',
    requirements: [
        'Chào hỏi lịch sự',
        'Nói lý do nghỉ',
        'Xin lỗi',
        'Kết thúc lịch sự'
    ],
    sample: '田中先生\n\nお世話になっております。\n明日、風邪を引いて、授業を休ませていただきたいと思います。\n申し訳ございません。\nよろしくお願いいたします。\n\nグエン'
}
```

---

## 📁 OVERALL FILE STRUCTURE

```
src/data/
├── vocabulary/
│   ├── n5/
│   │   ├── time.ts (20 words)
│   │   ├── family.ts (10 words)
│   │   ├── colors.ts (10 words)
│   │   ├── animals.ts (10 words)
│   │   ├── body.ts (10 words)
│   │   ├── weather.ts (10 words)
│   │   ├── places.ts (15 words)
│   │   └── numbers.ts (15 words)
│   ├── n4/
│   │   ├── verbs.ts (50 words)
│   │   ├── adjectives.ts (30 words)
│   │   ├── adverbs.ts (20 words)
│   │   ├── expressions.ts (30 words)
│   │   ├── work_school.ts (20 words)
│   │   ├── technology.ts (15 words)
│   │   └── hobbies.ts (15 words)
│   ├── n3/
│   │   ├── abstract.ts (40 words)
│   │   ├── keigo.ts (30 words)
│   │   ├── business.ts (30 words)
│   │   ├── academic.ts (30 words)
│   │   ├── expressions.ts (40 words)
│   │   └── idioms.ts (30 words)
│   ├── vocab_n5.ts (150 combined)
│   ├── vocab_n4.ts (200 combined)
│   ├── vocab_n3.ts (200 combined)
│   └── vocab.ts (550 total)
│
├── listening/
│   ├── n5_extended.ts (20 exercises)
│   ├── n4_extended.ts (20 exercises)
│   ├── n3_extended.ts (15 exercises)
│   ├── n2_extended.ts (15 exercises)
│   ├── n1_extended.ts (10 exercises)
│   └── listening.ts (80 total) ← UPDATE
│
├── grammar/
│   ├── n5_grammar.ts (20 points)
│   ├── n4_grammar.ts (30 points)
│   ├── n3_grammar.ts (50 points)
│   └── grammar.ts (100 total)
│
├── practice/
│   ├── particles.ts (50 drills)
│   ├── reading.ts (30 passages)
│   └── practice.ts (combined)
│
└── writing/
    ├── sentence_building.ts (15 exercises)
    ├── grammar_writing.ts (15 exercises)
    ├── composition.ts (10 topics)
    ├── practical_writing.ts (10 exercises)
    └── writing.ts (50 total)
```

---

## 📋 IMPLEMENTATION PLAN

### **Phase 1: Vocabulary (Priority 1)** - 3 hours
1. Create category files for N5 (8 files × 20 mins)
2. Create category files for N4 (7 files × 20 mins)
3. Create N3 vocabulary (6 files × 30 mins)
4. Combine into main vocab files
5. Update types if needed

**Output**: 550 words total

---

### **Phase 2: Listening (Priority 2)** - 4 hours
1. N5 extended (12 bài × 15 mins)
2. N4 extended (12 bài × 15 mins)
3. N3 extended (9 bài × 20 mins)
4. N2 extended (11 bài × 20 mins)
5. N1 extended (6 bài × 25 mins)

**Output**: 80 exercises total

---

### **Phase 3: Grammar (Priority 3)** - 3 hours
1. N5 grammar points (20 × 5 mins)
2. N4 grammar points (30 × 5 mins)
3. N3 grammar points (50 × 10 mins)
4. Create grammar page/component

**Output**: 100 grammar points

---

### **Phase 4: Practice (Priority 4)** - 2 hours
1. Particle drills (50 × 2 mins)
2. Reading passages N5 (10 × 10 mins)
3. Reading passages N4 (10 × 10 mins)
4. Reading passages N3 (10 × 15 mins)

**Output**: 50 drills + 30 readings

---

### **Phase 5: Writing (Priority 5)** - 2.5 hours
1. Sentence building (15 × 5 mins)
2. Grammar writing (15 × 5 mins)
3. Composition topics (10 × 10 mins)
4. Practical writing (10 × 5 mins)

**Output**: 50 writing exercises

---

## 📊 TOTAL EFFORT ESTIMATE

| Phase | Time | Output |
|-------|------|--------|
| Vocabulary | 3h | 550 words |
| Listening | 4h | 80 exercises |
| Grammar | 3h | 100 points |
| Practice | 2h | 80 exercises |
| Writing | 2.5h | 50 exercises |
| **TOTAL** | **14.5h** | **860 data items** |

---

## 🎯 EXPECTED OUTCOMES

### **After completion**:

1. **Vocabulary**: 80 → 550 words (6.9x increase) ✨
2. **Listening**: 30 → 80 exercises (2.7x increase) ✨
3. **Grammar**: 0 → 100 points (NEW!) ✨
4. **Practice**: 0 → 80 exercises (NEW!) ✨
5. **Writing**: 0 → 50 exercises (NEW!) ✨

### **App capabilities**:
- ✅ Complete N5-N4 coverage
- ✅ Solid N3 foundation
- ✅ 4 core skills: Vocabulary, Listening, Reading, Writing
- ✅ Grammar explanations
- ✅ Comprehensive practice

### **Competitive advantage**:
- Most apps focus on 1-2 skills
- This covers ALL 4 skills + Grammar
- SRS + Quiz + Practice = Complete learning system

---

## 🚀 NEXT STEPS

Bạn muốn tôi bắt đầu với Phase nào?

**Recommended order**:
1. **Phase 1: Vocabulary** (foundation)
2. **Phase 2: Listening** (already started)
3. **Phase 3: Grammar** (most requested)
4. **Phase 4: Practice** (reinforcement)
5. **Phase 5: Writing** (advanced)

Hoặc có thể làm **Quick Win**: Làm một ít từ mỗi phase để demo đầy đủ các tính năng!

Bạn chọn approach nào? 🎯

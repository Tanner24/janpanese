# 🔍 PHÂN TÍCH TÍNH NĂNG KANJI - GAP ANALYSIS

**Date**: 2026-02-08  
**Status**: 🟡 PROTOTYPE (Thiếu nhiều tính năng quan trọng)

---

## 📊 TỔNG QUAN HIỆN TẠI

### ✅ **ĐÃ CÓ (What Works)**:

1. **UI/UX Cơ Bản**
   - ✅ Layout đẹp với grid kanji + detail view
   - ✅ Kanji selection (click to view)
   - ✅ Animated kanji display
   - ✅ Responsive design
   - ✅ Dark mode support

2. **Thông Tin Hiển Thị**
   - ✅ Kanji character (大 display)
   - ✅ Meaning (tiếng Việt)
   - ✅ On-yomi (âm Hán-Việt)
   - ✅ Kun-yomi (âm Nhật)
   - ✅ Stroke count (số nét)
   - ✅ JLPT level

3. **Data**
   - ✅ 5 kanji mẫu (日本語学先)
   - ✅ Cấu trúc data chuẩn

---

## ❌ **ĐANG THIẾU (Critical Gaps)**

### 🔴 **1. DATA - Thiếu Nghiêm Trọng**

**Hiện tại**: Chỉ 5 kanji
**Cần thiết**: 
- N5: 80 kanji ⚠️ (thiếu 75)
- N4: 170 kanji ⚠️ (thiếu 170)
- N3: 370 kanji ⚠️ (thiếu 370)
- N2: 415 kanji ⚠️ (thiếu 415)
- N1: 580 kanji ⚠️ (thiếu 580)

**Total**: Thiếu ~1,605 kanji

**Impact**: ⭐⭐⭐⭐⭐ (CRITICAL)

---

### 🟡 **2. STROKE ORDER ANIMATION - Placeholder**

**Hiện tại**: 
```
"Stroke animation visualization (SVG Stroke Order)"
```
→ Chỉ là placeholder text!

**Cần có**:
- ❌ SVG stroke order data
- ❌ Animated drawing
- ❌ Step-by-step playback
- ❌ Practice mode (user traces)

**Giải pháp**:
1. **Option A**: Integrate KanjiVG database (FREE)
   - 6,000+ kanji với stroke order SVG
   - https://kanjivg.tagaini.net/

2. **Option B**: Use external API
   - Jisho.org API
   - KanjiAlive API

3. **Option C**: Manual SVG (not recommended)
   - Time-consuming
   - Only for critical kanji

**Impact**: ⭐⭐⭐⭐ (HIGH - Essential for learning)

---

### 🟡 **3. VÍ DỤ TỪ GHÉP - Hardcoded**

**Hiện tại**:
```typescript
[
  { k: "日本", f: "にほん", m: "Nhật Bản" },
  { k: "本文", f: "ほんぶん", m: "Thân bài, văn bản" },
  { k: "日本語", f: "にほんご", m: "Tiếng Nhật" }
]
```
→ Chỉ có 3 ví dụ cố định!

**Cần có**:
- ❌ Vocabulary compounds cho mỗi kanji
- ❌ Dynamic filtering (show relevant words)
- ❌ Example sentences
- ❌ Audio pronunciation

**Giải pháp**:
1. Link với vocabulary database hiện có
2. Filter vocab by kanji character
3. Display top 5-10 common words

**Impact**: ⭐⭐⭐ (MEDIUM-HIGH)

---

### 🟡 **4. SEARCH & FILTER - Không có**

**Thiếu hoàn toàn**:
- ❌ Search by meaning (tìm theo nghĩa)
- ❌ Search by reading (tìm theo âm đọc)
- ❌ Filter by JLPT level
- ❌ Filter by stroke count
- ❌ Filter by radical (bộ thủ)

**Cần có UI**:
```
[Search box] [N5▼] [Strokes: 1-30▼] [Radical▼]
```

**Impact**: ⭐⭐⭐⭐ (HIGH)

---

### 🟡 **5. LEARNING FEATURES - Không có**

**Thiếu hoàn toàn**:
- ❌ Practice mode (luyện viết)
- ❌ Quiz/flashcards
- ❌ SRS integration (spaced repetition)
- ❌ Progress tracking
- ❌ "Mark as learned"
- ❌ Study queue

**So sánh với Vocabulary**:
| Feature | Vocabulary | Kanji |
|---------|-----------|-------|
| Flashcard | ✅ | ❌ |
| SRS | ✅ | ❌ |
| Progress | ✅ | ❌ |
| Quiz | ✅ | ❌ |
| Practice | ✅ | ❌ |

**Impact**: ⭐⭐⭐⭐⭐ (CRITICAL)

---

### 🟡 **6. THÔNG TIN BỔ SUNG - Không có**

**Thiếu**:
- ❌ Radical (bộ thủ) + meaning
- ❌ Components breakdown (thành phần)
- ❌ Mnemonics (gợi nhớ)
- ❌ Similar kanji comparison
- ❌ Etymology (nguồn gốc)
- ❌ Common mistakes

**Ví dụ cần có**:
```
日 (Ngày, mặt trời)

Bộ thủ: 日 (nhật)
Thành phần: Đơn thể
Gợi nhớ: Hình ảnh mặt trời với tia sáng
Dễ nhầm: 目 (mắt), 白 (trắng)
```

**Impact**: ⭐⭐⭐ (MEDIUM)

---

### 🟡 **7. AUDIO - Không có**

**Thiếu**:
- ❌ Pronunciation audio (on-yomi)
- ❌ Pronunciation audio (kun-yomi)
- ❌ Word compound audio

**Cần**:
```
日本 [🔊 Play]
ニチ [🔊 Play]
ひ [🔊 Play]
```

**Impact**: ⭐⭐⭐ (MEDIUM-HIGH)

---

### 🟡 **8. NAVIGATION - Hạn chế**

**Hiện tại**: Chỉ có grid selection

**Thiếu**:
- ❌ Previous/Next buttons
- ❌ Random kanji
- ❌ Bookmarks/favorites
- ❌ Recently viewed
- ❌ Study list

**Impact**: ⭐⭐ (MEDIUM)

---

### 🟡 **9. MOBILE EXPERIENCE - Chưa tối ưu**

**Thiếu**:
- ❌ Touch-based stroke practice
- ❌ Swipe navigation
- ❌ Mobile-optimized layout
- ❌ Offline mode

**Impact**: ⭐⭐⭐ (MEDIUM-HIGH)

---

### 🟡 **10. STATS & ANALYTICS - Không có**

**Thiếu**:
- ❌ Kanji learned count
- ❌ Study time
- ❌ Mastery level
- ❌ Weak kanji identification
- ❌ Progress chart

**Impact**: ⭐⭐⭐ (MEDIUM)

---

## 🎯 ROADMAP ĐỂ HOÀN THIỆN

### **Phase 1: DATA EXPANSION** ⚡ (URGENT)
**Priority**: 🔴 CRITICAL  
**Time**: 8-12 hours

**Tasks**:
1. ✅ Create kanji data structure
2. ⬜ Add 80 N5 kanji
3. ⬜ Add 170 N4 kanji
4. ⬜ Add vocabulary compounds (5-10 per kanji)
5. ⬜ Add radicals info
6. ⬜ Add stroke order data (or API integration)

**Deliverables**:
- `src/data/kanji_n5.ts` (80 kanji)
- `src/data/kanji_n4.ts` (170 kanji)
- `src/data/kanji_compounds.ts` (compound words)
- `src/data/radicals.ts` (bộ thủ)

**Why Critical**: Không có data là không có product

---

### **Phase 2: STROKE ORDER ANIMATION** 🎨
**Priority**: 🟡 HIGH  
**Time**: 4-6 hours

**Tasks**:
1. ⬜ Integrate KanjiVG database
2. ⬜ Create SVG animation component
3. ⬜ Add playback controls (play/pause/step)
4. ⬜ Add speed control
5. ⬜ Mobile-friendly playback

**Deliverables**:
- `src/components/StrokeOrderAnimation.tsx`
- Working stroke-by-stroke animation

**Why High**: Core learning feature for kanji

---

### **Phase 3: LEARNING FEATURES** 📚
**Priority**: 🟡 HIGH  
**Time**: 6-8 hours

**Tasks**:
1. ⬜ Flashcard mode
2. ⬜ SRS integration (reuse from vocabulary)
3. ⬜ Practice mode (trace kanji)
4. ⬜ Quiz (meaning, reading, writing)
5. ⬜ Progress tracking
6. ⬜ Mark as learned/mastered

**Deliverables**:
- `src/app/kanji/practice/page.tsx`
- `src/app/kanji/flashcards/page.tsx`
- SRS integration

**Why High**: Essential for retention

---

### **Phase 4: SEARCH & FILTER** 🔍
**Priority**: 🟠 MEDIUM-HIGH  
**Time**: 3-4 hours

**Tasks**:
1. ⬜ Search by meaning
2. ⬜ Search by reading
3. ⬜ Filter by JLPT level
4. ⬜ Filter by stroke count
5. ⬜ Filter by radical
6. ⬜ Sort options

**Deliverables**:
- Search bar component
- Filter sidebar
- URL parameters for deep linking

**Why Medium-High**: Improves discoverability

---

### **Phase 5: VOCABULARY INTEGRATION** 🔗
**Priority**: 🟠 MEDIUM  
**Time**: 2-3 hours

**Tasks**:
1. ⬜ Link kanji to vocabulary database
2. ⬜ Show real compound words (not hardcoded)
3. ⬜ Click word → go to vocabulary detail
4. ⬜ Show word frequency
5. ⬜ Filter by JLPT level

**Deliverables**:
- Dynamic compound word display
- Cross-linking between kanji & vocab

**Why Medium**: Enhances learning context

---

### **Phase 6: ADDITIONAL INFO** 📖
**Priority**: 🟢 MEDIUM  
**Time**: 4-5 hours

**Tasks**:
1. ⬜ Add radical (bộ thủ) info
2. ⬜ Add mnemonics (gợi nhớ)
3. ⬜ Add similar kanji
4. ⬜ Add etymology
5. ⬜ Add common mistakes

**Deliverables**:
- Expanded kanji detail view
- Mnemonics database

**Why Medium**: Deepens understanding

---

### **Phase 7: AUDIO** 🔊
**Priority**: 🟢 MEDIUM-LOW  
**Time**: 2-3 hours

**Tasks**:
1. ⬜ Integrate TTS or audio API
2. ⬜ On-yomi audio
3. ⬜ Kun-yomi audio
4. ⬜ Compound word audio
5. ⬜ Playback controls

**Deliverables**:
- Audio playback component
- API integration

**Why Medium-Low**: Nice to have, not critical

---

### **Phase 8: STATS & ANALYTICS** 📊
**Priority**: 🟢 LOW  
**Time**: 3-4 hours

**Tasks**:
1. ⬜ Kanji learned counter
2. ⬜ Study time tracking
3. ⬜ Mastery level
4. ⬜ Progress charts
5. ⬜ Weak point identification

**Deliverables**:
- Stats dashboard
- Progress visualization

**Why Low**: Can be added later

---

## 📈 EFFORT vs IMPACT MATRIX

```
High Impact, Low Effort:
- ✅ Add N5 kanji data (250 kanji)
- ✅ Vocabulary integration (link existing data)
- ✅ Search & filter

High Impact, High Effort:
- ⚠️ Stroke order animation (need SVG data)
- ⚠️ SRS & flashcard system
- ⚠️ Practice mode (tracing)

Low Impact, Low Effort:
- 📌 Previous/Next navigation
- 📌 Bookmarks
- 📌 Random kanji

Low Impact, High Effort:
- ❌ Full audio library
- ❌ Advanced analytics
```

---

## 🚀 QUICK WINS (Làm ngay để có tác động lớn)

### **Week 1: Core Content**
1. ⚡ Add 80 N5 kanji (1 day)
2. ⚡ Add 170 N4 kanji (2 days)
3. ⚡ Link vocabulary compounds (0.5 day)
4. ⚡ Add radicals (0.5 day)
**Total**: 4 days

### **Week 2: Learning Features**
1. ⚡ Flashcard mode (1 day)
2. ⚡ SRS integration (1 day)
3. ⚡ Search & filter (1 day)
**Total**: 3 days

### **Week 3: Stroke Order**
1. ⚡ KanjiVG integration (1 day)
2. ⚡ Animation component (2 days)
**Total**: 3 days

---

## 🎯 MỤC TIÊU HOÀN THIỆN

### **MVP (Minimum Viable Product)**:
- ✅ 250 kanji (N5 + N4)
- ✅ Stroke order animation
- ✅ Vocabulary compounds
- ✅ Search & filter
- ✅ Flashcard mode
- ✅ SRS integration

### **Complete Product**:
- ✅ 2,000+ kanji (all JLPT)
- ✅ Full stroke order animations
- ✅ Practice mode (tracing)
- ✅ Audio pronunciation
- ✅ Mnemonics & etymology
- ✅ Advanced analytics
- ✅ Mobile optimization

---

## 💰 ESTIMATED EFFORT

| Phase | Priority | Hours | Impact |
|-------|----------|-------|--------|
| Data Expansion | 🔴 CRITICAL | 8-12h | ⭐⭐⭐⭐⭐ |
| Stroke Order | 🟡 HIGH | 4-6h | ⭐⭐⭐⭐ |
| Learning Features | 🟡 HIGH | 6-8h | ⭐⭐⭐⭐⭐ |
| Search & Filter | 🟠 MEDIUM-HIGH | 3-4h | ⭐⭐⭐⭐ |
| Vocab Integration | 🟠 MEDIUM | 2-3h | ⭐⭐⭐ |
| Additional Info | 🟢 MEDIUM | 4-5h | ⭐⭐⭐ |
| Audio | 🟢 MEDIUM-LOW | 2-3h | ⭐⭐ |
| Stats | 🟢 LOW | 3-4h | ⭐⭐ |

**Total MVP**: ~25-35 hours  
**Total Complete**: ~35-50 hours

---

## 🎊 KẾT LUẬN

### **Tính năng Kanji hiện tại**:
- ✅ UI/UX: 90% complete
- ❌ Data: 0.3% complete (5/1610 kanji)
- ❌ Features: 20% complete
- ❌ Learning tools: 0% complete

### **Để production-ready cần**:
1. **Urgent**: Add kanji data (N5, N4 minimum)
2. **High**: Stroke order animation
3. **High**: Learning features (flashcard, SRS)
4. **Medium**: Search & filter

### **Recommended Next Step**:
**Start with Phase 1** - Data expansion
→ Không có data thì tính năng này vô dụng!

---

**Status**: 🟡 **PROTOTYPE → Cần 25-35h để đạt MVP**

**Last Updated**: 2026-02-08

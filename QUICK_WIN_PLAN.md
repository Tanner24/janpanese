# 🚀 QUICK WIN IMPLEMENTATION PLAN (2-3 Days)

## 📅 Timeline: Feb 8-10, 2026

---

## **DAY 1: Data Foundation & SRS System** (Feb 8, 2026)

### 🎯 Objectives:
1. Import 500-1000 từ vựng N5-N4 thực tế
2. Thêm audio support (TTS)
3. Implement SRS (Spaced Repetition System) cơ bản với LocalStorage
4. Improve Vocabulary types & data structure

### ✅ Tasks:

#### Task 1.1: Expand Data Types (30 mins)
- [ ] Thêm fields mới vào `Vocabulary` type:
  - `romaji?: string`
  - `example_sentence_jp?: string`
  - `example_sentence_vi?: string`
  - `audio_url?: string`
  - `image_url?: string`
- [ ] Tạo `UserProgress` type để track SRS

#### Task 1.2: Import Real Vocabulary Data (2 hours)
- [ ] Tạo script để parse/import từ nguồn open data (JMDict, JLPT resources)
- [ ] Tạo file `vocab_n5.ts` và `vocab_n4.ts` với 500-1000 từ
- [ ] Thêm example sentences cho mỗi từ
- [ ] Organize by categories (numbers, time, food, family, etc.)

#### Task 1.3: Audio Integration (1 hour)
- [ ] Integrate Web Speech API cho text-to-speech
- [ ] Tạo `useAudioPlayer` hook
- [ ] Thêm audio button vào Flashcard component
- [ ] Fallback cho browsers không support

#### Task 1.4: SRS System - Core Logic (2 hours)
- [ ] Implement **Leitner Box Algorithm**:
  - Box 1: Review daily
  - Box 2: Review every 3 days
  - Box 3: Review weekly
  - Box 4: Review bi-weekly
  - Box 5: Mastered (monthly)
- [ ] Tạo `utils/srs.ts` với functions:
  - `getNextReviewDate(boxLevel, lastReview)`
  - `updateProgress(wordId, isCorrect)`
  - `getDueWords()`
  - `getNewWords(limit)`
- [ ] Tạo `hooks/useProgress.ts` để manage localStorage

#### Task 1.5: LocalStorage Management (1 hour)
- [ ] Create `utils/storage.ts`:
  - `saveProgress(userId, wordId, data)`
  - `getProgress(userId, wordId)`
  - `getAllProgress(userId)`
  - `clearProgress()`
- [ ] Schema cho progress data:
  ```ts
  {
    wordId: string,
    boxLevel: 1-5,
    lastReview: Date,
    nextReview: Date,
    correctCount: number,
    wrongCount: number,
    firstSeen: Date,
    status: 'new' | 'learning' | 'review' | 'mastered'
  }
  ```

---

## **DAY 2: Enhanced UI & Quiz System** (Feb 9, 2026)

### 🎯 Objectives:
1. Improve Vocabulary page với SRS
2. Enhanced Quiz system with multiple modes
3. Add Progress visualization
4. Better UX with animations

### ✅ Tasks:

#### Task 2.1: Vocabulary Page Enhancement (2 hours)
- [ ] Refactor `/vocabulary` page để integrate SRS
- [ ] Add mode selector:
  - 📚 Learn New Words (10 per session)
  - 🔄 Review Due Words
  - 🎯 Practice All
  - 📊 Browse by Category
- [ ] Show SRS status trên flashcard (new, learning, review, mastered)
- [ ] Add "Mark as Known" / "Mark as Unknown" buttons
- [ ] Session flow: Show → Test → Result → Next

#### Task 2.2: Improved Flashcard (1 hour)
- [ ] Add audio play button
- [ ] Show example sentence on back
- [ ] Add difficulty rating (Easy, Good, Hard, Again)
- [ ] Visual indicator for SRS level (colored badge)
- [ ] Animation improvements

#### Task 2.3: Enhanced Quiz System (3 hours)
- [ ] **Quiz Mode 1: Multiple Choice** (already exists, improve)
  - Add audio playback for each question
  - Show example sentence after answer
  - Track time per question
  
- [ ] **Quiz Mode 2: Listening Quiz** (NEW)
  - Play audio → user selects meaning
  - No kanji shown initially
  - Repeat audio option
  
- [ ] **Quiz Mode 3: Typing Quiz** (NEW)
  - Show meaning → user types hiragana/romaji
  - Auto-complete suggestions
  - Fuzzy matching for answers
  
- [ ] **Quiz Mode 4: Reverse (VI → JP)** (NEW)
  - Show Vietnamese → select Japanese
  
- [ ] Quiz settings:
  - Number of questions (5, 10, 20, 50)
  - JLPT Level filter
  - Quiz type selector
  - Time limit toggle

#### Task 2.4: Results & Feedback (1 hour)
- [ ] Enhanced results page:
  - Detailed breakdown (correct/wrong per word)
  - Time statistics
  - Weak points identification
  - XP gained animation
- [ ] Save quiz results to localStorage
- [ ] Update SRS based on quiz performance

---

## **DAY 3: Progress Tracking & Polish** (Feb 10, 2026)

### 🎯 Objectives:
1. Dashboard với real data
2. Progress visualization
3. Gamification elements
4. Performance optimization

### ✅ Tasks:

#### Task 3.1: Dashboard Overhaul (2 hours)
- [ ] Replace mock stats với real data từ localStorage
- [ ] Calculate actual metrics:
  - Total words learned
  - Words due today
  - Current streak
  - Total XP
  - Study time today
- [ ] "Continue Learning" section shows actual progress
- [ ] "Due for Review" urgent notification

#### Task 3.2: Progress Visualization (2 hours)
- [ ] Install chart library: `npm install recharts`
- [ ] Create charts:
  - **Daily Activity** (line chart - words learned per day, last 30 days)
  - **Accuracy Rate** (donut chart - correct vs wrong)
  - **JLPT Level Distribution** (bar chart)
  - **SRS Box Distribution** (stacked bar)
- [ ] Add `/progress` page để xem chi tiết
- [ ] Export progress as JSON

#### Task 3.3: Gamification (1.5 hours)
- [ ] **XP System**:
  - New word learned: +5 XP
  - Review correct: +3 XP
  - Quiz correct: +2 XP
  - Streak bonus: +10 XP/day
  - Level up thresholds: 0, 100, 250, 500, 1000, 2000...
  
- [ ] **Streak System**:
  - Track consecutive study days
  - Show streak flame icon 🔥
  - Streak freeze mechanic (1 free day off per week)
  
- [ ] **Achievement Badges**:
  - "First Steps" - Learn 10 words
  - "Dedicated" - 7 day streak
  - "Vocabulary Master" - 100 words mastered
  - "Speed Learner" - Complete 50 questions in quiz
  - "Perfect Score" - 100% accuracy in quiz

#### Task 3.4: UX Improvements (1.5 hours)
- [ ] Add loading states
- [ ] Error boundaries
- [ ] Empty states (no data yet)
- [ ] Onboarding tutorial cho new users
- [ ] Keyboard shortcuts:
  - Space: Flip card
  - 1-4: Rate difficulty
  - Enter: Next card
  - R: Repeat audio
- [ ] Mobile responsive fixes
- [ ] Dark mode refinements

#### Task 3.5: Performance & Optimization (1 hour)
- [ ] Lazy load vocabulary data
- [ ] Memoize calculations
- [ ] Debounce localStorage writes
- [ ] Optimize bundle size
- [ ] Add service worker for offline support (PWA)

---

## 📦 **Additional Features (If Time Permits)**

### Category Management
- [ ] Group words by topics (Food, Travel, Business, etc.)
- [ ] Category filter trên vocabulary page
- [ ] Category-specific quizzes

### Search & Filter
- [ ] Search bar cho vocabulary
- [ ] Advanced filters (by mastery level, date learned, etc.)
- [ ] Sort options

### Export/Import
- [ ] Export progress as CSV
- [ ] Import custom word lists
- [ ] Backup/restore progress

---

## 🎨 **Design Consistency Checklist**

- [ ] All pages use consistent Vermillion & Ink theme
- [ ] Smooth transitions between pages
- [ ] Loading skeletons match design
- [ ] Icons from Lucide React only
- [ ] Typography consistent (Inter for UI, Noto Sans JP for Japanese)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessibility (ARIA labels, keyboard nav)

---

## 🧪 **Testing Checklist**

- [ ] LocalStorage works correctly
- [ ] SRS algorithm calculates dates properly
- [ ] Quiz scoring accurate
- [ ] XP calculations correct
- [ ] Streak logic handles edge cases
- [ ] Audio plays on all major browsers
- [ ] Data persists across sessions
- [ ] No memory leaks

---

## 📊 **Success Metrics**

After 3 days, app should have:
- ✅ 500-1000 real vocabulary words
- ✅ Working SRS system
- ✅ 4 quiz modes
- ✅ Real-time progress tracking
- ✅ Gamification (XP, Streaks, Achievements)
- ✅ Audio support
- ✅ Charts & visualizations
- ✅ Mobile-friendly
- ✅ All data persisted locally

---

## 🚀 **Next Steps (Future)**

Once Quick Win complete:
1. Add Kanji stroke order (SVG animations)
2. Grammar lessons with explanations
3. Listening exercises (real audio files)
4. Speaking practice (Web Speech Recognition)
5. Backend integration (NestJS + PostgreSQL)
6. User authentication
7. JLPT mock tests
8. Social features (leaderboard, friends)

---

**Started:** Feb 8, 2026 10:55 AM  
**Target Completion:** Feb 10, 2026 11:59 PM

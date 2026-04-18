# 🎓 JLPT MOCK EXAM SYSTEM

**Date**: 2026-02-08  
**Feature**: Mock Exams (Luyện thi)  
**Status**: ✅ **COMPLETE**

---

## 📋 OVERVIEW

A comprehensive JLPT mock exam system that mimics the real test experience. Includes question banks for N5 & N4, randomized test generation, timer, and automatic grading.

---

## ✅ FEATURES IMPLEMENTED

### **1. Exam Structure** 📝

- **Randomized Questions**: Each exam is unique, pulling random questions from the bank.
- **Timed Test**: Countdown timer (15 mins for mini-test) adds pressure.
- **Section Coverage**:
  - Vocabulary (Kanji reading, context)
  - Grammar (Particles, conjugation)
  - Reading (Short passages)

### **2. Question Bank** 📚

- **N5 Database**: 12+ questions covering basics.
- **N4 Database**: Sample questions for elementary level.
- **Full Type Support**: `kanji_reading`, `context`, `particle`, `grammar`, `comprehension`.

### **3. Grading System** 💯

- **Automatic Scoring**: Instant results after submission.
- **Pass/Fail Logic**: ≥ 60% to pass.
- **Detailed Review**:
  - Shows your answer vs correct answer.
  - Highlights correct/incorrect choices.
  - **Explanations**: Detailed breakdown of why an answer is correct.

### **4. User Interface** 🎨

- **Exam Mode**:
  - Clean, focused interface.
  - Progress bar.
  - Timer visualization (pulses when < 1 min).
  - Keyboard navigation support specific to exam context.
  
- **Result Mode**:
  - Big score display.
  - Encouraging messages.
  - Color-coded review (Green = Correct, Red = Wrong).

---

## 💡 HOW TO USE

1. **Navigate to "Luyện thi"**: Selected from the dashboard or main menu.
2. **Choose Level**: N5 or N4 (N3 coming soon).
3. **Start Exam**:
   - Answer questions within the time limit.
   - Use "Next" / "Previous" to review.
   - Submit when ready (or auto-submit when time runs out).
4. **Review Results**:
   - Check your score.
   - Read explanations for wrong answers.
   - Click "Thi lại" to generate a **new random test**.

---

## 🔧 TECHNICAL DETAILS

### **File Structure**:
- `src/app/practice/page.tsx`: Landing page.
- `src/app/practice/[level]/page.tsx`: Exam runner logic.
- `src/data/jlpt_questions.ts`: Question database & generator.
- `src/types/exam.ts`: Type definitions.

### **Randomization Logic**:
```typescript
export function generateExam(level, count) {
  const pool = level === 'N5' ? N5_QUESTIONS : N4_QUESTIONS;
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
```

---

## 🚀 FUTURE ROADMAP

1. **Expand Question Bank**: 
   - Add 50+ questions per level.
   - Import from JSON/CSV files.
2. **Listening Section**: 
   - Add audio player for `listening` type questions.
3. **Full Exam Mode**: 
   - 3 separate sections with breaks.
   - Standard JLPT timing (e.g., N5 = 25m vocab + 50m grammar/reading + 30m listening).
4. **History Tracking**: 
   - Save exam results to local storage/profile.
   - "Improvement graph" over time.

---

**Status**: ✅ **READY TO USE**  
**Impact**: ⭐⭐⭐⭐⭐ (Real practice value)

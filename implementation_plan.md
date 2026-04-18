# Implementation Plan - Japanese Learning Web

## Design Direction
- **Aesthetic**: Japanese "Vermillion & Ink" (Màu đỏ son + Trắng ngà + Đen mực).
- **Typography**: Noto Sans JP (Japanese), Inter (UI).
- **Vibe**: Gentle gradients, soft shadows, refined animations.
- **Theme**: Dark mode friendly.

## 1. Project Initialization & Design System
- [x] Install UI dependencies (`framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`).
- [x] Configure Tailwind v4 Theme:
    - Colors: Vermillion (#E34234), Ivory (#FDFCF0), Ink Black (#1A1A1A).
    - Fonts: Inter & Noto Sans JP via `next/font`.
    - Animations: Prepare Framer Motion variants.
- [x] Create Base Components:
    - `Button` (with subtle hover states).
    - `Card` (glassmorphism/soft shadow).
    - `Navbar` & `Footer`.

## 2. Core MVP Pages
### 2.1 Landing Page (The "Wow" Factor)
- [x] **Hero Section**: Dynamic background (maybe subtle cherry blossom or ink wash effect), strong value prop, call to action.
- [x] **Feature Highlights**: Showcasing Vocab, Kanji, Grammar.

### 2.2 Learning Dashboard
- [x] **Progress Overview**: Visual charts/graphs of learning progress.
- [x] **Daily Goal Tracker**.

### 2.3 Vocabulary Module
- [x] **Flashcard Component**: Flip animation, spaced repetition indicators.
- [x] **Vocabulary List**: Filterable by JLPT level.

### 2.4 Kanji Module
- [x] **Stroke Order Visualization**: SVG animation for stroke order.
- [x] **Kanji Details**: Readings (Onyomi/Kunyomi), Examples.

### 2.5 Grammar Module
- [x] **Lesson View**: Structured grammar points with color-coded examples.

### 2.6 Review/Quiz
- [x] **Random Quiz**: Mix of vocab, kanji, grammar.
- [x] **Result Summary**: immediate feedback.

## 3. Backend & Data Integration (NestJS)
- [ ] Ensure `server` is running and accessible.
- [ ] Connect Client to Server via API.

export interface Vocabulary {
    id: string;
    kanji: string;
    furigana: string;
    romaji?: string;
    meaning_vi: string;
    meaning_en?: string; // English meaning for reference
    example_sentence_jp?: string; // Legacy, keeping for compatibility
    example_sentence_vi?: string; // Legacy
    examples?: {
        ja: string;
        vi: string;
        romaji?: string;
    }[];
    usage_notes?: string; // Explains context or nuance
    audio_url?: string;
    image_url?: string;
    category?: string;
    jlpt_level: 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
    word_type?: 'noun' | 'verb' | 'adjective-i' | 'adjective-na' | 'adverb' | 'particle' | 'expression' | 'counter' | 'pronoun' | 'conjunction';
    conjugation_group?: 1 | 2 | 3; // 1=五段(godan), 2=一段(ichidan), 3=不規則(irregular: する/くる)
}

export interface UserProgress {
    wordId: string;
    boxLevel: 1 | 2 | 3 | 4 | 5; // Leitner Box level
    lastReview: string; // ISO date string
    nextReview: string; // ISO date string
    correctCount: number;
    wrongCount: number;
    firstSeen: string; // ISO date string
    status: 'new' | 'learning' | 'review' | 'mastered';
}

export interface QuizResult {
    id: string;
    date: string;
    quizType: 'multiple-choice' | 'listening' | 'typing' | 'reverse';
    totalQuestions: number;
    correctAnswers: number;
    timeSpent: number; // in seconds
    xpEarned: number;
    results: Array<{
        wordId: string;
        correct: boolean;
        timeSpent: number;
    }>;
}

export interface UserStats {
    totalWordsLearned: number;
    currentStreak: number;
    longestStreak: number;
    totalXP: number;
    level: number;
    lastStudyDate: string;
    studyTimeToday: number; // in minutes
    achievements: string[];
}

export interface Kanji {
    id: string;
    kanji: string;
    on_yomi: string[];
    kun_yomi: string[];
    meaning_vi: string;
    meaning_en?: string; // English meaning for reference
    stroke_count: number;
    jlpt_level: 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
    radical?: string; // Bộ thủ (e.g., '氵' for water-related kanji)
    radical_meaning?: string; // Nghĩa bộ thủ (e.g., 'Nước')
    examples?: { // Từ ghép chứa kanji này
        word: string;
        reading: string;
        meaning: string;
    }[];
    mnemonic?: string; // Mẹo nhớ (e.g., '木 = cái cây, 林 = 2 cây = rừng nhỏ')
}

export * from "./grammar";
export * from "./reading";
export * from "./listening";

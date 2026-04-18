export interface ReadingPassage {
    id: string;
    title: string;
    jlpt_level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
    category: 'email' | 'notice' | 'article' | 'essay' | 'letter' | 'advertisement' | 'schedule' | 'story';
    content_jp: string;
    content_vi?: string; // Vietnamese translation for reference
    vocabulary_hints?: {
        word: string;
        reading: string;
        meaning: string;
    }[];
    questions: ReadingQuestion[];
}

export interface ReadingQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // 0-based index
    explanation?: string;
}

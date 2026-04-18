export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type ExamSectionType = 'vocabulary' | 'grammar' | 'reading' | 'listening';

export interface ExamQuestion {
    id: string;
    level: JLPTLevel;
    section: ExamSectionType;
    type: string; // e.g., 'kanji_reading', 'context', 'grammar_usage'
    question: string;
    options: string[];
    correctAnswer: number; // 0-3
    explanation?: string;
    context?: string; // For reading/listening passages
}

export interface ExamSection {
    id: string;
    title: string;
    durationMinutes: number;
    questions: ExamQuestion[];
    passingScore: number;
    totalScore: number;
}

export interface JLPTExam {
    id: string;
    title: string;
    level: JLPTLevel;
    sections: ExamSection[];
    totalDuration: number;
}


export interface TestQuestion {
    id: string;
    question: string; // The main question text
    context?: string; // Additional context like a reading passage or conversation description
    options: string[];
    correctAnswer: number; // 0-based index
    explanation?: string;
    image?: string;
    audio?: string;
    script?: string; // For listening transcript (after test)
}

export interface TestSection {
    id: string;
    title: string;
    description: string;
    questions: TestQuestion[];
    scoreWeight: number; // Total score for this section
}

export interface JLPTTest {
    id: string;
    title: string;
    level: "N5" | "N4" | "N3" | "N2" | "N1";
    duration: number; // in minutes
    totalScore: number;
    passScore: number;
    sections: {
        vocabulary: TestSection;
        grammar: TestSection;
        reading: TestSection;
        listening: TestSection;
    };
}

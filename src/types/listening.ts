export interface ListeningExercise {
    id: string;
    title: string;
    audio_url: string;
    script_jp: string;
    script_vi: string;
    jlpt_level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
    category?: string;
    questions: ListeningQuestion[];
}

export interface ListeningQuestion {
    id: string;
    question: string;
    options: string[];
    correct: number;
}

import { ExamQuestion } from "@/types/exam";

export const N5_QUESTIONS: ExamQuestion[] = [
    // --- VOCABULARY / KANJI ---
    {
        id: 'n5_vocab_1',
        level: 'N5',
        section: 'vocabulary',
        type: 'kanji_reading',
        question: 'あの **人** はだれですか。',
        options: ['ひと', 'じん', 'にん', 'ちち'],
        correctAnswer: 0,
        explanation: '人 (person) đọc là "hito" trong ngữ cảnh này.'
    },
    {
        id: 'n5_vocab_2',
        level: 'N5',
        section: 'vocabulary',
        type: 'word_usage',
        question: '毎朝、コーヒーを **飲みます**。',
        options: ['のみます', 'よみます', 'すみます', 'かみます'],
        correctAnswer: 0,
        explanation: '飲む (uống) đọc là "nomimasu".'
    },
    {
        id: 'n5_vocab_3',
        level: 'N5',
        section: 'vocabulary',
        type: 'kanji_writing',
        question: '**やま** に行きました。',
        options: ['川', '山', '田', '天'],
        correctAnswer: 1,
        explanation: 'Yama = 山 (Núi).'
    },
    {
        id: 'n5_vocab_4',
        level: 'N5',
        section: 'vocabulary',
        type: 'context',
        question: 'きょうは **げつようび** です。',
        options: ['月曜日', '日曜日', '火曜日', '金曜日'],
        correctAnswer: 0,
        explanation: 'Getsuyoubi = Thứ hai (月曜日).'
    },
    {
        id: 'n5_vocab_5',
        level: 'N5',
        section: 'vocabulary',
        type: 'opposite',
        question: 'このカメラは **高い** です。反対の意味は？',
        options: ['低い', '広い', '安い', '短い'],
        correctAnswer: 2,
        explanation: 'Trong ngữ cảnh giá cả: 高い (đắt) ↔ 安い (rẻ). Nếu nói về chiều cao thì 高い ↔ 低い.'
    },

    // --- GRAMMAR ---
    {
        id: 'n5_gram_1',
        level: 'N5',
        section: 'grammar',
        type: 'particle',
        question: '私は日本 **__** 来ました。',
        options: ['に', 'へ', 'から', 'まで'],
        correctAnswer: 2,
        explanation: 'kara (từ) - Tôi đến từ Nhật Bản.'
    },
    {
        id: 'n5_gram_2',
        level: 'N5',
        section: 'grammar',
        type: 'particle',
        question: 'バス **__** 学校へ行きます。',
        options: ['で', 'に', 'を', 'が'],
        correctAnswer: 0,
        explanation: 'de (bằng phương tiện) - Đi đến trường bằng xe buýt.'
    },
    {
        id: 'n5_gram_3',
        level: 'N5',
        section: 'grammar',
        type: 'particle',
        question: '友達 **__** 図書館で本を読みます。',
        options: ['を', 'に', 'と', 'が'],
        correctAnswer: 2,
        explanation: 'と (to) = cùng với. Đọc sách ở thư viện cùng với bạn.'
    },
    {
        id: 'n5_gram_4',
        level: 'N5',
        section: 'grammar',
        type: 'conjugation',
        question: 'きのうは雨 **__**。',
        options: ['でした', 'です', 'で', 'くなかった'],
        correctAnswer: 0,
        explanation: 'Past tense of noun/na-adj is "deshita".'
    },
    {
        id: 'n5_gram_5',
        level: 'N5',
        section: 'grammar',
        type: 'adjective',
        question: 'この映画はあまり **__**。',
        options: ['おもしろいです', 'おもしろくないです', 'おもしろかったです', 'おもしろくありませんでした'],
        correctAnswer: 1,
        explanation: 'amari (không lắm) đi với phủ định.'
    },

    // --- READING ---
    {
        id: 'n5_read_1',
        level: 'N5',
        section: 'reading',
        type: 'comprehension',
        context: '私は毎日7時に起きます。朝ごはんはパンと卵を食べます。それから、8時に学校へ行きます。',
        question: '朝ごはんに何を食べますか。',
        options: ['パンと卵', 'ごはんとお茶', 'パンとコーヒー', '何も食べません'],
        correctAnswer: 0,
        explanation: 'Trong bài có viết: "朝ごはんはパンと卵を食べます" (Bữa sáng ăn bánh mì và trứng).'
    },
    {
        id: 'n5_read_2',
        level: 'N5',
        section: 'reading',
        type: 'comprehension',
        context: 'A: すみません、このとけいはいくらですか。\nB: それは3000円です。\nA: じゃ、これをください。',
        question: 'とけいはいくらですか。',
        options: ['300円', '3000円', '13000円', '30000円'],
        correctAnswer: 1,
        explanation: 'B nói: "Sore wa 3000-en desu."'
    }
];

export const N4_QUESTIONS: ExamQuestion[] = [
    // --- VOCABULARY ---
    {
        id: 'n4_vocab_1',
        level: 'N4',
        section: 'vocabulary',
        type: 'kanji_reading',
        question: '荷物を **運ぶ**。',
        options: ['あそぶ', 'えらぶ', 'はこぶ', 'よぶ'],
        correctAnswer: 2,
    },
    {
        id: 'n4_vocab_2',
        level: 'N4',
        section: 'vocabulary',
        type: 'kanji_reading',
        question: '**利用** する',
        options: ['りよう', 'りゆう', 'りょう', 'りあ'],
        correctAnswer: 0,
    },

    // --- GRAMMAR ---
    {
        id: 'n4_gram_1',
        level: 'N4',
        section: 'grammar',
        type: 'conjugation',
        question: '雨が **__** そうです。',
        options: ['降る', '降り', '降って', '降った'],
        correctAnswer: 1, // furi-sou (looks like it will rain)
        explanation: 'Stem + sou desu = có vẻ sắp'
    },
    {
        id: 'n4_gram_2',
        level: 'N4',
        section: 'grammar',
        type: 'particle',
        question: '先生に本を **__** 。',
        options: ['いただいた', 'くださった', 'あげた', 'くれた'],
        correctAnswer: 0, // Received (humbly) from teacher
        explanation: 'Itadaki-mashita (nhận từ người trên).'
    }
];


// --- Helper to Generate Random Exam ---
export function generateExam(level: 'N5' | 'N4', questionCount: number = 10): ExamQuestion[] {
    const pool = level === 'N5' ? N5_QUESTIONS : N4_QUESTIONS;

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());

    // Return slice
    return shuffled.slice(0, questionCount);
}

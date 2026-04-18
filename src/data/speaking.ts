export interface SpeakingLesson {
    id: string;
    level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
    title: string;
    description: string;
    topic: string; // e.g. "Greeting", "Shopping", "Restaurant"
    phrases: SpeakingPhrase[];
}

export interface SpeakingPhrase {
    id: string;
    japanese: string;
    romaji: string;
    meaning_vi: string;
    difficulty: 1 | 2 | 3 | 4 | 5; // Difficulty rating for the phrase
}

export const speakingLessons: SpeakingLesson[] = [
    {
        id: "speak_n5_001",
        level: 'N5',
        title: "Chào hỏi cơ bản",
        description: "Luyện tập các câu chào hỏi thông dụng hàng ngày.",
        topic: "Giao tiếp hàng ngày",
        phrases: [
            {
                id: "p1",
                japanese: "おはようございます",
                romaji: "ohayou gozaimasu",
                meaning_vi: "Chào buổi sáng",
                difficulty: 1
            },
            {
                id: "p2",
                japanese: "こんにちは",
                romaji: "konnichiwa",
                meaning_vi: "Chào buổi chiều / Xin chào",
                difficulty: 1
            },
            {
                id: "p3",
                japanese: "こんばんは",
                romaji: "konbanwa",
                meaning_vi: "Chào buổi tối",
                difficulty: 1
            },
            {
                id: "p4",
                japanese: "はじめまして、よろしくお願いします",
                romaji: "hajimemashite, yoroshiku onegaishimasu",
                meaning_vi: "Rất vui được gặp bạn, mong được giúp đỡ",
                difficulty: 3
            },
            {
                id: "p5",
                japanese: "ありがとうございます",
                romaji: "arigatou gozaimasu",
                meaning_vi: "Cảm ơn rất nhiều",
                difficulty: 2
            }
        ]
    },
    {
        id: "speak_n5_002",
        level: 'N5',
        title: "Tại nhà hàng",
        description: "Các mẫu câu cần thiết khi gọi món và thanh toán.",
        topic: "Nhà hàng",
        phrases: [
            {
                id: "p1",
                japanese: "すみません、メニューをお願いします",
                romaji: "sumimasen, menyuu o onegaishimasu",
                meaning_vi: "Xin lỗi, cho tôi xem menu",
                difficulty: 3
            },
            {
                id: "p2",
                japanese: "これをお願いします",
                romaji: "kore o onegaishimasu",
                meaning_vi: "Cho tôi món này",
                difficulty: 2
            },
            {
                id: "p3",
                japanese: "お会計をお願いします",
                romaji: "okaikei o onegaishimasu",
                meaning_vi: "Cho tôi thanh toán",
                difficulty: 3
            },
            {
                id: "p4",
                japanese: "水をもらえますか",
                romaji: "mizu o moraemasu ka",
                meaning_vi: "Cho tôi xin một ít nước được không?",
                difficulty: 3
            },
            {
                id: "p5",
                japanese: "ごちそうさまでした",
                romaji: "gochisousama deshita",
                meaning_vi: "Cảm ơn vì bữa ăn",
                difficulty: 2
            }
        ]
    },
    {
        id: "speak_n4_001",
        level: 'N4',
        title: "Hỏi đường",
        description: "Luyện tập cách hỏi đường và phương hướng khi đi lại.",
        topic: "Đi lại",
        phrases: [
            {
                id: "p1",
                japanese: "駅はどこですか",
                romaji: "eki wa doko desu ka",
                meaning_vi: "Nhà ga ở đâu vậy?",
                difficulty: 2
            },
            {
                id: "p2",
                japanese: "まっすぐ行って、右に曲がってください",
                romaji: "massugu itte, migi ni magatte kudasai",
                meaning_vi: "Đi thẳng rồi rẽ phải nhé",
                difficulty: 4
            },
            {
                id: "p3",
                japanese: "ここから遠いですか",
                romaji: "koko kara tooi desu ka",
                meaning_vi: "Từ đây tới đó có xa không?",
                difficulty: 3
            },
            {
                id: "p4",
                japanese: "歩いて何分くらいかかりますか",
                romaji: "aruite nanpun kurai kakarimasu ka",
                meaning_vi: "Đi bộ mất khoảng bao nhiêu phút vậy?",
                difficulty: 4
            }
        ]
    }
];

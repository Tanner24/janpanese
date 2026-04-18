/**
 * JLPT Placement Test Questions
 * 20 questions to determine user's JLPT level (N5 to N1)
 */

export interface PlacementQuestion {
    id: string;
    level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
    type: 'vocabulary' | 'grammar' | 'reading';
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

export const placementTestQuestions: PlacementQuestion[] = [
    // N5 Questions (4 questions)
    {
        id: 'placement_001',
        level: 'N5',
        type: 'vocabulary',
        question: 'これは　＿＿です。(This is a book)',
        options: ['ほん', 'えいが', 'がっこう', 'てがみ'],
        correctAnswer: 0,
        explanation: '本 (ほん) = book'
    },
    {
        id: 'placement_002',
        level: 'N5',
        type: 'grammar',
        question: '私は　毎日　学校＿＿行きます。',
        options: ['を', 'に', 'で', 'の'],
        correctAnswer: 1,
        explanation: '場所 + に + 行く (go to a place)'
    },
    {
        id: 'placement_003',
        level: 'N5',
        type: 'vocabulary',
        question: '明日は　何曜日ですか。ー＿＿です。',
        options: ['月曜日', '一月', '一日', '一時'],
        correctAnswer: 0,
        explanation: '曜日 = day of the week'
    },
    {
        id: 'placement_004',
        level: 'N5',
        type: 'grammar',
        question: '田中さんは　日本人＿＿。',
        options: ['だ', 'です', 'でした', 'である'],
        correctAnswer: 1,
        explanation: 'Polite form: ~です'
    },

    // N4 Questions (4 questions)
    {
        id: 'placement_005',
        level: 'N4',
        type: 'vocabulary',
        question: '試験に＿＿しました。',
        options: ['合格', '失敗', '成功', '参加'],
        correctAnswer: 0,
        explanation: '合格する = to pass (exam)'
    },
    {
        id: 'placement_006',
        level: 'N4',
        type: 'grammar',
        question: '日本語は面白い＿＿思います。',
        options: ['が', 'を', 'に', 'と'],
        correctAnswer: 3,
        explanation: '~と思う = I think that...'
    },
    {
        id: 'placement_007',
        level: 'N4',
        type: 'vocabulary',
        question: '会議が＿＿、帰ります。',
        options: ['終わったら', '終わって', '終わるから', '終わると'],
        correctAnswer: 0,
        explanation: '~たら = when/if (conditional)'
    },
    {
        id: 'placement_008',
        level: 'N4',
        type: 'grammar',
        question: 'もっと＿＿勉強すればよかった。',
        options: ['一生懸命', 'ちゃんと', 'はっきり', 'ゆっくり'],
        correctAnswer: 0,
        explanation: '一生懸命 = with all one\'s effort'
    },

    // N3 Questions (4 questions)
    {
        id: 'placement_009',
        level: 'N3',
        type: 'grammar',
        question: '雨が降っている＿＿、出かけました。',
        options: ['にもかかわらず', 'ために', 'ので', 'けれども'],
        correctAnswer: 0,
        explanation: '~にもかかわらず = despite, in spite of'
    },
    {
        id: 'placement_010',
        level: 'N3',
        type: 'vocabulary',
        question: 'この問題は私には＿＿すぎます。',
        options: ['複雑', '簡単', '便利', '丁寧'],
        correctAnswer: 0,
        explanation: '複雑 (ふくざつ) = complex, complicated'
    },
    {
        id: 'placement_011',
        level: 'N3',
        type: 'grammar',
        question: '彼は約束を守る＿＿人です。',
        options: ['ような', 'ように', 'そうな', 'みたいな'],
        correctAnswer: 0,
        explanation: '~ような = like, such as'
    },
    {
        id: 'placement_012',
        level: 'N3',
        type: 'reading',
        question: '「経験を積む」の意味は？',
        options: [
            'To gain experience',
            'To lose experience',
            'To share experience',
            'To forget experience'
        ],
        correctAnswer: 0,
        explanation: '経験を積む = to gain/accumulate experience'
    },

    // N2 Questions (4 questions)
    {
        id: 'placement_013',
        level: 'N2',
        type: 'grammar',
        question: '彼は優秀な学生である＿＿、謙虚でもある。',
        options: ['ばかりか', 'だけで', 'ことに', 'ものの'],
        correctAnswer: 0,
        explanation: '~ばかりか = not only... but also'
    },
    {
        id: 'placement_014',
        level: 'N2',
        type: 'vocabulary',
        question: '会議で重要な点を＿＿。',
        options: ['指摘した', '指示した', '指定した', '支持した'],
        correctAnswer: 0,
        explanation: '指摘する (してきする) = to point out'
    },
    {
        id: 'placement_015',
        level: 'N2',
        type: 'grammar',
        question: '努力した＿＿、必ず成功するとは限らない。',
        options: ['からといって', 'ために', 'ので', 'けれども'],
        correctAnswer: 0,
        explanation: '~からといって = just because...'
    },
    {
        id: 'placement_016',
        level: 'N2',
        type: 'reading',
        question: '「手が込んだ料理」とは？',
        options: [
            'Elaborate/complicated cooking',
            'Simple cooking',
            'Quick cooking',
            'Healthy cooking'
        ],
        correctAnswer: 0,
        explanation: '手が込む = to be elaborate, to require effort'
    },

    // N1 Questions (4 questions)
    {
        id: 'placement_017',
        level: 'N1',
        type: 'grammar',
        question: '彼の説明は抽象的すぎて、理解し＿＿。',
        options: ['がたい', 'にくい', 'づらい', 'かねる'],
        correctAnswer: 0,
        explanation: '~がたい = hard to, difficult to (more formal than にくい)'
    },
    {
        id: 'placement_018',
        level: 'N1',
        type: 'vocabulary',
        question: 'この問題は一朝一夕には解決＿＿。',
        options: ['しかねる', 'しがたい', 'せざるを得ない', 'するまい'],
        correctAnswer: 0,
        explanation: '一朝一夕 (いっちょういっせき) = in a short time, overnight'
    },
    {
        id: 'placement_019',
        level: 'N1',
        type: 'grammar',
        question: '努力した＿＿の結果だ。',
        options: ['が故', 'ばかり', 'だけ', 'ほど'],
        correctAnswer: 0,
        explanation: '~が故 (ゆえ) = because of, due to (formal)'
    },
    {
        id: 'placement_020',
        level: 'N1',
        type: 'reading',
        question: '「言うに及ばない」の意味は？',
        options: [
            'Needless to say',
            'Must say',
            'Cannot say',
            'Want to say'
        ],
        correctAnswer: 0,
        explanation: '言うに及ばない = needless to say, goes without saying'
    }
];

// Scoring system
export const levelThresholds = {
    N5: { min: 0, max: 4 },
    N4: { min: 5, max: 8 },
    N3: { min: 9, max: 12 },
    N2: { min: 13, max: 16 },
    N1: { min: 17, max: 20 }
};

export function determineLevel(score: number): 'N5' | 'N4' | 'N3' | 'N2' | 'N1' {
    if (score >= 17) return 'N1';
    if (score >= 13) return 'N2';
    if (score >= 9) return 'N3';
    if (score >= 5) return 'N4';
    return 'N5';
}

export const levelDescriptions = {
    N5: {
        title: 'Sơ cấp 1 (N5)',
        description: 'Bạn đang ở mức cơ bản. Hãy bắt đầu với từ vựng và ngữ pháp N5.',
        color: 'emerald',
        recommendations: [
            'Học hiragana và katakana',
            'Bắt đầu với 150 từ vựng N5',
            'Luyện ngữ pháp cơ bản',
            'Nghe hội thoại đơn giản'
        ]
    },
    N4: {
        title: 'Sơ cấp 2 (N4)',
        description: 'Bạn đã có nền tảng tốt. Tiếp tục mở rộng từ vựng và ngữ pháp.',
        color: 'sky',
        recommendations: [
            'Học 200 từ vựng N4',
            'Nắm vững các mẫu câu N4',
            'Luyện đọc đoạn văn ngắn',
            'Nghe hội thoại thường ngày'
        ]
    },
    N3: {
        title: 'Trung cấp (N3)',
        description: 'Bạn có thể giao tiếp cơ bản. Hãy nâng cao khả năng sử dụng linh hoạt.',
        color: 'amber',
        recommendations: [
            'Học từ vựng trừu tượng N3',
            'Nắm vững ngữ pháp N3',
            'Đọc bài báo đơn giản',
            'Nghe tin tức và podcast'
        ]
    },
    N2: {
        title: 'Trung cao (N2)',
        description: 'Bạn có thể giao tiếp trôi chảy. Hướng tới hoàn thiện tiếng Nhật.',
        color: 'orange',
        recommendations: [
            'Học từ vựng chuyên ngành N2',
            'Thành thạo ngữ pháp phức tạp',
            'Đọc tiểu thuyết và báo',
            'Xem phim không phụ đề'
        ]
    },
    N1: {
        title: 'Cao cấp (N1)',
        description: 'Bạn đã thành thạo tiếng Nhật. Tiếp tục duy trì và mở rộng.',
        color: 'purple',
        recommendations: [
            'Học từ vựng chuyên sâu N1',
            'Đọc văn học và tài liệu kỹ thuật',
            'Tham gia thảo luận chuyên môn',
            'Duy trì và mở rộng vốn từ'
        ]
    }
};

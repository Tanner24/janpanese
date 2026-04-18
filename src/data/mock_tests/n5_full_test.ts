
import { JLPTTest } from "@/types/test";

export const n5FullTest: JLPTTest = {
    id: "jlpt_n5_mock_01",
    title: "JLPT N5 - Đề Thi Thử Số 1",
    level: "N5",
    duration: 30, // Test mode: 30 mins for quick check
    totalScore: 180,
    passScore: 100, // Approximate pass score
    sections: {
        vocabulary: {
            id: "vocab_n5_01",
            title: "Từ vựng (文字・語彙)",
            description: "Chọn từ đúng với Kanji hoặc ý nghĩa.",
            scoreWeight: 60,
            questions: [
                {
                    id: "v1",
                    question: "この漢字（**大学**）はどう読みますか。",
                    options: ["だいがく", "たいがく", "おおがく", "だ がく"],
                    correctAnswer: 0,
                    explanation: "大学 (Đại học) đọc là だいがく (daigaku)."
                },
                {
                    id: "v2",
                    question: "わたしは毎日**りんご**を食べます。",
                    options: ["Banana", "Apple", "Orange", "Grape"],
                    correctAnswer: 1,
                    explanation: "りんご (Ringo) nghĩa là Táo (Apple)."
                },
                {
                    id: "v3",
                    question: "明日**友だち**に会います。",
                    options: ["ともだち", "ゆうだち", "とだち", "ゆうたち"],
                    correctAnswer: 0,
                    explanation: "友だち (Bạn bè) đọc là ともだち (tomodachi)."
                }
            ]
        },
        grammar: {
            id: "gram_n5_01",
            title: "Ngữ pháp (文法)",
            description: "Chọn đáp án đúng điền vào chỗ trống.",
            scoreWeight: 60,
            questions: [
                {
                    id: "g1",
                    question: "わたし_____学生です。",
                    options: ["は", "が", "を", "に"],
                    correctAnswer: 0,
                    explanation: "Trợ từ は (wa) dùng để đánh dấu chủ ngữ."
                },
                {
                    id: "g2",
                    question: "図書館_____本を読みます。",
                    options: ["に", "で", "へ", "を"],
                    correctAnswer: 1,
                    explanation: "Trợ từ で (de) chỉ nơi chốn diễn ra hành động."
                },
                {
                    id: "g3",
                    question: "この本は_____ですか。",
                    options: ["だれ", "なにか", "いつ", "いくら"],
                    correctAnswer: 3,
                    explanation: "Hỏi giá tiền dùng いくら (ikura)."
                }
            ]
        },
        reading: {
            id: "read_n5_01",
            title: "Đọc hiểu (読解)",
            description: "Đọc đoạn văn và trả lời câu hỏi.",
            scoreWeight: 60,
            questions: [
                {
                    id: "r1",
                    question: "たなかさんは毎日何をしますか。",
                    context: "たなかさんは毎朝７時に起きます。朝ごはんを食べて、８時に会社へ行きます。会社は９時から５時までです。夜はテレビを見ます。",
                    options: ["７時に会社へ行きます。", "８時に起きます。", "９時から働きます。", "テレビを見ません。"],
                    correctAnswer: 2,
                    explanation: "Trong bài: 会社は９時から (Công ty bắt đầu từ 9 giờ)."
                }
            ]
        },
        listening: {
            id: "list_n5_01",
            title: "Nghe hiểu (聴解)",
            description: "Nghe và chọn đáp án đúng.",
            scoreWeight: 60,
            questions: [
                {
                    id: "l1",
                    question: "男の人はこれから何をしますか。",
                    context: "（男）：あ、もう１２時ですね。\n（女）：そうですね。昼ご飯を食べに行きましょう。\n（男）：はい、行きましょう。",
                    script: "Nam: A, đã 12 giờ rồi nhỉ.\nNữ: Đúng vậy. Đi ăn trưa thôi.\nNam: Vâng, đi thôi.",
                    options: ["寝ます", "勉強します", "ご飯を食べます", "帰ります"],
                    correctAnswer: 2,
                    explanation: "Họ rủ nhau đi ăn trưa (昼ご飯を食べに行きましょう)."
                }
            ]
        }
    }
};

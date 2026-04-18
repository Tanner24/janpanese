import { Grammar } from "@/types/grammar";

export const grammar_n4: Grammar[] = [
    {
        id: "n4_001",
        title: "～そうです (Nghe nói)",
        description: "Truyền đạt lại thông tin nghe được.",
        jlpt_level: "N4",
        formation: "V (thể thường) + そうです",
        category: "Truyền đạt",
        note: "Khác với 'có vẻ' (V bỏ mas + そう).",
        examples: [
            { jp: "明日雨が降るそうです。", vi: "Nghe nói mai trời mưa." },
            { jp: "彼は来ないそうです。", vi: "Nghe nói anh ấy không đến." },
        ]
    },
    {
        id: "n4_002",
        title: "～てしまいます",
        description: "1. Hoàn thành xong việc gì đó. 2. Lỡ làm gì đó (hối tiếc).",
        jlpt_level: "N4",
        formation: "Vて + しまいます",
        category: "Hoàn thành/Hối tiếc",
        note: "Văn nói thường dùng '～ちゃう'.",
        examples: [
            { jp: "宿題をしてしまいました。", vi: "Tôi đã làm xong bài tập." },
            { jp: "財布を忘れてしまいました。", vi: "Tôi lỡ quên ví mất rồi." },
        ]
    },
    {
        id: "n4_004",
        title: "～かもしれません",
        description: "Có lẽ, không biết chừng (xác suất thấp ~50%).",
        jlpt_level: "N4",
        formation: "V/A/N (thể thường) + かもしれません",
        category: "Phỏng đoán",
        note: "Văn nói: かも.",
        examples: [
            { jp: "明日は雨かもしれません。", vi: "Ngày mai có thể sẽ mưa." },
            { jp: "彼は病気かもしれません。", vi: "Có lẽ anh ấy bị ốm." },
        ]
    },
    {
        id: "n4_005",
        title: "～たらどうですか",
        description: "Thử làm gì đó xem sao (Lời khuyên).",
        jlpt_level: "N4",
        formation: "Vた + らどうですか",
        category: "Lời khuyên",
        examples: [
            { jp: "薬を飲んだらどうですか。", vi: "Bạn thử uống thuốc xem sao?" },
            { jp: "先生に聞いたらどうですか。", vi: "Thử hỏi thầy giáo xem?" },
        ]
    },
    {
        id: "n4_006",
        title: "～ようにする",
        description: "Cố gắng làm gì đó (thói quen).",
        jlpt_level: "N4",
        formation: "Vる/Vない + ようにする",
        category: "Cố gắng",
        examples: [
            { jp: "毎日野菜を食べるようにしています。", vi: "Tôi cố gắng ăn rau mỗi ngày." },
            { jp: "遅刻しないようにしてください。", vi: "Hãy cố gắng đừng đi trễ." },
        ]
    },
    {
        id: "n4_007",
        title: "～ば～ほど",
        description: "Càng... càng...",
        jlpt_level: "N4",
        formation: "Vば + Vる + ほど",
        category: "Mức độ",
        examples: [
            { jp: "勉強すればするほど難しくなります。", vi: "Càng học càng thấy khó." },
            { jp: "新しい車であればあるほど高いです。", vi: "Xe càng mới càng đắt." },
        ]
    },
    {
        id: "n4_008",
        title: "～なら",
        description: "Nếu là... (tiếp nhận chủ đề và đưa ra lời khuyên).",
        jlpt_level: "N4",
        formation: "N + なら",
        category: "Điều kiện",
        examples: [
            { jp: "パソコンなら、この店がいいですよ。", vi: "Nếu là máy tính thì cửa hàng này tốt đấy." },
            { jp: "日本へ行くなら、秋がいいです。", vi: "Nếu đi Nhật thì mùa thu là đẹp nhất." },
        ]
    },
    {
        id: "n4_009",
        title: "～ところです",
        description: "Đúng lúc... (sắp/đang/vừa mới).",
        jlpt_level: "N4",
        formation: "Vる/Vている/Vた + ところです",
        category: "Thời điểm",
        examples: [
            { jp: "今から食べるところです。", vi: "Bây giờ tôi chuẩn bị ăn." },
            { jp: "今食べているところです。", vi: "Bây giờ tôi đang ăn." },
        ]
    },
    {
        id: "n4_010",
        title: "～はずです",
        description: "Chắc chắn là... (phán đoán có căn cứ).",
        jlpt_level: "N4",
        formation: "V/A (thể thường) + はずです",
        category: "Phán đoán",
        examples: [
            { jp: "彼は今日来るはずです。", vi: "Chắc chắn hôm nay anh ấy sẽ đến." },
            { jp: "そんなはずはありません。", vi: "Không thể có chuyện đó được." },
        ]
    },
    {
        id: "n4_011",
        title: "～し～し",
        description: "Vừa... vừa... (liệt kê lý do).",
        jlpt_level: "N4",
        formation: "Thể thường + し",
        category: "Liệt kê",
        examples: [
            { jp: "彼はハンサムだし、親切だし、人気があります。", vi: "Anh ấy vừa đẹp trai, vừa tốt bụng nên rất được yêu thích." },
            { jp: "雨も降っているし、帰りましょう。", vi: "Trời cũng đang mưa, về thôi." },
        ]
    },
    {
        id: "n4_012",
        title: "～てみる",
        description: "Thử làm gì đó.",
        jlpt_level: "N4",
        formation: "Vて + みます",
        category: "Thử nghiệm",
        examples: [
            { jp: "この服を着てみます。", vi: "Tôi sẽ mặc thử cái áo này." },
            { jp: "納豆を食べてみました。", vi: "Tôi đã ăn thử Natto." },
        ]
    },
    {
        id: "n4_013",
        title: "～やすい／にくい",
        description: "Dễ/Khó làm gì đó.",
        jlpt_level: "N4",
        formation: "Vます(bỏ ます) + やすい／にくい",
        category: "Tính chất",
        examples: [
            { jp: "この漢字は書きにくいです。", vi: "Chữ Kanji này khó viết." },
            { jp: "このペンは書きやすいです。", vi: "Cây bút này dễ viết." },
        ]
    },
    {
        id: "n4_014",
        title: "～すぎます",
        description: "Quá... (mức độ tiêu cực).",
        jlpt_level: "N4",
        formation: "Vます(bỏ ます)/A(bỏ い/な) + すぎます",
        category: "Mức độ",
        examples: [
            { jp: "食べすぎました。", vi: "Tôi đã ăn quá nhiều." },
            { jp: "この服は大きすぎます。", vi: "Cái áo này quá to." },
        ]
    },
    {
        id: "n4_015",
        title: "～お～ください",
        description: "Xin hãy... (Kính ngữ của てください).",
        jlpt_level: "N4",
        formation: "お + Vます(bỏ ます) + ください",
        category: "Kính ngữ",
        examples: [
            { jp: "少々お待ちください。", vi: "Xin vui lòng đợi một chút." },
            { jp: "お入りください。", vi: "Xin mời vào." },
        ]
    },
];

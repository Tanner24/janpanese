import { Grammar } from "@/types/grammar";

export const grammar_n1: Grammar[] = [
    {
        id: "n1_001",
        title: "～なり",
        description: "Vừa mới... thì đã...",
        jlpt_level: "N1",
        formation: "Vる + なり",
        category: "Thời gian",
        note: "Hành động bất ngờ của ngôi thứ 3.",
        examples: [
            { jp: "彼は部屋に入るなり、大声で叫んだ。", vi: "Anh ta vừa bước vào phòng đã hét lớn." },
            { jp: "私の顔を見るなり、泣き出した。", vi: "Vừa nhìn thấy mặt tôi, nó đã khóc òa lên." },
        ]
    },
    {
        id: "n1_002",
        title: "～ごとき",
        description: "Như là... / Cỡ như...",
        jlpt_level: "N1",
        formation: "N + ごとき",
        category: "So sánh/Hạ thấp",
        note: "Văn cổ/trang trọng hoặc khinh miệt.",
        examples: [
            { jp: "私ごときが意見を言うのは失礼ですが...", vi: "Kẻ hèn mọn như tôi mà đưa ra ý kiến thì thất lễ, nhưng..." },
            { jp: "お前ごときに負けるものか。", vi: "Tao mà lại thua loại như mày sao?" },
        ]
    },
    {
        id: "n1_003",
        title: "～めく",
        description: "Có vẻ... / Đậm chất...",
        jlpt_level: "N1",
        formation: "N + めく",
        category: "Cảm giác",
        examples: [
            { jp: "春めいてきましたね。", vi: "Trời đã bắt đầu mang hơi hướng mùa xuân rồi nhỉ." },
            { jp: "謎めいた微笑み。", vi: "Nụ cười đầy bí ẩn." },
        ]
    },
    {
        id: "n1_004",
        title: "～といったらない",
        description: "Hết chỗ nói / Không kể xiết (Cực kỳ).",
        jlpt_level: "N1",
        formation: "Aい/N + といったらない",
        category: "Mức độ cực đại",
        examples: [
            { jp: "その美しさといったらなかった。", vi: "Vẻ đẹp đó không lời nào tả xiết." },
            { jp: "腹立たしいといったらありゃしない。", vi: "Tức không chịu được." },
        ]
    },
    {
        id: "n1_005",
        title: "～ずにはいられない",
        description: "Không thể không... / Buộc phải...",
        jlpt_level: "N1",
        formation: "Vない(bỏ ない) + ずにはいられない",
        category: "Cảm xúc tự nhiên",
        note: "Cảm xúc trào dâng không kìm nén được.",
        examples: [
            { jp: "おかしくて、笑わずにはいられなかった。", vi: "Buồn cười quá nên tôi không thể không cười." },
            { jp: "その話を聞いて、泣かずにはいられなかった。", vi: "Nghe câu chuyện đó tôi không cầm được nước mắt." },
        ]
    },
];

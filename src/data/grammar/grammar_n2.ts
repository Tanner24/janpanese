import { Grammar } from "@/types/grammar";

export const grammar_n2: Grammar[] = [
    {
        id: "n2_001",
        title: "～ざるを得ない",
        description: "Đành phải... / Buộc phải...",
        jlpt_level: "N2",
        formation: "Vない(bỏ ない) + ざるを得ない",
        category: "Bắt buộc",
        note: "する -> せざるを得ない",
        examples: [
            { jp: "嫌な仕事でも、生活のためには続けざるを得ない。", vi: "Dù công việc đáng ghét nhưng vì cuộc sống nên đành phải tiếp tục." },
            { jp: "嘘と言わざるを得ない。", vi: "Buộc phải nói đó là nói dối." },
        ]
    },
    {
        id: "n2_008",
        title: "～他（ほか）ない",
        description: "Không còn cách nào khác ngoài...",
        jlpt_level: "N2",
        formation: "Vる + 他（ほか）ない",
        category: "Bắt buộc",
        note: "Tương tự '～ざるを得ない' nhưng mang sắc thái nhẹ hơn. Dùng khi chỉ còn MỘT lựa chọn duy nhất.",
        examples: [
            { jp: "諦める他ない。", vi: "Chẳng còn cách nào khác ngoài từ bỏ." },
            { jp: "歩いて行く他ありません。", vi: "Chỉ còn cách đi bộ thôi." },
        ]
    },
    {
        id: "n2_002",
        title: "～に際して",
        description: "Nhân dịp... / Khi bắt đầu...",
        jlpt_level: "N2",
        formation: "N/Vる + に際して",
        category: "Thời gian/Sự kiện",
        note: "Trang trọng, dùng cho sự kiện đặc biệt.",
        examples: [
            { jp: "開会に際して、一言ご挨拶申し上げます。", vi: "Nhân dịp khai mạc, tôi xin có đôi lời phát biểu." },
            { jp: "受験に際しての注意。", vi: "Lưu ý khi dự thi." },
        ]
    },
    {
        id: "n2_003",
        title: "～つつある",
        description: "Đang dần dần...",
        jlpt_level: "N2",
        formation: "Vます(bỏ ます) + つつある",
        category: "Tiến triển",
        note: "Văn viết, trang trọng hơn ていく.",
        examples: [
            { jp: "事態は改善しつつある。", vi: "Tình hình đang dần được cải thiện." },
            { jp: "新しい文化が生まれつつある。", vi: "Một nền văn hóa mới đang dần được hình thành." },
        ]
    },
    {
        id: "n2_004",
        title: "～こそ",
        description: "Chính là... (Nhấn mạnh).",
        jlpt_level: "N2",
        formation: "N + こそ",
        category: "Nhấn mạnh",
        examples: [
            { jp: "今年こそ合格したい。", vi: "Chính năm nay tôi muốn đỗ." },
            { jp: "あなたこそ間違っています。", vi: "Chính bạn mới là người sai." },
        ]
    },
    {
        id: "n2_005",
        title: "～っぽい",
        description: "Có vẻ... / Mang tính...",
        jlpt_level: "N2",
        formation: "N/Vます/Aい + っぽい",
        category: "Tính chất",
        note: "Thường mang nghĩa tiêu cực (trẻ con, rẻ tiền...).",
        examples: [
            { jp: "彼は子供っぽいですね。", vi: "Anh ấy tính trẻ con nhỉ." },
            { jp: "この服は安っぽい。", vi: "Cái áo này trông rẻ tiền." },
        ]
    },
    {
        id: "n2_006",
        title: "～わけがない",
        description: "Tuyệt đối không... / Chả có lý nào...",
        jlpt_level: "N2",
        formation: "Thể thường + わけがない",
        category: "Phủ định mạnh",
        examples: [
            { jp: "彼が犯人のわけがない。", vi: "Không lý nào anh ấy là thủ phạm." },
            { jp: "そんなこと、できるわけがない。", vi: "Việc đó tuyệt đối không thể làm được." },
        ]
    },
    {
        id: "n2_007",
        title: "～かねる",
        description: "Khó có thể... / Không thể...",
        jlpt_level: "N2",
        formation: "Vます(bỏ ます) + かねる",
        category: "Từ chối lịch sự",
        note: "Dùng từ chối khéo.",
        examples: [
            { jp: "その件についてはお答えしかねます。", vi: "Về vụ việc này tôi khó có thể trả lời được." },
            { jp: "見るに見かねて手伝った。", vi: "Không thể đứng nhìn được nữa nên tôi đã giúp." },
        ]
    },
];

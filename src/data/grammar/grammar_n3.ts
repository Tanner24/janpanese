import { Grammar } from "@/types/grammar";

export const grammar_n3: Grammar[] = [
    {
        id: "n3_001",
        title: "～うちに",
        description: "Trong lúc... (tranh thủ làm gì đó).",
        jlpt_level: "N3",
        formation: "Vる/Vない/Aい/Aな/Nの + うちに",
        category: "Thời gian",
        note: "Vế sau là hành động có ý chí.",
        examples: [
            { jp: "若いうちに勉強したほうがいいです。", vi: "Nên học khi còn trẻ." },
            { jp: "雨が降らないうちに帰りましょう。", vi: "Hãy về trong lúc trời chưa mưa." },
        ]
    },
    {
        id: "n3_002",
        title: "～おかげで",
        description: "Nhờ có... (kết quả tốt).",
        jlpt_level: "N3",
        formation: "V/A/N (thể bổ nghĩa) + おかげで",
        category: "Nguyên nhân",
        note: "Nếu kết quả xấu dùng 'せいで'.",
        examples: [
            { jp: "先生のおかげで合格しました。", vi: "Nhờ có thầy mà em đã đỗ." },
            { jp: "天気がいいおかげで、旅行が楽しかったです。", vi: "Nhờ trời đẹp nên chuyến du lịch rất vui." },
        ]
    },
    {
        id: "n3_003",
        title: "～に対して",
        description: "Đối với... / Trái ngược với...",
        jlpt_level: "N3",
        formation: "N + に対して",
        category: "Đối tượng/So sánh",
        examples: [
            { jp: "目上の人に対して敬語を使います。", vi: "Dùng kính ngữ đối với người bề trên." },
            { jp: "兄は活発なのに対して、弟はおとなしい。", vi: "Trái với người anh hoạt bát, người em lại trầm tính." },
        ]
    },
    {
        id: "n3_004",
        title: "～とおりに",
        description: "Theo như... / Đúng như...",
        jlpt_level: "N3",
        formation: "Vる/Vた/Nの + とおりに",
        category: "Tương đồng",
        examples: [
            { jp: "私が言うとおりに書いてください。", vi: "Hãy viết đúng như tôi nói." },
            { jp: "計画のとおりに進めてください。", vi: "Hãy tiến hành theo kế hoạch." },
        ]
    },
    {
        id: "n3_005",
        title: "～について",
        description: "Về vấn đề...",
        jlpt_level: "N3",
        formation: "N + について",
        category: "Chủ đề",
        examples: [
            { jp: "日本の文化について調べました。", vi: "Tôi đã tìm hiểu về văn hóa Nhật Bản." },
            { jp: "将来について考えています。", vi: "Tôi đang suy nghĩ về tương lai." },
        ]
    },
    {
        id: "n3_006",
        title: "～たばかり",
        description: "Vừa mới làm gì xong.",
        jlpt_level: "N3",
        formation: "Vた + ばかり",
        category: "Thời gian",
        note: "Cảm giác chủ quan của người nói (có thể đã lâu).",
        examples: [
            { jp: "食べたばかりですから、お腹がいっぱいです。", vi: "Vì vừa mới ăn xong nên tôi no rồi." },
            { jp: "日本に来たばかりです。", vi: "Tôi vừa mới đến Nhật." },
        ]
    },
    {
        id: "n3_007",
        title: "～際（に）",
        description: "Khi... (Trang trọng hơn とき).",
        jlpt_level: "N3",
        formation: "Vる/Vた/Nの + 際（に）",
        category: "Thời gian",
        note: "Dùng trong thông báo, văn bản.",
        examples: [
            { jp: "ご利用の際は、こちらのボタンを押してください。", vi: "Khi sử dụng vui lòng nhấn nút này." },
            { jp: "お帰りの際は、忘れ物にご注意ください。", vi: "Khi về xin hãy chú ý đừng bỏ quên đồ." },
        ]
    },
    {
        id: "n3_008",
        title: "～たびに",
        description: "Mỗi lần... lại...",
        jlpt_level: "N3",
        formation: "Vる/Nの + たびに",
        category: "Tần suất",
        examples: [
            { jp: "この曲を聞くたびに、故郷を思い出します。", vi: "Mỗi lần nghe khúc nhạc này tôi lại nhớ quê." },
            { jp: "会うたびに綺麗になりますね。", vi: "Mỗi lần gặp bạn lại xinh đẹp hơn nhỉ." },
        ]
    },
    {
        id: "n3_009",
        title: "～にかけては",
        description: "Riêng về mặt... thì (là nhất).",
        jlpt_level: "N3",
        formation: "N + にかけては",
        category: "Đánh giá",
        note: "Thường mang ý khen ngợi.",
        examples: [
            { jp: "足の速さにかけては、彼に勝てる人はいません。", vi: "Về chạy nhanh thì không ai thắng được anh ấy." },
            { jp: "値段の安さにかけては、この店が一番です。", vi: "Về độ rẻ thì cửa hàng này là nhất." },
        ]
    },
    {
        id: "n3_010",
        title: "～とは限らない",
        description: "Chưa chắc đã... / Không hẳn là...",
        jlpt_level: "N3",
        formation: "Thể thường + とは限らない",
        category: "Phủ định một phần",
        examples: [
            { jp: "高いものがいいとは限らない。", vi: "Đồ đắt tiền chưa chắc đã tốt." },
            { jp: "日本人だからといって、漢字が書けるとは限らない。", vi: "Dù là người Nhật nhưng chưa chắc đã viết được Kanji." },
        ]
    },
];

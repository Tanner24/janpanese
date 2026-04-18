import { Grammar } from "@/types/grammar";

export const grammar_n5: Grammar[] = [
    {
        id: "n5_001",
        title: "～は～です",
        description: "Dùng để giới thiệu tên, nghề nghiệp, quốc tịch...",
        jlpt_level: "N5",
        formation: "N1 は N2 です",
        category: "Cơ bản",
        examples: [
            { jp: "私は学生です。", vi: "Tôi là học sinh." },
            { jp: "ミラーさんはアメリカ人です。", vi: "Anh Miller là người Mỹ." }
        ]
    },
    {
        id: "n5_002",
        title: "～は～じゃありません",
        description: "Phủ định của '～です'. Trang trọng hơn dùng 'ではありません'.",
        jlpt_level: "N5",
        formation: "N1 は N2 じゃありません",
        category: "Cơ bản",
        note: "Trong văn viết hoặc trang trọng, dùng 'ではありません'.",
        examples: [
            { jp: "私はエンジニアじゃありません。", vi: "Tôi không phải kỹ sư." },
            { jp: "彼は先生ではありません。", vi: "Anh ấy không phải giáo viên." }
        ]
    },
    {
        id: "n5_003",
        title: "～ですか",
        description: "Câu hỏi nghi vấn hoặc xác nhận.",
        jlpt_level: "N5",
        formation: "Câu + か",
        category: "Cơ bản",
        note: "Cuối câu lên giọng khi đọc.",
        examples: [
            { jp: "あなたは日本人ですか。", vi: "Bạn là người Nhật phải không?" },
            { jp: "これは何ですか。", vi: "Cái này là cái gì?" }
        ]
    },
    {
        id: "n5_004",
        title: "～も",
        description: "Trợ từ 'cũng', thay thế cho 'は' khi chủ đề giống nhau.",
        jlpt_level: "N5",
        formation: "N も V",
        category: "Trợ từ",
        examples: [
            { jp: "私もベトナム人です。", vi: "Tôi cũng là người Việt Nam." },
            { jp: "彼も学生です。", vi: "Anh ấy cũng là học sinh." }
        ]
    },
    {
        id: "n5_005",
        title: "～の～",
        description: "Trợ từ sở hữu hoặc bổ nghĩa cho danh từ.",
        jlpt_level: "N5",
        formation: "N1 の N2",
        category: "Trợ từ",
        note: "N1 bổ nghĩa cho N2. Dịch là 'N2 của N1'.",
        examples: [
            { jp: "これは私の本です。", vi: "Đây là sách của tôi." },
            { jp: "日本語の先生", vi: "Giáo viên tiếng Nhật" }
        ]
    },
    {
        id: "n5_006",
        title: "～があります／います",
        description: "Chỉ sự tồn tại của sự vật (あります) hoặc người/động vật (います).",
        jlpt_level: "N5",
        formation: "N (địa điểm) に N (vật/người) が あります／います",
        category: "Tồn tại",
        note: "あります dùng cho vật vô tri, cây cối. います dùng cho người, động vật.",
        examples: [
            { jp: "机の上に本があります。", vi: "Trên bàn có quyển sách." },
            { jp: "教室に学生がいます。", vi: "Trong lớp học có học sinh." }
        ]
    },
    {
        id: "n5_007",
        title: "～を～",
        description: "Trợ từ chỉ đối tượng tác động của hành động.",
        jlpt_level: "N5",
        formation: "N を V",
        category: "Trợ từ",
        examples: [
            { jp: "ご飯を食べます。", vi: "Tôi ăn cơm." },
            { jp: "テレビを見ます。", vi: "Tôi xem TV." }
        ]
    },
    {
        id: "n5_008",
        title: "～で～",
        description: "Trợ từ chỉ nơi chốn diễn ra hành động hoặc phương tiện.",
        jlpt_level: "N5",
        formation: "N (địa điểm/phương tiện) で V",
        category: "Trợ từ",
        note: "Khác với 'に' (chỉ điểm đến/tồn tại).",
        examples: [
            { jp: "図書館で本を読みます。", vi: "Tôi đọc sách ở thư viện." },
            { jp: "バスで学校へ行きます。", vi: "Tôi đi đến trường bằng xe buýt." }
        ]
    },
    {
        id: "n5_009",
        title: "～ニ～",
        description: "Trợ từ chỉ thời gian hoặc điểm đến.",
        jlpt_level: "N5",
        formation: "N (thời gian/địa điểm) に V",
        category: "Trợ từ",
        note: "Dùng cho thời gian cụ thể (có số).",
        examples: [
            { jp: "6時に起きます。", vi: "Tôi thức dậy lúc 6 giờ." },
            { jp: "日本に来ました。", vi: "Tôi đã đến Nhật." }
        ]
    },
    {
        id: "n5_010",
        title: "～ませんか",
        description: "Mời mọc, rủ rê người khác làm gì đó.",
        jlpt_level: "N5",
        formation: "Vません + か",
        category: "Lời mời",
        examples: [
            { jp: "一緒に映画を見ませんか。", vi: "Cùng xem phim không?" },
            { jp: "明日、行きませんか。", vi: "Ngày mai đi không?" }
        ]
    },
    {
        id: "n5_011",
        title: "～ましょう",
        description: "Đề nghị cùng làm gì đó (Chủ động hơn ませんか)",
        jlpt_level: "N5",
        formation: "Vます (bỏ ます) + ましょう",
        category: "Lời mời",
        examples: [
            { jp: "休憩しましょう。", vi: "Chúng ta cùng nghỉ giải lao nào." },
            { jp: "帰りましょう。", vi: "Về thôi nào." }
        ]
    },
    {
        id: "n5_012",
        title: "～たいです",
        description: "Diễn tả mong muốn làm gì đó của bản thân.",
        jlpt_level: "N5",
        formation: "Vます (bỏ ます) + たいです",
        category: "Mong muốn",
        note: "Không dùng để nói về mong muốn của người thứ 3.",
        examples: [
            { jp: "私は日本へ行きたいです。", vi: "Tôi muốn đi Nhật." },
            { jp: "水が飲みたいです。", vi: "Tôi muốn uống nước." }
        ]
    },
    {
        id: "n5_013",
        title: "～ています",
        description: "1. Đang làm gì (tiếp diễn)\n2. Trạng thái kết quả",
        jlpt_level: "N5",
        formation: "Vて + います",
        category: "Thì/Thể",
        examples: [
            { jp: "今、勉強しています。", vi: "Bây giờ tôi đang học." },
            { jp: "結婚しています。", vi: "Tôi đã kết hôn (trạng thái)." }
        ]
    },
    {
        id: "n5_014",
        title: "～てください",
        description: "Yêu cầu, nhờ vả lịch sự.",
        jlpt_level: "N5",
        formation: "Vて + ください",
        category: "Yêu cầu",
        examples: [
            { jp: "ちょっと待ってください。", vi: "Xin hãy chờ một chút." },
            { jp: "ここに名前を書いてください。", vi: "Hãy viết tên vào đây." }
        ]
    },
    {
        id: "n5_015",
        title: "～てもいいです",
        description: "Cho phép làm gì đó.",
        jlpt_level: "N5",
        formation: "Vて + もいいです",
        category: "Cho phép",
        examples: [
            { jp: "写真を撮ってもいいです。", vi: "Được phép chụp ảnh." },
            { jp: "ここに入ってもいいですか。", vi: "Tôi vào đây được không?" }
        ]
    },
    {
        id: "n5_016",
        title: "～てはいけません",
        description: "Cấm làm gì đó.",
        jlpt_level: "N5",
        formation: "Vて + はいけません",
        category: "Cấm đoán",
        examples: [
            { jp: "ここでタバコを吸ってはいけません。", vi: "Không được hút thuốc ở đây." },
            { jp: "入ってはいけません。", vi: "Cấm vào." }
        ]
    },
    {
        id: "n5_017",
        title: "～ないでください",
        description: "Xin đừng làm gì đó.",
        jlpt_level: "N5",
        formation: "Vない + でください",
        category: "Yêu cầu",
        examples: [
            { jp: "写真を撮らないでください。", vi: "Xin đừng chụp ảnh." },
            { jp: "忘れないでください。", vi: "Xin đừng quên." }
        ]
    },
    {
        id: "n5_018",
        title: "～のが好きです",
        description: "Thích làm việc gì đó (Danh từ hóa động từ).",
        jlpt_level: "N5",
        formation: "Vる + のが + A (好き／嫌い／上手...)",
        category: "Sở thích/Năng lực",
        examples: [
            { jp: "私は絵を描くのが好きです。", vi: "Tôi thích vẽ tranh." },
            { jp: "サッカーを見るのが好きです。", vi: "Tôi thích xem bóng đá." }
        ]
    },
    {
        id: "n5_019",
        title: "～から",
        description: "1. Vì (nguyên nhân)\n2. Từ (điểm xuất phát)",
        jlpt_level: "N5",
        formation: "Mệnh đề + から",
        category: "Nguyên nhân",
        examples: [
            { jp: "時間がありませんから、タクシーで行きましょう。", vi: "Vì không có thời gian nên đi taxi thôi." },
            { jp: "会議は9時からですか。", vi: "Cuộc họp bắt đầu từ 9 giờ phải không?" }
        ]
    },
    {
        id: "n5_020",
        title: "どうして～か",
        description: "Hỏi lý do: Tại sao...",
        jlpt_level: "N5",
        formation: "どうして + Mệnh đề + か",
        category: "Nghi vấn từ",
        note: "Trả lời thường dùng '～から'.",
        examples: [
            { jp: "どうして昨日休みましたか。", vi: "Tại sao hôm qua bạn nghỉ?" },
            { jp: "どうして野菜を食べませんか。", vi: "Tại sao bạn không ăn rau?" }
        ]
    }
];

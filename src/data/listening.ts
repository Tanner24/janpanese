import { ListeningExercise } from '@/types/listening';

// Comprehensive listening exercises database
export const listeningExercises: ListeningExercise[] = [
    // ===== N5 LEVEL (8 exercises) =====
    {
        id: 'listen_n5_001',
        title: 'Tự giới thiệu',
        audio_url: '',
        script_jp: 'はじめまして。わたしは田中です。どうぞよろしくお願いします。',
        script_vi: 'Xin chào lần đầu gặp. Tôi là Tanaka. Rất hân hạnh được làm quen.',
        jlpt_level: 'N5',
        category: 'Giới thiệu',
        questions: [
            {
                id: 'q1',
                question: 'Người nói tên gì?',
                options: ['Yamada', 'Tanaka', 'Suzuki', 'Sato'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n5_002',
        title: 'Mua sắm',
        audio_url: '',
        script_jp: 'すみません。このりんごはいくらですか。一つ百円です。じゃあ、三つください。',
        script_vi: 'Xin lỗi. Quả táo này bao nhiêu tiền? Một quả 100 yên ạ. Vậy cho tôi 3 quả.',
        jlpt_level: 'N5',
        category: 'Mua sắm',
        questions: [
            {
                id: 'q1',
                question: 'Một quả táo giá bao nhiêu?',
                options: ['50 yên', '100 yên', '150 yên', '200 yên'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Người mua muốn mua bao nhiêu quả?',
                options: ['1 quả', '2 quả', '3 quả', '4 quả'],
                correct: 2
            }
        ]
    },
    {
        id: 'listen_n5_003',
        title: 'Hỏi đường',
        audio_url: '',
        script_jp: '駅はどこですか。あそこです。まっすぐ行って、右に曲がってください。',
        script_vi: 'Ga tàu ở đâu? Ở kia ạ. Đi thẳng rồi rẽ phải.',
        jlpt_level: 'N5',
        category: 'Hỏi đường',
        questions: [
            {
                id: 'q1',
                question: 'Người hỏi muốn đến đâu?',
                options: ['Bệnh viện', 'Ga tàu', 'Ngân hàng', 'Nhà hàng'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n5_004',
        title: 'Gia đình',
        audio_url: '',
        script_jp: '私の家族は四人です。父と母と兄と私です。兄は大学生です。',
        script_vi: 'Gia đình tôi có 4 người. Bố, mẹ, anh trai và tôi. Anh trai là sinh viên đại học.',
        jlpt_level: 'N5',
        category: 'Gia đình',
        questions: [
            {
                id: 'q1',
                question: 'Gia đình người nói có mấy người?',
                options: ['3 người', '4 người', '5 người', '6 người'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Anh trai đang làm gì?',
                options: ['Làm việc', 'Học đại học', 'Học cấp 3', 'Nghỉ việc'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n5_005',
        title: 'Thời gian',
        audio_url: '',
        script_jp: '今、何時ですか。三時です。ありがとうございます。',
        script_vi: 'Bây giờ mấy giờ rồi? 3 giờ rồi. Cảm ơn.',
        jlpt_level: 'N5',
        category: 'Thời gian',
        questions: [
            {
                id: 'q1',
                question: 'Bây giờ là mấy giờ?',
                options: ['1 giờ', '2 giờ', '3 giờ', '4 giờ'],
                correct: 2
            }
        ]
    },
    {
        id: 'listen_n5_006',
        title: 'Sở thích',
        audio_url: '',
        script_jp: '趣味は何ですか。読書です。どんな本が好きですか。小説が好きです。',
        script_vi: 'Sở thích của bạn là gì? Đọc sách ạ. Bạn thích loại sách nào? Tôi thích tiểu thuyết.',
        jlpt_level: 'N5',
        category: 'Sở thích',
        questions: [
            {
                id: 'q1',
                question: 'Sở thích của người này là gì?',
                options: ['Xem phim', 'Đọc sách', 'Chơi game', 'Nghe nhạc'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Họ thích loại sách nào?',
                options: ['Truyện tranh', 'Tiểu thuyết', 'Sách giáo khoa', 'Tạp chí'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n5_007',
        title: 'Nhà hàng',
        audio_url: '',
        script_jp: 'いらっしゃいませ。何名様ですか。二人です。どうぞ、こちらへ。',
        script_vi: 'Xin chào. Mấy người ạ? Hai người. Mời bạn vào đây.',
        jlpt_level: 'N5',
        category: 'Nhà hàng',
        questions: [
            {
                id: 'q1',
                question: 'Có bao nhiêu người đến nhà hàng?',
                options: ['1 người', '2 người', '3 người', '4 người'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n5_008',
        title: 'Ngày sinh nhật',
        audio_url: '',
        script_jp: '誕生日はいつですか。五月十日です。何歳ですか。二十歳です。',
        script_vi: 'Sinh nhật bạn là khi nào? Ngày 10 tháng 5 ạ. Bạn bao nhiêu tuổi? 20 tuổi.',
        jlpt_level: 'N5',
        category: 'Cá nhân',
        questions: [
            {
                id: 'q1',
                question: 'Sinh nhật là ngày nào?',
                options: ['5/5', '10/5', '5/10', '10/10'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Người này bao nhiêu tuổi?',
                options: ['18 tuổi', '20 tuổi', '22 tuổi', '25 tuổi'],
                correct: 1
            }
        ]
    },

    // ===== N4 LEVEL (8 exercises) =====
    {
        id: 'listen_n4_001',
        title: 'Dự báo thời tiết',
        audio_url: '',
        script_jp: '明日は晴れです。気温は二十五度ぐらいです。とても暑いですから、水をたくさん飲んでください。',
        script_vi: 'Ngày mai trời nắng. Nhiệt độ khoảng 25 độ. Rất nóng nên hãy uống nhiều nước.',
        jlpt_level: 'N4',
        category: 'Thời tiết',
        questions: [
            {
                id: 'q1',
                question: 'Thời tiết ngày mai thế nào?',
                options: ['Mưa', 'Nắng', 'Nhiều mây', 'Có tuyết'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Nhiệt độ ngày mai là?',
                options: ['15 độ', '20 độ', '25 độ', '30 độ'],
                correct: 2
            }
        ]
    },
    {
        id: 'listen_n4_002',
        title: 'Cuộc điện thoại',
        audio_url: '',
        script_jp: 'もしもし、山田さんですか。はい、そうです。今日の会議は三時からです。わかりました。ありがとうございます。',
        script_vi: 'A lô, có phải Yamada không? Vâng, đúng rồi. Cuộc họp hôm nay bắt đầu từ 3 giờ. Tôi hiểu rồi. Cảm ơn.',
        jlpt_level: 'N4',
        category: 'Công việc',
        questions: [
            {
                id: 'q1',
                question: 'Cuộc họp bắt đầu lúc mấy giờ?',
                options: ['1 giờ', '2 giờ', '3 giờ', '4 giờ'],
                correct: 2
            }
        ]
    },
    {
        id: 'listen_n4_003',
        title: 'Kế hoạch cuối tuần',
        audio_url: '',
        script_jp: '週末は何をしますか。友達と映画を見に行くつもりです。楽しそうですね。',
        script_vi: 'Cuối tuần bạn sẽ làm gì? Tôi định đi xem phim với bạn. Có vẻ vui đấy.',
        jlpt_level: 'N4',
        category: 'Cuộc sống',
        questions: [
            {
                id: 'q1',
                question: 'Người này sẽ làm gì cuối tuần?',
                options: ['Đi mua sắm', 'Xem phim', 'Đi du lịch', 'Ở nhà'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Họ sẽ đi với ai?',
                options: ['Một mình', 'Bạn bè', 'Gia đình', 'Đồng nghiệp'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n4_004',
        title: 'Bệnh cảm',
        audio_url: '',
        script_jp: 'どうしましたか。頭が痛くて、熱があります。じゃあ、早く帰って休んでください。',
        script_vi: 'Bạn sao thế? Tôi đau đầu và bị sốt. Vậy hãy về sớm và nghỉ ngơi.',
        jlpt_level: 'N4',
        category: 'Sức khỏe',
        questions: [
            {
                id: 'q1',
                question: 'Người này có triệu chứng gì?',
                options: ['Đau bụng', 'Đau đầu và sốt', 'Ho', 'Mệt'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n4_005',
        title: 'Đặt phòng khách sạn',
        audio_url: '',
        script_jp: '来月の十五日から三泊したいんですが。はい、大丈夫です。お名前をお願いします。',
        script_vi: 'Tôi muốn ở từ ngày 15 tháng sau, 3 đêm. Vâng, được ạ. Xin cho biết tên.',
        jlpt_level: 'N4',
        category: 'Du lịch',
        questions: [
            {
                id: 'q1',
                question: 'Họ muốn ở bao nhiêu đêm?',
                options: ['2 đêm', '3 đêm', '4 đêm', '5 đêm'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n4_006',
        title: 'Lời khuyên học tập',
        audio_url: '',
        script_jp: '日本語が上手になりたいなら、毎日練習した方がいいですよ。そうですね。頑張ります。',
        script_vi: 'Nếu muốn giỏi tiếng Nhật, bạn nên luyện tập mỗi ngày. Đúng thế. Tôi sẽ cố gắng.',
        jlpt_level: 'N4',
        category: 'Học tập',
        questions: [
            {
                id: 'q1',
                question: 'Để giỏi tiếng Nhật, nên làm gì?',
                options: ['Xem TV', 'Luyện tập mỗi ngày', 'Đi du lịch', 'Ngủ nhiều'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n4_007',
        title: 'Tìm đồ thất lạc',
        audio_url: '',
        script_jp: '財布を落としてしまいました。どこで落としましたか。駅で落としたと思います。',
        script_vi: 'Tôi đã làm mất ví. Bạn đã làm mất ở đâu? Tôi nghĩ là ở ga tàu.',
        jlpt_level: 'N4',
        category: 'Khẩn cấp',
        questions: [
            {
                id: 'q1',
                question: 'Người này đã làm mất gì?',
                options: ['Chìa khóa', 'Điện thoại', 'Ví', 'Túi'],
                correct: 2
            },
            {
                id: 'q2',
                question: 'Họ nghĩ mình làm mất ở đâu?',
                options: ['Nhà hàng', 'Ga tàu', 'Công viên', 'Cửa hàng'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n4_008',
        title: 'Giới thiệu công việc',
        audio_url: '',
        script_jp: '仕事は何ですか。会社員です。どんな仕事をしていますか。コンピューターのプログラムを作っています。',
        script_vi: 'Công việc của bạn là gì? Tôi là nhân viên công ty. Bạn làm công việc gì? Tôi làm chương trình máy tính.',
        jlpt_level: 'N4',
        category: 'Công việc',
        questions: [
            {
                id: 'q1',
                question: 'Người này làm nghề gì?',
                options: ['Giáo viên', 'Bác sĩ', 'Lập trình viên', 'Kỹ sư'],
                correct: 2
            }
        ]
    },

    // ===== N3 LEVEL (6 exercises) =====
    {
        id: 'listen_n3_001',
        title: 'Phỏng vấn xin việc',
        audio_url: '',
        script_jp: '志望動機を教えてください。御社の製品に興味があって、自分のスキルを活かせると思いました。前職では何年働きましたか。三年間働きました。',
        script_vi: 'Hãy cho biết động lực ứng tuyển. Tôi quan tâm đến sản phẩm của công ty và nghĩ rằng có thể phát huy kỹ năng của mình. Bạn đã làm việc ở công ty trước bao lâu? Tôi đã làm 3 năm.',
        jlpt_level: 'N3',
        category: 'Công việc',
        questions: [
            {
                id: 'q1',
                question: 'Lý do ứng tuyển là gì?',
                options: ['Lương cao', 'Quan tâm đến sản phẩm', 'Gần nhà', 'Bạn bè giới thiệu'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Người này đã làm việc bao lâu ở công ty cũ?',
                options: ['1 năm', '2 năm', '3 năm', '5 năm'],
                correct: 2
            }
        ]
    },
    {
        id: 'listen_n3_002',
        title: 'Thảo luận văn hóa',
        audio_url: '',
        script_jp: '日本とベトナムの文化の違いについてどう思いますか。両国とも家族を大切にしますが、表現の仕方が違いますね。具体的には。日本は控えめですが、ベトナムはもっと直接的だと思います。',
        script_vi: 'Bạn nghĩ gì về sự khác biệt văn hóa Nhật-Việt? Cả hai đều coi trọng gia đình nhưng cách thể hiện khác nhau. Cụ thể thế nào? Nhật Bản khiêm tốn hơn, còn Việt Nam trực tiếp hơn.',
        jlpt_level: 'N3',
        category: 'Văn hóa',
        questions: [
            {
                id: 'q1',
                question: 'Điểm chung giữa Nhật và Việt là gì?',
                options: ['Ẩm thực', 'Coi trọng gia đình', 'Ngôn ngữ', 'Khí hậu'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Theo người nói, cách thể hiện của Việt Nam thế nào?',
                options: ['Khiêm tốn', 'Trực tiếp', 'Phức tạp', 'Mơ hồ'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n3_003',
        title: 'Vấn đề môi trường',
        audio_url: '',
        script_jp: '最近、環境問題が深刻になっていますね。そうですね。私たちにできることは何でしょうか。まず、プラスチックの使用を減らすことが大切だと思います。',
        script_vi: 'Gần đây vấn đề môi trường đang nghiêm trọng nhỉ. Đúng vậy. Chúng ta có thể làm gì? Trước tiên, tôi nghĩ việc giảm sử dụng nhựa là quan trọng.',
        jlpt_level: 'N3',
        category: 'Xã hội',
        questions: [
            {
                id: 'q1',
                question: 'Vấn đề đang được bàn luận là gì?',
                options: ['Kinh tế', 'Môi trường', 'Giáo dục', 'Y tế'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Điều quan trọng đầu tiên là gì?',
                options: ['Tiết kiệm nước', 'Giảm sử dụng nhựa', 'Trồng cây', 'Đi xe buýt'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n3_004',
        title: 'Kỹ năng giao tiếp',
        audio_url: '',
        script_jp: '良い人間関係を築くためには、相手の話をよく聞くことが重要です。それに、自分の意見を押し付けないで、相手の立場に立って考えることも必要ですね。',
        script_vi: 'Để xây dựng mối quan hệ tốt, việc lắng nghe người khác rất quan trọng. Hơn nữa, không áp đặt ý kiến bản thân mà cần đặt mình vào vị trí người ta.',
        jlpt_level: 'N3',
        category: 'Kỹ năng mềm',
        questions: [
            {
                id: 'q1',
                question: 'Điều quan trọng để xây dựng quan hệ tốt là gì?',
                options: ['Nói nhiều', 'Lắng nghe', 'Tranh luận', 'Im lặng'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Nên tránh làm gì?',
                options: ['Đặt câu hỏi', 'Áp đặt ý kiến', 'Chia sẻ', 'Hợp tác'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n3_005',
        title: 'Công nghệ và cuộc sống',
        audio_url: '',
        script_jp: 'スマートフォンのおかげで、生活が便利になりました。しかし、使いすぎると健康に悪い影響があるかもしれません。バランスが大切ですね。',
        script_vi: 'Nhờ smartphone, cuộc sống tiện lợi hơn. Tuy nhiên, dùng quá nhiều có thể ảnh hưởng xấu đến sức khỏe. Cần có sự cân bằng.',
        jlpt_level: 'N3',
        category: 'Công nghệ',
        questions: [
            {
                id: 'q1',
                question: 'Smartphone mang lại điều gì?',
                options: ['Sự tiện lợi', 'Bệnh tật', 'Căng thẳng', 'Cô đơn'],
                correct: 0
            },
            {
                id: 'q2',
                question: 'Dùng quá nhiều smartphone có thể gây ra gì?',
                options: ['Tiết kiệm tiền', 'Ảnh hưởng sức khỏe', 'Thông minh hơn', 'Hạnh phúc hơn'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n3_006',
        title: 'Lời khuyên về sự nghiệp',
        audio_url: '',
        script_jp: 'キャリアアップのためには、専門知識だけでなく、コミュニケーション能力も必要です。また、失敗を恐れずにチャレンジする姿勢が成長につながります。',
        script_vi: 'Để phát triển sự nghiệp, không chỉ cần kiến thức chuyên môn mà cần cả kỹ năng giao tiếp. Ngoài ra, thái độ dám thử thách không sợ thất bại sẽ dẫn đến sự trưởng thành.',
        jlpt_level: 'N3',
        category: 'Sự nghiệp',
        questions: [
            {
                id: 'q1',
                question: 'Để phát triển sự nghiệp cần gì?',
                options: ['Chỉ kiến thức chuyên môn', 'Kiến thức và kỹ năng giao tiếp', 'Chỉ may mắn', 'Chỉ tiền bạc'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Thái độ nào giúp trưởng thành?',
                options: ['Tránh rủi ro', 'Dám thử thách', 'Làm theo người khác', 'Không thay đổi'],
                correct: 1
            }
        ]
    },

    // ===== N2 LEVEL (4 exercises) =====
    {
        id: 'listen_n2_001',
        title: 'Phân tích kinh tế',
        audio_url: '',
        script_jp: '近年、グローバル化の影響で、経済構造が大きく変化しています。特に、デジタル技術の発展により、従来のビジネスモデルが見直されつつあります。企業は柔軟な対応が求められています。',
        script_vi: 'Những năm gần đây, do ảnh hưởng toàn cầu hóa, cấu trúc kinh tế đang thay đổi lớn. Đặc biệt, nhờ phát triển công nghệ số, mô hình kinh doanh truyền thống đang được xem xét lại. Các doanh nghiệp cần có sự ứng phó linh hoạt.',
        jlpt_level: 'N2',
        category: 'Kinh tế',
        questions: [
            {
                id: 'q1',
                question: 'Nguyên nhân chính thay đổi cấu trúc kinh tế là gì?',
                options: ['Dân số tăng', 'Toàn cầu hóa', 'Chiến tranh', 'Thiên tai'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Doanh nghiệp cần gì trong tình hình hiện tại?',
                options: ['Bảo thủ', 'Ứng phó linh hoạt', 'Cắt giảm nhân sự', 'Đóng cửa'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n2_002',
        title: 'Nghiên cứu khoa học',
        audio_url: '',
        script_jp: '最新の研究によると、睡眠の質が学習効果に大きく影響することが明らかになりました。十分な睡眠を取ることで、記憶の定着率が向上し、創造的な思考も促進されるとのことです。',
        script_vi: 'Theo nghiên cứu mới nhất, chất lượng giấc ngủ ảnh hưởng lớn đến hiệu quả học tập. Ngủ đủ giấc làm tăng tỷ lệ ghi nhớ và thúc đẩy tư duy sáng tạo.',
        jlpt_level: 'N2',
        category: 'Khoa học',
        questions: [
            {
                id: 'q1',
                question: 'Chất lượng giấc ngủ ảnh hưởng đến điều gì?',
                options: ['Thu nhập', 'Hiệu quả học tập', 'Ngoại hình', 'Tính cách'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Ngủ đủ giấc mang lại lợi ích gì?',
                options: ['Chỉ sức khỏe tốt', 'Ghi nhớ tốt và tư duy sáng tạo', 'Chỉ tiết kiệm thời gian', 'Chỉ vui vẻ'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n2_003',
        title: 'Tranh luận giáo dục',
        audio_url: '',
        script_jp: '現代の教育において、知識の詰め込みではなく、批判的思考力を育成することが重要視されています。なぜなら、急速に変化する社会では、自ら考え判断する能力が不可欠だからです。',
        script_vi: 'Trong giáo dục hiện đại, thay vì nhồi nhét kiến thức, việc phát triển tư duy phản biện được coi trọng. Bởi vì trong xã hội thay đổi nhanh, khả năng tự suy nghĩ và phán đoán là không thể thiếu.',
        jlpt_level: 'N2',
        category: 'Giáo dục',
        questions: [
            {
                id: 'q1',
                question: 'Giáo dục hiện đại coi trọng điều gì?',
                options: ['Nhồi nhét kiến thức', 'Tư duy phản biện', 'Thi cử', 'Kỷ luật'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Tại sao cần khả năng tự suy nghĩ?',
                options: ['Để thi đậu', 'Vì xã hội thay đổi nhanh', 'Để làm giàu', 'Không có lý do'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n2_004',
        title: 'Bình luận văn học',
        audio_url: '',
        script_jp: '村上春樹の作品は、現実と非現実の境界を曖昧にする独特な世界観が特徴です。登場人物の心理描写が繊細で、読者に深い印象を与えます。彼の作品は世界中で翻訳され、多くの読者に愛されています。',
        script_vi: 'Tác phẩm của Murakami Haruki có đặc trưng là thế giới quan độc đáo làm mờ ranh giới giữa hiện thực và phi hiện thực. Tâm lý nhân vật được miêu tả tinh tế, để lại ấn tượng sâu sắc cho độc giả. Tác phẩm của ông được dịch ra toàn thế giới và được nhiều độc giả yêu thích.',
        jlpt_level: 'N2',
        category: 'Văn học',
        questions: [
            {
                id: 'q1',
                question: 'Đặc trưng tác phẩm Murakami là gì?',
                options: ['Chỉ viết về lịch sử', 'Thế giới quan độc đáo', 'Chỉ hài hước', 'Chỉ bi kịch'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Tác phẩm của ông có phạm vi ảnh hưởng như thế nào?',
                options: ['Chỉ ở Nhật', 'Toàn thế giới', 'Chỉ châu Á', 'Chỉ ở Tokyo'],
                correct: 1
            }
        ]
    },

    // ===== N1 LEVEL (4 exercises) =====
    {
        id: 'listen_n1_001',
        title: 'Triết lý kinh doanh',
        audio_url: '',
        script_jp: '持続可能な成長を実現するには、短期的な利益を追求するのではなく、長期的な視点に立った経営戦略が不可欠です。ステークホルダー全体の利益を考慮し、社会的責任を果たすことが、結果的に企業価値の向上につながるのです。',
        script_vi: 'Để thực hiện tăng trưởng bền vững, không phải theo đuổi lợi nhuận ngắn hạn mà chiến lược kinh doanh dài hạn là không thể thiếu. Xem xét lợi ích toàn bộ các bên liên quan và thực hiện trách nhiệm xã hội, kết quả sẽ dẫn đến nâng cao giá trị doanh nghiệp.',
        jlpt_level: 'N1',
        category: 'Kinh doanh',
        questions: [
            {
                id: 'q1',
                question: 'Để tăng trưởng bền vững cần gì?',
                options: ['Lợi nhuận ngắn hạn', 'Chiến lược dài hạn', 'Cắt giảm chi phí', 'Mở rộng nhanh'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Điều gì dẫn đến nâng cao giá trị doanh nghiệp?',
                options: ['Chỉ kiếm lợi', 'Thực hiện trách nhiệm xã hội', 'Cạnh tranh gay gắt', 'Độc quyền thị trường'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n1_002',
        title: 'Phê bình nghệ thuật',
        audio_url: '',
        script_jp: '印象派の画家たちは、光と色彩の関係を探求し、従来の写実主義から脱却しました。彼らの革新的なアプローチは当初批判されましたが、後に芸術史における重要な転換点として認識されるようになりました。',
        script_vi: 'Các họa sĩ trường phái ấn tượng đã khám phá mối quan hệ ánh sáng và màu sắc, thoát khỏi chủ nghĩa hiện thực truyền thống. Cách tiếp cận cách tân của họ ban đầu bị phê phán, nhưng sau này được công nhận là điểm chuyển mình quan trọng trong lịch sử nghệ thuật.',
        jlpt_level: 'N1',
        category: 'Nghệ thuật',
        questions: [
            {
                id: 'q1',
                question: 'Trường phái ấn tượng khám phá điều gì?',
                options: ['Hình khối', 'Ánh sáng và màu sắc', 'Đường nét', 'Chất liệu'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Ban đầu họ bị gì?',
                options: ['Tán thưởng', 'Phê phán', 'Bỏ qua', 'Sao chép'],
                correct: 1
            }
        ]
    },
    {
        id: 'listen_n1_003',
        title: 'Luận về AI và xã hội',
        audio_url: '',
        script_jp: '人工知能の急速な発展により、雇用構造の変化が予測されています。単純労働の自動化が進む一方で、創造的思考や対人スキルを要する職種の重要性が増すでしょう。教育システムもこの変化に対応する必要があります。',
        script_vi: 'Do sự phát triển nhanh của trí tuệ nhân tạo, sự thay đổi cấu trúc việc làm được dự đoán. Trong khi tự động hóa lao động đơn giản tiến triển, tầm quan trọng của nghề nghiệp đòi hỏi tư duy sáng tạo và kỹ năng giao tiếp sẽ tăng. Hệ thống giáo dục cũng cần ứng phó với thay đổi này.',
        jlpt_level: 'N1',
        category: 'Công nghệ',
        questions: [
            {
                id: 'q1',
                question: 'AI sẽ ảnh hưởng đến điều gì?',
                options: ['Khí hậu', 'Cấu trúc việc làm', 'Ngôn ngữ', 'Tôn giáo'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Nghề nào sẽ quan trọng hơn trong tương lai?',
                options: ['Lao động đơn giản', 'Nghề máy móc', 'Nghề cần tư duy sáng tạo', 'Nghề nông nghiệp'],
                correct: 2
            }
        ]
    },
    {
        id: 'listen_n1_004',
        title: 'Thảo luận đạo đức y học',
        audio_url: '',
        script_jp: '遺伝子編集技術の進歩は、医療分野に革命をもたらす可能性がありますが、同時に倫理的な課題も提起しています。技術の利用範囲や規制のあり方について、社会全体で慎重に議論する必要があります。科学の進歩と倫理のバランスを保つことが重要です。',
        script_vi: 'Tiến bộ công nghệ chỉnh sửa gen có khả năng mang lại cuộc cách mạng trong y học, nhưng đồng thời cũng đặt ra thách thức đạo đức. Cần thảo luận cẩn thận trong toàn xã hội về phạm vi sử dụng công nghệ và cách thức quy định. Việc giữ cân bằng giữa tiến bộ khoa học và đạo đức là quan trọng.',
        jlpt_level: 'N1',
        category: 'Y học',
        questions: [
            {
                id: 'q1',
                question: 'Công nghệ chỉnh sửa gen đặt ra vấn đề gì?',
                options: ['Chỉ kinh tế', 'Thách thức đạo đức', 'Chỉ kỹ thuật', 'Không có vấn đề'],
                correct: 1
            },
            {
                id: 'q2',
                question: 'Điều quan trọng là gì?',
                options: ['Chỉ phát triển nhanh', 'Cân bằng khoa học và đạo đức', 'Chỉ kiếm tiền', 'Dừng nghiên cứu'],
                correct: 1
            }
        ]
    }
];

// Helper functions
export function getExercisesByLevel(level: 'All' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1') {
    if (level === 'All') return listeningExercises;
    return listeningExercises.filter(ex => ex.jlpt_level === level);
}

export function getExercisesByCategory(category: string) {
    return listeningExercises.filter(ex => ex.category === category);
}

export function getRandomExercise(level?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1') {
    const pool = level ? getExercisesByLevel(level) : listeningExercises;
    return pool[Math.floor(Math.random() * pool.length)];
}

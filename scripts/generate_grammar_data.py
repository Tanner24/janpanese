import json
import os

def create_grammar_files():
    grammar_data = {
        "N5": [
            {
                "id": "n5_001",
                "title": "～は～です",
                "description": "Cấu trúc câu khẳng định cơ bản: N1 là N2.",
                "jlpt_level": "N5",
                "examples": [
                    {"jp": "私は学生です。", "vi": "Tôi là học sinh."},
                    {"jp": "これは私の本です。", "vi": "Đây là sách của tôi."}
                ]
            },
            {
                "id": "n5_002",
                "title": "～ですか",
                "description": "Câu nghi vấn: ... phải không?",
                "jlpt_level": "N5",
                "examples": [
                    {"jp": "あなたは学生ですか。", "vi": "Bạn là học sinh phải không?"},
                    {"jp": "これは何ですか。", "vi": "Cái này là cái gì?"}
                ]
            },
            {
                "id": "n5_003",
                "title": "～も",
                "description": "Trợ từ chỉ sự tương đồng: ... cũng ...",
                "jlpt_level": "N5",
                "examples": [
                    {"jp": "私もベトナム人です。", "vi": "Tôi cũng là người Việt Nam."},
                    {"jp": "これも美味しいです。", "vi": "Cái này cũng ngon."}
                ]
            },
            {
                "id": "n5_004",
                "title": "～の～",
                "description": "Trợ từ chỉ sở hữu: ... của ...",
                "jlpt_level": "N5",
                "examples": [
                    {"jp": "私の父は医者です。", "vi": "Bố của tôi là bác sĩ."},
                    {"jp": "日本語の本", "vi": "Sách tiếng Nhật"}
                ]
            },
            {
                "id": "n5_005",
                "title": "～があります／います",
                "description": "Chỉ sự tồn tại: Có ... (vật/người)",
                "jlpt_level": "N5",
                "examples": [
                    {"jp": "机の上に本があります。", "vi": "Trên bàn có quyển sách."},
                    {"jp": "教室に学生がいます。", "vi": "Trong lớp học có học sinh."}
                ]
            }
        ],
        "N4": [
            {
                "id": "n4_001",
                "title": "～つもりです",
                "description": "Diễn tả dự định: Dự định làm gì...",
                "jlpt_level": "N4",
                "examples": [
                    {"jp": "来年、日本へ行くつもりです。", "vi": "Năm sau tôi dự định đi Nhật."},
                    {"jp": "タバコをやめるつもりです。", "vi": "Tôi định bỏ thuốc lá."}
                ]
            },
            {
                "id": "n4_002",
                "title": "～かもしれません",
                "description": "Phỏng đoán: Có lẽ, có thể...",
                "jlpt_level": "N4",
                "examples": [
                    {"jp": "明日は雨が降るかもしれません。", "vi": "Ngày mai có thể trời sẽ mưa."},
                    {"jp": "彼は病気かもしれません。", "vi": "Có lẽ anh ấy bị ốm."}
                ]
            },
            {
                "id": "n4_003",
                "title": "～てはいけません",
                "description": "Cấm đoán: Không được làm gì...",
                "jlpt_level": "N4",
                "examples": [
                    {"jp": "ここで写真を撮ってはいけません。", "vi": "Không được chụp ảnh ở đây."},
                    {"jp": "お酒を飲んで運転してはいけません。", "vi": "Không được uống rượu lái xe."}
                ]
            },
            {
                "id": "n4_004",
                "title": "～なければなりません",
                "description": "Bắt buộc: Phải làm gì...",
                "jlpt_level": "N4",
                "examples": [
                    {"jp": "薬を飲まなければなりません。", "vi": "Phải uống thuốc."},
                    {"jp": "宿題をしなければなりません。", "vi": "Phải làm bài tập."}
                ]
            },
            {
                "id": "n4_005",
                "title": "～ことができます",
                "description": "Khả năng: Có thể làm gì...",
                "jlpt_level": "N4",
                "examples": [
                    {"jp": "私は漢字を読むことができます。", "vi": "Tôi có thể đọc chữ Hán."},
                    {"jp": "ここでタバコを吸うことができます。", "vi": "Ở đây có thể hút thuốc."}
                ]
            }
        ],
        "N3": [
            {
                "id": "n3_001",
                "title": "～に対して",
                "description": "Đối lập/Đối với: Đối với ..., trái ngược với ...",
                "jlpt_level": "N3",
                "examples": [
                    {"jp": "彼は女性に対して優しいです。", "vi": "Anh ấy dịu dàng với phụ nữ."},
                    {"jp": "昨日は雨だったのに対して、今日は良い天気だ。", "vi": "Trái ngược với hôm qua mưa, hôm nay thời tiết đẹp."}
                ]
            },
            {
                "id": "n3_002",
                "title": "～によって",
                "description": "Nguyên nhân/Phương pháp/Tùy theo: Do..., bằng cách..., tùy vào...",
                "jlpt_level": "N3",
                "examples": [
                    {"jp": "台風によって木が倒れた。", "vi": "Do bão mà cây đổ."},
                    {"jp": "人によって考え方が違います。", "vi": "Tùy vào mỗi người mà cách suy nghĩ khác nhau."}
                ]
            },
            {
                "id": "n3_003",
                "title": "～ということは",
                "description": "Định nghĩa/Giải thích: Cái việc mà...",
                "jlpt_level": "N3",
                "examples": [
                    {"jp": "生きるということは大変なことです。", "vi": "Sống là một việc vất vả."},
                    {"jp": "彼が来ないということは、何かあったのかもしれない。", "vi": "Việc anh ấy không đến có nghĩa là có lẽ đã có chuyện gì đó."}
                ]
            },
            {
                "id": "n3_004",
                "title": "～とおり（に）",
                "description": "Làm theo, đúng như: Theo như...",
                "jlpt_level": "N3",
                "examples": [
                    {"jp": "私が言ったとおりに書いてください。", "vi": "Hãy viết theo như tôi đã nói."},
                    {"jp": "予想どおりの結果になった。", "vi": "Kết quả đúng như dự đoán."}
                ]
            },
            {
                "id": "n3_005",
                "title": "～ばかり",
                "description": "Toàn là/Chỉ: Toàn làm gì...",
                "jlpt_level": "N3",
                "examples": [
                    {"jp": "彼は遊んでばかりいる。", "vi": "Anh ta toàn chơi thôi."},
                    {"jp": "甘いものばかり食べると太りますよ。", "vi": "Ăn toàn đồ ngọt thì sẽ béo đấy."}
                ]
            }
        ],
        "N2": [
            {
                "id": "n2_001",
                "title": "～ざるを得ない",
                "description": "Buộc phải làm: Đành phải..., không thể không...",
                "jlpt_level": "N2",
                "examples": [
                    {"jp": "嫌な仕事だが、生活のためには続けざるを得ない。", "vi": "Dù là công việc đáng ghét nhưng vì cuộc sống nên đành phải tiếp tục."},
                    {"jp": "彼の意見には反対せざるを得ない。", "vi": "Tôi buộc phải phản đối ý kiến của anh ấy."}
                ]
            },
            {
                "id": "n2_002",
                "title": "～かねない",
                "description": "Lo ngại: Có thể sẽ (kết quả xấu)...",
                "jlpt_level": "N2",
                "examples": [
                    {"jp": "そんなことを言ったら、彼を怒らせかねない。", "vi": "Nếu nói điều đó thì có thể sẽ làm anh ấy nổi giận."},
                    {"jp": "このままでは事故になりかねない。", "vi": "Cứ thế này thì có thể sẽ xảy ra tai nạn."}
                ]
            },
            {
                "id": "n2_003",
                "title": "～に際して",
                "description": "Khi/Nhân dịp: Khi làm gì đó (trang trọng)...",
                "jlpt_level": "N2",
                "examples": [
                    {"jp": "申し込みに際して、写真が必要です。", "vi": "Khi đăng ký cần có ảnh."},
                    {"jp": "卒業に際して、先生に感謝の言葉を述べた。", "vi": "Nhân dịp tốt nghiệp, tôi đã nói lời cảm ơn thầy cô."}
                ]
            },
            {
                "id": "n2_004",
                "title": "～つつある",
                "description": "Dần dần đang: Đang dần thay đổi...",
                "jlpt_level": "N2",
                "examples": [
                    {"jp": "景気は回復しつつある。", "vi": "Tình hình kinh tế đang dần hồi phục."},
                    {"jp": "事態は改善しつつある。", "vi": "Tình hình đang dần được cải thiện."}
                ]
            },
            {
                "id": "n2_005",
                "title": "～てたまらない",
                "description": "Không chịu được/Rất: ... ơi là ...",
                "jlpt_level": "N2",
                "examples": [
                    {"jp": "暑くてたまらない。", "vi": "Nóng không chịu được."},
                    {"jp": "彼に会いたくてたまらない。", "vi": "Tôi muốn gặp anh ấy chết đi được."}
                ]
            }
        ],
        "N1": [
            {
                "id": "n1_001",
                "title": "～ごとき／ごとく",
                "description": "Giống như/Như là (So sánh, ví von, hoặc hạ thấp)",
                "jlpt_level": "N1",
                "examples": [
                    {"jp": "私ごときが意見を言う資格はない。", "vi": "Kẻ như tôi thì không có tư cách nói ý kiến."},
                    {"jp": "光陰矢のごとし。", "vi": "Thời gian thấm thoắt thoi đưa (như tên bay)."}
                ]
            },
            {
                "id": "n1_002",
                "title": "～ずにはいられない",
                "description": "Không thể không/Không kìm được...",
                "jlpt_level": "N1",
                "examples": [
                    {"jp": "彼の話を聞いて、笑わずにはいられなかった。", "vi": "Nghe câu chuyện của anh ấy, tôi không thể nhịn cười được."},
                    {"jp": "その光景を見て、泣かずにはいられなかった。", "vi": "Nhìn cảnh tượng đó, tôi không thể kìm được nước mắt."}
                ]
            },
            {
                "id": "n1_003",
                "title": "～べく",
                "description": "Để/Vì mục đích (Văn viết trang trọng)",
                "jlpt_level": "N1",
                "examples": [
                    {"jp": "彼は医師になるべく、猛勉強している。", "vi": "Anh ấy đang học rất chăm chỉ để trở thành bác sĩ."},
                    {"jp": "平和を実現すべく、努力を続ける。", "vi": "Tiếp tục nỗ lực để thực hiện hòa bình."}
                ]
            },
            {
                "id": "n1_004",
                "title": "～んがため（に）",
                "description": "Để/Vì mục đích lớn lao...",
                "jlpt_level": "N1",
                "examples": [
                    {"jp": "真相を知らんがため、彼は調査を続けた。", "vi": "Để biết được chân tướng, anh ấy đã tiếp tục điều tra."},
                    {"jp": "生きんがために働く。", "vi": "Làm việc để sống."}
                ]
            },
            {
                "id": "n1_005",
                "title": "～をもって",
                "description": "Bằng/Bởi/Vào lúc (Trang trọng)",
                "jlpt_level": "N1",
                "examples": [
                    {"jp": "本日の営業は午後５時をもって終了いたします。", "vi": "Giờ kinh doanh hôm nay xin được kết thúc vào lúc 5 giờ chiều."},
                    {"jp": "書面をもって通知する。", "vi": "Thông báo bằng văn bản."}
                ]
            }
        ]
    }

    base_path = r"d:\học tiếng nhật\public\data\grammar"
    if not os.path.exists(base_path):
        os.makedirs(base_path)

    for level, items in grammar_data.items():
        file_path = os.path.join(base_path, f"{level.lower()}.json")
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=4)
        print(f"Created {file_path} with {len(items)} items.")

if __name__ == "__main__":
    create_grammar_files()

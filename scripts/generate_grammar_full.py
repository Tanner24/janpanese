import os

# Define grammar templates for each level
# Each level is a list of dictionary: {id, title, desc, form, cat, note, ex: [{jp, vi}]}

grammar_data = {
    "n4": [
        {"t": "～そうです (Nghe nói)", "d": "Truyền đạt lại thông tin nghe được.", "f": "V (thể thường) + そうです", "c": "Truyền đạt", "n": "Khác với 'có vẻ' (V bỏ mas + そう).", "ex": [{"j": "明日雨が降るそうです。", "v": "Nghe nói mai trời mưa."}, {"j": "彼は来ないそうです。", "v": "Nghe nói anh ấy không đến."}]},
        {"t": "～てしまいます", "d": "1. Hoàn thành xong việc gì đó.\n2. Lỡ làm gì đó (hối tiếc).", "f": "Vて + しまいます", "c": "Hoàn thành/Hối tiếc", "n": "Văn nói thường dùng '～ちゃう'.", "ex": [{"j": "宿題をしてしまいました。", "v": "Tôi đã làm xong bài tập."}, {"j": "財布を忘れてしまいました。", "v": "Tôi lỡ quên ví mất rồi."}]},
        {"t": "～他（ほか）ない", "d": "Không còn cách nào khác.", "f": "Vる + 他ない", "c": "Bắt buộc", "n": "Văn viết trang trọng dùng '～ざるを得ない'.", "ex": [{"j": "諦める他ない。", "v": "Chẳng còn cách nào khác ngoài từ bỏ."}, {"j": "歩く他ありません。", "v": "Chỉ còn cách đi bộ thôi."}]},
        {"t": "～かもしれません", "d": "Có lẽ, không biết chừng (xác suất thấp ~50%).", "f": "V/A/N (thể thường) + かもしれません", "c": "Phỏng đoán", "n": "Văn nói: かも.", "ex": [{"j": "明日は雨かもしれません。", "v": "Ngày mai có thể sẽ mưa."}, {"j": "彼は病気かもしれません。", "v": "Có lẽ anh ấy bị ốm."}]},
        {"t": "～たらどうですか", "d": "Thử làm gì đó xem sao (Lời khuyên).", "f": "Vた + らどうですか", "c": "Lời khuyên", "n": "", "ex": [{"j": "薬を飲んだらどうですか。", "v": "Bạn thử uống thuốc xem sao?"}, {"j": "先生に聞いたらどうですか。", "v": "Thử hỏi thầy giáo xem?"}]},
        {"t": "～ようにする", "d": "Cố gắng làm gì đó (thói quen).", "f": "Vる/Vない + ようにする", "c": "Cố gắng", "n": "", "ex": [{"j": "毎日野菜を食べるようにしています。", "v": "Tôi cố gắng ăn rau mỗi ngày."}, {"j": "遅刻しないようにしてください。", "v": "Hãy cố gắng đừng đi trễ."}]},
        {"t": "～ば～ほど", "d": "Càng... càng...", "f": "Vば + Vる + ほど", "c": "Mức độ", "n": "", "ex": [{"j": "勉強すればするほど難しくなります。", "v": "Càng học càng thấy khó."}, {"j": "新しい車であればあるほど高いです。", "v": "Xe càng mới càng đắt."}]},
        {"t": "～なら", "d": "Nếu là... (tiếp nhận chủ đề và đưa ra lời khuyên).", "f": "N + なら", "c": "Điều kiện", "n": "", "ex": [{"j": "パソコンなら、この店がいいですよ。", "v": "Nếu là máy tính thì cửa hàng này tốt đấy."}, {"j": "日本へ行くなら、秋がいいです。", "v": "Nếu đi Nhật thì mùa thu là đẹp nhất."}]},
        {"t": "～ところです", "d": "Đúng lúc... (sắp/đang/vừa mới).", "f": "Vる/Vている/Vた + ところです", "c": "Thời điểm", "n": "", "ex": [{"j": "今から食べるところです。", "v": "Bây giờ tôi chuẩn bị ăn."}, {"j": "今食べているところです。", "v": "Bây giờ tôi đang ăn."}]},
        {"t": "～はずです", "d": "Chắc chắn là... (phán đoán có căn cứ).", "f": "V/A (thể thường) + はずです", "c": "Phán đoán", "n": "", "ex": [{"j": "彼は今日来るはずです。", "v": "Chắc chắn hôm nay anh ấy sẽ đến."}, {"j": "そんなはずはありません。", "v": "Không thể có chuyện đó được."}]},
        {"t": "～し～し", "d": "Vừa... vừa... (liệt kê lý do).", "f": "Thể thường + し", "c": "Liệt kê", "n": "", "ex": [{"j": "彼はハンサムだし、親切だし、人気があります。", "v": "Anh ấy vừa đẹp trai, vừa tốt bụng nên rất được yêu thích."}, {"j": "雨も降っているし、帰りましょう。", "v": "Trời cũng đang mưa, về thôi."}]},
        {"t": "～てみる", "d": "Thử làm gì đó.", "f": "Vて + みます", "c": "Thử nghiệm", "n": "", "ex": [{"j": "この服を着てみます。", "v": "Tôi sẽ mặc thử cái áo này."}, {"j": "納豆を食べてみました。", "v": "Tôi đã ăn thử Natto."}]},
        {"t": "～やすい／にくい", "d": "Dễ/Khó làm gì đó.", "f": "Vます(bỏ ます) + やすい／にくい", "c": "Tính chất", "n": "", "ex": [{"j": "この漢字は書きにくいです。", "v": "Chữ Kanji này khó viết."}, {"j": "このペンは書きやすいです。", "v": "Cây bút này dễ viết."}]},
        {"t": "～すぎます", "d": "Quá... (mức độ tiêu cực).", "f": "Vます(bỏ ます)/A(bỏ い/な) + すぎます", "c": "Mức độ", "n": "", "ex": [{"j": "食べすぎました。", "v": "Tôi đã ăn quá nhiều."}, {"j": "この服は大きすぎます。", "v": "Cái áo này quá to."}]},
        {"t": "～お～ください", "d": "Xin hãy... (Kính ngữ của てください).", "f": "お + Vます(bỏ ます) + ください", "c": "Kính ngữ", "n": "", "ex": [{"j": "少々お待ちください。", "v": "Xin vui lòng đợi một chút."}, {"j": "お入りください。", "v": "Xin mời vào."}]},
    ],
    "n3": [
        {"t": "～うちに", "d": "Trong lúc... (tranh thủ làm gì đó).", "f": "Vる/Vない/Aい/Aな/Nの + うちに", "c": "Thời gian", "n": "Vế sau là hành động có ý chí.", "ex": [{"j": "若いうちに勉強したほうがいいです。", "v": "Nên học khi còn trẻ."}, {"j": "雨が降らないうちに帰りましょう。", "v": "Hãy về trong lúc trời chưa mưa."}]},
        {"t": "～おかげで", "d": "Nhờ có... (kết quả tốt).", "f": "V/A/N (thể bổ nghĩa) + おかげで", "c": "Nguyên nhân", "n": "Nếu kết quả xấu dùng 'せいで'.", "ex": [{"j": "先生のおかげで合格しました。", "v": "Nhờ có thầy mà em đã đỗ."}, {"j": "天気がいいおかげで、旅行が楽しかったです。", "v": "Nhờ trời đẹp nên chuyến du lịch rất vui."}]},
        {"t": "～に対して", "d": "Đối với... / Trái ngược với...", "f": "N + に対して", "c": "Đối tượng/So sánh", "n": "", "ex": [{"j": "目上の人に対して敬語を使います。", "v": "Dùng kính ngữ đối với người bề trên."}, {"j": "兄は活発なのに対して、弟はおとなしい。", "v": "Trái với người anh hoạt bát, người em lại trầm tính."}]},
        {"t": "～とおりに", "d": "Theo như... / Đúng như...", "f": "Vる/Vた/Nの + とおりに", "c": "Tương đồng", "n": "", "ex": [{"j": "私が言うとおりに書いてください。", "v": "Hãy viết đúng như tôi nói."}, {"j": "計画のとおりに進めてください。", "v": "Hãy tiến hành theo kế hoạch."}]},
        {"t": "～について", "d": "Về vấn đề...", "f": "N + について", "c": "Chủ đề", "n": "", "ex": [{"j": "日本の文化について調べました。", "v": "Tôi đã tìm hiểu về văn hóa Nhật Bản."}, {"j": "将来について考えています。", "v": "Tôi đang suy nghĩ về tương lai."}]},
        {"t": "～たばかり", "d": "Vừa mới làm gì xong.", "f": "Vた + ばかり", "c": "Thời gian", "n": "Cảm giác chủ quan của người nói (có thể đã lâu).", "ex": [{"j": "食べたばかりですから、お腹がいっぱいです。", "v": "Vì vừa mới ăn xong nên tôi no rồi."}, {"j": "日本に来たばかりです。", "v": "Tôi vừa mới đến Nhật."}]},
        {"t": "～際（に）", "d": "Khi... (Trang trọng hơn とき).", "f": "Vる/Vた/Nの + 際（に）", "c": "Thời gian", "n": "Dùng trong thông báo, văn bản.", "ex": [{"j": "ご利用のっ際は、こちらのボタンを押してください。", "v": "Khi sử dụng vui lòng nhấn nút này."}, {"j": "お帰りの際は、忘れ物にご注意ください。", "v": "Khi về xin hãy chú ý đừng bỏ quên đồ."}]},
        {"t": "～たびに", "d": "Mỗi lần... lại...", "f": "Vる/Nの + たびに", "c": "Tần suất", "n": "", "ex": [{"j": "この曲を聞くたびに、故郷を思い出します。", "v": "Mỗi lần nghe khúc nhạc này tôi lại nhớ quê."}, {"j": "会うたびに綺麗になりますね。", "v": "Mỗi lần gặp bạn lại xinh đẹp hơn nhỉ."}]},
        {"t": "～にかけては", "d": "Riêng về mặt... thì (là nhất).", "f": "N + にかけては", "c": "Đánh giá", "n": "Thường mang ý khen ngợi.", "ex": [{"j": "足の速さにかけては、彼に勝てる人はいません。", "v": "Về chạy nhanh thì không ai thắng được anh ấy."}, {"j": "値段の安さにかけては、この店が一番です。", "v": "Về độ rẻ thì cửa hàng này là nhất."}]},
        {"t": "～とは限らない", "d": "Chưa chắc đã... / Không hẳn là...", "f": "Thể thường + とは限らない", "c": "Phủ định một phần", "n": "", "ex": [{"j": "高いものがいいとは限らない。", "v": "Đồ đắt tiền chưa chắc đã tốt."}, {"j": "日本人だからといって、漢字が書けるとは限らない。", "v": "Dù là người Nhật nhưng chưa chắc đã viết được Kanji."}]},
    ],
    "n2": [
        {"t": "～ざるを得ない", "d": "Đành phải... / Buộc phải...", "f": "Vない(bỏ ない) + ざるを得ない", "c": "Bắt buộc", "n": "する -> せざるを得ない", "ex": [{"j": "嫌な仕事でも、生活のためには続けざるを得ない。", "v": "Dù công việc đáng ghét nhưng vì cuộc sống nên đành phải tiếp tục."}, {"j": "嘘と言わざるを得ない。", "v": "Buộc phải nói đó là nói dối."}]},
        {"t": "～に際して", "d": "Nhân dịp... / Khi bắt đầu...", "f": "N/Vる + に際して", "c": "Thời gian/Sự kiện", "n": "Trang trọng, dùng cho sự kiện đặc biệt.", "ex": [{"j": "開会に際して、一言ご挨拶申し上げます。", "v": "Nhân dịp khai mạc, tôi xin có đôi lời phát biểu."}, {"j": "受験に際しての注意。", "v": "Lưu ý khi dự thi."}]},
        {"t": "～つつある", "d": "Đang dần dần...", "f": "Vます(bỏ ます) + つつある", "c": "Tiến triển", "n": "Văn viết, trang trọng hơn ていく.", "ex": [{"j": "事態は改善しつつある。", "v": "Tình hình đang dần được cải thiện."}, {"j": "新しい文化が生まれつつある。", "v": "Một nền văn hóa mới đang dần được hình thành."}]},
        {"t": "～こそ", "d": "Chính là... (Nhấn mạnh).", "f": "N + こそ", "c": "Nhấn mạnh", "n": "", "ex": [{"j": "今年こそ合格したい。", "v": "Chính năm nay tôi muốn đỗ."}, {"j": "あなたこそ間違っています。", "v": "Chính bạn mới là người sai."}]},
        {"t": "～っぽい", "d": "Có vẻ... / Mang tính...", "f": "N/Vます/Aい + っぽい", "c": "Tính chất", "n": "Thường mang nghĩa tiêu cực (trẻ con, rẻ tiền...).", "ex": [{"j": "彼は子供っぽいですね。", "v": "Anh ấy tính trẻ con nhỉ."}, {"j": "この服は安っぽい。", "v": "Cái áo này trông rẻ tiền."}]},
        {"t": "～わけがない", "d": "Tuyệt đối không... / Chả có lý nào...", "f": "Thể thường + わけがない", "c": "Phủ định mạnh", "n": "", "ex": [{"j": "彼が犯人のわけがない。", "v": "Không lý nào anh ấy là thủ phạm."}, {"j": "そんなこと、できるわけがない。", "v": "Việc đó tuyệt đối không thể làm được."}]},
        {"t": "～かねる", "d": "Khó có thể... / Không thể...", "f": "Vます(bỏ ます) + かねる", "c": "Từ chối lịch sự", "n": "Dùng từ chối khéo.", "ex": [{"j": "その件についてはお答えしかねます。", "v": "Về vụ việc này tôi khó có thể trả lời được."}, {"j": "見るに見かねて手伝った。", "v": "Không thể đứng nhìn được nữa nên tôi đã giúp."}]},
    ],
    "n1": [
        {"t": "～なり", "d": "Vừa mới... thì đã...", "f": "Vる + なり", "c": "Thời gian", "n": "Hành động bất ngờ của ngôi thứ 3.", "ex": [{"j": "彼は部屋に入るなり、大声で叫んだ。", "v": "Anh ta vừa bước vào phòng đã hét lớn."}, {"j": "私の顔を見るなり、泣き出した。", "v": "Vừa nhìn thấy mặt tôi, nó đã khóc òa lên."}]},
        {"t": "～ごとき", "d": "Như là... / Cỡ như...", "f": "N + ごとき", "c": "So sánh/Hạ thấp", "n": "Văn cổ/trang trọng hoặc khinh miệt.", "ex": [{"j": "私ごときが意見を言うのは失礼ですが...", "v": "Kẻ hèn mọn như tôi mà đưa ra ý kiến thì thất lễ, nhưng..."}, {"j": "お前ごときに負けるものか。", "v": "Tao mà lại thua loại như mày sao?"}]},
        {"t": "～めく", "d": "Có vẻ... / Đậm chất...", "f": "N + めく", "c": "Cảm giác", "n": "", "ex": [{"j": "春めいてきましたね。", "v": "Trời đã bắt đầu mang hơi hướng mùa xuân rồi nhỉ."}, {"j": "謎めいた微笑み。", "v": "Nụ cười đầy bí ẩn."}]},
        {"t": "～といったらない", "d": "Hết chỗ nói / Không kể xiết (Cực kỳ).", "f": "Aい/N + といったらない", "c": "Mức độ cực đại", "n": "", "ex": [{"j": "その美しさといったらなかった。", "v": "Vẻ đẹp đó không lời nào tả xiết."}, {"j": "腹立たしいといったらありゃしない。", "v": "Tức không chịu được."}]},
        {"t": "～ずにはいられない", "d": "Không thể không... / Buộc phải...", "f": "Vない(bỏ ない) + ずにはいられない", "c": "Cảm xúc tự nhiên", "n": "Cảm xúc trào dâng không kìm nén được.", "ex": [{"j": "おかしくて、笑わずにはいられなかった。", "v": "Buồn cười quá nên tôi không thể không cười."}, {"j": "その話を聞いて、泣かずにはいられなかった。", "v": "Nghe câu chuyện đó tôi không cầm được nước mắt."}]},
    ]
}

def generate_typescript_files():
    base_path = r"d:\học tiếng nhật\src\data\grammar"
    if not os.path.exists(base_path):
        os.makedirs(base_path)

    for level, items in grammar_data.items():
        filename = f"grammar_{level}.ts"
        filepath = os.path.join(base_path, filename)
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write('import { Grammar } from "@/types/grammar";\n\n')
            f.write(f'export const grammar_{level}: Grammar[] = [\n')
            
            for i, item in enumerate(items):
                grammar_id = f"{level}_{str(i+1).zfill(3)}"
                f.write('    {\n')
                f.write(f'        id: "{grammar_id}",\n')
                f.write(f'        title: "{item["t"]}",\n')
                f.write(f'        description: "{item["d"]}",\n')
                f.write(f'        jlpt_level: "{level.upper()}",\n')
                f.write(f'        formation: "{item["f"]}",\n')
                f.write(f'        category: "{item["c"]}",\n')
                if item["n"]:
                    f.write(f'        note: "{item["n"]}",\n')
                
                f.write('        examples: [\n')
                for ex in item["ex"]:
                    f.write(f'            {{ jp: "{ex["j"]}", vi: "{ex["v"]}" }},\n')
                f.write('        ]\n')
                f.write('    },\n')
            
            f.write('];\n')
        print(f"✅ Generated {filename} with {len(items)} items.")

if __name__ == "__main__":
    generate_typescript_files()

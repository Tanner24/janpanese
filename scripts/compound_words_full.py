import json

# Comprehensive compound words data for ALL N3 Kanji (Part 1/3)
COMPOUND_WORDS = {
    # Already added
    "政": [{"word": "政治", "reading": "せいじ", "meaning_vi": "chính trị"}, {"word": "政府", "reading": "せいふ", "meaning_vi": "chính phủ"}, {"word": "行政", "reading": "ぎょうせい", "meaning_vi": "hành chính"}],
    "議": [{"word": "会議", "reading": "かいぎ", "meaning_vi": "hội nghị"}, {"word": "議論", "reading": "ぎろん", "meaning_vi": "thảo luận"}, {"word": "議員", "reading": "ぎいん", "meaning_vi": "nghị viên"}],
    "民": [{"word": "国民", "reading": "こくみん", "meaning_vi": "quốc dân"}, {"word": "市民", "reading": "しみん", "meaning_vi": "công dân"}, {"word": "民間", "reading": "みんかん", "meaning_vi": "dân gian"}],
    "連": [{"word": "連絡", "reading": "れんらく", "meaning_vi": "liên lạc"}, {"word": "連続", "reading": "れんぞく", "meaning_vi": "liên tục"}, {"word": "関連", "reading": "かんれん", "meaning_vi": "liên quan"}],
    "対": [{"word": "対応", "reading": "たいおう", "meaning_vi": "ứng đối"}, {"word": "対象", "reading": "たいしょう", "meaning_vi": "đối tượng"}, {"word": "反対", "reading": "はんたい", "meaning_vi": "phản đối"}],
    "部": [{"word": "部屋", "reading": "へや", "meaning_vi": "phòng"}, {"word": "部分", "reading": "ぶぶん", "meaning_vi": "bộ phận"}, {"word": "全部", "reading": "ぜんぶ", "meaning_vi": "toàn bộ"}],
    "合": [{"word": "合計", "reading": "ごうけい", "meaning_vi": "tổng cộng"}, {"word": "都合", "reading": "つごう", "meaning_vi": "sự thuận tiện"}, {"word": "場合", "reading": "ばあい", "meaning_vi": "trường hợp"}],
    "市": [{"word": "市場", "reading": "しじょう", "meaning_vi": "thị trường"}, {"word": "都市", "reading": "とし", "meaning_vi": "đô thị"}, {"word": "市民", "reading": "しみん", "meaning_vi": "thị dân"}],
    "内": [{"word": "以内", "reading": "いない", "meaning_vi": "trong vòng"}, {"word": "国内", "reading": "こくない", "meaning_vi": "trong nước"}, {"word": "案内", "reading": "あんない", "meaning_vi": "hướng dẫn"}],
    "相": [{"word": "相談", "reading": "そうだん", "meaning_vi": "tư vấn"}, {"word": "首相", "reading": "しゅしょう", "meaning_vi": "thủ tướng"}, {"word": "相手", "reading": "あいて", "meaning_vi": "đối phương"}],
    "定": [{"word": "決定", "reading": "けってい", "meaning_vi": "quyết định"}, {"word": "予定", "reading": "よてい", "meaning_vi": "dự định"}, {"word": "定期", "reading": "ていき", "meaning_vi": "định kỳ"}],
    "回": [{"word": "回答", "reading": "かいとう", "meaning_vi": "trả lời"}, {"word": "今回", "reading": "こんかい", "meaning_vi": "lần này"}, {"word": "回復", "reading": "かいふく", "meaning_vi": "hồi phục"}],
    "選": [{"word": "選択", "reading": "せんたく", "meaning_vi": "lựa chọn"}, {"word": "選手", "reading": "せんしゅ", "meaning_vi": "tuyển thủ"}, {"word": "当選", "reading": "とうせん", "meaning_vi": "đắc cử"}],
    "米": [{"word": "米国", "reading": "べいこく", "meaning_vi": "Mỹ"}, {"word": "白米", "reading": "はくまい", "meaning_vi": "gạo trắng"}, {"word": "新米", "reading": "しんまい", "meaning_vi": "người mới"}],
    "実": [{"word": "実際", "reading": "じっさい", "meaning_vi": "thực tế"}, {"word": "現実", "reading": "げんじつ", "meaning_vi": "hiện thực"}, {"word": "実験", "reading": "じっけん", "meaning_vi": "thí nghiệm"}],
    "関": [{"word": "関係", "reading": "かんけい", "meaning_vi": "quan hệ"}, {"word": "関連", "reading": "かんれん", "meaning_vi": "liên quan"}, {"word": "関心", "reading": "かんしん", "meaning_vi": "quan tâm"}],
    "決": [{"word": "決定", "reading": "けってい", "meaning_vi": "quyết định"}, {"word": "決心", "reading": "けっしん", "meaning_vi": "quyết tâm"}, {"word": "解決", "reading": "かいけつ", "meaning_vi": "giải quyết"}],
    "全": [{"word": "全部", "reading": "ぜんぶ", "meaning_vi": "toàn bộ"}, {"word": "全体", "reading": "ぜんたい", "meaning_vi": "toàn thể"}, {"word": "安全", "reading": "あんぜん", "meaning_vi": "an toàn"}],
    "表": [{"word": "表現", "reading": "ひょうげん", "meaning_vi": "biểu hiện"}, {"word": "発表", "reading": "はっぴょう", "meaning_vi": "phát biểu"}, {"word": "代表", "reading": "だいひょう", "meaning_vi": "đại diện"}],
    "戦": [{"word": "戦争", "reading": "せんそう", "meaning_vi": "chiến tranh"}, {"word": "挑戦", "reading": "ちょうせん", "meaning_vi": "thách thức"}, {"word": "戦術", "reading": "せんじゅつ", "meaning_vi": "chiến thuật"}],
    "最": [{"word": "最初", "reading": "さいしょ", "meaning_vi": "đầu tiên"}, {"word": "最後", "reading": "さいご", "meaning_vi": "cuối cùng"}, {"word": "最近", "reading": "さいきん", "meaning_vi": "gần đây"}],
    "愛": [{"word": "愛情", "reading": "あいじょう", "meaning_vi": "tình yêu"}, {"word": "恋愛", "reading": "れんあい", "meaning_vi": "tình yêu lãng mạn"}, {"word": "愛する", "reading": "あいする", "meaning_vi": "yêu"}],
    "情": [{"word": "感情", "reading": "かんじょう", "meaning_vi": "cảm xúc"}, {"word": "情報", "reading": "じょうほう", "meaning_vi": "thông tin"}, {"word": "事情", "reading": "じじょう", "meaning_vi": "tình hình"}],
    "信": [{"word": "自信", "reading": "じしん", "meaning_vi": "tự tin"}, {"word": "信用", "reading": "しんよう", "meaning_vi": "tín dụng"}, {"word": "通信", "reading": "つうしん", "meaning_vi": "thông tin"}],
    "経": [{"word": "経験", "reading": "けいけん", "meaning_vi": "kinh nghiệm"}, {"word": "経済", "reading": "けいざい", "meaning_vi": "kinh tế"}, {"word": "経営", "reading": "けいえい", "meaning_vi": "kinh doanh"}],
    "苦": [{"word": "苦しい", "reading": "くるしい", "meaning_vi": "đau khổ"}, {"word": "苦労", "reading": "くろう", "meaning_vi": "vất vả"}, {"word": "苦手", "reading": "にがて", "meaning_vi": "không giỏi"}],
    "労": [{"word": "労働", "reading": "ろうどう", "meaning_vi": "lao động"}, {"word": "苦労", "reading": "くろう", "meaning_vi": "vất vả"}, {"word": "疲労", "reading": "ひろう", "meaning_vi": "mệt mỏi"}],
    "助": [{"word": "助ける", "reading": "たすける", "meaning_vi": "giúp đỡ"}, {"word": "助手", "reading": "じょしゅ", "meaning_vi": "trợ thủ"}, {"word": "援助", "reading": "えんじょ", "meaning_vi": "viện trợ"}],
    "喜": [{"word": "喜ぶ", "reading": "よろこぶ", "meaning_vi": "vui mừng"}, {"word": "喜び", "reading": "よろこび", "meaning_vi": "niềm vui"}, {"word": "歓喜", "reading": "かんき", "meaning_vi": "hoan hỉ"}],
    "悲": [{"word": "悲しい", "reading": "かなしい", "meaning_vi": "buồn"}, {"word": "悲劇", "reading": "ひげき", "meaning_vi": "bi kịch"}, {"word": "悲鳴", "reading": "ひめい", "meaning_vi": "tiếng kêu"}],
    "怒": [{"word": "怒る", "reading": "おこる", "meaning_vi": "tức giận"}, {"word": "怒り", "reading": "いかり", "meaning_vi": "sự tức giận"}, {"word": "激怒", "reading": "げきど", "meaning_vi": "nổi giận"}],
    "路": [{"word": "道路", "reading": "どうろ", "meaning_vi": "đường xá"}, {"word": "線路", "reading": "せんろ", "meaning_vi": "đường ray"}, {"word": "通路", "reading": "つうろ", "meaning_vi": "lối đi"}],
    "産": [{"word": "生産", "reading": "せいさん", "meaning_vi": "sản xuất"}, {"word": "財産", "reading": "ざいさん", "meaning_vi": "tài sản"}, {"word": "出産", "reading": "しゅっさん", "meaning_vi": "sinh con"}],
    "術": [{"word": "技術", "reading": "ぎじゅつ", "meaning_vi": "kỹ thuật"}, {"word": "芸術", "reading": "げいじゅつ", "meaning_vi": "nghệ thuật"}, {"word": "手術", "reading": "しゅじゅつ", "meaning_vi": "phẫu thuật"}],
    "期": [{"word": "時期", "reading": "じき", "meaning_vi": "thời kỳ"}, {"word": "期間", "reading": "きかん", "meaning_vi": "khoảng thời gian"}, {"word": "学期", "reading": "がっき", "meaning_vi": "học kỳ"}],
    "保": [{"word": "保護", "reading": "ほご", "meaning_vi": "bảo vệ"}, {"word": "保険", "reading": "ほけん", "meaning_vi": "bảo hiểm"}, {"word": "保存", "reading": "ほぞん", "meaning_vi": "bảo quản"}],
    "防": [{"word": "防止", "reading": "ぼうし", "meaning_vi": "ngăn chặn"}, {"word": "予防", "reading": "よぼう", "meaning_vi": "phòng ngừa"}, {"word": "防衛", "reading": "ぼうえい", "meaning_vi": "phòng vệ"}],
    "署": [{"word": "警察署", "reading": "けいさつしょ", "meaning_vi": "đồn cảnh sát"}, {"word": "消防署", "reading": "しょうぼうしょ", "meaning_vi": "trạm cứu hỏa"}, {"word": "署名", "reading": "しょめい", "meaning_vi": "chữ ký"}],
    "予": [{"word": "予定", "reading": "よてい", "meaning_vi": "dự định"}, {"word": "予約", "reading": "よやく", "meaning_vi": "đặt trước"}, {"word": "予想", "reading": "よそう", "meaning_vi": "dự đoán"}],
    "変": [{"word": "変化", "reading": "へんか", "meaning_vi": "thay đổi"}, {"word": "大変", "reading": "たいへん", "meaning_vi": "vất vả"}, {"word": "変更", "reading": "へんこう", "meaning_vi": "thay đổi"}],
    "式": [{"word": "方式", "reading": "ほうしき", "meaning_vi": "phương thức"}, {"word": "形式", "reading": "けいしき", "meaning_vi": "hình thức"}, {"word": "結婚式", "reading": "けっこんしき", "meaning_vi": "lễ cưới"}],
    "置": [{"word": "位置", "reading": "いち", "meaning_vi": "vị trí"}, {"word": "配置", "reading": "はいち", "meaning_vi": "sắp xếp"}, {"word": "放置", "reading": "ほうち", "meaning_vi": "bỏ mặc"}],
    "流": [{"word": "流行", "reading": "りゅうこう", "meaning_vi": "thịnh hành"}, {"word": "交流", "reading": "こうりゅう", "meaning_vi": "giao lưu"}, {"word": "流れ", "reading": "ながれ", "meaning_vi": "dòng chảy"}],
    "格": [{"word": "性格", "reading": "せいかく", "meaning_vi": "tính cách"}, {"word": "資格", "reading": "しかく", "meaning_vi": "tư cách"}, {"word": "価格", "reading": "かかく", "meaning_vi": "giá cả"}],
    "疑": [{"word": "疑問", "reading": "ぎもん", "meaning_vi": "nghi vấn"}, {"word": "疑う", "reading": "うたがう", "meaning_vi": "nghi ngờ"}, {"word": "容疑", "reading": "ようぎ", "meaning_vi": "nghi ngờ"}],
    "過": [{"word": "過去", "reading": "かこ", "meaning_vi": "quá khứ"}, {"word": "経過", "reading": "けいか", "meaning_vi": "trải qua"}, {"word": "通過", "reading": "つうか", "meaning_vi": "đi qua"}],
    "局": [{"word": "郵便局", "reading": "ゆうびんきょく", "meaning_vi": "bưu điện"}, {"word": "放送局", "reading": "ほうそうきょく", "meaning_vi": "đài phát thanh"}, {"word": "結局", "reading": "けっきょく", "meaning_vi": "cuối cùng"}],
    "放": [{"word": "放送", "reading": "ほうそう", "meaning_vi": "phát sóng"}, {"word": "解放", "reading": "かいほう", "meaning_vi": "giải phóng"}, {"word": "放題", "reading": "ほうだい", "meaning_vi": "tùy ý"}],
    "常": [{"word": "日常", "reading": "にちじょう", "meaning_vi": "hằng ngày"}, {"word": "非常", "reading": "ひじょう", "meaning_vi": "phi thường"}, {"word": "常識", "reading": "じょうしき", "meaning_vi": "thường thức"}],
    "状": [{"word": "状態", "reading": "じょうたい", "meaning_vi": "trạng thái"}, {"word": "状況", "reading": "じょうきょう", "meaning_vi": "tình huống"}, {"word": "現状", "reading": "げんじょう", "meaning_vi": "hiện trạng"}],
     "球": [{"word": "地球", "reading": "ちきゅう", "meaning_vi": "trái đất"}, {"word": "野球", "reading": "やきゅう", "meaning_vi": "bóng chày"}, {"word": "電球", "reading": "でんきゅう", "meaning_vi": "bóng đèn"}],
    "給": [{"word": "給料", "reading": "きゅうりょう", "meaning_vi": "tiền lương"}, {"word": "供給", "reading": "きょうきゅう", "meaning_vi": "cung cấp"}, {"word": "月給", "reading": "げっきゅう", "meaning_vi": "lương tháng"}],
    "共": [{"word": "共通", "reading": "きょうつう", "meaning_vi": "chung"}, {"word": "公共", "reading": "こうきょう", "meaning_vi": "công cộng"}, {"word": "共同", "reading": "きょうどう", "meaning_vi": "cùng nhau"}],
    "解": [{"word": "理解", "reading": "りかい", "meaning_vi": "hiểu"}, {"word": "解決", "reading": "かいけつ", "meaning_vi": "giải quyết"}, {"word": "解説", "reading": "かいせつ", "meaning_vi": "giải thích"}],
    "確": [{"word": "確認", "reading": "かくにん", "meaning_vi": "xác nhận"}, {"word": "正確", "reading": "せいかく", "meaning_vi": "chính xác"}, {"word": "確実", "reading": "かくじつ", "meaning_vi": "chắc chắn"}],
    "演": [{"word": "演奏", "reading": "えんそう", "meaning_vi": "biểu diễn nhạc"}, {"word": "公演", "reading": "こうえん", "meaning_vi": "công diễn"}, {"word": "演説", "reading": "えんぜつ", "meaning_vi": "diễn thuyết"}],
    "師": [{"word": "教師", "reading": "きょうし", "meaning_vi": "giáo viên"}, {"word": "医師", "reading": "いし", "meaning_vi": "bác sĩ"}, {"word": "弁護士", "reading": "べんごし", "meaning_vi": "luật sư"}],
    "像": [{"word": "想像", "reading": "そうぞう", "meaning_vi": "tưởng tượng"}, {"word": "映像", "reading": "えいぞう", "meaning_vi": "hình ảnh"}, {"word": "肖像", "reading": "しょうぞう", "meaning_vi": "chân dung"}],
    "功": [{"word": "成功", "reading": "せいこう", "meaning_vi": "thành công"}, {"word": "功績", "reading": "こうせき", "meaning_vi": "công lao"}, {"word": "効果", "reading": "こうか", "meaning_vi": "hiệu quả"}],
    "殺": [{"word": "殺す", "reading": "ころす", "meaning_vi": "giết"}, {"word": "殺人", "reading": "さつじん", "meaning_vi": "giết người"}, {"word": "自殺", "reading": "じさつ", "meaning_vi": "tự tử"}],
    "毒": [{"word": "毒薬", "reading": "どくやく", "meaning_vi": "thuốc độc"}, {"word": "中毒", "reading": "ちゅうどく", "meaning_vi": "ngộ độc"}, {"word": "有毒", "reading": "ゆうどく", "meaning_vi": "có độc"}],
    "法": [{"word": "方法", "reading": "ほうほう", "meaning_vi": "phương pháp"}, {"word": "法律", "reading": "ほうりつ", "meaning_vi": "pháp luật"}, {"word": "文法", "reading": "ぶんぽう", "meaning_vi": "ngữ pháp"}],
    "律": [{"word": "法律", "reading": "ほうりつ", "meaning_vi": "pháp luật"}, {"word": "規律", "reading": "きりつ", "meaning_vi": "kỷ luật"}, {"word": "自律", "reading": "じりつ", "meaning_vi": "tự giác"}],
    "反": [{"word": "反対", "reading": "はんたい", "meaning_vi": "phản đối"}, {"word": "反省", "reading": "はんせい", "meaning_vi": "phản tỉnh"}, {"word": "違反", "reading": "いはん", "meaning_vi": "vi phạm"}],
    "違": [{"word": "違い", "reading": "ちがい", "meaning_vi": "khác biệt"}, {"word": "間違い", "reading": "まちがい", "meaning_vi": "sai lầm"}, {"word": "違反", "reading": "いはん", "meaning_vi": "vi phạm"}],
}

# Default compound words for kanji without specific data
DEFAULT_COMPOUNDS = [
    {"word": "例示中", "reading": "れいじちゅう", "meaning_vi": "đang cập nhật"}
]

def update_all_kanji():
    # Load existing data
    with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', encoding='utf-8') as f:
        kanji_list = json.load(f)
    
    updated = 0
    added_default = 0
    
    for entry in kanji_list:
        kanji = entry['kanji']
        
        # Skip if already has compound words
        if entry.get('compound_words') and len(entry['compound_words']) > 0:
            continue
            
        # Add specific compound words if available
        if kanji in COMPOUND_WORDS:
            entry['compound_words'] = COMPOUND_WORDS[kanji]
            updated += 1
        else:
            # Add placeholder for remaining kanji
            entry['compound_words'] = []
            added_default += 1
    
    # Save
    with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', 'w', encoding='utf-8') as f:
        json.dump(kanji_list, f, ensure_ascii=False, indent=4)
    
    total_with_compounds = sum(1 for e in kanji_list if e.get('compound_words', []))
    
    print(f'✅ Đã cập nhật {updated} kanji với từ ghép mới')
    print(f'📝 Đã thêm placeholder cho {added_default} kanji')
    print(f'📚 Tổng số kanji có từ ghép: {total_with_compounds}/{len(kanji_list)}')
    print(f'⏳ Còn thiếu: {len(kanji_list) - total_with_compounds} kanji')

if __name__ == "__main__":
    update_all_kanji()

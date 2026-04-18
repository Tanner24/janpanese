import json

# Load existing data
with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', encoding='utf-8') as f:
    kanji_list = json.load(f)

# Additional compound words for remaining kanji
additional_compound_data = {
    "最": [{"word": "最初", "reading": "さいしょ", "meaning_vi": "đầu tiên"}, {"word": "最後", "reading": "さいご", "meaning_vi": "cuối cùng"}, {"word": "最近", "reading": "さいきん", "meaning_vi": "gần đây"}],
    "愛": [{"word": "愛情", "reading": "あいじょう", "meaning_vi": "tình yêu"}, {"word": "恋愛", "reading": "れんあい", "meaning_vi": "tình yêu lãng mạn"}, {"word": "愛する", "reading": "あいする", "meaning_vi": "yêu"}],
    "情": [{"word": "感情", "reading": "かんじょう", "meaning_vi": "cảm xúc"}, {"word": "情報", "reading": "じょうほう", "meaning_vi": "thông tin"}, {"word": "事情", "reading": "じじょう", "meaning_vi": "tình hình"}],
    "信": [{"word": "自信", "reading": "じしん", "meaning_vi": "tự tin"}, {"word": "信用", "reading": "しんよう", "meaning_vi": "tín dụng"}, {"word": "通信", "reading": "つうしん", "meaning_vi": "thông tin"}],
    "経": [{"word": "経験", "reading": "けいけん", "meaning_vi": "kinh nghiệm"}, {"word": "経済", "reading": "けいざい", "meaning_vi": "kinh tế"}, {"word": "経営", "reading": "けいえい", "meaning_vi": "kinh doanh"}],
    "苦": [{"word": "苦しい", "reading": "くるしい", "meaning_vi": "đau khổ"}, {"word": "苦労", "reading": "くろう", "meaning_vi": "vất vả"}, {"word": "苦手", "reading": "にがて", "meaning_vi": "không giỏi"}],
    "労": [{"word": "労働", "reading": "ろうどう", "meaning_vi": "lao động"}, {"word": "苦労", "reading": "くろう", "meaning_vi": "vất vả"}, {"word": "疲労", "reading": "ひろう", "meaning_vi": "mệt mỏi"}],
    "助": [{"word": "助ける", "reading": "たすける", "meaning_vi": "giúp đỡ"}, {"word": "助手", "reading": "じょしゅ", "meaning_vi": "trợ thủ"}, {"word": "援助", "reading": "えんじょ", "meaning_vi": "viện trợ"}],
    "喜": [{"word": "喜ぶ", "reading": "よろこぶ", "meaning_vi": "vui mừng"}, {"word": "喜び", "reading": "よろこび", "meaning_vi": "niềm vui"}, {"word": "歓喜", "reading": "かんき", "meaning_vi": "hoan hỉ"}],
    "悲": [{"word": "悲しい", "reading": "かなしい", "meaning_vi": "buồn"}, {"word": "悲劇", "reading": "ひげき", "meaning_vi": "bi kịch"}, {"word": "悲鳴", "reading": "ひめい", "meaning_vi": "tiếng kêu thảm thiết"}],
    "怒": [{"word": "怒る", "reading": "おこる", "meaning_vi": "tức giận"}, {"word": "怒り", "reading": "いかり", "meaning_vi": "sự tức giận"}, {"word": "激怒", "reading": "げきど", "meaning_vi": "nổi giận"}],
    "路": [{"word": "道路", "reading": "どうろ", "meaning_vi": "đường xá"}, {"word": "線路", "reading": "せんろ", "meaning_vi": "đường ray"}, {"word": "通路", "reading": "つうろ", "meaning_vi": "lối đi"}],
    "産": [{"word": "生産", "reading": "せいさん", "meaning_vi": "sản xuất"}, {"word": "財産", "reading": "ざいさん", "meaning_vi": "tài sản"}, {"word": "出産", "reading": "しゅっさん", "meaning_vi": "sinh con"}],
    "術": [{"word": "技術", "reading": "ぎじゅつ", "meaning_vi": "kỹ thuật"}, {"word": "芸術", "reading": "げいじゅつ", "meaning_vi": "nghệ thuật"}, {"word": "手術", "reading": "しゅじゅつ", "meaning_vi": "phẫu thuật"}],
    "期": [{"word": "時期", "reading": "じき", "meaning_vi": "thời kỳ"}, {"word": "期間", "reading": "きかん", "meaning_vi": "khoảng thời gian"}, {"word": "学期", "reading": "がっき", "meaning_vi": "học kỳ"}],
    "保": [{"word": "保護", "reading": "ほご", "meaning_vi": "bảo vệ"}, {"word": "保険", "reading": "ほけん", "meaning_vi": "bảo hiểm"}, {"word": "保存", "reading": "ほぞん", "meaning_vi": "bảo quản"}],
    "防": [{"word": "防止", "reading": "ぼうし", "meaning_vi": "ngăn chặn"}, {"word": "予防", "reading": "よぼう", "meaning_vi": "phòng ngừa"}, {"word": "防衛", "reading": "ぼうえい", "meaning_vi": "phòng vệ"}],
    "署": [{"word": "警察署", "reading": "けいさつしょ", "meaning_vi": "đồn cảnh sát"}, {"word": "消防署", "reading": "しょうぼうしょ", "meaning_vi": "trạm cứu hỏa"}, {"word": "署名", "reading": "しょめい", "meaning_vi": "chữ ký"}],
    "予": [{"word": "予定", "reading": "よてい", "meaning_vi": "dự định"}, {"word": "予約", "reading": "よやく", "meaning_vi": "đặt trước"}, {"word": "予想", "reading": "よそう", "meaning_vi": "dự đoán"}],
    "変": [{"word": "変化", "reading": "へんか", "meaning_vi": "thay đổi"}, {"word": "大変", "reading": "たいへん", "meaning_vi": "vất vả, lắm"}, {"word": "変更", "reading": "へんこう", "meaning_vi": "thay đổi"}],
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
}

# Add compound words
updated = 0
for entry in kanji_list:
    kanji = entry['kanji']
    if kanji in additional_compound_data and ('compound_words' not in entry or len(entry['compound_words']) == 0):
        entry['compound_words'] = additional_compound_data[kanji]
        updated += 1
    elif 'compound_words' not in entry:
        entry['compound_words'] = []

# Save
with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', 'w', encoding='utf-8') as f:
    json.dump(kanji_list, f, ensure_ascii=False, indent=4)

print(f'✅ Đã thêm ví dụ từ ghép cho {updated} chữ Kanji bổ sung')
print(f'📝 Tổng số: {len(kanji_list)} chữ Kanji N3')

# Count total with compound words
total_with_compounds = sum(1 for e in kanji_list if e.get('compound_words', []))
print(f'📚 Số kanji đã có từ ghép: {total_with_compounds}/{len(kanji_list)}')

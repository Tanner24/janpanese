import json

# Load existing data
with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', encoding='utf-8') as f:
    kanji_list = json.load(f)

# Extended compound words data (Batch 1: First 100 kanji)
compound_data = {
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
    "戦": [{"word": "戦争", "reading": "せんそう", "meaning_vi": "chiến tranh"}, {"word": "挑戦", "reading": "ちょうせん", "meaning_vi": "thách thức"}],
}

# Add compound words
updated = 0
for entry in kanji_list:
    kanji = entry['kanji']
    if kanji in compound_data:
        entry['compound_words'] = compound_data[kanji]
        updated += 1
    elif 'compound_words' not in entry:
        entry['compound_words'] = []

# Save
with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', 'w', encoding='utf-8') as f:
    json.dump(kanji_list, f, ensure_ascii=False, indent=4)

print(f'✅ Đã thêm ví dụ từ ghép cho {updated} chữ Kanji')
print(f'📝 Tổng số: {len(kanji_list)} chữ Kanji N3')

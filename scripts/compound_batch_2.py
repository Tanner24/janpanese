import json

# Extended compound words data - Batch 2
BATCH_2_COMPOUNDS = {
    # Kanji 66-150
    "積": [{"word": "積極的", "reading": "せっきょくてき", "meaning_vi": "tích cực"}, {"word": "面積", "reading": "めんせき", "meaning_vi": "diện tích"}, {"word": "積む", "reading": "つむ", "meaning_vi": "chất đống"}],
    "働": [{"word": "働く", "reading": "はたらく", "meaning_vi": "làm việc"}, {"word": "労働", "reading": "ろうどう", "meaning_vi": "lao động"}, {"word": "働き", "reading": "はたらき", "meaning_vi": "công việc"}],
    "他": [{"word": "他人", "reading": "たにん", "meaning_vi": "người khác"}, {"word": "その他", "reading": "そのた", "meaning_vi": "khác"}, {"word": "他国", "reading": "たこく", "meaning_vi": "nước khác"}],
    "比": [{"word": "比較", "reading": "ひかく", "meaning_vi": "so sánh"}, {"word": "比べる", "reading": "くらべる", "meaning_vi": "so sánh"}, {"word": "対比", "reading": "たいひ", "meaning_vi": "đối chiếu"}],
    "化": [{"word": "文化", "reading": "ぶんか", "meaning_vi": "văn hóa"}, {"word": "変化", "reading": "へんか", "meaning_vi": "thay đổi"}, {"word": "化学", "reading": "かがく", "meaning_vi": "hóa học"}],
    "利": [{"word": "便利", "reading": "べんり", "meaning_vi": "tiện lợi"}, {"word": "利用", "reading": "りよう", "meaning_vi": "sử dụng"}, {"word": "利益", "reading": "りえき", "meaning_vi": "lợi ích"}],
    "得": [{"word": "得る", "reading": "える", "meaning_vi": "có được"}, {"word": "取得", "reading": "しゅとく", "meaning_vi": "thu được"}, {"word": "習得", "reading": "しゅうとく", "meaning_vi": "học được"}],
    "性": [{"word": "性質", "reading": "せいしつ", "meaning_vi": "tính chất"}, {"word": "性格", "reading": "せいかく", "meaning_vi": "tính cách"}, {"word": "女性", "reading": "じょせい", "meaning_vi": "nữ giới"}],
    "速": [{"word": "速い", "reading": "はやい", "meaning_vi": "nhanh"}, {"word": "速度", "reading": "そくど", "meaning_vi": "tốc độ"}, {"word": "高速", "reading": "こうそく", "meaning_vi": "cao tốc"}],
    "度": [{"word": "温度", "reading": "おんど", "meaning_vi": "nhiệt độ"}, {"word": "今度", "reading": "こんど", "meaning_vi": "lần này"}, {"word": "態度", "reading": "たいど", "meaning_vi": "thái độ"}],
    "泳": [{"word": "水泳", "reading": "すいえい", "meaning_vi": "bơi lội"}, {"word": "泳ぐ", "reading": "およぐ", "meaning_vi": "bơi"}, {"word": "背泳", "reading": "はいえい", "meaning_vi": "bơi ngửa"}],
    "洗": [{"word": "洗う", "reading": "あらう", "meaning_vi": "giặt, rửa"}, {"word": "洗濯", "reading": "せんたく", "meaning_vi": "giặt giũ"}, {"word": "洗面", "reading": "せんめん", "meaning_vi": "rửa mặt"}],
    "調": [{"word": "調べる", "reading": "しらべる", "meaning_vi": "điều tra"}, {"word": "調査", "reading": "ちょうさ", "meaning_vi": "khảo sát"}, {"word": "強調", "reading": "きょうちょう", "meaning_vi": "nhấn mạnh"}],
    "查": [{"word": "調査", "reading": "ちょうさ", "meaning_vi": "điều tra"}, {"word": "検査", "reading": "けんさ", "meaning_vi": "kiểm tra"}, {"word": "査定", "reading": "さてい", "meaning_vi": "thẩm định"}],
    "建": [{"word": "建物", "reading": "たてもの", "meaning_vi": "tòa nhà"}, {"word": "建設", "reading": "けんせつ", "meaning_vi": "xây dựng"}, {"word": "建てる", "reading": "たてる", "meaning_vi": "xây"}],
    "設": [{"word": "設備", "reading": "せつび", "meaning_vi": "trang bị"}, {"word": "設定", "reading": "せってい", "meaning_vi": "cài đặt"}, {"word": "建設", "reading": "けんせつ", "meaning_vi": "xây dựng"}],
    "備": [{"word": "準備", "reading": "じゅんび", "meaning_vi": "chuẩn bị"}, {"word": "設備", "reading": "せつび", "meaning_vi": "trang bị"}, {"word": "予備", "reading": "よび", "meaning_vi": "dự bị"}],
    "準": [{"word": "準備", "reading": "じゅんび", "meaning_vi": "chuẩn bị"}, {"word": "基準", "reading": "きじゅん", "meaning_vi": "tiêu chuẩn"}, {"word": "水準", "reading": "すいじゅん", "meaning_vi": "mức độ"}],
    "指": [{"word": "指す", "reading": "さす", "meaning_vi": "chỉ"}, {"word": "指導", "reading": "しどう", "meaning_vi": "chỉ đạo"}, {"word": "指定", "reading": "してい", "meaning_vi": "chỉ định"}],
    "導": [{"word": "指導", "reading": "しどう", "meaning_vi": "hướng dẫn"}, {"word": "導入", "reading": "どうにゅう", "meaning_vi": "đưa vào"}, {"word": "主導", "reading": "しゅどう", "meaning_vi": "lãnh đạo"}],
    "困": [{"word": "困る", "reading": "こまる", "meaning_vi": "khó khăn"}, {"word": "困難", "reading": "こんなん", "meaning_vi": "khó khăn"}, {"word": "貧困", "reading": "ひんこん", "meaning_vi": "nghèo khó"}],
    "難": [{"word": "困難", "reading": "こんなん", "meaning_vi": "khó khăn"}, {"word": "難しい", "reading": "むずかしい", "meaning_vi": "khó"}, {"word": "災難", "reading": "さいなん", "meaning_vi": "tai nạn"}],
    "易": [{"word": "容易", "reading": "ようい", "meaning_vi": "dễ dàng"}, {"word": "易しい", "reading": "やさしい", "meaning_vi": "dễ"}, {"word": "貿易", "reading": "ぼうえき", "meaning_vi": "thương mại"}],
    "満": [{"word": "満足", "reading": "まんぞく", "meaning_vi": "thỏa mãn"}, {"word": "不満", "reading": "ふまん", "meaning_vi": "bất mãn"}, {"word": "満員", "reading": "まんいん", "meaning_vi": "đông đúc"}],
    "危": [{"word": "危険", "reading": "きけん", "meaning_vi": "nguy hiểm"}, {"word": "危ない", "reading": "あぶない", "meaning_vi": "nguy hiểm"}, {"word": "危機", "reading": "きき", "meaning_vi": "khủng hoảng"}],
    "険": [{"word": "危険", "reading": "きけん", "meaning_vi": "nguy hiểm"}, {"word": "保険", "reading": "ほけん", "meaning_vi": "bảo hiểm"}, {"word": "冒険", "reading": "ぼうけん", "meaning_vi": "mạo hiểm"}],
    "機": [{"word": "機会", "reading": "きかい", "meaning_vi": "cơ hội"}, {"word": "飛行機", "reading": "ひこうき", "meaning_vi": "máy bay"}, {"word": "機械", "reading": "きかい", "meaning_vi": "máy móc"}],
    "械": [{"word": "機械", "reading": "きかい", "meaning_vi": "máy móc"}, {"word": "器械", "reading": "きかい", "meaning_vi": "dụng cụ"}, {"word": "機械的", "reading": "きかいてき", "meaning_vi": "máy móc"}],
    "材": [{"word": "材料", "reading": "ざいりょう", "meaning_vi": "nguyên liệu"}, {"word": "教材", "reading": "きょうざい", "meaning_vi": "tài liệu"}, {"word": "木材", "reading": "もくざい", "meaning_vi": "gỗ"}],
    "料": [{"word": "料理", "reading": "りょうり", "meaning_vi": "nấu ăn"}, {"word": "材料", "reading": "ざいりょう", "meaning_vi": "nguyên liệu"}, {"word": "給料", "reading": "きゅうりょう", "meaning_vi": "lương"}],
    "費": [{"word": "費用", "reading": "ひよう", "meaning_vi": "chi phí"}, {"word": "消費", "reading": "しょうひ", "meaning_vi": "tiêu dùng"}, {"word": "学費", "reading": "がくひ", "meaning_vi": "học phí"}],
    "払": [{"word": "払う", "reading": "はらう", "meaning_vi": "trả tiền"}, {"word": "支払い", "reading": "しはらい", "meaning_vi": "thanh toán"}, {"word": "前払い", "reading": "まえばらい", "meaning_vi": "trả trước"}],
    "値": [{"word": "価値", "reading": "かち", "meaning_vi": "giá trị"}, {"word": "値段", "reading": "ねだん", "meaning_vi": "giá cả"}, {"word": "数値", "reading": "すうち", "meaning_vi": "số liệu"}],
    "増": [{"word": "増える", "reading": "ふえる", "meaning_vi": "tăng"}, {"word": "増加", "reading": "ぞうか", "meaning_vi": "gia tăng"}, {"word": "増税", "reading": "ぞうぜい", "meaning_vi": "tăng thuế"}],
    "減": [{"word": "減る", "reading": "へる", "meaning_vi": "giảm"}, {"word": "減少", "reading": "げんしょう", "meaning_vi": "giảm thiểu"}, {"word": "軽減", "reading": "けいげん", "meaning_vi": "giảm nhẹ"}],
    "加": [{"word": "参加", "reading": "さんか", "meaning_vi": "tham gia"}, {"word": "加える", "reading": "くわえる", "meaning_vi": "thêm vào"}, {"word": "追加", "reading": "ついか", "meaning_vi": "bổ sung"}],
    "算": [{"word": "計算", "reading": "けいさん", "meaning_vi": "tính toán"}, {"word": "予算", "reading": "よさん", "meaning_vi": "ngân sách"}, {"word": "算数", "reading": "さんすう", "meaning_vi": "số học"}],
    "数": [{"word": "数字", "reading": "すうじ", "meaning_vi": "con số"}, {"word": "人数", "reading": "にんずう", "meaning_vi": "số người"}, {"word": "数える", "reading": "かぞえる", "meaning_vi": "đếm"}],
    "量": [{"word": "数量", "reading": "すうりょう", "meaning_vi": "số lượng"}, {"word": "重量", "reading": "じゅうりょう", "meaning_vi": "trọng lượng"}, {"word": "大量", "reading": "たいりょう", "meaning_vi": "số lượng lớn"}],
    "判": [{"word": "判断", "reading": "はんだん", "meaning_vi": "phán đoán"}, {"word": "裁判", "reading": "さいばん", "meaning_vi": "phiên tòa"}, {"word": "判定", "reading": "はんてい", "meaning_vi": "phán quyết"}],
    "断": [{"word": "判断", "reading": "はんだん", "meaning_vi": "phán đoán"}, {"word": "断る", "reading": "ことわる", "meaning_vi": "từ chối"}, {"word": "中断", "reading": "ちゅうだん", "meaning_vi": "gián đoạn"}],
    "否": [{"word": "否定", "reading": "ひてい", "meaning_vi": "phủ định"}, {"word": "否認", "reading": "ひにん", "meaning_vi": "chối bỏ"}, {"word": "可否", "reading": "かひ", "meaning_vi": "có hay không"}],
    "認": [{"word": "認める", "reading": "みとめる", "meaning_vi": "công nhận"}, {"word": "確認", "reading": "かくにん", "meaning_vi": "xác nhận"}, {"word": "認識", "reading": "にんしき", "meaning_vi": "nhận thức"}],
    "可": [{"word": "可能", "reading": "かのう", "meaning_vi": "có thể"}, {"word": "許可", "reading": "きょか", "meaning_vi": "cho phép"}, {"word": "可愛い", "reading": "かわいい", "meaning_vi": "dễ thương"}],
    "能": [{"word": "可能", "reading": "かのう", "meaning_vi": "khả năng"}, {"word": "能力", "reading": "のうりょく", "meaning_vi": "năng lực"}, {"word": "性能", "reading": "せいのう", "meaning_vi": "hiệu suất"}],
    "許": [{"word": "許す", "reading": "ゆるす", "meaning_vi": "tha thứ"}, {"word": "許可", "reading": "きょか", "meaning_vi": "cho phép"}, {"word": "免許", "reading": "めんきょ", "meaning_vi": "bằng lái"}],
    "得": [{"word": "得る", "reading": "える", "meaning_vi": "đạt được"}, {"word": "納得", "reading": "なっとく", "meaning_vi": "đồng ý"}, {"word": "所得", "reading": "しょとく", "meaning_vi": "thu nhập"}],
}

def add_batch_2():
    with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', encoding='utf-8') as f:
        kanji_list = json.load(f)
    
    updated = 0
    for entry in kanji_list:
        kanji = entry['kanji']
        if kanji in BATCH_2_COMPOUNDS:
            if not entry.get('compound_words') or len(entry['compound_words']) == 0:
                entry['compound_words'] = BATCH_2_COMPOUNDS[kanji]
                updated += 1
        elif 'compound_words' not in entry:
            entry['compound_words'] = []
    
    with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', 'w', encoding='utf-8') as f:
        json.dump(kanji_list, f, ensure_ascii=False, indent=4)
    
    total_with_compounds = sum(1 for e in kanji_list if e.get('compound_words', []))
    print(f'✅ Batch 2: Đã thêm {updated} kanji')
    print(f'📚 Tổng kanji có từ ghép: {total_with_compounds}/{len(kanji_list)}')
    print(f'⏳ Còn thiếu: {len(kanji_list) - total_with_compounds}')

if __name__ == "__main__":
    add_batch_2()

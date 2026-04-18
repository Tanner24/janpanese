import json

# Batch 3: More compound words
BATCH_3_COMPOUNDS = {
    "招": [{"word": "招待", "reading": "しょうたい", "meaning_vi": "mời"}, {"word": "招く", "reading": "まねく", "meaning_vi": "mời"}, {"word": "招集", "reading": "しょうしゅう", "meaning_vi": "triệu tập"}],
    "因": [{"word": "原因", "reading": "げんいん", "meaning_vi": "nguyên nhân"}, {"word": "因果", "reading": "いんが", "meaning_vi": "nhân quả"}, {"word": "要因", "reading": "よういん", "meaning_vi": "yếu tố"}],
    "果": [{"word": "結果", "reading": "けっか", "meaning_vi": "kết quả"}, {"word": "果物", "reading": "くだもの", "meaning_vi": "trái cây"}, {"word": "効果", "reading": "こうか", "meaning_vi": "hiệu quả"}],
    "効": [{"word": "効果", "reading": "こうか", "meaning_vi": "hiệu quả"}, {"word": "有効", "reading": "ゆうこう", "meaning_vi": "có hiệu lực"}, {"word": "効率", "reading": "こうりつ", "meaning_vi": "hiệu suất"}],
    "率": [{"word": "効率", "reading": "こうりつ", "meaning_vi": "hiệu suất"}, {"word": "確率", "reading": "かくりつ", "meaning_vi": "xác suất"}, {"word": "率直", "reading": "そっちょく", "meaning_vi": "thẳng thắn"}],
    "営": [{"word": "経営", "reading": "けいえい", "meaning_vi": "kinh doanh"}, {"word": "営業", "reading": "えいぎょう", "meaning_vi": "kinh doanh"}, {"word": "運営", "reading": "うんえい", "meaning_vi": "vận hành"}],
    "価": [{"word": "価格", "reading": "かかく", "meaning_vi": "giá cả"}, {"word": "価値", "reading": "かち", "meaning_vi": "giá trị"}, {"word": "物価", "reading": "ぶっか", "meaning_vi": "giá cả"}],
    "求": [{"word": "要求", "reading": "ようきゅう", "meaning_vi": "yêu cầu"}, {"word": "求める", "reading": "もとめる", "meaning_vi": "tìm kiếm"}, {"word": "請求", "reading": "せいきゅう", "meaning_vi": "yêu cầu"}],
    "要": [{"word": "必要", "reading": "ひつよう", "meaning_vi": "cần thiết"}, {"word": "要求", "reading": "ようきゅう", "meaning_vi": "yêu cầu"}, {"word": "重要", "reading": "じゅうよう", "meaning_vi": "quan trọng"}],
    "容": [{"word": "内容", "reading": "ないよう", "meaning_vi": "nội dung"}, {"word": "容易", "reading": "ようい", "meaning_vi": "dễ dàng"}, {"word": "美容", "reading": "びよう", "meaning_vi": "làm đẹp"}],
    "易": [{"word": "容易", "reading": "ようい", "meaning_vi": "dễ dàng"}, {"word": "貿易", "reading": "ぼうえき", "meaning_vi": "mậu dịch"}, {"word": "易しい", "reading": "やさしい", "meaning_vi": "dễ"}],
    "賞": [{"word": "賞品", "reading": "しょうひん", "meaning_vi": "giải thưởng"}, {"word": "受賞", "reading": "じゅしょう", "meaning_vi": "nhận giải"}, {"word": "賞賛", "reading": "しょうさん", "meaning_vi": "khen ngợi"}],
    "与": [{"word": "与える", "reading": "あたえる", "meaning_vi": "cho"}, {"word": "給与", "reading": "きゅうよ", "meaning_vi": "lương"}, {"word": "参与", "reading": "さんよ", "meaning_vi": "tham gia"}],
    "供": [{"word": "供給", "reading": "きょうきゅう", "meaning_vi": "cung cấp"}, {"word": "提供", "reading": "ていきょう", "meaning_vi": "cung cấp"}, {"word": "子供", "reading": "こども", "meaning_vi": "trẻ em"}],
    "提": [{"word": "提案", "reading": "ていあん", "meaning_vi": "đề xuất"}, {"word": "提出", "reading": "ていしゅつ", "meaning_vi": "nộp"}, {"word": "提供", "reading": "ていきょう", "meaning_vi": "cung cấp"}],
    "示": [{"word": "表示", "reading": "ひょうじ", "meaning_vi": "hiển thị"}, {"word": "指示", "reading": "しじ", "meaning_vi": "chỉ thị"}, {"word": "提示", "reading": "ていじ", "meaning_vi": "trình bày"}],
    "案": [{"word": "提案", "reading": "ていあん", "meaning_vi": "đề xuất"}, {"word": "案内", "reading": "あんない", "meaning_vi": "hướng dẫn"}, {"word": "方案", "reading": "ほうあん", "meaning_vi": "phương án"}],
    "件": [{"word": "事件", "reading": "じけん", "meaning_vi": "sự kiện"}, {"word": "条件", "reading": "じょうけん", "meaning_vi": "điều kiện"}, {"word": "要件", "reading": "ようけん", "meaning_vi": "yêu cầu"}],
    "条": [{"word": "条件", "reading": "じょうけん", "meaning_vi": "điều kiện"}, {"word": "条約", "reading": "じょうやく", "meaning_vi": "hiệp ước"}, {"word": "線条", "reading": "せんじょう", "meaning_vi": "đường kẻ"}],
    "約": [{"word": "約束", "reading": "やくそく", "meaning_vi": "hứa"}, {"word": "予約", "reading": "よやく", "meaning_vi": "đặt trước"}, {"word": "条約", "reading": "じょうやく", "meaning_vi": "hiệp ước"}],
    "束": [{"word": "約束", "reading": "やくそく", "meaning_vi": "lời hứa"}, {"word": "束ねる", "reading": "たばねる", "meaning_vi": "buộc lại"}, {"word": "花束", "reading": "はなたば", "meaning_vi": "bó hoa"}],
    "制": [{"word": "制度", "reading": "せいど", "meaning_vi": "chế độ"}, {"word": "制限", "reading": "せいげん", "meaning_vi": "hạn chế"}, {"word": "規制", "reading": "きせい", "meaning_vi": "quy chế"}],
    "限": [{"word": "制限", "reading": "せいげん", "meaning_vi": "hạn chế"}, {"word": "限る", "reading": "かぎる", "meaning_vi": "giới hạn"}, {"word": "期限", "reading": "きげん", "meaning_vi": "hạn chót"}],
    "規": [{"word": "規則", "reading": "きそく", "meaning_vi": "quy tắc"}, {"word": "規模", "reading": "きぼ", "meaning_vi": "quy mô"}, {"word": "規律", "reading": "きりつ", "meaning_vi": "kỷ luật"}],
    "則": [{"word": "規則", "reading": "きそく", "meaning_vi": "quy tắc"}, {"word": "原則", "reading": "げんそく", "meaning_vi": "nguyên tắc"}, {"word": "法則", "reading": "ほうそく", "meaning_vi": "quy luật"}],
    "模": [{"word": "規模", "reading": "きぼ", "meaning_vi": "quy mô"}, {"word": "模様", "reading": "もよう", "meaning_vi": "hoa văn"}, {"word": "模倣", "reading": "もほう", "meaning_vi": "bắt chước"}],
    "権": [{"word": "権利", "reading": "けんり", "meaning_vi": "quyền lợi"}, {"word": "人権", "reading": "じんけん", "meaning_vi": "nhân quyền"}, {"word": "権力", "reading": "けんりょく", "meaning_vi": "quyền lực"}],
    "義": [{"word": "意義", "reading": "いぎ", "meaning_vi": "ý nghĩa"}, {"word": "正義", "reading": "せいぎ", "meaning_vi": "chính nghĩa"}, {"word": "義務", "reading": "ぎむ", "meaning_vi": "nghĩa vụ"}],
    "務": [{"word": "義務", "reading": "ぎむ", "meaning_vi": "nghĩa vụ"}, {"word": "事務", "reading": "じむ", "meaning_vi": "hành chính"}, {"word": "業務", "reading": "ぎょうむ", "meaning_vi": "nghiệp vụ"}],
    "任": [{"word": "任せる", "reading": "まかせる", "meaning_vi": "giao phó"}, {"word": "責任", "reading": "せきにん", "meaning_vi": "trách nhiệm"}, {"word": "任務", "reading": "にんむ", "meaning_vi": "nhiệm vụ"}],
    "責": [{"word": "責任", "reading": "せきにん", "meaning_vi": "trách nhiệm"}, {"word": "責める", "reading": "せめる", "meaning_vi": "trách móc"}, {"word": "無責任", "reading": "むせきにん", "meaning_vi": "vô trách nhiệm"}],
    "個": [{"word": "個人", "reading": "こじん", "meaning_vi": "cá nhân"}, {"word": "個性", "reading": "こせい", "meaning_vi": "cá tính"}, {"word": "個別", "reading": "こべつ", "meaning_vi": "riêng biệt"}],
    "性": [{"word": "性質", "reading": "せいしつ", "meaning_vi": "tính chất"}, {"word": "性格", "reading": "せいかく", "meaning_vi": "tính cách"}, {"word": "可能性", "reading": "かのうせい", "meaning_vi": "khả năng"}],
    "質": [{"word": "性質", "reading": "せいしつ", "meaning_vi": "tính chất"}, {"word": "質問", "reading": "しつもん", "meaning_vi": "câu hỏi"}, {"word": "品質", "reading": "ひんしつ", "meaning_vi": "chất lượng"}],
    "問": [{"word": "質問", "reading": "しつもん", "meaning_vi": "câu hỏi"}, {"word": "問題", "reading": "もんだい", "meaning_vi": "vấn đề"}, {"word": "疑問", "reading": "ぎもん", "meaning_vi": "nghi vấn"}],
    "題": [{"word": "問題", "reading": "もんだい", "meaning_vi": "vấn đề"}, {"word": "主題", "reading": "しゅだい", "meaning_vi": "chủ đề"}, {"word": "課題", "reading": "かだい", "meaning_vi": "bài tập"}],
    "課": [{"word": "課題", "reading": "かだい", "meaning_vi": "bài tập"}, {"word": "課長", "reading": "かちょう", "meaning_vi": "trưởng phòng"}, {"word": "課程", "reading": "かてい", "meaning_vi": "khóa học"}],
    "程": [{"word": "課程", "reading": "かてい", "meaning_vi": "khóa học"}, {"word": "程度", "reading": "ていど", "meaning_vi": "mức độ"}, {"word": "過程", "reading": "かてい", "meaning_vi": "quá trình"}],
    "順": [{"word": "順番", "reading": "じゅんばん", "meaning_vi": "thứ tự"}, {"word": "順調", "reading": "じゅんちょう", "meaning_vi": "suôn sẻ"}, {"word": "順序", "reading": "じゅんじょ", "meaning_vi": "trình tự"}],
    "序": [{"word": "順序", "reading": "じゅんじょ", "meaning_vi": "trình tự"}, {"word": "序文", "reading": "じょぶん", "meaning_vi": "lời tựa"}, {"word": "秩序", "reading": "ちつじょ", "meaning_vi": "trật tự"}],
    "済": [{"word": "経済", "reading": "けいざい", "meaning_vi": "kinh tế"}, {"word": "済む", "reading": "すむ", "meaning_vi": "xong"}, {"word": "返済", "reading": "へんさい", "meaning_vi": "hoàn trả"}],
    "完": [{"word": "完成", "reading": "かんせい", "meaning_vi": "hoàn thành"}, {"word": "完全", "reading": "かんぜん", "meaning_vi": "hoàn toàn"}, {"word": "未完", "reading": "みかん", "meaning_vi": "chưa hoàn thành"}],
    "成": [{"word": "成功", "reading": "せいこう", "meaning_vi": "thành công"}, {"word": "完成", "reading": "かんせい", "meaning_vi": "hoàn thành"}, {"word": "成長", "reading": "せいちょう", "meaning_vi": "tăng trưởng"}],
    "就": [{"word": "就職", "reading": "しゅうしょく", "meaning_vi": "xin việc"}, {"word": "就任", "reading": "しゅうにん", "meaning_vi": "nhậm chức"}, {"word": "成就", "reading": "じょうじゅ", "meaning_vi": "thành tựu"}],
    "職": [{"word": "就職", "reading": "しゅうしょく", "meaning_vi": "xin việc"}, {"word": "職業", "reading": "しょくぎょう", "meaning_vi": "nghề nghiệp"}, {"word": "職員", "reading": "しょくいん", "meaning_vi": "nhân viên"}],
    "業": [{"word": "職業", "reading": "しょくぎょう", "meaning_vi": "nghề nghiệp"}, {"word": "企業", "reading": "きぎょう", "meaning_vi": "doanh nghiệp"}, {"word": "工業", "reading": "こうぎょう", "meaning_vi": "công nghiệp"}],
    "企": [{"word": "企業", "reading": "きぎょう", "meaning_vi": "doanh nghiệp"}, {"word": "企画", "reading": "きかく", "meaning_vi": "kế hoạch"}, {"word": "企てる", "reading": "くわだてる", "meaning_vi": "âm mưu"}],
}

def add_batch_3():
    with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', encoding='utf-8') as f:
        kanji_list = json.load(f)
    
    updated = 0
    for entry in kanji_list:
        kanji = entry['kanji']
        if kanji in BATCH_3_COMPOUNDS:
            if not entry.get('compound_words') or len(entry['compound_words']) == 0:
                entry['compound_words'] = BATCH_3_COMPOUNDS[kanji]
                updated += 1
        elif 'compound_words' not in entry:
            entry['compound_words'] = []
    
    with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', 'w', encoding='utf-8') as f:
        json.dump(kanji_list, f, ensure_ascii=False, indent=4)
    
    total_with_compounds = sum(1 for e in kanji_list if e.get('compound_words', []))
    print(f'✅ Batch 3: Đã thêm {updated} kanji')
    print(f'📚 Tổng kanji có từ ghép: {total_with_compounds}/{len(kanji_list)}')
    print(f'⏳ Còn thiếu: {len(kanji_list) - total_with_compounds}')

if __name__ == "__main__":
    add_batch_3()

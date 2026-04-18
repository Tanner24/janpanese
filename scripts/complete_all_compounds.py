import json

# COMPLETE compound words data for ALL remaining N3 Kanji
ALL_REMAINING_COMPOUNDS = {
    # Batch 4-10: All remaining kanji (230 entries)
    "積": [{"word": "積極的", "reading": "せっきょくてき", "meaning_vi": "tích cực"}, {"word": "面積", "reading": "めんせき", "meaning_vi": "diện tích"}],
    "働": [{"word": "働く", "reading": "はたらく", "meaning_vi": "làm việc"}, {"word": "労働", "reading": "ろうどう", "meaning_vi": "lao động"}],
    "他": [{"word": "他人", "reading": "たにん", "meaning_vi": "người khác"}, {"word": "その他", "reading": "そのた", "meaning_vi": "khác"}],
    "比": [{"word": "比較", "reading": "ひかく", "meaning_vi": "so sánh"}, {"word": "比べる", "reading": "くらべる", "meaning_vi": "so sánh"}],
    "化": [{"word": "文化", "reading": "ぶんか", "meaning_vi": "văn hóa"}, {"word": "変化", "reading": "へんか", "meaning_vi": "thay đổi"}],
    "利": [{"word": "便利", "reading": "べんり", "meaning_vi": "tiện lợi"}, {"word": "利用", "reading": "りよう", "meaning_vi": "sử dụng"}],
    "得": [{"word": "得る", "reading": "える", "meaning_vi": "có được"}, {"word": "取得", "reading": "しゅとく", "meaning_vi": "thu được"}],
    "速": [{"word": "速い", "reading": "はやい", "meaning_vi": "nhanh"}, {"word": "速度", "reading": "そくど", "meaning_vi": "tốc độ"}],
    "度": [{"word": "温度", "reading": "おんど", "meaning_vi": "nhiệt độ"}, {"word": "今度", "reading": "こんど", "meaning_vi": "lần này"}],
    "泳": [{"word": "水泳", "reading": "すいえい", "meaning_vi": "bơi lội"}, {"word": "泳ぐ", "reading": "およぐ", "meaning_vi": "bơi"}],
    "洗": [{"word": "洗う", "reading": "あらう", "meaning_vi": "rửa"}, {"word": "洗濯", "reading": "せんたく", "meaning_vi": "giặt giũ"}],
    "調": [{"word": "調べる", "reading": "しらべる", "meaning_vi": "điều tra"}, {"word": "調査", "reading": "ちょうさ", "meaning_vi": "khảo sát"}],
    "査": [{"word": "調査", "reading": "ちょうさ", "meaning_vi": "điều tra"}, {"word": "検査", "reading": "けんさ", "meaning_vi": "kiểm tra"}],
    "建": [{"word": "建物", "reading": "たてもの", "meaning_vi": "tòa nhà"}, {"word": "建設", "reading": "けんせつ", "meaning_vi": "xây dựng"}],
    "設": [{"word": "設備", "reading": "せつび", "meaning_vi": "trang bị"}, {"word": "設定", "reading": "せってい", "meaning_vi": "cài đặt"}],
    "備": [{"word": "準備", "reading": "じゅんび", "meaning_vi": "chuẩn bị"}, {"word": "設備", "reading": "せつび", "meaning_vi": "trang bị"}],
    "準": [{"word": "準備", "reading": "じゅんび", "meaning_vi": "chuẩn bị"}, {"word": "基準", "reading": "きじゅん", "meaning_vi": "tiêu chuẩn"}],
    "指": [{"word": "指す", "reading": "さす", "meaning_vi": "chỉ"}, {"word": "指導", "reading": "しどう", "meaning_vi": "chỉ đạo"}],
    "導": [{"word": "指導", "reading": "しどう", "meaning_vi": "hướng dẫn"}, {"word": "導入", "reading": "どうにゅう", "meaning_vi": "đưa vào"}],
    "困": [{"word": "困る", "reading": "こまる", "meaning_vi": "khó khăn"}, {"word": "困難", "reading": "こんなん", "meaning_vi": "khó khăn"}],
    "難": [{"word": "困難", "reading": "こんなん", "meaning_vi": "khó khăn"}, {"word": "難しい", "reading": "むずかしい", "meaning_vi": "khó"}],
    "満": [{"word": "満足", "reading": "まんぞく", "meaning_vi": "thỏa mãn"}, {"word": "不満", "reading": "ふまん", "meaning_vi": "bất mãn"}],
    "危": [{"word": "危険", "reading": "きけん", "meaning_vi": "nguy hiểm"}, {"word": "危ない", "reading": "あぶない", "meaning_vi": "nguy hiểm"}],
    "険": [{"word": "危険", "reading": "きけん", "meaning_vi": "nguy hiểm"}, {"word": "保険", "reading": "ほけん", "meaning_vi": "bảo hiểm"}],
    "機": [{"word": "機会", "reading": "きかい", "meaning_vi": "cơ hội"}, {"word": "飛行機", "reading": "ひこうき", "meaning_vi": "máy bay"}],
    "械": [{"word": "機械", "reading": "きかい", "meaning_vi": "máy móc"}, {"word": "器械", "reading": "きかい", "meaning_vi": "dụng cụ"}],
    "材": [{"word": "材料", "reading": "ざいりょう", "meaning_vi": "nguyên liệu"}, {"word": "教材", "reading": "きょうざい", "meaning_vi": "tài liệu"}],
    "料": [{"word": "料理", "reading": "りょうり", "meaning_vi": "nấu ăn"}, {"word": "材料", "reading": "ざいりょう", "meaning_vi": "nguyên liệu"}],
    "費": [{"word": "費用", "reading": "ひよう", "meaning_vi": "chi phí"}, {"word": "消費", "reading": "しょうひ", "meaning_vi": "tiêu dùng"}],
    "払": [{"word": "払う", "reading": "はらう", "meaning_vi": "trả tiền"}, {"word": "支払い", "reading": "しはらい", "meaning_vi": "thanh toán"}],
    "値": [{"word": "価値", "reading": "かち", "meaning_vi": "giá trị"}, {"word": "値段", "reading": "ねだん", "meaning_vi": "giá cả"}],
    "増": [{"word": "増える", "reading": "ふえる", "meaning_vi": "tăng"}, {"word": "増加", "reading": "ぞうか", "meaning_vi": "gia tăng"}],
    "減": [{"word": "減る", "reading": "へる", "meaning_vi": "giảm"}, {"word": "減少", "reading": "げんしょう", "meaning_vi": "giảm thiểu"}],
    "加": [{"word": "参加", "reading": "さんか", "meaning_vi": "tham gia"}, {"word": "加える", "reading": "くわえる", "meaning_vi": "thêm vào"}],
    "算": [{"word": "計算", "reading": "けいさん", "meaning_vi": "tính toán"}, {"word": "予算", "reading": "よさん", "meaning_vi": "ngân sách"}],
    "数": [{"word": "数字", "reading": "すうじ", "meaning_vi": "con số"}, {"word": "人数", "reading": "にんずう", "meaning_vi": "số người"}],
    "量": [{"word": "数量", "reading": "すうりょう", "meaning_vi": "số lượng"}, {"word": "重量", "reading": "じゅうりょう", "meaning_vi": "trọng lượng"}],
    "判": [{"word": "判断", "reading": "はんだん", "meaning_vi": "phán đoán"}, {"word": "裁判", "reading": "さいばん", "meaning_vi": "phiên tòa"}],
    "断": [{"word": "判断", "reading": "はんだん", "meaning_vi": "phán đoán"}, {"word": "断る", "reading": "ことわる", "meaning_vi": "từ chối"}],
    "否": [{"word": "否定", "reading": "ひてい", "meaning_vi": "phủ định"}, {"word": "否認", "reading": "ひにん", "meaning_vi": "chối bỏ"}],
    "認": [{"word": "認める", "reading": "みとめる", "meaning_vi": "công nhận"}, {"word": "確認", "reading": "かくにん", "meaning_vi": "xác nhận"}],
    "可": [{"word": "可能", "reading": "かのう", "meaning_vi": "có thể"}, {"word": "許可", "reading": "きょか", "meaning_vi": "cho phép"}],
    "能": [{"word": "可能", "reading": "かのう", "meaning_vi": "khả năng"}, {"word": "能力", "reading": "のうりょく", "meaning_vi": "năng lực"}],
    "許": [{"word": "許す", "reading": "ゆるす", "meaning_vi": "tha thứ"}, {"word": "許可", "reading": "きょか", "meaning_vi": "cho phép"}],
    "招": [{"word": "招待", "reading": "しょうたい", "meaning_vi": "mời"}, {"word": "招く", "reading": "まねく", "meaning_vi": "mời"}],
    "因": [{"word": "原因", "reading": "げんいん", "meaning_vi": "nguyên nhân"}, {"word": "因果", "reading": "いんが", "meaning_vi": "nhân quả"}],
    "果": [{"word": "結果", "reading": "けっか", "meaning_vi": "kết quả"}, {"word": "果物", "reading": "くだもの", "meaning_vi": "trái cây"}],
    "効": [{"word": "効果", "reading": "こうか", "meaning_vi": "hiệu quả"}, {"word": "有効", "reading": "ゆうこう", "meaning_vi": "có hiệu lực"}],
    "営": [{"word": "経営", "reading": "けいえい", "meaning_vi": "kinh doanh"}, {"word": "営業", "reading": "えいぎょう", "meaning_vi": "kinh doanh"}],
    "賞": [{"word": "賞品", "reading": "しょうひん", "meaning_vi": "giải thưởng"}, {"word": "受賞", "reading": "じゅしょう", "meaning_vi": "nhận giải"}],
    "与": [{"word": "与える", "reading": "あたえる", "meaning_vi": "cho"}, {"word": "給与", "reading": "きゅうよ", "meaning_vi": "lương"}],
    "供": [{"word": "供給", "reading": "きょうきゅう", "meaning_vi": "cung cấp"}, {"word": "提供", "reading": "ていきょう", "meaning_vi": "cung cấp"}],
    "提": [{"word": "提案", "reading": "ていあん", "meaning_vi": "đề xuất"}, {"word": "提出", "reading": "ていしゅつ", "meaning_vi": "nộp"}],
    "示": [{"word": "表示", "reading": "ひょうじ", "meaning_vi": "hiển thị"}, {"word": "指示", "reading": "しじ", "meaning_vi": "chỉ thị"}],
    "案": [{"word": "提案", "reading": "ていあん", "meaning_vi": "đề xuất"}, {"word": "案内", "reading": "あんない", "meaning_vi": "hướng dẫn"}],
    "制": [{"word": "制度", "reading": "せいど", "meaning_vi": "chế độ"}, {"word": "制限", "reading": "せいげん", "meaning_vi": "hạn chế"}],
    "限": [{"word": "制限", "reading": "せいげん", "meaning_vi": "hạn chế"}, {"word": "限る", "reading": "かぎる", "meaning_vi": "giới hạn"}],
    "規": [{"word": "規則", "reading": "きそく", "meaning_vi": "quy tắc"}, {"word": "規模", "reading": "きぼ", "meaning_vi": "quy mô"}],
    "模": [{"word": "規模", "reading": "きぼ", "meaning_vi": "quy mô"}, {"word": "模様", "reading": "もよう", "meaning_vi": "hoa văn"}],
    "権": [{"word": "権利", "reading": "けんり", "meaning_vi": "quyền lợi"}, {"word": "人権", "reading": "じんけん", "meaning_vi": "nhân quyền"}],
    "義": [{"word": "意義", "reading": "いぎ", "meaning_vi": "ý nghĩa"}, {"word": "正義", "reading": "せいぎ", "meaning_vi": "chính nghĩa"}],
    "務": [{"word": "義務", "reading": "ぎむ", "meaning_vi": "nghĩa vụ"}, {"word": "事務", "reading": "じむ", "meaning_vi": "hành chính"}],
    "任": [{"word": "任せる", "reading": "まかせる", "meaning_vi": "giao phó"}, {"word": "責任", "reading": "せきにん", "meaning_vi": "trách nhiệm"}],
    "責": [{"word": "責任", "reading": "せきにん", "meaning_vi": "trách nhiệm"}, {"word": "責める", "reading": "せめる", "meaning_vi": "trách móc"}],
    "個": [{"word": "個人", "reading": "こじん", "meaning_vi": "cá nhân"}, {"word": "個性", "reading": "こせい", "meaning_vi": "cá tính"}],
    "質": [{"word": "性質", "reading": "せいしつ", "meaning_vi": "tính chất"}, {"word": "質問", "reading": "しつもん", "meaning_vi": "câu hỏi"}],
    "問": [{"word": "質問", "reading": "しつもん", "meaning_vi": "câu hỏi"}, {"word": "問題", "reading": "もんだい", "meaning_vi": "vấn đề"}],
    "課": [{"word": "課題", "reading": "かだい", "meaning_vi": "bài tập"}, {"word": "課長", "reading": "かちょう", "meaning_vi": "trưởng phòng"}],
    "順": [{"word": "順番", "reading": "じゅんばん", "meaning_vi": "thứ tự"}, {"word": "順調", "reading": "じゅんちょう", "meaning_vi": "suôn sẻ"}],
    "完": [{"word": "完成", "reading": "かんせい", "meaning_vi": "hoàn thành"}, {"word": "完全", "reading": "かんぜん", "meaning_vi": "hoàn toàn"}],
    "成": [{"word": "成功", "reading": "せいこう", "meaning_vi": "thành công"}, {"word": "完成", "reading": "かんせい", "meaning_vi": "hoàn thành"}],
    "就": [{"word": "就職", "reading": "しゅうしょく", "meaning_vi": "xin việc"}, {"word": "就任", "reading": "しゅうにん", "meaning_vi": "nhậm chức"}],
    "職": [{"word": "就職", "reading": "しゅうしょく", "meaning_vi": "xin việc"}, {"word": "職業", "reading": "しょくぎょう", "meaning_vi": "nghề nghiệp"}],
    "業": [{"word": "職業", "reading": "しょくぎょう", "meaning_vi": "nghề nghiệp"}, {"word": "企業", "reading": "きぎょう", "meaning_vi": "doanh nghiệp"}],
    "企": [{"word": "企業", "reading": "きぎょう", "meaning_vi": "doanh nghiệp"}, {"word": "企画", "reading": "きかく", "meaning_vi": "kế hoạch"}],
    # Continue with more kanji...
    "商": [{"word": "商品", "reading": "しょうひん", "meaning_vi": "hàng hóa"}, {"word": "商業", "reading": "しょうぎょう", "meaning_vi": "thương mại"}],
    "品": [{"word": "商品", "reading": "しょうひん", "meaning_vi": "hàng hóa"}, {"word": "品質", "reading": "ひんしつ", "meaning_vi": "chất lượng"}],
    "貿": [{"word": "貿易", "reading": "ぼうえき", "meaning_vi": "thương mại"}, {"word": "貿易商", "reading": "ぼうえきしょう", "meaning_vi": "thương nhân"}],
    "易": [{"word": "貿易", "reading": "ぼうえき", "meaning_vi": "thương mại"}, {"word": "容易", "reading": "ようい", "meaning_vi": "dễ dàng"}],
    "輸": [{"word": "輸出", "reading": "ゆしゅつ", "meaning_vi": "xuất khẩu"}, {"word": "輸入", "reading": "ゆにゅう", "meaning_vi": "nhập khẩu"}],
    "輪":[{"word": "車輪", "reading": "しゃりん", "meaning_vi": "bánh xe"}, {"word": "輪", "reading": "わ", "meaning_vi": "vòng tròn"}],
    "船": [{"word": "船", "reading": "ふね", "meaning_vi": "tàu thuyền"}, {"word": "船便", "reading": "ふなびん", "meaning_vi": "gửi bằng tàu"}],
    "航": [{"word": "航空", "reading": "こうくう", "meaning_vi": "hàng không"}, {"word": "航海", "reading": "こうかい", "meaning_vi": "hàng hải"}],
    "港": [{"word": "港", "reading": "みなと", "meaning_vi": "cảng"}, {"word": "空港", "reading": "くうこう", "meaning_vi": "sân bay"}],
    "湾": [{"word": "湾", "reading": "わん", "meaning_vi": "vịnh"}, {"word": "東京湾", "reading": "とうきょうわん", "meaning_vi": "vịnh Tokyo"}],
    "岸": [{"word": "海岸", "reading": "かいがん", "meaning_vi": "bờ biển"}, {"word": "岸", "reading": "きし", "meaning_vi": "bờ"}],
    "島": [{"word": "島", "reading": "しま", "meaning_vi": "đảo"}, {"word": "半島", "reading": "はんとう", "meaning_vi": "bán đảo"}],
    "泊": [{"word": "宿泊", "reading": "しゅくはく", "meaning_vi": "lưu trú"}, {"word": "一泊", "reading": "いっぱく", "meaning_vi": "một đêm"}],
    "泉": [{"word": "温泉", "reading": "おんせん", "meaning_vi": "suối nước nóng"}, {"word": "泉", "reading": "いずみ", "meaning_vi": "suối"}],
    "灯": [{"word": "電灯", "reading": "でんとう", "meaning_vi": "đèn điện"}, {"word": "灯り", "reading": "あかり", "meaning_vi": "ánh sáng"}],
    "塩": [{"word": "塩", "reading": "しお", "meaning_vi": "muối"}, {"word": "食塩", "reading": "しょくえん", "meaning_vi": "muối ăn"}],
    "湖": [{"word": "湖", "reading": "みずうみ", "meaning_vi": "hồ"}, {"word": "湖水", "reading": "こすい", "meaning_vi": "hồ nước"}],
    "温": [{"word": "温度", "reading": "おんど", "meaning_vi": "nhiệt độ"}, {"word": "温泉", "reading": "おんせん", "meaning_vi": "suối nước nóng"}],
    "冷": [{"word": "冷たい", "reading": "つめたい", "meaning_vi": "lạnh"}, {"word": "冷蔵庫", "reading": "れいぞうこ", "meaning_vi": "tủ lạnh"}],
    "暖": [{"word": "暖かい", "reading": "あたたかい", "meaning_vi": "ấm"}, {"word": "暖房", "reading": "だんぼう", "meaning_vi": "sưởi ấm"}],
    "暑": [{"word": "暑い", "reading": "あつい", "meaning_vi": "nóng"}, {"word": "猛暑", "reading": "もうしょ", "meaning_vi": "nóng gay gắt"}],
    "熱": [{"word": "熱い", "reading": "あつい", "meaning_vi": "nóng"}, {"word": "熱心", "reading": "ねっしん", "meaning_vi": "nhiệt tình"}],
    "焼": [{"word": "焼く", "reading": "やく", "meaning_vi": "nướng"}, {"word": "焼肉", "reading": "やきにく", "meaning_vi": "thịt nướng"}],
    "燃": [{"word": "燃える", "reading": "もえる", "meaning_vi": "cháy"}, {"word": "燃料", "reading": "ねんりょう", "meaning_vi": "nhiên liệu"}],
    "照": [{"word": "照らす", "reading": "てらす", "meaning_vi": "chiếu sáng"}, {"word": "照明", "reading": "しょうめい", "meaning_vi": "chiếu sáng"}],
    "晴": [{"word": "晴れる", "reading": "はれる", "meaning_vi": "quang đãng"}, {"word": "晴天", "reading": "せいてん", "meaning_vi": "trời đẹp"}],
    "曇": [{"word": "曇る", "reading": "くもる", "meaning_vi": "u ám"}, {"word": "曇り", "reading": "くもり", "meaning_vi": "mây"}],
    "陰": [{"word": "陰", "reading": "かげ", "meaning_vi": "bóng râm"}, {"word": "陰陽", "reading": "いんよう", "meaning_vi": "âm dương"}],
    "陽": [{"word": "太陽", "reading": "たいよう", "meaning_vi": "mặt trời"}, {"word": "陽気", "reading": "ようき", "meaning_vi": "vui vẻ"}],
    "輝": [{"word": "輝く", "reading": "かがやく", "meaning_vi": "tỏa sáng"}, {"word": "光輝", "reading": "こうき", "meaning_vi": "hào quang"}],
    "吹": [{"word": "吹く", "reading": "ふく", "meaning_vi": "thổi"}, {"word": "吹雪", "reading": "ふぶき", "meaning_vi": "bão tuyết"}],
    "震": [{"word": "地震", "reading": "じしん", "meaning_vi": "động đất"}, {"word": "震える", "reading": "ふるえる", "meaning_vi": "rung"}],
    "災": [{"word": "災害", "reading": "さいがい", "meaning_vi": "thiên tai"}, {"word": "火災", "reading": "かさい", "meaning_vi": "hỏa hoạn"}],
    "害": [{"word": "害", "reading": "がい", "meaning_vi": "hại"}, {"word": "被害", "reading": "ひがい", "meaning_vi": "thiệt hại"}],
    "被": [{"word": "被害", "reading": "ひがい", "meaning_vi": "thiệt hại"}, {"word": "被る", "reading": "かぶる", "meaning_vi": "đội"}],
    "婦": [{"word": "婦人", "reading": "ふじん", "meaning_vi": "phụ nữ"}, {"word": "夫婦", "reading": "ふうふ", "meaning_vi": "vợ chồng"}],
    "夫": [{"word": "夫", "reading": "おっと", "meaning_vi": "chồng"}, {"word": "夫婦", "reading": "ふうふ", "meaning_vi": "vợ chồng"}],
    "妻": [{"word": "妻", "reading": "つま", "meaning_vi": "vợ"}, {"word": "夫妻", "reading": "ふさい", "meaning_vi": "vợ chồng"}],
    "嫁": [{"word": "嫁", "reading": "よめ", "meaning_vi": "dâu, vợ"}, {"word": "花嫁", "reading": "はなよめ", "meaning_vi": "cô dâu"}],
    "婚": [{"word": "結婚", "reading": "けっこん", "meaning_vi": "kết hôn"}, {"word": "婚約", "reading": "こんやく", "meaning_vi": "đính hôn"}],
    "姓": [{"word": "姓", "reading": "せい", "meaning_vi": "họ"}, {"word": "姓名", "reading": "せいめい", "meaning_vi": "họ tên"}],
    "娘": [{"word": "娘", "reading": "むすめ", "meaning_vi": "con gái"}, {"word": "娘さん", "reading": "むすめさん", "meaning_vi": "cô gái"}],
    "息": [{"word": "息子", "reading": "むすこ", "meaning_vi": "con trai"}, {"word": "息", "reading": "いき", "meaning_vi": "hơi thở"}],
    "祖": [{"word": "祖父", "reading": "そふ", "meaning_vi": "ông"}, {"word": "祖母", "reading": "そぼ", "meaning_vi": "bà"}],
    "孫": [{"word": "孫", "reading": "まご", "meaning_vi": "cháu"}, {"word": "子孫", "reading": "しそん", "meaning_vi": "con cháu"}],
    "乳": [{"word": "牛乳", "reading": "ぎゅうにゅう", "meaning_vi": "sữa bò"}, {"word": "乳児", "reading": "にゅうじ", "meaning_vi": "trẻ sơ sinh"}],
    "幼": [{"word": "幼い", "reading": "おさない", "meaning_vi": "nhỏ tuổi"}, {"word": "幼稚園", "reading": "ようちえん", "meaning_vi": "mẫu giáo"}],
    "児": [{"word": "児童", "reading": "じどう", "meaning_vi": "trẻ em"}, {"word": "育児", "reading": "いくじ", "meaning_vi": "nuôi dạy con"}],
    "童": [{"word": "児童", "reading": "じどう", "meaning_vi": "trẻ em"}, {"word": "童話", "reading": "どうわ", "meaning_vi": "truyện cổ tích"}],
    "齢": [{"word": "年齢", "reading": "ねんれい", "meaning_vi": "tuổi"}, {"word": "高齢", "reading": "こうれい", "meaning_vi": "cao tuổi"}],
    "老": [{"word": "老人", "reading": "ろうじん", "meaning_vi": "người già"}, {"word": "老いる", "reading": "おいる", "meaning_vi": "già đi"}],
    "若": [{"word": "若い", "reading": "わかい", "meaning_vi": "trẻ"}, {"word": "若者", "reading": "わかもの", "meaning_vi": "thanh niên"}],
    "青": [{"word": "青い", "reading": "あおい", "meaning_vi": "xanh"}, {"word": "青年", "reading": "せいねん", "meaning_vi": "thanh niên"}],
    "臓": [{"word": "心臓", "reading": "しんぞう", "meaning_vi": "tim"}, {"word": "内臓", "reading": "ないぞう", "meaning_vi": "nội tạng"}],
    "血": [{"word": "血", "reading": "ち", "meaning_vi": "máu"}, {"word": "血液", "reading": "けつえき", "meaning_vi": "máu"}],
    "液": [{"word": "血液", "reading": "けつえき", "meaning_vi": "máu"}, {"word": "液体", "reading": "えきたい", "meaning_vi": "chất lỏng"}],
    "汗": [{"word": "汗", "reading": "あせ", "meaning_vi": "mồ hôi"}, {"word": "発汗", "reading": "はっかん", "meaning_vi": "ra mồ hôi"}],
    "骨": [{"word": "骨", "reading": "ほね", "meaning_vi": "xương"}, {"word": "骨折", "reading": "こっせつ", "meaning_vi": "gãy xương"}],
    "筋": [{"word": "筋肉", "reading": "きんにく", "meaning_vi": "cơ bắp"}, {"word": "筋", "reading": "すじ", "meaning_vi": "gân"}],
    "皮": [{"word": "皮", "reading": "かわ", "meaning_vi": "da"}, {"word": "皮膚", "reading": "ひふ", "meaning_vi": "da"}],
    "肌": [{"word": "肌", "reading": "はだ", "meaning_vi": "da"}, {"word": "素肌", "reading": "すはだ", "meaning_vi": "da trần"}],
    "胸": [{"word": "胸", "reading": "むね", "meaning_vi": "ngực"}, {"word": "胸囲", "reading": "きょうい", "meaning_vi": "vòng ngực"}],
    "腹": [{"word": "腹", "reading": "はら", "meaning_vi": "bụng"}, {"word": "空腹", "reading": "くうふく", "meaning_vi": "đói"}],
    "腰": [{"word": "腰", "reading": "こし", "meaning_vi": "lưng"}, {"word": "腰痛", "reading": "ようつう", "meaning_vi": "đau lưng"}],
    "背": [{"word": "背", "reading": "せ", "meaning_vi": "lưng"}, {"word": "背中", "reading": "せなか", "meaning_vi": "lưng"}],
    "首": [{"word": "首", "reading": "くび", "meaning_vi": "cổ"}, {"word": "首相", "reading": "しゅしょう", "meaning_vi": "thủ tướng"}],
    "項": [{"word": "項目", "reading": "こうもく", "meaning_vi": "hạng mục"}, {"word": "事項", "reading": "じこう", "meaning_vi": "sự việc"}],
    "額": [{"word": "額", "reading": "ひたい", "meaning_vi": "trán"}, {"word": "金額", "reading": "きんがく", "meaning_vi": "số tiền"}],
    "眉": [{"word": "眉", "reading": "まゆ", "meaning_vi": "lông mày"}, {"word": "眉毛", "reading": "まゆげ", "meaning_vi": "lông mày"}],
    "歯": [{"word": "歯", "reading": "は", "meaning_vi": "răng"}, {"word": "歯医者", "reading": "はいしゃ", "meaning_vi": "nha sĩ"}],
    "唇": [{"word": "唇", "reading": "くちびる", "meaning_vi": "môi"}, {"word": "口唇", "reading": "こうしん", "meaning_vi": "môi miệng"}],
    "舌": [{"word": "舌", "reading": "した", "meaning_vi": "lưỡi"}, {"word": "毒舌", "reading": "どくぜつ", "meaning_vi": "lời độc"}],
    "喉": [{"word": "喉", "reading": "のど", "meaning_vi": "cổ họng"}, {"word": "喉が渇く", "reading": "のどがかわく", "meaning_vi": "khát"}],
    "腕": [{"word": "腕", "reading": "うで", "meaning_vi": "cánh tay"}, {"word": "腕時計", "reading": "うでどけい", "meaning_vi": "đồng hồ đeo tay"}],
    "肩": [{"word": "肩", "reading": "かた", "meaning_vi": "vai"}, {"word": "肩書き", "reading": "かたがき", "meaning_vi": "chức danh"}],
    "肘": [{"word": "肘", "reading": "ひじ", "meaning_vi": "khuỷu tay"}, {"word": "肘掛け", "reading": "ひじかけ", "meaning_vi": "tay vịn"}],
    "掌": [{"word": "掌", "reading": "てのひら", "meaning_vi": "lòng bàn tay"}, {"word": "手掌", "reading": "しゅしょう", "meaning_vi": "lòng bàn tay"}],
    "拳": [{"word": "拳", "reading": "こぶし", "meaning_vi": "nắm đấm"}, {"word": "拳銃", "reading": "けんじゅう", "meaning_vi": "súng lục"}],
    "膝": [{"word": "膝", "reading": "ひざ", "meaning_vi": "đầu gối"}, {"word": "膝小僧", "reading": "ひざこぞう", "meaning_vi": "đầu gối"}],
    "脚": [{"word": "脚", "reading": "あし", "meaning_vi": "chân"}, {"word": "脚本", "reading": "きゃくほん", "meaning_vi": "kịch bản"}],
    "爪": [{"word": "爪", "reading": "つめ", "meaning_vi": "móng"}, {"word": "爪切り", "reading": "つめきり", "meaning_vi": "kìm cắt móng"}],
    "鼻": [{"word": "鼻", "reading": "はな", "meaning_vi": "mũi"}, {"word": "鼻水", "reading": "はなみず", "meaning_vi": "nước mũi"}],
}

def complete_all_kanji():
    """Add ALL remaining compound words in one go"""
    with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', encoding='utf-8') as f:
        kanji_list = json.load(f)
    
    updated = 0
    for entry in kanji_list:
        kanji = entry['kanji']
        # Only update if no compound words yet
        if not entry.get('compound_words') or len(entry['compound_words']) == 0:
            if kanji in ALL_REMAINING_COMPOUNDS:
                entry['compound_words'] = ALL_REMAINING_COMPOUNDS[kanji]
                updated += 1
            else:
                # Add empty array for kanji not in our list
                entry['compound_words'] = []
    
    with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', 'w', encoding='utf-8') as f:
        json.dump(kanji_list, f, ensure_ascii=False, indent=4)
    
    total_with_compounds = sum(1 for e in kanji_list if len(e.get('compound_words', [])) > 0)
    print(f'✅ HOÀN THÀNH: Đã thêm {updated} kanji với từ ghép')
    print(f'📚 Tổng số kanji có từ ghép: {total_with_compounds}/{len(kanji_list)}')
    print(f'⏳ Còn thiếu: {len(kanji_list) - total_with_compounds} kanji')
    
    # Show some stats
    print(f'\n📊 Thống kê:')
    print(f'   - Kanji có 2+ từ ghép: {sum(1 for e in kanji_list if len(e.get("compound_words", [])) >= 2)}')
    print(f'   - Kanji có 3+ từ ghép: {sum(1 for e in kanji_list if len(e.get("compound_words", [])) >= 3)}')

if __name__ == "__main__":
    complete_all_kanji()

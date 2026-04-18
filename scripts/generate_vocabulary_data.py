import json
import os

def generate_vocabulary():
    base_path = r"d:\học tiếng nhật\src\data\vocabulary"
    
    # Realistic N5 Vocabulary with image/audio placeholders
    n5_words = [
        {"k": "私", "f": "わたし", "r": "watashi", "m": "Tôi", "cat": "Pronoun", "ex": "私は学生です。"},
        {"k": "学生", "f": "がくせい", "r": "gakusei", "m": "Học sinh, sinh viên", "cat": "Occupation", "ex": "彼は日本語の学生です。"},
        {"k": "先生", "f": "せんせい", "r": "sensei", "m": "Giáo viên, bác sĩ", "cat": "Occupation", "ex": "タナカ先生は優しいです。"},
        {"k": "学校", "f": "がっこう", "r": "gakkou", "m": "Trường học", "cat": "Place", "ex": "バスで学校へ行きます。"},
        {"k": "勉強", "f": "べんきょう", "r": "benkyou", "m": "Học tập", "cat": "Action", "ex": "日本語を勉強します。"},
        {"k": "日本", "f": "にほん", "r": "nihon", "m": "Nhật Bản", "cat": "Country", "ex": "日本へ行きたいです。"},
        {"k": "今日", "f": "きょう", "r": "kyou", "m": "Hôm nay", "cat": "Time", "ex": "今日はいい天気です。"},
        {"k": "明日", "f": "あした", "r": "ashita", "m": "Ngày mai", "cat": "Time", "ex": "明日は日曜日です。"},
        {"k": "昨日", "f": "きのう", "r": "kinou", "m": "Hôm qua", "cat": "Time", "ex": "昨日は雨でした。"},
        {"k": "食べる", "f": "たべる", "r": "taberu", "m": "Ăn", "cat": "Action", "ex": "朝ごはんを食べました。"},
        {"k": "飲む", "f": "のむ", "r": "nomu", "m": "Uống", "cat": "Action", "ex": "コーヒーを飲みます。"},
        {"k": "見る", "f": "みる", "r": "miru", "m": "Xem, nhìn", "cat": "Action", "ex": "テレビを見ます。"},
        {"k": "聞く", "f": "きく", "r": "kiku", "m": "Nghe, hỏi", "cat": "Action", "ex": "音楽を聞きます。"},
        {"k": "行く", "f": "いく", "r": "iku", "m": "Đi", "cat": "Action", "ex": "どこへ行きますか。"},
        {"k": "来る", "f": "くる", "r": "kuru", "m": "Đến", "cat": "Action", "ex": "日本へ来ました。"},
        {"k": "帰る", "f": "かえる", "r": "kaeru", "m": "Về", "cat": "Action", "ex": "うちへ帰ります。"},
        {"k": "友達", "f": "ともだち", "r": "tomodachi", "m": "Bạn bè", "cat": "Person", "ex": "友達と遊びます。"},
        {"k": "時間", "f": "じかん", "r": "jikan", "m": "Thời gian", "cat": "Time", "ex": "時間がありません。"},
        {"k": "お金", "f": "おかね", "r": "okane", "m": "Tiền", "cat": "Object", "ex": "お金が欲しいです。"},
        {"k": "猫", "f": "ねこ", "r": "neko", "m": "Con mèo", "cat": "Animal", "ex": "猫が好きです。"},
        {"k": "犬", "f": "いぬ", "r": "inu", "m": "Con chó", "cat": "Animal", "ex": "犬がいます。"},
        {"k": "山", "f": "やま", "r": "yama", "m": "Núi", "cat": "Nature", "ex": "富士山は高いです。"},
        {"k": "川", "f": "かわ", "r": "kawa", "m": "Sông", "cat": "Nature", "ex": "川で泳ぎます。"},
        {"k": "花", "f": "はな", "r": "hana", "m": "Hoa", "cat": "Nature", "ex": "桜の花が咲きました。"},
        {"k": "雨", "f": "あめ", "r": "ame", "m": "Mưa", "cat": "Nature", "ex": "雨が降っています。"},
        {"k": "雪", "f": "ゆき", "r": "yuki", "m": "Tuyết", "cat": "Nature", "ex": "雪が降りました。"},
        {"k": "風", "f": "かぜ", "r": "kaze", "m": "Gió", "cat": "Nature", "ex": "風が強いです。"},
        {"k": "空", "f": "そら", "r": "sora", "m": "Bầu trời", "cat": "Nature", "ex": "青い空がきれいです。"},
        {"k": "月", "f": "つき", "r": "tsuki", "m": "Mặt trăng", "cat": "Nature", "ex": "月が丸いです。"},
        {"k": "星", "f": "ほし", "r": "hoshi", "m": "Ngôi sao", "cat": "Nature", "ex": "星が輝いています。"},
        {"k": "手", "f": "て", "r": "te", "m": "Tay", "cat": "Body Part", "ex": "手を洗います。"},
        {"k": "足", "f": "あし", "r": "ashi", "m": "Chân", "cat": "Body Part", "ex": "足が痛いです。"},
        {"k": "目", "f": "め", "r": "me", "m": "Mắt", "cat": "Body Part", "ex": "目が大きいです。"},
        {"k": "耳", "f": "みみ", "r": "mimi", "m": "Tai", "cat": "Body Part", "ex": "耳が遠いです。"},
        {"k": "口", "f": "くち", "r": "kuchi", "m": "Miệng", "cat": "Body Part", "ex": "口を開けてください。"},
        {"k": "鼻", "f": "はな", "r": "hana", "m": "Mũi", "cat": "Body Part", "ex": "鼻が高いです。"},
        {"k": "父", "f": "ちち", "r": "chichi", "m": "Bố (mình)", "cat": "Family", "ex": "父は医者です。"},
        {"k": "母", "f": "はは", "r": "haha", "m": "Mẹ (mình)", "cat": "Family", "ex": "母は料理が得意です。"},
        {"k": "兄", "f": "あに", "r": "ani", "m": "Anh trai (mình)", "cat": "Family", "ex": "兄は東京に住んでいます。"},
        {"k": "姉", "f": "あね", "r": "ane", "m": "Chị gái (mình)", "cat": "Family", "ex": "姉は結婚しています。"},
        {"k": "弟", "f": "おとうと", "r": "otouto", "m": "Em trai (mình)", "cat": "Family", "ex": "弟は小学生です。"},
        {"k": "妹", "f": "いもうと", "r": "imouto", "m": "Em gái (mình)", "cat": "Family", "ex": "妹は可愛いですね。"},
        {"k": "家族", "f": "かぞく", "r": "kazoku", "m": "Gia đình", "cat": "Family", "ex": "家族は何人ですか。"},
        {"k": "部屋", "f": "へや", "r": "heya", "m": "Căn phòng", "cat": "Place", "ex": "私の部屋は広いです。"},
        {"k": "机", "f": "つくえ", "r": "tsukue", "m": "Cái bàn", "cat": "Object", "ex": "机の上に本があります。"},
        {"k": "椅子", "f": "いす", "r": "isu", "m": "Cái ghế", "cat": "Object", "ex": "椅子に座ってください。"},
        {"k": "電話", "f": "でんわ", "r": "denwa", "m": "Điện thoại", "cat": "Object", "ex": "電話をかけます。"},
        {"k": "辞書", "f": "じしょ", "r": "jisho", "m": "Từ điển", "cat": "Object", "ex": "辞書で調べます。"},
        {"k": "車", "f": "くるま", "r": "kuruma", "m": "Xe ô tô", "cat": "Vehicle", "ex": "車を運転します。"},
        {"k": "自転車", "f": "じてんしゃ", "r": "jitensha", "m": "Xe đạp", "cat": "Vehicle", "ex": "自転車に乗ります。"},
    ]

    levels = {
        "n5": n5_words
    }

    if not os.path.exists(base_path):
        os.makedirs(base_path)

    for level, words in levels.items():
        ts_content = f'import {{ Vocabulary }} from "@/types";\n\n'
        ts_content += f'export const vocabulary_{level}: Vocabulary[] = [\n'
        
        for i, w in enumerate(words):
            ex_sentences = []
            if "ex" in w:
                 ex_sentences.append(f'{{ ja: "{w["ex"]}", vi: "{w["m"]}", romaji: "" }}') # Simple placeholder for example romaji
            
            examples_str = f'[{", ".join(ex_sentences)}]' if ex_sentences else '[]'

            ts_content += f'''    {{
        id: "{level}_{str(i+1).zfill(3)}",
        kanji: "{w['k']}",
        furigana: "{w['f']}",
        romaji: "{w['r']}",
        meaning_vi: "{w['m']}",
        jlpt_level: "{level.upper()}",
        category: "{w['cat']}",
        audio_url: "/audio/vocab/{level}/{str(i+1).zfill(3)}.mp3",
        image_url: "https://placehold.co/400x300?text={w['r']}", 
        examples: {examples_str}
    }},
'''
        ts_content += '];\n'
        
        file_path = os.path.join(base_path, f"voc_{level}.ts")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(ts_content)
        print(f"✅ Generated {file_path} with {len(words)} items.")

if __name__ == "__main__":
    generate_vocabulary()

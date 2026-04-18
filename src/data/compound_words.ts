/**
 * Compound Words Database
 * Từ ghép sử dụng các kanji N5 và N4
 */

export interface CompoundWord {
    kanji: string;          // Từ ghép bằng kanji (e.g., "日本")
    reading: string;        // Cách đọc furigana (e.g., "にほん")
    meaning_vi: string;     // Nghĩa tiếng Việt
    contains_kanji: string; // Kanji liên quan
}

/**
 * Get compound words for a specific kanji
 */
export function getCompoundWords(kanji: string): CompoundWord[] {
    return compoundWordsDatabase[kanji] || [];
}

/**
 * Database of compound words organized by kanji
 */
export const compoundWordsDatabase: Record<string, CompoundWord[]> = {
    // 日 - Day, Sun
    '日': [
        { kanji: '日本', reading: 'にほん', meaning_vi: 'Nhật Bản', contains_kanji: '日' },
        { kanji: '日本語', reading: 'にほんご', meaning_vi: 'Tiếng Nhật', contains_kanji: '日' },
        { kanji: '今日', reading: 'きょう', meaning_vi: 'Hôm nay', contains_kanji: '日' },
        { kanji: '明日', reading: 'あした', meaning_vi: 'Ngày mai', contains_kanji: '日' },
        { kanji: '毎日', reading: 'まいにち', meaning_vi: 'Mỗi ngày', contains_kanji: '日' },
        { kanji: '休日', reading: 'きゅうじつ', meaning_vi: 'Ngày nghỉ', contains_kanji: '日' },
    ],

    // 本 - Book, Origin
    '本': [
        { kanji: '日本', reading: 'にほん', meaning_vi: 'Nhật Bản', contains_kanji: '本' },
        { kanji: '本屋', reading: 'ほんや', meaning_vi: 'Nhà sách', contains_kanji: '本' },
        { kanji: '本当', reading: 'ほんとう', meaning_vi: 'Thật sự', contains_kanji: '本' },
        { kanji: '絵本', reading: 'えほん', meaning_vi: 'Sách tranh', contains_kanji: '本' },
        { kanji: '見本', reading: 'みほん', meaning_vi: 'Mẫu', contains_kanji: '本' },
    ],

    // 語 - Language
    '語': [
        { kanji: '日本語', reading: 'にほんご', meaning_vi: 'Tiếng Nhật', contains_kanji: '語' },
        { kanji: '英語', reading: 'えいご', meaning_vi: 'Tiếng Anh', contains_kanji: '語' },
        { kanji: '中国語', reading: 'ちゅうごくご', meaning_vi: 'Tiếng Trung', contains_kanji: '語' },
        { kanji: '物語', reading: 'ものがたり', meaning_vi: 'Câu chuyện', contains_kanji: '語' },
        { kanji: '会話', reading: 'かいわ', meaning_vi: 'Hội thoại', contains_kanji: '語' },
    ],

    // 学 - Study
    '学': [
        { kanji: '学生', reading: 'がくせい', meaning_vi: 'Học sinh, sinh viên', contains_kanji: '学' },
        { kanji: '学校', reading: 'がっこう', meaning_vi: 'Trường học', contains_kanji: '学' },
        { kanji: '大学', reading: 'だいがく', meaning_vi: 'Đại học', contains_kanji: '学' },
        { kanji: '小学校', reading: 'しょうがっこう', meaning_vi: 'Trường tiểu học', contains_kanji: '学' },
        { kanji: '科学', reading: 'かがく', meaning_vi: 'Khoa học', contains_kanji: '学' },
    ],

    // 先 - Before, Teacher
    '先': [
        { kanji: '先生', reading: 'せんせい', meaning_vi: 'Thầy giáo, giáo viên', contains_kanji: '先' },
        { kanji: '先週', reading: 'せんしゅう', meaning_vi: 'Tuần trước', contains_kanji: '先' },
        { kanji: '先月', reading: 'せんげつ', meaning_vi: 'Tháng trước', contains_kanji: '先' },
        { kanji: '優先', reading: 'ゆうせん', meaning_vi: 'Ưu tiên', contains_kanji: '先' },
    ],

    // 人 - Person
    '人': [
        { kanji: '日本人', reading: 'にほんじん', meaning_vi: 'Người Nhật', contains_kanji: '人' },
        { kanji: '外国人', reading: 'がいこくじん', meaning_vi: 'Người nước ngoài', contains_kanji: '人' },
        { kanji: '一人', reading: 'ひとり', meaning_vi: 'Một người', contains_kanji: '人' },
        { kanji: '二人', reading: 'ふたり', meaning_vi: 'Hai người', contains_kanji: '人' },
        { kanji: '大人', reading: 'おとな', meaning_vi: 'Người lớn', contains_kanji: '人' },
    ],

    // 生 - Life, Birth, Student
    '生': [
        { kanji: '学生', reading: 'がくせい', meaning_vi: 'Học sinh', contains_kanji: '生' },
        { kanji: '先生', reading: 'せんせい', meaning_vi: 'Giáo viên', contains_kanji: '生' },
        { kanji: '生活', reading: 'せいかつ', meaning_vi: 'Cuộc sống', contains_kanji: '生' },
        { kanji: '一生', reading: 'いっしょう', meaning_vi: 'Cả đời', contains_kanji: '生' },
        { kanji: '誕生日', reading: 'たんじょうび', meaning_vi: 'Ngày sinh nhật', contains_kanji: '生' },
    ],

    // 年 - Year
    '年': [
        { kanji: '今年', reading: 'ことし', meaning_vi: 'Năm nay', contains_kanji: '年' },
        { kanji: '来年', reading: 'らいねん', meaning_vi: 'Năm sau', contains_kanji: '年' },
        { kanji: '去年', reading: 'きょねん', meaning_vi: 'Năm ngoái', contains_kanji: '年' },
        { kanji: '毎年', reading: 'まいとし', meaning_vi: 'Mỗi năm', contains_kanji: '年' },
        { kanji: '青年', reading: 'せいねん', meaning_vi: 'Thanh niên', contains_kanji: '年' },
    ],

    // 時 - Time, Hour
    '時': [
        { kanji: '時間', reading: 'じかん', meaning_vi: 'Thời gian', contains_kanji: '時' },
        { kanji: '時計', reading: 'とけい', meaning_vi: 'Đồng hồ', contains_kanji: '時' },
        { kanji: '何時', reading: 'なんじ', meaning_vi: 'Mấy giờ', contains_kanji: '時' },
        { kanji: '同時', reading: 'どうじ', meaning_vi: 'Cùng lúc', contains_kanji: '時' },
    ],

    // 月 - Month, Moon
    '月': [
        { kanji: '一月', reading: 'いちがつ', meaning_vi: 'Tháng 1', contains_kanji: '月' },
        { kanji: '先月', reading: 'せんげつ', meaning_vi: 'Tháng trước', contains_kanji: '月' },
        { kanji: '来月', reading: 'らいげつ', meaning_vi: 'Tháng sau', contains_kanji: '月' },
        { kanji: '毎月', reading: 'まいつき', meaning_vi: 'Mỗi tháng', contains_kanji: '月' },
        { kanji: '月曜日', reading: 'げつようび', meaning_vi: 'Thứ hai', contains_kanji: '月' },
    ],

    // 会 - Meet, Association
    '会': [
        { kanji: '会社', reading: 'かいしゃ', meaning_vi: 'Công ty', contains_kanji: '会' },
        { kanji: '会話', reading: 'かいわ', meaning_vi: 'Hội thoại', contains_kanji: '会' },
        { kanji: '社会', reading: 'しゃかい', meaning_vi: 'Xã hội', contains_kanji: '会' },
        { kanji: '会議', reading: 'かいぎ', meaning_vi: 'Cuộc họp', contains_kanji: '会' },
    ],

    // 話 - Talk, Story
    '話': [
        { kanji: '会話', reading: 'かいわ', meaning_vi: 'Hội thoại', contains_kanji: '話' },
        { kanji: '電話', reading: 'でんわ', meaning_vi: 'Điện thoại', contains_kanji: '話' },
        { kanji: '話題', reading: 'わだい', meaning_vi: 'Chủ đề', contains_kanji: '話' },
        { kanji: '昔話', reading: 'むかしばなし', meaning_vi: 'Chuyện xưa', contains_kanji: '話' },
    ],

    // 校 - School
    '校': [
        { kanji: '学校', reading: 'がっこう', meaning_vi: 'Trường học', contains_kanji: '校' },
        { kanji: '小学校', reading: 'しょうがっこう', meaning_vi: 'Trường tiểu học', contains_kanji: '校' },
        { kanji: '中学校', reading: 'ちゅうがっこう', meaning_vi: 'Trường cấp 2', contains_kanji: '校' },
        { kanji: '高校', reading: 'こうこう', meaning_vi: 'Trường cấp 3', contains_kanji: '校' },
    ],

    // 車 - Car, Vehicle
    '車': [
        { kanji: '電車', reading: 'でんしゃ', meaning_vi: 'Tàu điện', contains_kanji: '車' },
        { kanji: '自転車', reading: 'じてんしゃ', meaning_vi: 'Xe đạp', contains_kanji: '車' },
        { kanji: '駐車場', reading: 'ちゅうしゃじょう', meaning_vi: 'Bãi đỗ xe', contains_kanji: '車' },
        { kanji: '自動車', reading: 'じどうしゃ', meaning_vi: 'Ô tô', contains_kanji: '車' },
    ],

    // 電 - Electricity
    '電': [
        { kanji: '電車', reading: 'でんしゃ', meaning_vi: 'Tàu điện', contains_kanji: '電' },
        { kanji: '電話', reading: 'でんわ', meaning_vi: 'Điện thoại', contains_kanji: '電' },
        { kanji: '電気', reading: 'でんき', meaning_vi: 'Điện', contains_kanji: '電' },
        { kanji: '電池', reading: 'でんち', meaning_vi: 'Pin', contains_kanji: '電' },
    ],

    // 駅 - Station
    '駅': [
        { kanji: '駅前', reading: 'えきまえ', meaning_vi: 'Trước ga', contains_kanji: '駅' },
        { kanji: '東京駅', reading: 'とうきょうえき', meaning_vi: 'Ga Tokyo', contains_kanji: '駅' },
        { kanji: '駅員', reading: 'えきいん', meaning_vi: 'Nhân viên ga', contains_kanji: '駅' },
    ],

    // 店 - Shop
    '店': [
        { kanji: '本店', reading: 'ほんてん', meaning_vi: 'Cửa hàng chính', contains_kanji: '店' },
        { kanji: '喫茶店', reading: 'きっさてん', meaning_vi: 'Quán cà phê', contains_kanji: '店' },
        { kanji: '書店', reading: 'しょてん', meaning_vi: 'Nhà sách', contains_kanji: '店' },
        { kanji: '店員', reading: 'てんいん', meaning_vi: 'Nhân viên cửa hàng', contains_kanji: '店' },
    ],

    // 国 - Country
    '国': [
        { kanji: '外国', reading: 'がいこく', meaning_vi: 'Nước ngoài', contains_kanji: '国' },
        { kanji: '中国', reading: 'ちゅうごく', meaning_vi: 'Trung Quốc', contains_kanji: '国' },
        { kanji: '韓国', reading: 'かんこく', meaning_vi: 'Hàn Quốc', contains_kanji: '国' },
        { kanji: '国際', reading: 'こくさい', meaning_vi: 'Quốc tế', contains_kanji: '国' },
    ],

    // 町 - Town
    '町': [
        { kanji: '町長', reading: 'ちょうちょう', meaning_vi: 'Trưởng thị trấn', contains_kanji: '町' },
        { kanji: '下町', reading: 'したまち', meaning_vi: 'Khu phố cũ', contains_kanji: '町' },
        { kanji: '町並み', reading: 'まちなみ', meaning_vi: 'Dãy phố', contains_kanji: '町' },
    ],

    // 東 - East
    '東': [
        { kanji: '東京', reading: 'とうきょう', meaning_vi: 'Tokyo (đông kinh)', contains_kanji: '東' },
        { kanji: '東口', reading: 'ひがしぐち', meaning_vi: 'Cửa đông', contains_kanji: '東' },
        { kanji: '関東', reading: 'かんとう', meaning_vi: 'Khu vực Kanto', contains_kanji: '東' },
    ],

    // 西 - West
    '西': [
        { kanji: '西口', reading: 'にしぐち', meaning_vi: 'Cửa tây', contains_kanji: '西' },
        { kanji: '関西', reading: 'かんさい', meaning_vi: 'Khu vực Kansai', contains_kanji: '西' },
        { kanji: '西洋', reading: 'せいよう', meaning_vi: 'Phương Tây', contains_kanji: '西' },
    ],

    // 読 - Read
    '読': [
        { kanji: '読書', reading: 'どくしょ', meaning_vi: 'Đọc sách', contains_kanji: '読' },
        { kanji: '音読', reading: 'おんどく', meaning_vi: 'Đọc to', contains_kanji: '読' },
        { kanji: '訓読', reading: 'くんどく', meaning_vi: 'Cách đọc kun', contains_kanji: '読' },
    ],

    // 書 - Write
    '書': [
        { kanji: '読書', reading: 'どくしょ', meaning_vi: 'Đọc sách', contains_kanji: '書' },
        { kanji: '教科書', reading: 'きょうかしょ', meaning_vi: 'Sách giáo khoa', contains_kanji: '書' },
        { kanji: '辞書', reading: 'じしょ', meaning_vi: 'Từ điển', contains_kanji: '書' },
        { kanji: '図書館', reading: 'としょかん', meaning_vi: 'Thư viện', contains_kanji: '書' },
    ],

    // 見 - See, Look
    '見': [
        { kanji: '見学', reading: 'けんがく', meaning_vi: 'Tham quan học tập', contains_kanji: '見' },
        { kanji: '見物', reading: 'けんぶつ', meaning_vi: 'Tham quan', contains_kanji: '見' },
        { kanji: '意見', reading: 'いけん', meaning_vi: 'Ý kiến', contains_kanji: '見' },
    ],

    // 食 - Eat, Food
    '食': [
        { kanji: '食事', reading: 'しょくじ', meaning_vi: 'Bữa ăn', contains_kanji: '食' },
        { kanji: '食堂', reading: 'しょくどう', meaning_vi: 'Nhà ăn', contains_kanji: '食' },
        { kanji: '朝食', reading: 'ちょうしょく', meaning_vi: 'Bữa sáng', contains_kanji: '食' },
        { kanji: '夕食', reading: 'ゆうしょく', meaning_vi: 'Bữa tối', contains_kanji: '食' },
    ],
};

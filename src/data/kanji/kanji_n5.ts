import { Kanji } from "@/types";

/**
 * JLPT N5 Kanji - 80 Essential Characters
 * The most basic kanji for beginners
 */

export const kanji_n5: Kanji[] = [
    // Numbers (1-10)
    { id: 'n5_001', kanji: '一', on_yomi: ['イチ', 'イツ'], kun_yomi: ['ひと', 'ひと.つ'], meaning_vi: 'Một', stroke_count: 1, jlpt_level: 'N5' },
    { id: 'n5_002', kanji: '二', on_yomi: ['ニ', 'ジ'], kun_yomi: ['ふた', 'ふた.つ'], meaning_vi: 'Hai', stroke_count: 2, jlpt_level: 'N5' },
    { id: 'n5_003', kanji: '三', on_yomi: ['サン'], kun_yomi: ['み', 'み.つ'], meaning_vi: 'Ba', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_004', kanji: '四', on_yomi: ['シ'], kun_yomi: ['よ', 'よ.つ', 'よん'], meaning_vi: 'Bốn', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_005', kanji: '五', on_yomi: ['ゴ'], kun_yomi: ['いつ', 'いつ.つ'], meaning_vi: 'Năm', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_006', kanji: '六', on_yomi: ['ロク'], kun_yomi: ['む', 'む.つ'], meaning_vi: 'Sáu', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_007', kanji: '七', on_yomi: ['シチ'], kun_yomi: ['なな', 'なな.つ'], meaning_vi: 'Bảy', stroke_count: 2, jlpt_level: 'N5' },
    { id: 'n5_008', kanji: '八', on_yomi: ['ハチ'], kun_yomi: ['や', 'や.つ'], meaning_vi: 'Tám', stroke_count: 2, jlpt_level: 'N5' },
    { id: 'n5_009', kanji: '九', on_yomi: ['キュウ', 'ク'], kun_yomi: ['ここの', 'ここの.つ'], meaning_vi: 'Chín', stroke_count: 2, jlpt_level: 'N5' },
    { id: 'n5_010', kanji: '十', on_yomi: ['ジュウ', 'ジッ'], kun_yomi: ['とお', 'と'], meaning_vi: 'Mười', stroke_count: 2, jlpt_level: 'N5' },
    { id: 'n5_011', kanji: '百', on_yomi: ['ヒャク'], kun_yomi: [], meaning_vi: 'Trăm', stroke_count: 6, jlpt_level: 'N5' },
    { id: 'n5_012', kanji: '千', on_yomi: ['セン'], kun_yomi: ['ち'], meaning_vi: 'Ngàn', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_013', kanji: '万', on_yomi: ['マン', 'バン'], kun_yomi: [], meaning_vi: 'Vạn (mười ngàn)', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_014', kanji: '円', on_yomi: ['エン'], kun_yomi: ['まる'], meaning_vi: 'Yên, tròn', stroke_count: 4, jlpt_level: 'N5' },

    // Time
    { id: 'n5_015', kanji: '日', on_yomi: ['ニチ', 'ジツ'], kun_yomi: ['ひ', 'び', 'か'], meaning_vi: 'Ngày, mặt trời', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_016', kanji: '月', on_yomi: ['ゲツ', 'ガツ'], kun_yomi: ['つき'], meaning_vi: 'Tháng, mặt trăng', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_017', kanji: '火', on_yomi: ['カ'], kun_yomi: ['ひ', 'ほ'], meaning_vi: 'Lửa, thứ ba', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_018', kanji: '水', on_yomi: ['スイ'], kun_yomi: ['みず'], meaning_vi: 'Nước, thứ tư', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_019', kanji: '木', on_yomi: ['モク', 'ボク'], kun_yomi: ['き', 'こ'], meaning_vi: 'Cây, thứ năm', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_020', kanji: '金', on_yomi: ['キン', 'コン'], kun_yomi: ['かね', 'かな'], meaning_vi: 'Vàng, tiền, thứ sáu', stroke_count: 8, jlpt_level: 'N5' },
    { id: 'n5_021', kanji: '土', on_yomi: ['ド', 'ト'], kun_yomi: ['つち'], meaning_vi: 'Đất, thứ bảy', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_022', kanji: '年', on_yomi: ['ネン'], kun_yomi: ['とし'], meaning_vi: 'Năm', stroke_count: 6, jlpt_level: 'N5' },
    { id: 'n5_023', kanji: '時', on_yomi: ['ジ'], kun_yomi: ['とき'], meaning_vi: 'Giờ, thời gian', stroke_count: 10, jlpt_level: 'N5' },
    { id: 'n5_024', kanji: '分', on_yomi: ['ブン', 'フン'], kun_yomi: ['わ.ける', 'わ.かる'], meaning_vi: 'Phút, phần', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_025', kanji: '今', on_yomi: ['コン', 'キン'], kun_yomi: ['いま'], meaning_vi: 'Bây giờ', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_026', kanji: '半', on_yomi: ['ハン'], kun_yomi: ['なか.ば'], meaning_vi: 'Nửa', stroke_count: 5, jlpt_level: 'N5' },

    // People & Body
    { id: 'n5_027', kanji: '人', on_yomi: ['ジン', 'ニン'], kun_yomi: ['ひと'], meaning_vi: 'Người', stroke_count: 2, jlpt_level: 'N5' },
    { id: 'n5_028', kanji: '男', on_yomi: ['ダン', 'ナン'], kun_yomi: ['おとこ'], meaning_vi: 'Nam, đàn ông', stroke_count: 7, jlpt_level: 'N5' },
    { id: 'n5_029', kanji: '女', on_yomi: ['ジョ', 'ニョ'], kun_yomi: ['おんな', 'め'], meaning_vi: 'Nữ, đàn bà', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_030', kanji: '子', on_yomi: ['シ', 'ス'], kun_yomi: ['こ'], meaning_vi: 'Con, trẻ em', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_031', kanji: '目', on_yomi: ['モク', 'ボク'], kun_yomi: ['め'], meaning_vi: 'Mắt', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_032', kanji: '耳', on_yomi: ['ジ'], kun_yomi: ['みみ'], meaning_vi: 'Tai', stroke_count: 6, jlpt_level: 'N5' },
    { id: 'n5_033', kanji: '口', on_yomi: ['コウ', 'ク'], kun_yomi: ['くち'], meaning_vi: 'Miệng', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_034', kanji: '手', on_yomi: ['シュ'], kun_yomi: ['て'], meaning_vi: 'Tay', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_035', kanji: '足', on_yomi: ['ソク'], kun_yomi: ['あし', 'た.りる'], meaning_vi: 'Chân, đủ', stroke_count: 7, jlpt_level: 'N5' },
    { id: 'n5_036', kanji: '力', on_yomi: ['リョク', 'リキ'], kun_yomi: ['ちから'], meaning_vi: 'Sức mạnh, lực', stroke_count: 2, jlpt_level: 'N5' },

    // Nature & Direction
    { id: 'n5_037', kanji: '山', on_yomi: ['サン'], kun_yomi: ['やま'], meaning_vi: 'Núi', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_038', kanji: '川', on_yomi: ['セン'], kun_yomi: ['かわ'], meaning_vi: 'Sông', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_039', kanji: '田', on_yomi: ['デン'], kun_yomi: ['た'], meaning_vi: 'Ruộng', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_040', kanji: '天', on_yomi: ['テン'], kun_yomi: ['あま', 'あめ'], meaning_vi: 'Trời', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_041', kanji: '雨', on_yomi: ['ウ'], kun_yomi: ['あめ', 'あま'], meaning_vi: 'Mưa', stroke_count: 8, jlpt_level: 'N5' },
    { id: 'n5_042', kanji: '上', on_yomi: ['ジョウ'], kun_yomi: ['うえ', 'あ.がる', 'のぼ.る'], meaning_vi: 'Trên, lên', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_043', kanji: '下', on_yomi: ['カ', 'ゲ'], kun_yomi: ['した', 'さ.がる', 'くだ.る'], meaning_vi: 'Dưới, xuống', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_044', kanji: '中', on_yomi: ['チュウ'], kun_yomi: ['なか'], meaning_vi: 'Giữa, trong', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_045', kanji: '外', on_yomi: ['ガイ', 'ゲ'], kun_yomi: ['そと', 'はず.れる'], meaning_vi: 'Ngoài', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_046', kanji: '内', on_yomi: ['ナイ', 'ダイ'], kun_yomi: ['うち'], meaning_vi: 'Trong', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_047', kanji: '左', on_yomi: ['サ'], kun_yomi: ['ひだり'], meaning_vi: 'Trái', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_048', kanji: '右', on_yomi: ['ウ', 'ユウ'], kun_yomi: ['みぎ'], meaning_vi: 'Phải', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_049', kanji: '前', on_yomi: ['ゼン'], kun_yomi: ['まえ'], meaning_vi: 'Trước', stroke_count: 9, jlpt_level: 'N5' },
    { id: 'n5_050', kanji: '後', on_yomi: ['ゴ', 'コウ'], kun_yomi: ['のち', 'うし.ろ', 'あと'], meaning_vi: 'Sau', stroke_count: 9, jlpt_level: 'N5' },
    { id: 'n5_051', kanji: '東', on_yomi: ['トウ'], kun_yomi: ['ひがし'], meaning_vi: 'Đông', stroke_count: 8, jlpt_level: 'N5' },
    { id: 'n5_052', kanji: '西', on_yomi: ['セイ', 'サイ'], kun_yomi: ['にし'], meaning_vi: 'Tây', stroke_count: 6, jlpt_level: 'N5' },
    { id: 'n5_053', kanji: '南', on_yomi: ['ナン', 'ナ'], kun_yomi: ['みなみ'], meaning_vi: 'Nam', stroke_count: 9, jlpt_level: 'N5' },
    { id: 'n5_054', kanji: '北', on_yomi: ['ホク'], kun_yomi: ['きた'], meaning_vi: 'Bắc', stroke_count: 5, jlpt_level: 'N5' },

    // Basic Concepts
    { id: 'n5_055', kanji: '大', on_yomi: ['ダイ', 'タイ'], kun_yomi: ['おお.きい'], meaning_vi: 'To, lớn', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_056', kanji: '小', on_yomi: ['ショウ'], kun_yomi: ['ちい.さい', 'こ', 'お'], meaning_vi: 'Nhỏ bé', stroke_count: 3, jlpt_level: 'N5' },
    { id: 'n5_057', kanji: '高', on_yomi: ['コウ'], kun_yomi: ['たか.い'], meaning_vi: 'Cao', stroke_count: 10, jlpt_level: 'N5' },
    { id: 'n5_058', kanji: '安', on_yomi: ['アン'], kun_yomi: ['やす.い'], meaning_vi: 'An, rẻ', stroke_count: 6, jlpt_level: 'N5' },
    { id: 'n5_059', kanji: '新', on_yomi: ['シン'], kun_yomi: ['あたら.しい', 'あら', 'にい'], meaning_vi: 'Mới', stroke_count: 13, jlpt_level: 'N5' },
    { id: 'n5_060', kanji: '古', on_yomi: ['コ'], kun_yomi: ['ふる.い'], meaning_vi: 'Cũ, cổ', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_061', kanji: '長', on_yomi: ['チョウ'], kun_yomi: ['なが.い'], meaning_vi: 'Dài, trưởng', stroke_count: 8, jlpt_level: 'N5' },
    { id: 'n5_062', kanji: '多', on_yomi: ['タ'], kun_yomi: ['おお.い'], meaning_vi: 'Nhiều', stroke_count: 6, jlpt_level: 'N5' },
    { id: 'n5_063', kanji: '少', on_yomi: ['ショウ'], kun_yomi: ['すく.ない', 'すこ.し'], meaning_vi: 'Ít', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_064', kanji: '白', on_yomi: ['ハク', 'ビャク'], kun_yomi: ['しろ', 'しろ.い'], meaning_vi: 'Trắng', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_065', kanji: '赤', on_yomi: ['セキ', 'シャク'], kun_yomi: ['あか', 'あか.い'], meaning_vi: 'Đỏ', stroke_count: 7, jlpt_level: 'N5' },

    // Learning & Language
    { id: 'n5_066', kanji: '本', on_yomi: ['ホン'], kun_yomi: ['もと'], meaning_vi: 'Sách, gốc', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_067', kanji: '語', on_yomi: ['ゴ'], kun_yomi: ['かた.る', 'かた.らう'], meaning_vi: 'Ngôn ngữ', stroke_count: 14, jlpt_level: 'N5' },
    { id: 'n5_068', kanji: '学', on_yomi: ['ガク'], kun_yomi: ['まな.ぶ'], meaning_vi: 'Học', stroke_count: 8, jlpt_level: 'N5' },
    { id: 'n5_069', kanji: '生', on_yomi: ['セイ', 'ショウ'], kun_yomi: ['い.きる', 'う.まれる', 'なま'], meaning_vi: 'Sinh, sống', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_070', kanji: '先', on_yomi: ['セン'], kun_yomi: ['さき', 'ま.ず'], meaning_vi: 'Trước, tiên sinh', stroke_count: 6, jlpt_level: 'N5' },
    { id: 'n5_071', kanji: '名', on_yomi: ['メイ', 'ミョウ'], kun_yomi: ['な'], meaning_vi: 'Tên', stroke_count: 6, jlpt_level: 'N5' },
    { id: 'n5_072', kanji: '文', on_yomi: ['ブン', 'モン'], kun_yomi: ['ふみ'], meaning_vi: 'Văn, chữ', stroke_count: 4, jlpt_level: 'N5' },
    { id: 'n5_073', kanji: '字', on_yomi: ['ジ'], kun_yomi: ['あざ'], meaning_vi: 'Chữ', stroke_count: 6, jlpt_level: 'N5' },

    // Actions & Verbs
    { id: 'n5_074', kanji: '出', on_yomi: ['シュツ', 'スイ'], kun_yomi: ['で.る', 'だ.す'], meaning_vi: 'Ra, xuất', stroke_count: 5, jlpt_level: 'N5' },
    { id: 'n5_075', kanji: '入', on_yomi: ['ニュウ'], kun_yomi: ['い.る', 'はい.る'], meaning_vi: 'Vào, nhập', stroke_count: 2, jlpt_level: 'N5' },
    { id: 'n5_076', kanji: '見', on_yomi: ['ケン'], kun_yomi: ['み.る'], meaning_vi: 'Nhìn, xem', stroke_count: 7, jlpt_level: 'N5' },
    { id: 'n5_077', kanji: '聞', on_yomi: ['ブン', 'モン'], kun_yomi: ['き.く'], meaning_vi: 'Nghe, hỏi', stroke_count: 14, jlpt_level: 'N5' },
    { id: 'n5_078', kanji: '食', on_yomi: ['ショク', 'ジキ'], kun_yomi: ['た.べる', 'く.う'], meaning_vi: 'Ăn', stroke_count: 9, jlpt_level: 'N5' },
    { id: 'n5_079', kanji: '飲', on_yomi: ['イン'], kun_yomi: ['の.む'], meaning_vi: 'Uống', stroke_count: 12, jlpt_level: 'N5' },
    { id: 'n5_080', kanji: '行', on_yomi: ['コウ', 'ギョウ'], kun_yomi: ['い.く', 'ゆ.く'], meaning_vi: 'Đi, hành', stroke_count: 6, jlpt_level: 'N5' },
];

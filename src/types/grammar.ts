export interface Grammar {
    id: string;
    title: string;
    description: string;
    jlpt_level: 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
    formation?: string; // Cấu trúc ngữ pháp (Vd: Vて + います)
    category?: string;  // Phân loại (Vd: Kính ngữ, Nguyên nhân)
    note?: string;      // Lưu ý, sắc thái, cách dòng đặc biệt
    examples: {
        jp: string;
        vi: string;
    }[];
}

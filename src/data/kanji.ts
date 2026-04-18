import { Kanji } from "@/types";
import { kanji_n5 } from "./kanji/kanji_n5";
import { kanji_n4 } from "./kanji/kanji_n4";
import { kanji_n3 } from "./kanji/kanji_n3";
import { kanji_n2 } from "./kanji/kanji_n2";
import { kanji_n1 } from "./kanji/kanji_n1";

// Export all kanji combined
export const mockKanji: Kanji[] = [
    ...kanji_n5,
    ...kanji_n4,
    ...kanji_n3,
    ...kanji_n2,
    ...kanji_n1
];

// All kanji combined (alias)
export const allKanji: Kanji[] = mockKanji;

// Export by level
export { kanji_n5, kanji_n4, kanji_n3, kanji_n2, kanji_n1 };

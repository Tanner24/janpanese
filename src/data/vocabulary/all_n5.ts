import { Vocabulary } from "@/types";
import { vocabulary_n5 } from "./voc_n5";
import { vocabulary_n5_part2 } from "./voc_n5_part2";
import { vocabulary_n5_part3 } from "./voc_n5_part3";

export const allN5Vocabulary: Vocabulary[] = [
    ...vocabulary_n5,
    ...vocabulary_n5_part2,
    ...vocabulary_n5_part3
];

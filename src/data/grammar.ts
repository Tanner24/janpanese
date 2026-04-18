import { Grammar } from "@/types/grammar";
import { grammar_n5 } from "./grammar/grammar_n5";
import { grammar_n4 } from "./grammar/grammar_n4";
import { grammar_n3 } from "./grammar/grammar_n3";
import { grammar_n2 } from "./grammar/grammar_n2";
import { grammar_n1 } from "./grammar/grammar_n1";

export const mockGrammar: Grammar[] = [
    ...grammar_n5,
    ...grammar_n4,
    ...grammar_n3,
    ...grammar_n2,
    ...grammar_n1,
];

export { grammar_n5, grammar_n4, grammar_n3, grammar_n2, grammar_n1 };

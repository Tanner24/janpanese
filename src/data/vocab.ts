/**
 * Main vocabulary export - combines all JLPT levels
 */

import { Vocabulary } from "@/types";
import { vocabN5 } from "./vocab_n5";
import { vocabN4 } from "./vocab_n4";

// Combine all vocabulary
export const allVocabulary: Vocabulary[] = [
    ...vocabN5,
    ...vocabN4,
];

// Export by level for filtering
export const vocabularyByLevel = {
    N5: vocabN5,
    N4: vocabN4,
    N3: [] as Vocabulary[], // TODO: Add N3
    N2: [] as Vocabulary[], // TODO: Add N2
    N1: [] as Vocabulary[], // TODO: Add N1
};

// Export by category
export function getVocabularyByCategory(category: string): Vocabulary[] {
    return allVocabulary.filter(v => v.category === category);
}

// Get all unique categories
export function getAllCategories(): string[] {
    const categories = new Set(allVocabulary.map(v => v.category).filter(Boolean));
    return Array.from(categories) as string[];
}

// Legacy export for backward compatibility
export const mockVocab = allVocabulary;

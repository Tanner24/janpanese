/**
 * Spaced Repetition System (SRS) using Leitner Box Algorithm
 * 
 * Box Levels and Review Intervals:
 * - Box 1: Review daily (new words, frequently wrong)
 * - Box 2: Review every 3 days
 * - Box 3: Review every week (7 days)
 * - Box 4: Review every 2 weeks (14 days)
 * - Box 5: Review monthly (30 days) - Mastered
 */

import { UserProgress } from '@/types';

// Review intervals in days for each box level
const REVIEW_INTERVALS: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 1,    // Daily
    2: 3,    // Every 3 days
    3: 7,    // Weekly
    4: 14,   // Bi-weekly
    5: 30,   // Monthly (mastered)
};

/**
 * Calculate the next review date based on box level and last review date
 */
export function getNextReviewDate(boxLevel: 1 | 2 | 3 | 4 | 5, lastReview: Date): Date {
    const interval = REVIEW_INTERVALS[boxLevel];
    const nextReview = new Date(lastReview);
    nextReview.setDate(nextReview.getDate() + interval);
    return nextReview;
}

/**
 * Update user progress based on answer correctness
 * Correct: Move up one box
 * Incorrect: Move down to box 1
 */
export function updateProgress(
    currentProgress: UserProgress | null,
    wordId: string,
    isCorrect: boolean
): UserProgress {
    const now = new Date();

    if (!currentProgress) {
        // First time seeing this word
        const boxLevel = isCorrect ? 2 : 1;
        return {
            wordId,
            boxLevel,
            lastReview: now.toISOString(),
            nextReview: getNextReviewDate(boxLevel, now).toISOString(),
            correctCount: isCorrect ? 1 : 0,
            wrongCount: isCorrect ? 0 : 1,
            firstSeen: now.toISOString(),
            status: boxLevel >= 2 ? 'learning' : 'new',
        };
    }

    // Update existing progress
    let newBoxLevel = currentProgress.boxLevel;

    if (isCorrect) {
        // Move up one box (max 5)
        newBoxLevel = Math.min(5, currentProgress.boxLevel + 1) as 1 | 2 | 3 | 4 | 5;
    } else {
        // Move back to box 1
        newBoxLevel = 1;
    }

    const correctCount = currentProgress.correctCount + (isCorrect ? 1 : 0);
    const wrongCount = currentProgress.wrongCount + (isCorrect ? 0 : 1);

    // Determine status
    let status: UserProgress['status'] = 'learning';
    if (newBoxLevel === 5) {
        status = 'mastered';
    } else if (newBoxLevel === 1 && correctCount === 0) {
        status = 'new';
    } else if (newBoxLevel >= 3) {
        status = 'review';
    }

    return {
        ...currentProgress,
        boxLevel: newBoxLevel,
        lastReview: now.toISOString(),
        nextReview: getNextReviewDate(newBoxLevel, now).toISOString(),
        correctCount,
        wrongCount,
        status,
    };
}

/**
 * Check if a word is due for review
 */
export function isDue(progress: UserProgress): boolean {
    const now = new Date();
    const nextReview = new Date(progress.nextReview);
    return now >= nextReview;
}

/**
 * Get all words that are due for review today
 */
export function getDueWords(allProgress: UserProgress[]): UserProgress[] {
    return allProgress.filter(isDue).sort((a, b) => {
        // Prioritize lower box levels (harder words)
        if (a.boxLevel !== b.boxLevel) {
            return a.boxLevel - b.boxLevel;
        }
        // Then by next review date (oldest first)
        return new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime();
    });
}

/**
 * Get words that haven't been seen yet (new words)
 */
export function getNewWords(
    allWordIds: string[],
    progressRecords: UserProgress[],
    limit: number = 10
): string[] {
    const seenWordIds = new Set(progressRecords.map(p => p.wordId));
    const newWords = allWordIds.filter(id => !seenWordIds.has(id));
    return newWords.slice(0, limit);
}

/**
 * Calculate accuracy rate
 */
export function getAccuracyRate(progress: UserProgress): number {
    const total = progress.correctCount + progress.wrongCount;
    if (total === 0) return 0;
    return (progress.correctCount / total) * 100;
}

/**
 * Get study statistics
 */
export function getStudyStats(allProgress: UserProgress[]): {
    totalWords: number;
    newWords: number;
    learningWords: number;
    reviewWords: number;
    masteredWords: number;
    dueToday: number;
    averageAccuracy: number;
} {
    const dueWords = getDueWords(allProgress);

    const stats = {
        totalWords: allProgress.length,
        newWords: allProgress.filter(p => p.status === 'new').length,
        learningWords: allProgress.filter(p => p.status === 'learning').length,
        reviewWords: allProgress.filter(p => p.status === 'review').length,
        masteredWords: allProgress.filter(p => p.status === 'mastered').length,
        dueToday: dueWords.length,
        averageAccuracy: 0,
    };

    // Calculate average accuracy
    const totalCorrect = allProgress.reduce((sum, p) => sum + p.correctCount, 0);
    const totalAttempts = allProgress.reduce((sum, p) => sum + p.correctCount + p.wrongCount, 0);
    stats.averageAccuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;

    return stats;
}

/**
 * Get box distribution for visualization
 */
export function getBoxDistribution(allProgress: UserProgress[]): Record<1 | 2 | 3 | 4 | 5, number> {
    const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };

    allProgress.forEach(p => {
        distribution[p.boxLevel]++;
    });

    return distribution;
}

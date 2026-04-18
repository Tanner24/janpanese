/**
 * React hook for managing user progress and SRS
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress, UserStats, Vocabulary } from '@/types';
import {
    getAllProgress,
    saveProgress as saveProgressToStorage,
    getStats,
    addXP,
    updateStreak,
    unlockAchievement,
} from '@/utils/storage';
import {
    updateProgress as updateSRSProgress,
    getDueWords,
    getNewWords,
    getStudyStats,
    getBoxDistribution,
} from '@/utils/srs';

export function useProgress() {
    const [allProgress, setAllProgress] = useState<UserProgress[]>([]);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load initial data
    useEffect(() => {
        const loadData = () => {
            const progress = getAllProgress();
            const userStats = getStats();

            setAllProgress(progress);
            setStats(userStats);
            setIsLoading(false);
        };

        loadData();
    }, []);

    // Update progress for a word
    const updateWordProgress = useCallback((wordId: string, isCorrect: boolean) => {
        const currentProgress = allProgress.find(p => p.wordId === wordId) || null;
        const updatedProgress = updateSRSProgress(currentProgress, wordId, isCorrect);

        // Save to storage
        saveProgressToStorage(wordId, updatedProgress);

        // Update state
        setAllProgress(prev => {
            const index = prev.findIndex(p => p.wordId === wordId);
            if (index >= 0) {
                const newProgress = [...prev];
                newProgress[index] = updatedProgress;
                return newProgress;
            } else {
                return [...prev, updatedProgress];
            }
        });

        // Award XP
        const xpAmount = isCorrect ? (currentProgress ? 3 : 5) : 1; // 5 for new word, 3 for review, 1 for attempt
        const newStats = addXP(xpAmount);
        setStats(newStats);

        // Update streak
        const updatedStats = updateStreak();
        setStats(updatedStats);

        // Check for achievements
        checkAchievements(updatedStats);

        return updatedProgress;
    }, [allProgress]);

    // Get words due for review
    const dueWords = useCallback(() => {
        return getDueWords(allProgress);
    }, [allProgress]);

    // Get new words to learn
    const getNewWordIds = useCallback((allWordIds: string[], limit: number = 10) => {
        return getNewWords(allWordIds, allProgress, limit);
    }, [allProgress]);

    // Get progress for specific word
    const getWordProgress = useCallback((wordId: string) => {
        return allProgress.find(p => p.wordId === wordId) || null;
    }, [allProgress]);

    // Get study statistics
    const studyStats = useCallback(() => {
        return getStudyStats(allProgress);
    }, [allProgress]);

    // Get box distribution
    const boxDistribution = useCallback(() => {
        return getBoxDistribution(allProgress);
    }, [allProgress]);

    // Check and unlock achievements
    const checkAchievements = useCallback((currentStats: UserStats) => {
        const stats = getStudyStats(allProgress);

        // First Steps - Learn 10 words
        if (stats.totalWords >= 10 && !currentStats.achievements.includes('first_steps')) {
            unlockAchievement('first_steps');
            setStats(prev => prev ? { ...prev, achievements: [...prev.achievements, 'first_steps'] } : prev);
        }

        // Dedicated - 7 day streak
        if (currentStats.currentStreak >= 7 && !currentStats.achievements.includes('dedicated')) {
            unlockAchievement('dedicated');
            setStats(prev => prev ? { ...prev, achievements: [...prev.achievements, 'dedicated'] } : prev);
        }

        // Vocabulary Master - 100 words mastered
        if (stats.masteredWords >= 100 && !currentStats.achievements.includes('vocab_master')) {
            unlockAchievement('vocab_master');
            setStats(prev => prev ? { ...prev, achievements: [...prev.achievements, 'vocab_master'] } : prev);
        }

        // Level 10 achievement
        if (currentStats.level >= 10 && !currentStats.achievements.includes('level_10')) {
            unlockAchievement('level_10');
            setStats(prev => prev ? { ...prev, achievements: [...prev.achievements, 'level_10'] } : prev);
        }
    }, [allProgress]);

    return {
        allProgress,
        stats,
        isLoading,
        updateWordProgress,
        dueWords,
        getNewWordIds,
        getWordProgress,
        studyStats,
        boxDistribution,
    };
}

// Hook for managing vocabulary with SRS
export function useVocabularySRS(allVocabulary: Vocabulary[]) {
    const { allProgress, getNewWordIds, dueWords, getWordProgress } = useProgress();

    // Get words to study in priority order
    const getStudySession = useCallback((mode: 'new' | 'review' | 'mixed', count: number = 10) => {
        const allWordIds = allVocabulary.map(v => v.id);

        if (mode === 'new') {
            const newWordIds = getNewWordIds(allWordIds, count);
            return allVocabulary.filter(v => newWordIds.includes(v.id));
        }

        if (mode === 'review') {
            const due = dueWords();
            const dueWordIds = due.slice(0, count).map(p => p.wordId);
            return allVocabulary.filter(v => dueWordIds.includes(v.id));
        }

        // Mixed: 50% new, 50% review
        const newCount = Math.ceil(count / 2);
        const reviewCount = count - newCount;

        const newWordIds = getNewWordIds(allWordIds, newCount);
        const due = dueWords();
        const dueWordIds = due.slice(0, reviewCount).map(p => p.wordId);

        const selectedIds = [...newWordIds, ...dueWordIds];
        return allVocabulary.filter(v => selectedIds.includes(v.id));
    }, [allVocabulary, getNewWordIds, dueWords]);

    // Get vocabulary with progress attached
    const getVocabWithProgress = useCallback(() => {
        return allVocabulary.map(vocab => ({
            ...vocab,
            progress: getWordProgress(vocab.id),
        }));
    }, [allVocabulary, getWordProgress]);

    return {
        getStudySession,
        getVocabWithProgress,
        allProgress,
    };
}

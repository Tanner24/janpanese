/**
 * LocalStorage utilities for persisting user data
 */

import { UserProgress, UserStats, QuizResult } from '@/types';

const STORAGE_KEYS = {
    PROGRESS: 'jp_learning_progress',
    STATS: 'jp_learning_stats',
    QUIZ_HISTORY: 'jp_quiz_history',
    USER_ID: 'jp_user_id',
} as const;

// Generate or get user ID
export function getUserId(): string {
    if (typeof window === 'undefined') return 'default_user';

    let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
    if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    }
    return userId;
}

// ========== Progress Management ==========

export function saveProgress(wordId: string, progress: UserProgress): void {
    if (typeof window === 'undefined') return;

    const allProgress = getAllProgress();
    const index = allProgress.findIndex(p => p.wordId === wordId);

    if (index >= 0) {
        allProgress[index] = progress;
    } else {
        allProgress.push(progress);
    }

    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
}

export function getProgress(wordId: string): UserProgress | null {
    if (typeof window === 'undefined') return null;

    const allProgress = getAllProgress();
    return allProgress.find(p => p.wordId === wordId) || null;
}

export function getAllProgress(): UserProgress[] {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) return [];

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to parse progress data:', error);
        return [];
    }
}

export function deleteProgress(wordId: string): void {
    if (typeof window === 'undefined') return;

    const allProgress = getAllProgress();
    const filtered = allProgress.filter(p => p.wordId !== wordId);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(filtered));
}

export function clearAllProgress(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
}

// ========== Stats Management ==========

export function getStats(): UserStats {
    if (typeof window === 'undefined') {
        return getDefaultStats();
    }

    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!data) return getDefaultStats();

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to parse stats data:', error);
        return getDefaultStats();
    }
}

export function saveStats(stats: UserStats): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
}

export function updateStats(updates: Partial<UserStats>): UserStats {
    const currentStats = getStats();
    const newStats = { ...currentStats, ...updates };
    saveStats(newStats);
    return newStats;
}

function getDefaultStats(): UserStats {
    return {
        totalWordsLearned: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalXP: 0,
        level: 1,
        lastStudyDate: new Date().toISOString(),
        studyTimeToday: 0,
        achievements: [],
    };
}

// ========== XP and Level System ==========

export function addXP(amount: number): UserStats {
    const stats = getStats();
    const newXP = stats.totalXP + amount;
    const newLevel = calculateLevel(newXP);

    return updateStats({
        totalXP: newXP,
        level: newLevel,
    });
}

function calculateLevel(xp: number): number {
    // Level thresholds: 0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, ...
    const levels = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 17000, 23000, 30000];

    for (let i = levels.length - 1; i >= 0; i--) {
        if (xp >= levels[i]) {
            return i + 1;
        }
    }
    return 1;
}

export function getXPForNextLevel(currentXP: number): { current: number; required: number; percentage: number } {
    const currentLevel = calculateLevel(currentXP);
    const levels = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 17000, 23000, 30000];

    const currentLevelXP = levels[currentLevel - 1] || 0;
    const nextLevelXP = levels[currentLevel] || levels[levels.length - 1];

    const xpInCurrentLevel = currentXP - currentLevelXP;
    const xpNeededForNextLevel = nextLevelXP - currentLevelXP;
    const percentage = (xpInCurrentLevel / xpNeededForNextLevel) * 100;

    return {
        current: xpInCurrentLevel,
        required: xpNeededForNextLevel,
        percentage: Math.min(100, percentage),
    };
}

// ========== Streak Management ==========

export function updateStreak(): UserStats {
    const stats = getStats();
    const now = new Date();
    const lastStudy = new Date(stats.lastStudyDate);

    // Reset time to midnight for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastStudyDay = new Date(lastStudy.getFullYear(), lastStudy.getMonth(), lastStudy.getDate());

    const daysDiff = Math.floor((today.getTime() - lastStudyDay.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = stats.currentStreak;

    if (daysDiff === 0) {
        // Same day, no change
        return stats;
    } else if (daysDiff === 1) {
        // Consecutive day, increment streak
        newStreak = stats.currentStreak + 1;
    } else {
        // Missed days, reset streak
        newStreak = 1;
    }

    const newLongestStreak = Math.max(stats.longestStreak, newStreak);

    return updateStats({
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastStudyDate: now.toISOString(),
        studyTimeToday: daysDiff === 0 ? stats.studyTimeToday : 0, // Reset if new day
    });
}

export function addStudyTime(minutes: number): UserStats {
    const stats = updateStreak(); // Also updates streak
    return updateStats({
        studyTimeToday: stats.studyTimeToday + minutes,
    });
}

// ========== Quiz History ==========

export function saveQuizResult(result: QuizResult): void {
    if (typeof window === 'undefined') return;

    const history = getQuizHistory();
    history.unshift(result); // Add to beginning

    // Keep only last 100 results
    const trimmed = history.slice(0, 100);

    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(trimmed));
}

export function getQuizHistory(): QuizResult[] {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    if (!data) return [];

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to parse quiz history:', error);
        return [];
    }
}

export function clearQuizHistory(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);
}

// ========== Achievements ==========

export function unlockAchievement(achievementId: string): UserStats {
    const stats = getStats();

    if (!stats.achievements.includes(achievementId)) {
        return updateStats({
            achievements: [...stats.achievements, achievementId],
        });
    }

    return stats;
}

export function hasAchievement(achievementId: string): boolean {
    const stats = getStats();
    return stats.achievements.includes(achievementId);
}

// ========== Export/Import ==========

export function exportData(): string {
    const data = {
        userId: getUserId(),
        progress: getAllProgress(),
        stats: getStats(),
        quizHistory: getQuizHistory(),
        exportDate: new Date().toISOString(),
        version: '1.0',
    };

    return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const data = JSON.parse(jsonString);

        if (data.progress) {
            localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data.progress));
        }
        if (data.stats) {
            localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(data.stats));
        }
        if (data.quizHistory) {
            localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(data.quizHistory));
        }

        return true;
    } catch (error) {
        console.error('Failed to import data:', error);
        return false;
    }
}

export function resetAllData(): void {
    if (typeof window === 'undefined') return;

    const confirmReset = confirm('Bạn có chắc chắn muốn xóa toàn bộ dữ liệu? Hành động này không thể hoàn tác!');
    if (!confirmReset) return;

    clearAllProgress();
    localStorage.removeItem(STORAGE_KEYS.STATS);
    clearQuizHistory();
    // Don't remove user ID
}

/**
 * Daily Goals System
 * Tracks user's daily learning goals
 */

export interface DailyGoal {
    id: string;
    title: string;
    description: string;
    target: number;
    current: number;
    completed: boolean;
    icon: string;
    category: 'vocabulary' | 'practice' | 'streak' | 'listening' | 'kanji' | 'grammar';
}

export const defaultDailyGoals: Omit<DailyGoal, 'current' | 'completed'>[] = [
    {
        id: 'learn_new_words',
        title: 'Học từ mới',
        description: 'Học 10 từ vựng mới',
        target: 10,
        icon: '📚',
        category: 'vocabulary'
    },
    {
        id: 'review_due_cards',
        title: 'Ôn tập hết từ cần nhớ',
        description: 'Hoàn thành tất cả thẻ SRS đến hạn',
        target: 1,
        icon: '🔄',
        category: 'practice'
    },
    {
        id: 'maintain_streak',
        title: 'Duy trì streak',
        description: 'Học ít nhất 1 lần trong ngày',
        target: 1,
        icon: '🔥',
        category: 'streak'
    },
    {
        id: 'complete_quiz',
        title: 'Hoàn thành bài quiz',
        description: 'Làm xong 1 bài quiz bất kỳ',
        target: 1,
        icon: '✍️',
        category: 'practice'
    },
    {
        id: 'listening_practice',
        title: 'Luyện nghe',
        description: 'Nghe và hiểu 1 bài listening',
        target: 1,
        icon: '🎧',
        category: 'listening'
    }
];

// Get today's date string (YYYY-MM-DD)
export function getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
}

// Initialize daily goals for today
export function initializeDailyGoals(): DailyGoal[] {
    const today = getTodayDateString();
    const savedGoals = localStorage.getItem('dailyGoals');
    const savedDate = localStorage.getItem('dailyGoalsDate');

    // If it's a new day, reset goals
    if (savedDate !== today || !savedGoals) {
        const newGoals = defaultDailyGoals.map(goal => ({
            ...goal,
            current: 0,
            completed: false
        }));

        localStorage.setItem('dailyGoals', JSON.stringify(newGoals));
        localStorage.setItem('dailyGoalsDate', today);

        return newGoals;
    }

    // Return saved goals
    return JSON.parse(savedGoals);
}

// Update goal progress
export function updateGoalProgress(goalId: string, increment: number = 1): DailyGoal[] {
    const goals = initializeDailyGoals();
    const updatedGoals = goals.map(goal => {
        if (goal.id === goalId) {
            const newCurrent = Math.min(goal.current + increment, goal.target);
            return {
                ...goal,
                current: newCurrent,
                completed: newCurrent >= goal.target
            };
        }
        return goal;
    });

    localStorage.setItem('dailyGoals', JSON.stringify(updatedGoals));
    return updatedGoals;
}

// Mark goal as completed
export function completeGoal(goalId: string): DailyGoal[] {
    const goals = initializeDailyGoals();
    const updatedGoals = goals.map(goal => {
        if (goal.id === goalId) {
            return {
                ...goal,
                current: goal.target,
                completed: true
            };
        }
        return goal;
    });

    localStorage.setItem('dailyGoals', JSON.stringify(updatedGoals));
    return updatedGoals;
}

// Get completion percentage
export function getCompletionPercentage(goals: DailyGoal[]): number {
    const completedCount = goals.filter(g => g.completed).length;
    return Math.round((completedCount / goals.length) * 100);
}

// Check if all goals completed
export function areAllGoalsCompleted(goals: DailyGoal[]): boolean {
    return goals.every(g => g.completed);
}

// Get streak count
export function getStreakCount(): number {
    const streak = localStorage.getItem('studyStreak');
    return streak ? parseInt(streak, 10) : 0;
}

// Update streak
export function updateStreak(): number {
    const today = getTodayDateString();
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    const currentStreak = getStreakCount();

    // If studied today already, don't increment
    if (lastStudyDate === today) {
        return currentStreak;
    }

    // Check if yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak: number;
    if (lastStudyDate === yesterdayStr) {
        // Continue streak
        newStreak = currentStreak + 1;
    } else {
        // Reset streak
        newStreak = 1;
    }

    localStorage.setItem('studyStreak', newStreak.toString());
    localStorage.setItem('lastStudyDate', today);

    // Also complete streak goal
    completeGoal('maintain_streak');

    return newStreak;
}

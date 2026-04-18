"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Target, TrendingUp, Award } from 'lucide-react';
import { Card } from './ui/Card';
import {
    initializeDailyGoals,
    completeGoal,
    getCompletionPercentage,
    areAllGoalsCompleted,
    type DailyGoal
} from '@/utils/dailyGoals';

export function DailyGoalsCard() {
    const [goals, setGoals] = useState<DailyGoal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize goals on mount
        const initialGoals = initializeDailyGoals();
        setGoals(initialGoals);
        setIsLoading(false);
    }, []);

    const handleToggleGoal = (goalId: string) => {
        const updatedGoals = completeGoal(goalId);
        setGoals(updatedGoals);

        // Celebrate if all done!
        if (areAllGoalsCompleted(updatedGoals)) {
            // Could trigger confetti or celebration animation
            console.log('🎉 All goals completed!');
        }
    };

    const completionPercentage = getCompletionPercentage(goals);
    const allCompleted = areAllGoalsCompleted(goals);

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-ink/5 dark:bg-ivory/5 rounded mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-12 bg-ink/5 dark:bg-ivory/5 rounded"></div>
                        <div className="h-12 bg-ink/5 dark:bg-ivory/5 rounded"></div>
                        <div className="h-12 bg-ink/5 dark:bg-ivory/5 rounded"></div>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-ink dark:text-ivory">
                        Mục tiêu hôm nay
                    </h3>
                </div>

                {allCompleted && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 text-sm font-bold text-emerald-500"
                    >
                        <Award className="w-4 h-4" />
                        <span>Hoàn thành!</span>
                    </motion.div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-ink/60 dark:text-ivory/60">
                        Tiến độ hôm nay
                    </span>
                    <span className="font-bold text-primary">
                        {completionPercentage}%
                    </span>
                </div>
                <div className="h-2 bg-ink/5 dark:bg-ivory/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>
            </div>

            {/* Goals List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {goals.map((goal, index) => (
                        <motion.button
                            key={goal.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleToggleGoal(goal.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${goal.completed
                                    ? 'border-emerald-500/30 bg-emerald-500/5'
                                    : 'border-ink/10 dark:border-ivory/10 hover:border-primary/30'
                                }`}
                        >
                            {/* Icon */}
                            <div className="flex-shrink-0">
                                {goal.completed ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    </motion.div>
                                ) : (
                                    <Circle className="w-6 h-6 text-ink/30 dark:text-ivory/30" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{goal.icon}</span>
                                    <h4 className={`font-semibold ${goal.completed
                                            ? 'text-ink/50 dark:text-ivory/50 line-through'
                                            : 'text-ink dark:text-ivory'
                                        }`}>
                                        {goal.title}
                                    </h4>
                                </div>
                                <p className="text-sm text-ink/60 dark:text-ivory/60 mt-0.5">
                                    {goal.description}
                                </p>
                            </div>

                            {/* Progress */}
                            <div className="flex-shrink-0">
                                {goal.target > 1 && (
                                    <div className={`text-sm font-bold ${goal.completed
                                            ? 'text-emerald-500'
                                            : 'text-ink/60 dark:text-ivory/60'
                                        }`}>
                                        {goal.current}/{goal.target}
                                    </div>
                                )}
                            </div>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            {/* Footer Stats */}
            <div className="mt-6 pt-6 border-t border-ink/5 dark:border-ivory/5">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-ink/60 dark:text-ivory/60">
                        <TrendingUp className="w-4 h-4" />
                        <span>
                            {goals.filter(g => g.completed).length} / {goals.length} mục tiêu
                        </span>
                    </div>
                    {allCompleted && (
                        <span className="text-emerald-500 font-bold">
                            🎉 Tuyệt vời!
                        </span>
                    )}
                </div>
            </div>
        </Card>
    );
}

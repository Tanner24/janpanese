"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DailyGoalsCard } from "@/components/DailyGoalsCard";
import { BookOpen, Award, Flame, Target, ChevronRight, TrendingUp, Zap, Brain } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { getStats, getXPForNextLevel } from "@/utils/storage";

export default function DashboardPage() {
    const { studyStats } = useProgress();
    const stats = studyStats();
    const userStats = getStats();
    const xpProgress = getXPForNextLevel(userStats.totalXP);

    // Calculate level name
    const getLevelName = (level: number) => {
        if (level >= 10) return "Master";
        if (level >= 7) return "Expert";
        if (level >= 5) return "Advanced";
        if (level >= 3) return "Intermediate";
        return "Beginner";
    };

    const dashboardStats = [
        {
            label: "Đã học",
            value: stats.totalWords.toString(),
            sub: "Từ vựng",
            icon: BookOpen,
            color: "text-sky-500",
            bg: "bg-sky-500/10"
        },
        {
            label: "Cần ôn",
            value: stats.dueToday.toString(),
            sub: "Từ hôm nay",
            icon: Target,
            color: "text-vermillion",
            bg: "bg-vermillion/10"
        },
        {
            label: "Streak",
            value: `${userStats.currentStreak} 🔥`,
            sub: "Ngày liên tiếp",
            icon: Flame,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            label: "Level",
            value: userStats.level.toString(),
            sub: getLevelName(userStats.level),
            icon: Award,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 lg:px-8 py-12 w-full">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-2 text-ink dark:text-ivory">
                        Chào mừng quay trở lại!
                    </h1>
                    <p className="text-ink/60 dark:text-ivory/60 font-medium">
                        {stats.dueToday > 0
                            ? `Bạn có ${stats.dueToday} từ cần ôn hôm nay.`
                            : "Tuyệt vời! Bạn đã hoàn thành ôn tập hôm nay! 🎉"}
                    </p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {dashboardStats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="flex items-center gap-5 p-5 hover:border-vermillion/20 transition-all cursor-pointer">
                                <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center`}>
                                    <s.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-ink dark:text-ivory leading-none mb-1">{s.value}</p>
                                    <p className="text-xs font-bold text-ink/40 dark:text-ivory/40 uppercase tracking-widest">{s.sub}</p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* XP Progress */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-6 h-6 text-vermillion" />
                                    <h3 className="text-xl font-bold text-ink dark:text-ivory">
                                        Level {userStats.level} - {getLevelName(userStats.level)}
                                    </h3>
                                </div>
                                <span className="text-sm font-bold text-ink/40 dark:text-ivory/40">
                                    {xpProgress.current}/{xpProgress.required} XP
                                </span>
                            </div>
                            <div className="w-full h-4 bg-ink/5 dark:bg-ivory/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-vermillion to-amber-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpProgress.percentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                            <p className="text-xs text-ink/60 dark:text-ivory/60 mt-2">
                                Total XP: {userStats.totalXP.toLocaleString()}
                            </p>
                        </Card>

                        {/* Progress Distribution */}
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Brain className="w-6 h-6 text-vermillion" />
                                <h3 className="font-bold text-ink dark:text-ivory">Phân bố tiến độ</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium text-ink dark:text-ivory">Từ mới</span>
                                        <span className="font-bold text-sky-500">{stats.newWords}</span>
                                    </div>
                                    <div className="w-full h-2 bg-ink/5 dark:bg-ivory/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-sky-500"
                                            style={{ width: `${stats.totalWords > 0 ? (stats.newWords / stats.totalWords) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium text-ink dark:text-ivory">Đang học</span>
                                        <span className="font-bold text-amber-500">{stats.learningWords}</span>
                                    </div>
                                    <div className="w-full h-2 bg-ink/5 dark:bg-ivory/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500"
                                            style={{ width: `${stats.totalWords > 0 ? (stats.learningWords / stats.totalWords) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium text-ink dark:text-ivory">Đang ôn</span>
                                        <span className="font-bold text-vermillion">{stats.reviewWords}</span>
                                    </div>
                                    <div className="w-full h-2 bg-ink/5 dark:bg-ivory/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-vermillion"
                                            style={{ width: `${stats.totalWords > 0 ? (stats.reviewWords / stats.totalWords) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium text-ink dark:text-ivory">Đã thuộc</span>
                                        <span className="font-bold text-emerald-500">{stats.masteredWords}</span>
                                    </div>
                                    <div className="w-full h-2 bg-ink/5 dark:bg-ivory/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500"
                                            style={{ width: `${stats.totalWords > 0 ? (stats.masteredWords / stats.totalWords) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="p-6">
                            <h3 className="font-bold mb-6 text-ink dark:text-ivory">Hành động nhanh</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/vocabulary?mode=new">
                                    <Card className="p-6 hover:border-vermillion/20 transition-all cursor-pointer bg-sky-500/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500 text-2xl">
                                                📚
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-ink dark:text-ivory">Học từ mới</h4>
                                                <p className="text-xs text-ink/60 dark:text-ivory/60">Bắt đầu học ngay</p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>

                                <Link href="/vocabulary?mode=review">
                                    <Card className="p-6 hover:border-vermillion/20 transition-all cursor-pointer bg-vermillion/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-vermillion/10 rounded-xl flex items-center justify-center text-vermillion text-2xl">
                                                🔄
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-ink dark:text-ivory">Ôn tập</h4>
                                                <p className="text-xs text-ink/60 dark:text-ivory/60">{stats.dueToday} từ cần ôn</p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>

                                <Link href="/quiz">
                                    <Card className="p-6 hover:border-vermillion/20 transition-all cursor-pointer bg-amber-500/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 text-2xl">
                                                📝
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-ink dark:text-ivory">Làm quiz</h4>
                                                <p className="text-xs text-ink/60 dark:text-ivory/60">Kiểm tra kiến thức</p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>

                                <Link href="/kanji">
                                    <Card className="p-6 hover:border-vermillion/20 transition-all cursor-pointer bg-emerald-500/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 text-2xl">
                                                漢
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-ink dark:text-ivory">Học Kanji</h4>
                                                <p className="text-xs text-ink/60 dark:text-ivory/60">Thứ tự nét viết</p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        </Card>
                    </div>

                    {/* Side Column */}
                    <div className="space-y-8">
                        {/* Daily Goals - New Dynamic Component */}
                        <DailyGoalsCard />

                        {/* Accuracy Stats */}
                        <Card className="p-6 bg-gradient-to-br from-vermillion/5 to-amber-500/5 border-vermillion/10">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="w-6 h-6 text-vermillion" />
                                <h3 className="font-bold text-ink dark:text-ivory">Độ chính xác</h3>
                            </div>
                            <div className="text-center py-6">
                                <div className="text-5xl font-black text-vermillion mb-2">
                                    {Math.round(stats.averageAccuracy)}%
                                </div>
                                <p className="text-sm text-ink/60 dark:text-ivory/60">
                                    {stats.averageAccuracy >= 90 ? 'Xuất sắc! 🌟' :
                                        stats.averageAccuracy >= 75 ? 'Tốt lắm! 👍' :
                                            stats.averageAccuracy >= 60 ? 'Cố gắng lên! 💪' :
                                                'Cần luyện tập nhiều hơn 📚'}
                                </p>
                            </div>
                        </Card>

                        {/* Streak Info */}
                        {userStats.currentStreak >= 3 && (
                            <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-vermillion/10 border-amber-500/20">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">🔥</div>
                                    <h4 className="font-bold text-ink dark:text-ivory mb-1">
                                        {userStats.currentStreak} ngày streak!
                                    </h4>
                                    <p className="text-xs text-ink/60 dark:text-ivory/60">
                                        Kỷ lục: {userStats.longestStreak} ngày
                                    </p>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

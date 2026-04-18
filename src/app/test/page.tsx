
"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Clock, GraduationCap, PlayCircle, BarChart2 } from "lucide-react";
import { n5FullTest } from "@/data/mock_tests/n5_full_test";

export default function TestDashboardPage() {
    // In real app, fetch tests from API/Database
    const availableTests = [n5FullTest];

    return (
        <div className="min-h-screen bg-ivory dark:bg-ink flex flex-col font-sans selection:bg-vermillion/20">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-jp text-ink dark:text-ivory mb-4">
                        Thi Thử JLPT <span className="text-vermillion">模擬試験</span>
                    </h1>
                    <p className="text-xl text-ashen dark:text-stone-400 max-w-2xl mx-auto">
                        Kiểm tra trình độ tiếng Nhật của bạn qua các bài thi thử được thiết kế sát với đề thi thật.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableTests.map((test) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="p-6 h-full flex flex-col justify-between border-2 hover:border-vermillion/50 transition-colors bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="px-3 py-1 bg-vermillion text-white text-sm font-bold rounded-full">
                                            {test.level}
                                        </div>
                                        <div className="flex items-center text-ashen text-sm">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {test.duration} phút
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-ink dark:text-ivory mb-2 line-clamp-2">
                                        {test.title}
                                    </h3>

                                    <div className="space-y-2 text-sm text-stone-600 dark:text-stone-400 mb-6">
                                        <div className="flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-indigo-500" />
                                            <span>4 Phần thi: Từ vựng, Ngữ pháp, Đọc, Nghe</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BarChart2 className="w-4 h-4 text-green-500" />
                                            <span>Tổng điểm: {test.totalScore}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href={`/test/${test.id}`} className="w-full">
                                    <Button className="w-full group" size="lg">
                                        Bắt đầu thi
                                        <PlayCircle className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Placeholder for coming soon tests */}
                    {[1, 2].map((i) => (
                        <div key={`placeholder-${i}`} className="opacity-50 pointer-events-none grayscale">
                            <Card className="p-6 h-full flex flex-col justify-between bg-stone-100 dark:bg-stone-800 border-dashed border-2">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="px-3 py-1 bg-stone-400 text-white text-sm font-bold rounded-full">
                                            Coming Soon
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-ink dark:text-ivory mb-2">
                                        JLPT N{5 - i} - Đề Thi Thử Số {i}
                                    </h3>
                                    <p className="text-sm text-stone-500">Đang cập nhật...</p>
                                </div>
                                <Button disabled variant="outline" className="w-full mt-4">
                                    Sắp ra mắt
                                </Button>
                            </Card>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

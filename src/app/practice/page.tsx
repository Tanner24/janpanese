"use client";

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PracticePage() {
    const exams = [
        {
            level: 'N5',
            title: 'Luyện thi N5',
            description: 'Đề thi thử JLPT N5 cơ bản. Bao gồm từ vựng, ngữ pháp và đọc hiểu.',
            questions: '~10',
            time: '15 phút',
            color: 'bg-green-500',
            textColor: 'text-green-500',
            path: '/practice/n5'
        },
        {
            level: 'N4',
            title: 'Luyện thi N4',
            description: 'Đề thi thử JLPT N4 sơ trung cấp. Thử thách kiến thức ngữ pháp và kanji.',
            questions: '~10',
            time: '20 phút',
            color: 'bg-blue-500',
            textColor: 'text-blue-500',
            path: '/practice/n4'
        },
        {
            level: 'N3',
            title: 'Luyện thi N3',
            description: 'Đề thi thử JLPT N3 trung cấp. (Sắp ra mắt)',
            questions: '0',
            time: '--',
            color: 'bg-yellow-500',
            textColor: 'text-yellow-500',
            path: '#',
            disabled: true
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 lg:px-8 py-12 w-full">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-black tracking-tight mb-4 text-ink dark:text-ivory">
                        Luyện Thi JLPT
                    </h1>
                    <p className="text-xl text-ink/60 dark:text-ivory/60 max-w-2xl mx-auto">
                        Thử sức với các đề thi chuẩn JLPT. Hệ thống chấm điểm tự động và giải thích chi tiết.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {exams.map((exam, idx) => (
                        <motion.div
                            key={exam.level}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className={`h-full flex flex-col ${exam.disabled ? 'opacity-50 grayscale' : ''}`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-2xl ${exam.color} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                                        {exam.level}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-ink dark:text-ivory">{exam.title}</h3>
                                        <p className="text-sm font-medium text-ink/40 dark:text-ivory/40">JLPT Mock Exam</p>
                                    </div>
                                </div>

                                <p className="text-ink/60 dark:text-ivory/60 mb-6 flex-grow">
                                    {exam.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div className="bg-ink/5 dark:bg-ivory/5 rounded-lg p-3 text-center">
                                        <div className="font-bold text-ink dark:text-ivory">{exam.questions}</div>
                                        <div className="text-ink/40 dark:text-ivory/40">Câu hỏi</div>
                                    </div>
                                    <div className="bg-ink/5 dark:bg-ivory/5 rounded-lg p-3 text-center">
                                        <div className="font-bold text-ink dark:text-ivory">{exam.time}</div>
                                        <div className="text-ink/40 dark:text-ivory/40">Thời gian</div>
                                    </div>
                                </div>

                                <Link href={exam.path} className={exam.disabled ? 'pointer-events-none' : ''}>
                                    <Button className="w-full" disabled={exam.disabled}>
                                        {exam.disabled ? 'Sắp ra mắt' : 'Bắt đầu thi'}
                                    </Button>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

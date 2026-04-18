"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useSRS } from "@/contexts/SRSContext";
import { Vocabulary } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AudioButton } from "@/components/AudioButton";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trophy, CheckCircle2, XCircle, Clock, BrainCircuit } from "lucide-react";

export default function ReviewPage() {
    const { getDueItems, processReview, dueCount } = useSRS();
    const [queue, setQueue] = useState<Vocabulary[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });

    useEffect(() => {
        setQueue(getDueItems());
    }, []);

    const currentWord = queue[currentIndex];

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleAnswer = (quality: 'fail' | 'hard' | 'good' | 'easy') => {
        if (!currentWord) return;

        processReview(currentWord.id, quality);

        // Update stats
        if (quality === 'fail') {
            setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        } else {
            setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
        }

        // Move to next card
        setIsFlipped(false);
        if (currentIndex < queue.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
        } else {
            // End of session
            setQueue([]);
        }
    };

    if (queue.length === 0 && sessionStats.correct + sessionStats.wrong === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-6 p-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Bạn chưa có bài ôn tập nào!</h1>
                    <p className="text-muted mb-8 max-w-md">Hãy vào danh sách từ vựng và chọn "Thêm vào ôn tập" để bắt đầu học.</p>
                    <Link href="/vocabulary">
                        <Button size="lg" className="font-bold">Học từ mới ngay</Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    if (queue.length === 0 && (sessionStats.correct > 0 || sessionStats.wrong > 0)) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-8 p-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full"
                    >
                        <Trophy className="w-20 h-20 text-yellow-600 dark:text-yellow-400" />
                    </motion.div>
                    <h1 className="text-4xl font-black mb-4">Hoàn thành xuất sắc!</h1>
                    <p className="text-xl text-muted mb-8">Bạn đã ôn tập xong {sessionStats.correct + sessionStats.wrong} từ hôm nay.</p>

                    <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-sm">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-900/50">
                            <p className="text-sm font-bold text-green-600 dark:text-green-400 uppercase">Chính xác</p>
                            <p className="text-3xl font-black text-green-700 dark:text-green-300">{sessionStats.correct}</p>
                        </div>
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-900/50">
                            <p className="text-sm font-bold text-red-600 dark:text-red-400 uppercase">Cần ôn lại</p>
                            <p className="text-3xl font-black text-red-700 dark:text-red-300">{sessionStats.wrong}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/">
                            <Button variant="outline">Về trang chủ</Button>
                        </Link>
                        <Link href="/vocabulary">
                            <Button>Học thêm từ mới</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-[var(--primary)] selection:text-[var(--primary-fg)]">
            <Navbar />

            <main className="flex-grow flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
                {/* Progress Bar */}
                <div className="w-full max-w-2xl mb-8">
                    <div className="flex justify-between text-sm font-bold text-muted mb-2">
                        <span>Đang ôn tập: {currentIndex + 1} / {queue.length}</span>
                        <span>{Math.round(((currentIndex) / queue.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[var(--primary)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentIndex) / queue.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Flashcard Area */}
                <div className="relative w-full max-w-2xl aspect-[4/3] perspective-1000 mb-8 group cursor-pointer" onClick={handleFlip}>
                    <motion.div
                        className="w-full h-full relative preserve-3d transition-transform duration-500"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        initial={false}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        {/* Front Side */}
                        <Card className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-8 bg-white dark:bg-neutral-900 border-2 border-[var(--primary)]/10 shadow-xl hover:shadow-2xl transition-shadow text-center">
                            <div className="absolute top-4 right-4">
                                <Clock className="w-5 h-5 text-muted opacity-50" />
                            </div>

                            <div className="flex-grow flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold text-[var(--primary)] mb-4">{currentWord?.furigana}</p>
                                <h1 className="text-7xl md:text-8xl font-black text-foreground mb-6 font-jp tracking-tighter">
                                    {currentWord?.kanji}
                                </h1>

                                <div onClick={(e) => e.stopPropagation()}>
                                    <AudioButton
                                        text={currentWord?.furigana || currentWord?.kanji || ""}
                                        audioUrl={currentWord?.audio_url}
                                        size="lg"
                                    />
                                </div>
                            </div>

                            <p className="text-muted text-sm font-bold uppercase tracking-widest mt-auto">Chạm để xem đáp án</p>
                        </Card>

                        {/* Back Side */}
                        <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col p-8 bg-white dark:bg-neutral-900 border-2 border-[var(--primary)]/10 shadow-xl overflow-y-auto">
                            <div className="text-center mb-8 pb-6 border-b border-[var(--border)]">
                                <p className="text-xl font-bold text-[var(--primary)]">{currentWord?.furigana}</p>
                                <h2 className="text-5xl font-black text-foreground mb-2">{currentWord?.kanji}</h2>
                                <p className="text-3xl font-bold text-foreground mt-4 text-[var(--primary)]">{currentWord?.meaning_vi}</p>
                            </div>

                            <div className="flex-grow space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-lg">
                                        <span className="block text-xs font-bold text-muted uppercase">Từ loại</span>
                                        <span className="font-bold">{currentWord?.category}</span>
                                    </div>
                                    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-lg">
                                        <span className="block text-xs font-bold text-muted uppercase">JLPT</span>
                                        <span className="font-bold">{currentWord?.jlpt_level}</span>
                                    </div>
                                </div>

                                {currentWord?.image_url && (
                                    <div className="w-full h-32 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 my-2">
                                        <img src={currentWord.image_url} alt="" className="w-full h-full object-cover opacity-80" />
                                    </div>
                                )}

                                {currentWord?.examples && currentWord.examples.length > 0 && (
                                    <div className="bg-[var(--bg-surface)] p-4 rounded-lg border border-[var(--border)]">
                                        <p className="text-sm font-bold text-muted uppercase mb-2">Ví dụ</p>
                                        <p className="text-lg font-medium mb-1">{currentWord.examples[0].ja}</p>
                                        <p className="text-sm text-foreground/70 italic">{currentWord.examples[0].vi}</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Controls */}
                <AnimatePresence>
                    {isFlipped && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            className="grid grid-cols-4 gap-2 md:gap-4 w-full max-w-2xl"
                        >
                            <Button
                                onClick={() => handleAnswer('fail')}
                                className="h-16 flex flex-col items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/40 border-none shadow-sm transition-all hover:scale-105"
                            >
                                <span className="font-black text-lg">Quên</span>
                                <span className="text-xs opacity-70">Begin</span>
                            </Button>
                            <Button
                                onClick={() => handleAnswer('hard')}
                                className="h-16 flex flex-col items-center justify-center bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 border-none shadow-sm transition-all hover:scale-105"
                            >
                                <span className="font-black text-lg">Khó</span>
                                <span className="text-xs opacity-70">1.2x</span>
                            </Button>
                            <Button
                                onClick={() => handleAnswer('good')}
                                className="h-16 flex flex-col items-center justify-center bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/20 dark:hover:bg-green-900/40 border-none shadow-sm transition-all hover:scale-105"
                            >
                                <span className="font-black text-lg">Tốt</span>
                                <span className="text-xs opacity-70">2.5x</span>
                            </Button>
                            <Button
                                onClick={() => handleAnswer('easy')}
                                className="h-16 flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 border-none shadow-sm transition-all hover:scale-105"
                            >
                                <span className="font-black text-lg">Dễ</span>
                                <span className="text-xs opacity-70">3.5x</span>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

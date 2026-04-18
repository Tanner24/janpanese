"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { generateExam, N5_QUESTIONS, N4_QUESTIONS } from '@/data/jlpt_questions';
import { ExamQuestion } from '@/types/exam';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExamRunnerPage() {
    const params = useParams();
    const router = useRouter();
    const levelStr = (params.level as string).toUpperCase();

    // State
    const [questions, setQuestions] = useState<ExamQuestion[]>([]);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [currentIdx, setCurrentIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins default
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // Initial Load
    useEffect(() => {
        if (levelStr === 'N5' || levelStr === 'N4') {
            const qs = generateExam(levelStr as 'N5' | 'N4', 10);
            setQuestions(qs);
        }
    }, [levelStr]);

    // Timer
    useEffect(() => {
        if (isSubmitted || questions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isSubmitted, questions]);

    // Format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (optionIdx: number) => {
        if (isSubmitted) return;
        const qId = questions[currentIdx].id;
        setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
        const finalScore = Math.round((correctCount / questions.length) * 100);
        setScore(finalScore);
        setShowResults(true);

        if (finalScore >= 60) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    if (questions.length === 0) {
        return <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-ink">Generating Exam...</div>;
    }

    const currentQ = questions[currentIdx];

    return (
        <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
            <Navbar />

            <main className="flex-grow max-w-4xl mx-auto px-4 lg:px-8 py-12 w-full">
                {/* Header: Timer & Progress */}
                <header className="mb-8 flex justify-between items-center bg-white dark:bg-ink/50 p-4 rounded-xl shadow-sm border border-ink/5 dark:border-ivory/5 sticky top-20 z-10 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-vermillion text-white flex items-center justify-center font-bold">
                            {currentIdx + 1}
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs text-ink/40 dark:text-ivory/40 uppercase font-bold">Question</p>
                            <p className="font-bold text-ink dark:text-ivory">{currentIdx + 1} / {questions.length}</p>
                        </div>
                    </div>

                    <div className={`font-mono text-xl font-bold ${timeLeft < 60 ? 'text-vermillion animate-pulse' : 'text-ink dark:text-ivory'}`}>
                        {formatTime(timeLeft)}
                    </div>
                </header>

                {!showResults ? (
                    /* Question Card */
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQ.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="min-h-[400px] flex flex-col">
                                <div className="mb-6">
                                    <span className="inline-block px-3 py-1 rounded-full bg-ink/5 dark:bg-ivory/5 text-xs font-bold text-ink/60 dark:text-ivory/60 mb-4 uppercase">
                                        {currentQ.section} • {currentQ.type}
                                    </span>

                                    {currentQ.context && (
                                        <div className="mb-6 p-4 bg-ink/5 dark:bg-ivory/5 rounded-lg text-ink dark:text-ivory leading-relaxed whitespace-pre-wrap">
                                            {currentQ.context}
                                        </div>
                                    )}

                                    <h2 className="text-2xl font-bold text-ink dark:text-ivory leading-normal">
                                        {currentQ.question.split('**').map((part, i) =>
                                            i % 2 === 1 ? <span key={i} className="text-vermillion underline decoration-2 underline-offset-4">{part}</span> : part
                                        )}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-3 mb-8">
                                    {currentQ.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className={`p-4 rounded-xl text-left font-medium transition-all border-2 ${answers[currentQ.id] === idx
                                                ? 'border-vermillion bg-vermillion/5 text-vermillion shadow-md'
                                                : 'border-ink/10 dark:border-ivory/10 hover:border-vermillion/40 bg-white dark:bg-ink/30 text-ink dark:text-ivory'
                                                }`}
                                        >
                                            <span className="inline-block w-6 font-bold opacity-40 mr-2">{String.fromCharCode(65 + idx)}.</span>
                                            {opt}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-auto flex justify-between">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                                        disabled={currentIdx === 0}
                                    >
                                        Previous
                                    </Button>

                                    {currentIdx === questions.length - 1 ? (
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={Object.keys(answers).length < questions.length * 0.5} // Allow submit if answer > 50%
                                        >
                                            Submit Exam
                                        </Button>
                                    ) : (
                                        <Button onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}>
                                            Next Question
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    /* Results View */
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <Card className="text-center py-12 bg-gradient-to-br from-white to-ink/5 dark:from-ink dark:to-ivory/5 border-vermillion/20">
                            <h2 className="text-3xl font-black mb-2 text-ink dark:text-ivory">Kết quả thi thử {levelStr}</h2>
                            <div className="text-6xl font-black text-vermillion mb-4">{score}/100</div>
                            <p className="text-xl font-medium text-ink/60 dark:text-ivory/60 mb-8">
                                {score >= 60 ? 'Chúc mừng! Bạn đã đậu! 🎉' : 'Hãy cố gắng hơn lần sau! 💪'}
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button onClick={() => window.location.reload()}>Thi lại</Button>
                                <Button variant="ghost" onClick={() => router.push('/practice')}>Quay về danh sách</Button>
                            </div>
                        </Card>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-ink dark:text-ivory">Chi tiết bài làm</h3>
                            {questions.map((q, idx) => {
                                const isCorrect = answers[q.id] === q.correctAnswer;
                                const userAnswer = answers[q.id];

                                return (
                                    <div key={q.id} className={`p-6 rounded-xl border ${isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                        <div className="flex gap-4 mb-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="font-bold text-ink dark:text-ivory mb-1">
                                                    {q.question.replace(/\*\*/g, '')}
                                                </p>
                                                {q.context && <p className="text-sm text-ink/60 dark:text-ivory/60 italic mb-2">{q.context}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ml-12">
                                            <div className="flex flex-col">
                                                <span className="text-xs opacity-60 uppercase mb-1">Bạn chọn</span>
                                                <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                                    {userAnswer !== undefined ? q.options[userAnswer] : '(Không trả lời)'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs opacity-60 uppercase mb-1">Đáp án đúng</span>
                                                <span className="font-bold text-green-600">
                                                    {q.options[q.correctAnswer]}
                                                </span>
                                            </div>
                                        </div>

                                        {q.explanation && (
                                            <div className="mt-4 ml-12 p-3 bg-white dark:bg-ink/30 rounded-lg text-sm text-ink/80 dark:text-ivory/80 border border-ink/5 dark:border-ivory/5">
                                                💡 <span className="font-bold">Giải thích:</span> {q.explanation}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

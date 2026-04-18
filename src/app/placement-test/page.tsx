"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, ArrowRight, BookOpen, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { placementTestQuestions, determineLevel, levelDescriptions } from '@/data/placement_test';

export default function PlacementTestPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');

    const totalQuestions = placementTestQuestions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = () => {
        if (selectedAnswer === null) return;

        const newAnswers = [...answers, selectedAnswer];
        setAnswers(newAnswers);

        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {
            // Calculate final score
            const finalScore = newAnswers.reduce((acc, answer, index) => {
                return acc + (answer === placementTestQuestions[index].correctAnswer ? 1 : 0);
            }, 0);

            const determinedLevel = determineLevel(finalScore);
            setScore(finalScore);
            setLevel(determinedLevel);

            // Save to localStorage
            localStorage.setItem('userLevel', determinedLevel);
            localStorage.setItem('placementTestCompleted', 'true');
            localStorage.setItem('placementTestScore', finalScore.toString());

            setShowResult(true);
        }
    };

    const handleSkip = () => {
        localStorage.setItem('placementTestCompleted', 'true');
        localStorage.setItem('userLevel', 'N5'); // Default to N5
        router.push('/dashboard');
    };

    const handleStartLearning = () => {
        router.push('/dashboard');
    };

    const currentQ = placementTestQuestions[currentQuestion];
    const levelInfo = levelDescriptions[level];

    // Color mapping to avoid dynamic Tailwind classes
    const levelColors = {
        N5: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500' },
        N4: { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-500' },
        N3: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-500' },
        N2: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' },
        N1: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500' }
    };

    const currentColors = levelColors[level];

    if (showResult) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full"
                >
                    <Card className="p-8 md:p-12 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                        >
                            <Award className="w-12 h-12 text-white" />
                        </motion.div>

                        <h1 className="text-4xl font-black mb-4 gradient-text">
                            Hoàn thành!
                        </h1>

                        <p className="text-xl text-ink/60 dark:text-ivory/60 mb-8">
                            Điểm của bạn: <span className="font-bold text-primary">{score}/{totalQuestions}</span>
                        </p>

                        <div className={`${currentColors.bg} border-2 ${currentColors.border} rounded-2xl p-6 mb-8`}>
                            <h2 className="text-2xl font-bold mb-2 text-ink dark:text-ivory">
                                {levelInfo.title}
                            </h2>
                            <p className="text-ink/70 dark:text-ivory/70 mb-6">
                                {levelInfo.description}
                            </p>

                            <div className="text-left space-y-3">
                                <p className="font-bold text-ink dark:text-ivory mb-2">
                                    💡 Khuyến nghị học tập:
                                </p>
                                {levelInfo.recommendations.map((rec, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <CheckCircle2 className={`w-5 h-5 ${currentColors.text} flex-shrink-0 mt-0.5`} />
                                        <span className="text-sm text-ink/70 dark:text-ivory/70">{rec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full h-14 text-lg"
                            onClick={handleStartLearning}
                        >
                            Bắt đầu học ngay <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
                    >
                        <Target className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold text-primary">Bài Test Xác Định Trình Độ</span>
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-black mb-2 text-ink dark:text-ivory">
                        Câu {currentQuestion + 1}/{totalQuestions}
                    </h1>

                    <p className="text-ink/60 dark:text-ivory/60">
                        Cấp độ: <span className="font-bold text-primary">{currentQ.level}</span>
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-3 bg-ink/5 dark:bg-ivory/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="p-6 md:p-8 mb-6">
                            <div className="flex items-start gap-3 mb-6">
                                <BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                <h2 className="text-xl md:text-2xl font-bold text-ink dark:text-ivory">
                                    {currentQ.question}
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {currentQ.options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAnswerSelect(index)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedAnswer === index
                                            ? 'border-primary bg-primary/10 text-ink dark:text-ivory'
                                            : 'border-ink/10 dark:border-ivory/10 hover:border-primary/30 text-ink/70 dark:text-ivory/70'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index
                                                ? 'border-primary bg-primary'
                                                : 'border-ink/30 dark:border-ivory/30'
                                                }`}>
                                                {selectedAnswer === index && (
                                                    <div className="w-3 h-3 bg-white rounded-full" />
                                                )}
                                            </div>
                                            <span className="font-medium">{option}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleSkip}
                        className="flex-1"
                    >
                        Bỏ qua test
                    </Button>
                    <Button
                        size="lg"
                        onClick={handleNext}
                        disabled={selectedAnswer === null}
                        className="flex-1"
                    >
                        {currentQuestion === totalQuestions - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

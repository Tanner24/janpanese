"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { allVocabulary } from "@/data/vocab";
import { CheckCircle2, XCircle, RefreshCcw, Award, Volume2, Clock, Settings, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { useSmartAudio } from "@/hooks/useAudio";
import { saveQuizResult, addXP } from "@/utils/storage";

type QuizMode = 'multiple-choice' | 'listening' | 'typing' | 'reverse';

interface QuizQuestion {
    id: string;
    kanji: string;
    furigana: string;
    romaji?: string;
    correct: string;
    options: string[];
    wordData: typeof allVocabulary[0];
}

interface QuizAnswer {
    wordId: string;
    correct: boolean;
    timeSpent: number;
}

export default function QuizPage() {
    const [quizMode, setQuizMode] = useState<QuizMode>('multiple-choice');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [typedAnswer, setTypedAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showSettings, setShowSettings] = useState(true);
    const [questionCount, setQuestionCount] = useState(10);
    const [jlptLevel, setJlptLevel] = useState<'All' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('All');
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [totalTime, setTotalTime] = useState(0);

    const { play } = useSmartAudio();
    const { updateWordProgress } = useProgress();

    // Generate quiz questions
    const generateQuiz = () => {
        let vocabPool = jlptLevel === 'All'
            ? allVocabulary
            : allVocabulary.filter(v => v.jlpt_level === jlptLevel);

        if (vocabPool.length === 0) {
            vocabPool = allVocabulary;
        }

        const shuffled = [...vocabPool].sort(() => 0.5 - Math.random());
        const selectedWords = shuffled.slice(0, Math.min(questionCount, vocabPool.length));

        const quizData = selectedWords.map(v => {
            const others = vocabPool.filter(o => o.id !== v.id).sort(() => 0.5 - Math.random()).slice(0, 3);

            let options: string[] = [];
            let correct = "";

            if (quizMode === 'reverse') {
                // Vietnamese -> Japanese
                options = [v.kanji, ...others.map(o => o.kanji)].sort(() => 0.5 - Math.random());
                correct = v.kanji;
            } else {
                // Japanese -> Vietnamese (for multiple-choice and listening)
                options = [v.meaning_vi, ...others.map(o => o.meaning_vi)].sort(() => 0.5 - Math.random());
                correct = v.meaning_vi;
            }

            return {
                id: v.id,
                kanji: v.kanji,
                furigana: v.furigana,
                romaji: v.romaji,
                correct,
                options,
                wordData: v,
            };
        });

        setQuestions(quizData);
        setCurrentIndex(0);
        setScore(0);
        setShowResult(false);
        setShowSettings(false);
        setAnswers([]);
        setQuestionStartTime(Date.now());
        setTotalTime(0);
    };

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return;

        const timeSpent = (Date.now() - questionStartTime) / 1000; // in seconds
        const correct = answer === questions[currentIndex].correct;

        setSelectedAnswer(answer);
        setIsCorrect(correct);
        if (correct) setScore(score + 1);

        // Record answer
        const newAnswer: QuizAnswer = {
            wordId: questions[currentIndex].id,
            correct,
            timeSpent,
        };
        setAnswers([...answers, newAnswer]);

        // Update SRS progress
        updateWordProgress(questions[currentIndex].id, correct);

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedAnswer(null);
                setTypedAnswer("");
                setIsCorrect(null);
                setQuestionStartTime(Date.now());
            } else {
                finishQuiz([...answers, newAnswer]);
            }
        }, 1500);
    };

    const handleTypingSubmit = () => {
        const current = questions[currentIndex];
        const userAnswer = typedAnswer.trim().toLowerCase();
        const correctAnswer = current.correct.toLowerCase();

        // Check if answer is correct (allow some flexibility)
        const isMatch = userAnswer === correctAnswer ||
            userAnswer === current.furigana.toLowerCase() ||
            userAnswer === current.romaji?.toLowerCase();

        handleAnswer(isMatch ? current.correct : "");
    };

    const finishQuiz = (finalAnswers: QuizAnswer[]) => {
        const totalTimeSeconds = finalAnswers.reduce((sum, a) => sum + a.timeSpent, 0);
        setTotalTime(totalTimeSeconds);

        const correctCount = finalAnswers.filter(a => a.correct).length;
        const xpEarned = correctCount * 10 + (correctCount === questions.length ? 50 : 0); // Bonus for perfect score

        // Save quiz result
        saveQuizResult({
            id: `quiz_${Date.now()}`,
            date: new Date().toISOString(),
            quizType: quizMode,
            totalQuestions: questions.length,
            correctAnswers: correctCount,
            timeSpent: totalTimeSeconds,
            xpEarned,
            results: finalAnswers,
        });

        // Add XP
        addXP(xpEarned);

        setShowResult(true);
    };

    const playAudio = (text: string) => {
        play(text, undefined, 'ja-JP');
    };

    // Auto-play audio for listening mode
    useEffect(() => {
        if (quizMode === 'listening' && questions.length > 0 && !selectedAnswer && !showSettings) {
            const current = questions[currentIndex];
            setTimeout(() => playAudio(current.kanji), 500);
        }
    }, [currentIndex, quizMode, questions, selectedAnswer, showSettings]);

    if (showSettings) {
        return (
            <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
                <Navbar />
                <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
                    <Card className="p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <Settings className="w-8 h-8 text-vermillion" />
                            <h1 className="text-3xl font-black text-ink dark:text-ivory">Cài đặt Quiz</h1>
                        </div>

                        {/* Quiz Mode Selection */}
                        <div className="mb-8">
                            <h3 className="font-bold mb-4 text-ink dark:text-ivory">Chọn loại quiz</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setQuizMode('multiple-choice')}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${quizMode === 'multiple-choice'
                                            ? 'border-vermillion bg-vermillion/5'
                                            : 'border-ink/5 hover:border-vermillion/20'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">📝</div>
                                    <h4 className="font-bold mb-1">Trắc nghiệm</h4>
                                    <p className="text-sm text-ink/60 dark:text-ivory/60">Chọn nghĩa đúng của từ</p>
                                </button>

                                <button
                                    onClick={() => setQuizMode('listening')}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${quizMode === 'listening'
                                            ? 'border-vermillion bg-vermillion/5'
                                            : 'border-ink/5 hover:border-vermillion/20'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🎧</div>
                                    <h4 className="font-bold mb-1">Luyện nghe</h4>
                                    <p className="text-sm text-ink/60 dark:text-ivory/60">Nghe và chọn nghĩa đúng</p>
                                </button>

                                <button
                                    onClick={() => setQuizMode('typing')}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${quizMode === 'typing'
                                            ? 'border-vermillion bg-vermillion/5'
                                            : 'border-ink/5 hover:border-vermillion/20'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">⌨️</div>
                                    <h4 className="font-bold mb-1">Gõ từ</h4>
                                    <p className="text-sm text-ink/60 dark:text-ivory/60">Nhập hiragana/romaji</p>
                                </button>

                                <button
                                    onClick={() => setQuizMode('reverse')}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${quizMode === 'reverse'
                                            ? 'border-vermillion bg-vermillion/5'
                                            : 'border-ink/5 hover:border-vermillion/20'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🔄</div>
                                    <h4 className="font-bold mb-1">Ngược lại</h4>
                                    <p className="text-sm text-ink/60 dark:text-ivory/60">Tiếng Việt → Tiếng Nhật</p>
                                </button>
                            </div>
                        </div>

                        {/* Question Count */}
                        <div className="mb-8">
                            <h3 className="font-bold mb-4 text-ink dark:text-ivory">Số câu hỏi</h3>
                            <div className="flex gap-2">
                                {[5, 10, 20, 30].map(count => (
                                    <Button
                                        key={count}
                                        variant={questionCount === count ? 'primary' : 'outline'}
                                        onClick={() => setQuestionCount(count)}
                                    >
                                        {count}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* JLPT Level */}
                        <div className="mb-8">
                            <h3 className="font-bold mb-4 text-ink dark:text-ivory">Cấp độ JLPT</h3>
                            <div className="flex flex-wrap gap-2">
                                {(['All', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map(level => (
                                    <Button
                                        key={level}
                                        variant={jlptLevel === level ? 'primary' : 'outline'}
                                        onClick={() => setJlptLevel(level)}
                                    >
                                        {level}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Button size="lg" onClick={generateQuiz} className="w-full">
                            Bắt đầu Quiz
                        </Button>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    if (questions.length === 0) {
        generateQuiz();
        return null;
    }

    const current = questions[currentIndex];

    if (showResult) {
        const accuracy = (score / questions.length) * 100;
        const avgTime = totalTime / questions.length;

        return (
            <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
                <Navbar />
                <main className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="w-24 h-24 bg-vermillion/10 rounded-full flex items-center justify-center mx-auto mb-8 text-vermillion">
                            <Award className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-black text-ink dark:text-ivory mb-2">Hoàn thành Quiz!</h2>
                        <p className="text-xl font-medium text-ink/60 dark:text-ivory/60 mb-8">
                            {accuracy === 100 ? '🎉 Hoàn hảo!' : accuracy >= 80 ? '👍 Tốt lắm!' : accuracy >= 60 ? '💪 Cố gắng lên!' : '📚 Cần học thêm!'}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <Card className="p-6">
                                <Target className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                                <div className="text-3xl font-black text-ink dark:text-ivory">{score}/{questions.length}</div>
                                <div className="text-xs font-bold text-ink/40 uppercase">Điểm</div>
                            </Card>
                            <Card className="p-6">
                                <TrendingUp className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                                <div className="text-3xl font-black text-ink dark:text-ivory">{Math.round(accuracy)}%</div>
                                <div className="text-xs font-bold text-ink/40 uppercase">Độ chính xác</div>
                            </Card>
                            <Card className="p-6">
                                <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                                <div className="text-3xl font-black text-ink dark:text-ivory">{avgTime.toFixed(1)}s</div>
                                <div className="text-xs font-bold text-ink/40 uppercase">TB/câu</div>
                            </Card>
                            <Card className="p-6">
                                <Award className="w-8 h-8 text-vermillion mx-auto mb-2" />
                                <div className="text-3xl font-black text-ink dark:text-ivory">+{score * 10}XP</div>
                                <div className="text-xs font-bold text-ink/40 uppercase">Kinh nghiệm</div>
                            </Card>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center font-bold">
                            <Button size="lg" onClick={() => setShowSettings(true)}>
                                <RefreshCcw className="w-5 h-5 mr-2" /> Làm lại
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/vocabulary">Học từ vựng</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
            <Navbar />

            <main className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full">
                <div className="space-y-8">
                    <header className="flex justify-between items-center mb-12">
                        <div>
                            <h1 className="text-2xl font-black text-ink dark:text-ivory">
                                {quizMode === 'listening' && '🎧 Luyện nghe'}
                                {quizMode === 'typing' && '⌨️ Gõ từ'}
                                {quizMode === 'reverse' && '🔄 Ngược lại'}
                                {quizMode === 'multiple-choice' && '📝 Trắc nghiệm'}
                            </h1>
                            <p className="text-sm font-bold opacity-40 uppercase tracking-widest">
                                Câu {currentIndex + 1} / {questions.length}
                            </p>
                        </div>
                        <div className="w-32 h-2 bg-ink/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-vermillion"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </header>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {/* Question Card */}
                            <Card className="p-12 text-center mb-8">
                                {quizMode === 'listening' ? (
                                    <div>
                                        <button
                                            onClick={() => playAudio(current.kanji)}
                                            className="mx-auto mb-4 p-8 bg-vermillion/10 hover:bg-vermillion/20 rounded-full transition-colors"
                                        >
                                            <Volume2 className="w-16 h-16 text-vermillion" />
                                        </button>
                                        <p className="text-ink/40 dark:text-ivory/40">Nhấn để nghe lại</p>
                                    </div>
                                ) : quizMode === 'reverse' ? (
                                    <div>
                                        <h2 className="text-4xl font-black text-vermillion mb-4">{current.wordData.meaning_vi}</h2>
                                        <p className="text-ink/60 dark:text-ivory/60">Chọn từ tiếng Nhật tương ứng</p>
                                    </div>
                                ) : quizMode === 'typing' ? (
                                    <div>
                                        <h2 className="text-6xl font-black text-ink dark:text-ivory mb-4">{current.kanji}</h2>
                                        <p className="text-xl text-ink/60 dark:text-ivory/60 mb-6">Nhập hiragana hoặc romaji</p>
                                        <input
                                            type="text"
                                            value={typedAnswer}
                                            onChange={(e) => setTypedAnswer(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleTypingSubmit()}
                                            placeholder="Gõ câu trả lời..."
                                            disabled={!!selectedAnswer}
                                            className="w-full max-w-md px-6 py-4 text-center text-2xl border-2 border-ink/10 rounded-2xl focus:border-vermillion focus:outline-none bg-white dark:bg-ink/50 text-ink dark:text-ivory"
                                            autoFocus
                                        />
                                        {!selectedAnswer && (
                                            <Button onClick={handleTypingSubmit} className="mt-4">
                                                Kiểm tra
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className="text-6xl font-black text-ink dark:text-ivory mb-2 font-jp">{current.kanji}</h2>
                                        <p className="text-2xl text-ink/40 font-jp">{current.furigana}</p>
                                    </div>
                                )}
                            </Card>

                            {/* Options (for multiple choice modes) */}
                            {quizMode !== 'typing' && (
                                <div className="grid grid-cols-1 gap-4">
                                    {current.options.map((option: string, i: number) => {
                                        const isSelected = selectedAnswer === option;
                                        const isCorrectOption = option === current.correct;

                                        let stateClass = "border-ink/5 dark:border-ivory/5";

                                        if (selectedAnswer) {
                                            if (isCorrectOption) {
                                                stateClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600";
                                            } else if (isSelected && !isCorrectOption) {
                                                stateClass = "border-red-500 bg-red-500/10 text-red-600";
                                            }
                                        } else {
                                            stateClass = "hover:border-vermillion/40 hover:bg-vermillion/5";
                                        }

                                        return (
                                            <button
                                                key={i}
                                                disabled={!!selectedAnswer}
                                                onClick={() => handleAnswer(option)}
                                                className={`w-full p-6 text-left rounded-2xl border-2 font-bold transition-all flex justify-between items-center ${stateClass}`}
                                            >
                                                <span className={quizMode === 'reverse' ? 'font-jp text-2xl' : ''}>{option}</span>
                                                {selectedAnswer && isCorrectOption && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                                                {selectedAnswer && isSelected && !isCorrectOption && <XCircle className="w-6 h-6 text-red-500" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Feedback for typing mode */}
                            {quizMode === 'typing' && selectedAnswer && (
                                <Card className={`p-4 mt-4 text-center ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                    <p className="font-bold">
                                        {isCorrect ? '✅ Chính xác!' : `❌ Đáp án đúng: ${current.furigana} (${current.romaji})`}
                                    </p>
                                </Card>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}


"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { n5FullTest } from "@/data/mock_tests/n5_full_test";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Clock, CheckCircle2, AlertCircle, Play, Pause, RotateCw,
    ChevronLeft, ChevronRight, Save, Flag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { JLPTTest, TestQuestion } from "@/types/test";

// Helper to format time
const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function TestPage() {
    const params = useParams();
    const router = useRouter();

    // In real app, fetch test based on params.testId
    const testData: JLPTTest = n5FullTest; // Mock

    // State
    const [timeLeft, setTimeLeft] = useState(testData.duration * 60);
    const [isStarted, setIsStarted] = useState(false);
    const [activeSection, setActiveSection] = useState<keyof typeof testData.sections>("vocabulary");
    const [answers, setAnswers] = useState<Record<string, number>>({}); // questionId -> answerIndex
    const [flagged, setFlagged] = useState<Record<string, boolean>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // Flatten questions for navigation
    const getQuestionsBySection = (sectionKey: keyof typeof testData.sections) => {
        return testData.sections[sectionKey]?.questions || [];
    };

    const sections = Object.keys(testData.sections) as Array<keyof typeof testData.sections>;

    useEffect(() => {
        if (!isStarted || isSubmitted) return;

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
    }, [isStarted, isSubmitted]);

    const handleAnswer = (questionId: string, answerIndex: number) => {
        if (isSubmitted) return;
        setAnswers(prev => ({
            ...prev,
            [questionId]: answerIndex
        }));
    };

    const toggleFlag = (questionId: string) => {
        setFlagged(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        setIsStarted(false);

        // Calculate Score
        let total = 0;
        let earned = 0;

        sections.forEach(sectionKey => {
            const section = testData.sections[sectionKey];
            const sectionTotalQuestions = section.questions.length;
            if (sectionTotalQuestions === 0) return;

            // Allow integer division logic approx
            const pointsPerQuestion = section.scoreWeight / sectionTotalQuestions;

            section.questions.forEach(q => {
                total += pointsPerQuestion;
                if (answers[q.id] === q.correctAnswer) {
                    earned += pointsPerQuestion;
                }
            });
        });

        setScore(Math.round(earned));
    };

    if (!isStarted && !isSubmitted) {
        return (
            <div className="min-h-screen bg-ivory dark:bg-ink flex flex-col items-center justify-center p-4">
                <Card className="max-w-2xl w-full p-8 text-center space-y-6">
                    <h1 className="text-3xl font-bold font-jp mb-2">{testData.title}</h1>
                    <div className="text-xl text-stone-600 dark:text-stone-400">
                        Thời gian làm bài: <span className="font-bold text-vermillion">{testData.duration} phút</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left bg-stone-100 dark:bg-stone-800 p-6 rounded-lg">
                        <div>
                            <p className="font-bold">Cấu trúc đề:</p>
                            <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
                                <li>Từ vựng ({testData.sections.vocabulary.questions.length} câu)</li>
                                <li>Ngữ pháp ({testData.sections.grammar.questions.length} câu)</li>
                                <li>Đọc hiểu ({testData.sections.reading.questions.length} câu)</li>
                                <li>Nghe hiểu ({testData.sections.listening.questions.length} câu)</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold">Lưu ý:</p>
                            <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
                                <li>Không thể tạm dừng khi đã bắt đầu.</li>
                                <li>Hệ thống tự nộp bài khi hết giờ.</li>
                                <li>Điểm đỗ dự kiến: {testData.passScore}/{testData.totalScore}.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center pt-4">
                        <Button variant="outline" onClick={() => router.back()}>
                            Quay lại
                        </Button>
                        <Button size="lg" className="bg-vermillion hover:bg-vermillion/90 text-white" onClick={() => setIsStarted(true)}>
                            Bắt đầu làm bài
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    // Result View
    if (isSubmitted) {
        const isPassed = score >= testData.passScore;
        return (
            <div className="min-h-screen bg-ivory dark:bg-ink p-4 md:p-8">
                <Card className="max-w-4xl mx-auto p-8 text-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-8"
                    >
                        {isPassed ? (
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                        ) : (
                            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-12 h-12 text-red-600" />
                            </div>
                        )}
                        <h2 className="text-3xl font-bold mb-2">
                            {isPassed ? "Chúc mừng! Bạn đã đỗ!" : "Rất tiếc, bạn chưa đạt."}
                        </h2>
                        <div className="text-5xl font-bold text-ink dark:text-ivory my-4">
                            {score} <span className="text-2xl text-stone-500">/ {testData.totalScore}</span>
                        </div>
                        <p className="text-stone-500">
                            Điểm chuẩn: {testData.passScore}
                        </p>
                    </motion.div>

                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => window.location.reload()} variant="outline">
                            Làm lại đề này
                        </Button>
                        <Button onClick={() => router.push('/test')}>
                            Danh sách đề thi
                        </Button>
                    </div>

                    {/* Detailed Review Section could be added here */}
                    <div className="mt-12 text-left">
                        <h3 className="text-xl font-bold mb-4">Chi tiết đáp án:</h3>
                        {sections.map(sectionKey => (
                            <div key={sectionKey} className="mb-6">
                                <h4 className="font-bold text-lg mb-2 capitalize border-b pb-1">{testData.sections[sectionKey].title}</h4>
                                <div className="space-y-4">
                                    {testData.sections[sectionKey].questions.map((q, idx) => (
                                        <div key={q.id} className={`p-4 rounded border ${answers[q.id] === q.correctAnswer ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'
                                            }`}>
                                            <p className="font-bold mb-2">Câu {idx + 1}: {q.question}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                {q.options.map((opt, optIdx) => (
                                                    <div key={optIdx} className={`px-2 py-1 rounded ${optIdx === q.correctAnswer ? 'bg-green-200 font-bold' :
                                                        (optIdx === answers[q.id] && optIdx !== q.correctAnswer ? 'bg-red-200 line-through' : '')
                                                        }`}>
                                                        {['A', 'B', 'C', 'D'][optIdx]}. {opt}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="mt-2 text-sm text-stone-600 italic">
                                                💡 {q.explanation}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory dark:bg-ink flex flex-col h-screen overflow-hidden">
            {/* Header Sticky */}
            <header className="bg-white dark:bg-zinc-900 shadow-sm border-b px-6 py-3 flex justify-between items-center z-20">
                <div className="font-bold text-lg">{testData.title}</div>
                <div className={`flex items-center gap-2 text-xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-vermillion'
                    }`}>
                    <Clock className="w-5 h-5" />
                    {formatTime(timeLeft)}
                </div>
                <Button onClick={handleSubmit} variant="primary" size="sm">
                    Nộp bài
                </Button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left: Content */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    {/* Tabs */}
                    <div className="bg-stone-100 dark:bg-stone-800 px-6 py-2 flex gap-2 border-b overflow-x-auto">
                        {sections.map(sectionKey => (
                            <button
                                key={sectionKey}
                                onClick={() => setActiveSection(sectionKey)}
                                className={`px-4 py-2 rounded-t-lg text-sm font-bold transition-colors whitespace-nowrap ${activeSection === sectionKey
                                    ? 'bg-white dark:bg-zinc-900 text-vermillion shadow-sm border-t-2 border-vermillion'
                                    : 'text-stone-500 hover:text-stone-700 hover:bg-white/50'
                                    }`}
                            >
                                {testData.sections[sectionKey].title}
                            </button>
                        ))}
                    </div>

                    {/* Question List Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32">
                        <div className="max-w-4xl mx-auto space-y-8">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold mb-2 text-vermillion">
                                    {testData.sections[activeSection].title}
                                </h2>
                                <p className="text-stone-500">{testData.sections[activeSection].description}</p>
                            </div>

                            {getQuestionsBySection(activeSection).map((q, idx) => (
                                <Card key={q.id} className="p-6 relative group hover:shadow-md transition-shadow">
                                    <div className="absolute top-4 right-4 text-stone-300 hover:text-yellow-500 cursor-pointer" onClick={() => toggleFlag(q.id)}>
                                        <Flag className={`w-5 h-5 ${flagged[q.id] ? 'text-yellow-500 fill-current' : ''}`} />
                                    </div>

                                    <h3 className="text-lg font-bold mb-4 pr-8">
                                        <span className="bg-stone-200 dark:bg-stone-700 px-2 py-0.5 rounded mr-2 text-sm">Câu {idx + 1}</span>
                                        {/* Simple formatting for bold text using regex could be added, but for now raw string */}
                                        {q.question.split('**').map((part, i) =>
                                            i % 2 === 1 ? <span key={i} className="text-vermillion">{part}</span> : part
                                        )}
                                    </h3>

                                    {/* Context for Reading/Listening */}
                                    {q.context && (
                                        <div className="mb-4 p-4 bg-stone-50 dark:bg-zinc-800/50 rounded-lg border-l-4 border-stone-300 italic text-stone-700 dark:text-stone-300">
                                            {q.context}
                                        </div>
                                    )}

                                    {/* Audio Placeholder for Listening */}
                                    {activeSection === 'listening' && (
                                        <div className="mb-6 flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-full w-fit pr-6">
                                            <Button size="icon" className="rounded-full w-10 h-10 bg-indigo-500 text-white hover:bg-indigo-600" onClick={() => {
                                                // Speak the question + context + options using simplified TTS
                                                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                                                    const utterance = new SpeechSynthesisUtterance(q.script || q.context || q.question);
                                                    utterance.lang = 'ja-JP';
                                                    window.speechSynthesis.speak(utterance);
                                                }
                                            }}>
                                                <Play className="w-4 h-4 ml-0.5" />
                                            </Button>
                                            <div className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                                                Nghe đoạn hội thoại
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {q.options.map((opt, optIdx) => (
                                            <div
                                                key={optIdx}
                                                onClick={() => handleAnswer(q.id, optIdx)}
                                                className={`
                                                    p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-3
                                                    ${answers[q.id] === optIdx
                                                        ? 'bg-vermillion/10 border-vermillion text-vermillion font-bold ring-1 ring-vermillion'
                                                        : 'hover:bg-stone-50 dark:hover:bg-zinc-800 border-stone-200 dark:border-stone-700'
                                                    }
                                                `}
                                            >
                                                <div className={`
                                                    w-6 h-6 rounded-full flex items-center justify-center text-xs border
                                                    ${answers[q.id] === optIdx
                                                        ? 'bg-vermillion text-white border-vermillion'
                                                        : 'bg-white dark:bg-black border-stone-300 text-stone-500'
                                                    }
                                                `}>
                                                    {['A', 'B', 'C', 'D'][optIdx]}
                                                </div>
                                                <span>{opt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Navigation Panel (Hidden on mobile) */}
                <div className="w-64 bg-white dark:bg-zinc-900 border-l hidden lg:flex flex-col z-10">
                    <div className="p-4 border-b font-bold font-jp">Danh sách câu hỏi</div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-6">
                            {sections.map(sectionKey => (
                                <div key={sectionKey}>
                                    <h4 className="text-xs uppercase text-stone-500 font-bold mb-2">{testData.sections[sectionKey].title}</h4>
                                    <div className="grid grid-cols-5 gap-2">
                                        {testData.sections[sectionKey].questions.map((q, idx) => (
                                            <button
                                                key={q.id}
                                                onClick={() => {
                                                    setActiveSection(sectionKey);
                                                    // Scroll handling logic would go here
                                                }}
                                                className={`
                                                    w-8 h-8 rounded text-xs font-bold transition-all relative
                                                    ${answers[q.id] !== undefined
                                                        ? 'bg-ink text-white dark:bg-ivory dark:text-black'
                                                        : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-500'
                                                    }
                                                    ${flagged[q.id] ? 'ring-2 ring-yellow-400' : ''}
                                                `}
                                            >
                                                {idx + 1}
                                                {flagged[q.id] && (
                                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t bg-stone-50 dark:bg-zinc-900">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Đã làm:</span>
                            <span className="font-bold">{Object.keys(answers).length} / {Object.values(testData.sections).reduce((acc, s) => acc + s.questions.length, 0)}</span>
                        </div>
                        <div className="w-full bg-stone-200 rounded-full h-2">
                            <div
                                className="bg-vermillion h-2 rounded-full transition-all duration-500"
                                style={{
                                    width: `${(Object.keys(answers).length / Object.values(testData.sections).reduce((acc, s) => acc + s.questions.length, 0)) * 100}%`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t p-2 flex justify-between items-center px-4 z-30">
                <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-ink rounded-sm"></div>
                    <span>{Object.keys(answers).length} Đã làm</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                    // Could implement a drawer for question map here
                    alert(`Bạn đã làm ${Object.keys(answers).length} câu.`);
                }}>
                    Xem tiến độ
                </Button>
            </div>
        </div>
    );
}

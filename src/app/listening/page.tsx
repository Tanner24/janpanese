"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Play, Pause, RotateCcw, Volume2, Eye, EyeOff, CheckCircle2, XCircle, ChevronRight, Headphones, Clock, MoreHorizontal } from "lucide-react";
import { listeningExercises } from "@/data/listening";
import { ListeningExercise } from "@/types/listening";

export default function ListeningPage() {
    const [selectedLevel, setSelectedLevel] = useState<'All' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('All');
    const [currentExercise, setCurrentExercise] = useState<ListeningExercise | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    const [showScript, setShowScript] = useState(false);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef<SpeechSynthesisUtterance | null>(null);
    const progressInterval = useRef<NodeJS.Timeout | null>(null);

    const filteredExercises = selectedLevel === 'All'
        ? listeningExercises
        : listeningExercises.filter(ex => ex.jlpt_level === selectedLevel);

    useEffect(() => {
        return () => {
            stopAudio();
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, []);

    const simulateProgress = (text: string, speed: number) => {
        if (progressInterval.current) clearInterval(progressInterval.current);
        setProgress(0);

        // Approx speaking rate: 5 chars per second * speed
        const durationSec = text.length / (5 * speed);
        const intervalMs = 100;
        const step = 100 / (durationSec * (1000 / intervalMs));

        progressInterval.current = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    if (progressInterval.current) clearInterval(progressInterval.current);
                    return 100;
                }
                return p + step;
            });
        }, intervalMs);
    };

    const playAudio = (text: string, speed: number = 1.0) => {
        stopAudio();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = speed;

        utterance.onstart = () => {
            setIsPlaying(true);
            simulateProgress(text, speed);
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setProgress(100);
            if (progressInterval.current) clearInterval(progressInterval.current);
        };

        utterance.onerror = () => {
            setIsPlaying(false);
            if (progressInterval.current) clearInterval(progressInterval.current);
        };

        audioRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const stopAudio = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        if (progressInterval.current) clearInterval(progressInterval.current);
    };

    const handleSelectExercise = (exercise: ListeningExercise) => {
        stopAudio();
        setCurrentExercise(exercise);
        setCurrentQuestionIdx(0);
        setAnswers(new Array(exercise.questions.length).fill(null));
        setSelectedAnswer(null);
        setShowResults(false);
        setShowScript(false);
        setScore(0);
        setProgress(0);
    };

    const handleAnswerSelect = (optionIndex: number) => {
        if (showResults) return;
        setSelectedAnswer(optionIndex);
    };

    const handleNextQuestion = () => {
        if (!currentExercise || selectedAnswer === null) return;

        const newAnswers = [...answers];
        newAnswers[currentQuestionIdx] = selectedAnswer;
        setAnswers(newAnswers);

        if (currentQuestionIdx < currentExercise.questions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            // Finish
            let correctCount = 0;
            newAnswers.forEach((ans, idx) => {
                if (ans === currentExercise.questions[idx].correct) {
                    correctCount++;
                }
            });
            setScore(correctCount);
            setShowResults(true);
        }
    };

    const resetExercise = () => {
        if (!currentExercise) return;
        setCurrentQuestionIdx(0);
        setAnswers(new Array(currentExercise.questions.length).fill(null));
        setSelectedAnswer(null);
        setShowResults(false);
        setShowScript(false);
        setScore(0);
        setProgress(0);
        stopAudio();
    };

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full flex flex-col">
                <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
                            <Headphones className="w-8 h-8 text-primary" />
                            Luyện Nghe
                        </h1>
                        <p className="text-muted">Cải thiện kỹ năng nghe hiểu qua các bài hội thoại</p>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {(['All', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map(level => (
                            <Button
                                key={level}
                                variant={selectedLevel === level ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedLevel(level)}
                                className="rounded-full"
                            >
                                {level}
                            </Button>
                        ))}
                    </div>
                </header>

                <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LIST PANE (Left) */}
                    <div className={`lg:col-span-4 h-full flex flex-col space-y-4 ${currentExercise ? 'hidden lg:flex' : 'flex'}`}>
                        <div className="space-y-3">
                            {filteredExercises.length > 0 ? filteredExercises.map((exercise) => (
                                <div
                                    key={exercise.id}
                                    onClick={() => handleSelectExercise(exercise)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md group ${currentExercise?.id === exercise.id
                                        ? 'bg-primary/5 border-primary shadow-sm'
                                        : 'bg-card border-border hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${currentExercise?.id === exercise.id ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-muted-foreground'
                                            }`}>
                                            {exercise.jlpt_level}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> 2m
                                        </span>
                                    </div>
                                    <h3 className={`font-bold text-lg mb-1 group-hover:text-primary transition-colors ${currentExercise?.id === exercise.id ? 'text-primary' : 'text-foreground'}`}>
                                        {exercise.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{exercise.category}</p>
                                </div>
                            )) : (
                                <div className="text-center p-8 text-muted-foreground">Không có bài nghe nào.</div>
                            )}
                        </div>
                    </div>

                    {/* DETAIL PANE (Right) */}
                    <div className={`lg:col-span-8 w-full ${!currentExercise ? 'hidden lg:block' : 'block'}`}>
                        {currentExercise ? (
                            <div className="space-y-6">
                                {/* Back button for mobile */}
                                <div className="lg:hidden mb-4">
                                    <Button variant="ghost" size="sm" onClick={() => setCurrentExercise(null)} className="-ml-2">
                                        ← Quay lại danh sách
                                    </Button>
                                </div>

                                {/* PLAYER CARD */}
                                <Card className="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 border-none shadow-inner">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-black text-foreground">{currentExercise.title}</h2>
                                            <p className="text-primary font-bold">{currentExercise.category}</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center">
                                            {isPlaying ? <div className="space-x-0.5 flex items-end h-4">
                                                <motion.div animate={{ height: [4, 16, 8, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-primary rounded-full" />
                                                <motion.div animate={{ height: [8, 4, 12, 16, 8] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-primary rounded-full" />
                                                <motion.div animate={{ height: [12, 8, 4, 10, 12] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-primary rounded-full" />
                                            </div> : <Volume2 className="w-6 h-6 text-muted-foreground" />}
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full mb-6 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ ease: "linear" }}
                                        />
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <Button
                                                onClick={() => playAudio(currentExercise.script_jp, playbackSpeed)}
                                                size="icon"
                                                className="w-12 h-12 rounded-full shadow-lg hover:scale-105 transition-transform"
                                                disabled={isPlaying}
                                            >
                                                <Play className="w-5 h-5 fill-current" />
                                            </Button>
                                            <Button
                                                onClick={stopAudio}
                                                variant="outline"
                                                size="icon"
                                                className="w-10 h-10 rounded-full"
                                                disabled={!isPlaying}
                                            >
                                                <Pause className="w-4 h-4 fill-current" />
                                            </Button>
                                            <Button
                                                onClick={() => playAudio(currentExercise.script_jp, playbackSpeed)}
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground"
                                            >
                                                <RotateCcw className="w-4 h-4 mr-2" />
                                                Nghe lại
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 p-1 rounded-lg border">
                                            {[0.75, 1.0, 1.25].map(speed => (
                                                <button
                                                    key={speed}
                                                    onClick={() => setPlaybackSpeed(speed)}
                                                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${playbackSpeed === speed ? 'bg-neutral-200 dark:bg-neutral-700 text-foreground' : 'text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                                        }`}
                                                >
                                                    {speed}x
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </Card>

                                {/* SCRIPT ACCORDION */}
                                <div className="border border-border rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setShowScript(!showScript)}
                                        className="w-full px-4 py-3 flex items-center justify-between bg-card hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                                    >
                                        <span className="font-bold text-sm flex items-center gap-2">
                                            {showScript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            {showScript ? "Ẩn nội dung bài nghe" : "Xem nội dung bài nghe"}
                                        </span>
                                        <span className="text-xs text-muted-foreground bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                                            Nhật / Việt
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {showScript && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: "auto" }}
                                                exit={{ height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border-t border-border space-y-4">
                                                    <p className="text-lg leading-relaxed font-jp text-foreground">
                                                        {currentExercise.script_jp}
                                                    </p>
                                                    <p className="text-sm italic text-muted-foreground border-l-2 border-primary pl-4">
                                                        {currentExercise.script_vi}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* QUESTION AREA */}
                                {!showResults ? (
                                    <Card className="p-6 md:p-8 border-2 border-primary/5 shadow-lg">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                                                Câu hỏi {currentQuestionIdx + 1} / {currentExercise.questions.length}
                                            </span>
                                            <span className="text-md font-bold text-primary">
                                                10 điểm
                                            </span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">
                                            {currentExercise.questions[currentQuestionIdx].question}
                                        </h3>

                                        <div className="grid grid-cols-1 gap-3">
                                            {currentExercise.questions[currentQuestionIdx].options.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswerSelect(idx)}
                                                    className={`group relative p-4 pl-12 text-left rounded-xl border-2 transition-all duration-200 ${selectedAnswer === idx
                                                        ? 'border-primary bg-primary/5 shadow-md'
                                                        : 'border-border hover:border-primary/50 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                                        }`}
                                                >
                                                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedAnswer === idx ? 'border-primary bg-primary' : 'border-muted-foreground/30 group-hover:border-primary'
                                                        }`}>
                                                        {selectedAnswer === idx && <div className="w-2 h-2 rounded-full bg-white" />}
                                                    </div>
                                                    <span className={`font-medium text-lg ${selectedAnswer === idx ? 'text-primary' : 'text-foreground'
                                                        }`}>
                                                        {option}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="mt-8 flex justify-end">
                                            <Button
                                                onClick={handleNextQuestion}
                                                disabled={selectedAnswer === null}
                                                size="lg"
                                                className="px-8 font-bold"
                                            >
                                                {currentQuestionIdx < currentExercise.questions.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </Card>
                                ) : (
                                    <Card className="p-12 text-center bg-card border-none shadow-xl">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="mb-8"
                                        >
                                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg mb-6">
                                                <CheckCircle2 className="w-12 h-12 text-white" />
                                            </div>
                                            <h2 className="text-4xl font-black mb-2">Hoàn thành!</h2>
                                            <p className="text-muted-foreground text-lg">Bạn đã trả lời đúng <span className="text-green-600 font-bold text-2xl">{score}</span> / {currentExercise.questions.length} câu.</p>
                                        </motion.div>

                                        <div className="flex justify-center gap-4">
                                            <Button variant="outline" onClick={resetExercise}>
                                                <RotateCcw className="w-4 h-4 mr-2" /> Làm lại bài này
                                            </Button>
                                            <Button onClick={() => setCurrentExercise(null)}>
                                                Chọn bài khác
                                            </Button>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        ) : (
                            <div className="hidden lg:flex flex-col items-center justify-center h-[50vh] text-center p-8 bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl border-2 border-dashed border-neutral-200 dark:border-neutral-800">
                                <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
                                    <Headphones className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">Chưa chọn bài nghe</h3>
                                <p className="text-muted-foreground max-w-sm">
                                    Vui lòng chọn một bài luyện nghe từ danh sách bên trái để bắt đầu luyện tập.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

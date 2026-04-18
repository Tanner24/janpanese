"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mic, Volume2, CheckCircle2, XCircle, ArrowRight, Activity, RotateCcw, StopCircle, Bot, Sparkles } from 'lucide-react';
import { speakingLessons, SpeakingLesson, SpeakingPhrase } from '@/data/speaking';

// Function to calculate string similarity (Levenshtein distance conceptually, but simpler for our needs)
function calculateSimilarity(str1: string, str2: string) {
    const s1 = str1.toLowerCase().replace(/[\s,\.、。！？？！!\?]/g, '');
    const s2 = str2.toLowerCase().replace(/[\s,\.、。！？？！!\?]/g, '');

    if (s1 === s2) return 100;
    if (s1.length === 0 || s2.length === 0) return 0;

    let matchCount = 0;
    const maxLength = Math.max(s1.length, s2.length);

    for (let i = 0; i < Math.min(s1.length, s2.length); i++) {
        if (s1[i] === s2[i]) matchCount++;
    }

    return Math.round((matchCount / maxLength) * 100);
}

export default function SpeakingPage() {
    const [selectedLesson, setSelectedLesson] = useState<SpeakingLesson | null>(null);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    // Recording states
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [feedback, setFeedback] = useState<{ score: number, isGood: boolean } | null>(null);
    const [recognition, setRecognition] = useState<any>(null);

    // AI Generation states
    const [isGenerating, setIsGenerating] = useState(false);
    const [customComponentLessons, setCustomComponentLessons] = useState<SpeakingLesson[]>([]);
    const [customLevel, setCustomLevel] = useState<"N5" | "N4" | "N3" | "N2" | "N1">("N3");
    const [customTopic, setCustomTopic] = useState("");

    // Initialize Speech Recognition
    const startRecording = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const rec = new SpeechRecognition();
            rec.lang = 'ja-JP'; // IMPORTANT: Set language to Japanese
            rec.interimResults = true; // Show results as they speak
            rec.maxAlternatives = 1;

            rec.onstart = () => {
                setIsRecording(true);
                setTranscript("");
                setFeedback(null);
            };

            rec.onresult = (event: any) => {
                const currentTranscript = event.results[0][0].transcript;
                setTranscript(currentTranscript);

                // If it's final result, evaluate it
                if (event.results[0].isFinal) {
                    evaluatePronunciation(currentTranscript);
                }
            };

            rec.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsRecording(false);
                if (event.error === 'not-allowed') {
                    alert('Vui lòng cấp quyền sử dụng Micro cho trình duyệt để luyện nói.');
                }
            };

            rec.onend = () => {
                setIsRecording(false);
            };

            rec.start();
            setRecognition(rec);
        } else {
            alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói (Web Speech API). Vui lòng dùng Chrome hoặc trình duyệt tương thích.");
        }
    };

    const stopRecording = () => {
        if (recognition) {
            recognition.stop();
            setIsRecording(false);
        }
    };

    const playAudio = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8; // Speak slightly slower for learning
            window.speechSynthesis.speak(utterance);
        }
    };

    const evaluatePronunciation = (spokenText: string) => {
        if (!selectedLesson) return;

        const targetPhrase = selectedLesson.phrases[currentPhraseIndex].japanese;
        const score = calculateSimilarity(targetPhrase, spokenText);

        // Let's be generous for learning: >65% is good
        setFeedback({
            score,
            isGood: score >= 65
        });
    };

    const nextPhrase = () => {
        if (selectedLesson && currentPhraseIndex < selectedLesson.phrases.length - 1) {
            setCurrentPhraseIndex(prev => prev + 1);
            setTranscript("");
            setFeedback(null);
        }
    };

    const handleGenerateAILesson = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate-speaking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: customTopic || "Giao tiếp hàng ngày",
                    level: customLevel,
                    count: 3
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                console.error("API Error Response:", data);
                throw new Error(data.details || data.error || "Unknown API Error");
            }

            if (data && data.phrases) {
                const newLesson: SpeakingLesson = {
                    id: `ai_generated_${Date.now()}`,
                    level: customLevel,
                    title: `Hội thoại: ${customTopic || "Tự chọn"} (AI)`,
                    description: "Đoạn hội thoại do AI tạo dựa trên ngữ cảnh thực tế.",
                    topic: customTopic || "Tùy chọn",
                    phrases: data.phrases
                };
                setCustomComponentLessons([...customComponentLessons, newLesson]);
                setSelectedLesson(newLesson);
                setCurrentPhraseIndex(0);
                setTranscript("");
                setFeedback(null);
            }
        } catch (error: any) {
            console.error("Failed to generate AI lesson", error);
            alert("Lỗi khi AI tạo bài học. Tham khảo Console log (F12) để xem chi tiết.\\nLỗi: " + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const renderLessonSelect = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-black mb-4">Luyện Phát Âm <span className="gradient-text">AI</span></h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Nghe giọng chuẩn người bản xứ và luyện tập phát âm. AI sẽ chấm điểm và phản hồi tức thời.
                </p>
                <div className="mt-8 bg-card/60 p-6 rounded-2xl border-2 shadow-sm max-w-3xl mx-auto">
                    <h3 className="font-bold text-lg mb-4 flex items-center justify-center gap-2"><Sparkles className="w-5 h-5 text-indigo-500" /> Nhờ AI viết bài học riêng cho bạn</h3>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <select
                            value={customLevel}
                            onChange={(e) => setCustomLevel(e.target.value as "N5" | "N4" | "N3" | "N2" | "N1")}
                            className="p-3 border-2 border-border rounded-xl bg-background text-foreground font-medium shrink-0 outline-none focus:border-primary transition-colors"
                        >
                            <option value="N5">Trình độ N5</option>
                            <option value="N4">Trình độ N4</option>
                            <option value="N3">Trình độ N3</option>
                            <option value="N2">Trình độ N2</option>
                            <option value="N1">Trình độ N1</option>
                        </select>
                        <input
                            type="text"
                            value={customTopic}
                            onChange={(e) => setCustomTopic(e.target.value)}
                            placeholder="Nhập chủ đề... (VD: Xin việc, Mua sắm, Xin lỗi)"
                            className="p-3 border-2 border-border rounded-xl w-full flex-1 bg-background text-foreground outline-none focus:border-primary transition-colors"
                        />
                        <Button
                            onClick={handleGenerateAILesson}
                            size="lg"
                            disabled={isGenerating || !customTopic.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shrink-0 rounded-xl"
                        >
                            {isGenerating ? (
                                <><span className="animate-spin w-4 h-4 mr-2 border-2 border-white/50 border-t-white rounded-full"></span> Đang soạn...</>
                            ) : (
                                "Bắt đầu tạo"
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[...speakingLessons, ...customComponentLessons].map((lesson) => (
                    <motion.div
                        key={lesson.id}
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Card
                            className="p-6 h-full flex flex-col cursor-pointer border-2 hover:border-primary transition-colors bg-card/50"
                            onClick={() => {
                                setSelectedLesson(lesson);
                                setCurrentPhraseIndex(0);
                                setTranscript("");
                                setFeedback(null);
                            }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
                                    {lesson.level}
                                </span>
                                <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                    {lesson.phrases.length} câu
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                            <p className="text-muted-foreground text-sm flex-1">{lesson.description}</p>

                            <div className="mt-6 flex items-center text-primary font-medium text-sm">
                                Bắt đầu <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    const renderSpeakingInterface = () => {
        if (!selectedLesson) return null;

        const currentPhrase = selectedLesson.phrases[currentPhraseIndex];
        const progress = ((currentPhraseIndex) / selectedLesson.phrases.length) * 100;

        return (
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header/Progress */}
                <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setSelectedLesson(null)} className="text-muted-foreground">
                        ← Trở lại danh sách
                    </Button>
                    <div className="text-sm font-medium text-muted-foreground">
                        Câu {currentPhraseIndex + 1} / {selectedLesson.phrases.length}
                    </div>
                </div>

                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                {/* Phrase Card */}
                <Card className="p-8 text-center relative overflow-hidden bg-card/80 border-2">
                    {/* Topic Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {selectedLesson.topic}
                        </span>
                    </div>

                    <div className="py-8 space-y-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 rounded-full mx-auto mb-4 border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                            onClick={() => playAudio(currentPhrase.japanese)}
                        >
                            <Volume2 className="w-6 h-6" />
                        </Button>

                        <h2 className="text-4xl md:text-5xl font-black text-foreground font-jp tracking-wide">
                            {currentPhrase.japanese}
                        </h2>
                        <p className="text-xl text-primary/80 font-medium">
                            {currentPhrase.romaji}
                        </p>
                        <p className="text-lg text-muted-foreground mt-4">
                            {currentPhrase.meaning_vi}
                        </p>
                    </div>

                    {/* Interaction Area */}
                    <div className="mt-8 pt-8 border-t border-border">
                        <div className="flex flex-col items-center gap-6">

                            {/* Recording Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={isRecording ? stopRecording : startRecording}
                                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-colors ${isRecording
                                    ? 'bg-red-500 text-white animate-pulse shadow-red-500/30'
                                    : 'bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary/90'
                                    }`}
                            >
                                {isRecording ? <StopCircle className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                            </motion.button>

                            <p className="text-sm font-medium text-muted-foreground">
                                {isRecording ? "Đang nghe... Nhấn để dừng" : "Nhấn để bắt đầu đọc"}
                            </p>

                            {/* Transcript Display */}
                            <AnimatePresence>
                                {(transcript || isRecording) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full max-w-md p-4 bg-muted/50 rounded-xl min-h-[60px] flex items-center justify-center relative"
                                    >
                                        {isRecording && !transcript && (
                                            <div className="flex gap-1 items-center justify-center">
                                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                                            </div>
                                        )}
                                        <p className="text-lg font-jp text-center">{transcript}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Feedback Display */}
                            <AnimatePresence>
                                {feedback && !isRecording && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`w-full max-w-md p-6 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl ${feedback.isGood ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gradient-to-br from-orange-400 to-red-500'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            {feedback.isGood ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                                            <span className="text-2xl font-bold">Điểm: {feedback.score}/100</span>
                                        </div>
                                        <p className="font-medium text-white/90 text-center">
                                            {feedback.isGood
                                                ? "Tuyệt vời! Phát âm rất chuẩn."
                                                : "Bạn cần phát âm rõ hơn. Hãy NGHE lại và THỬ lại nhé!"}
                                        </p>

                                        <div className="flex gap-4 mt-6">
                                            <Button
                                                variant="outline"
                                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                                                onClick={startRecording}
                                            >
                                                <RotateCcw className="w-4 h-4 mr-2" /> Thử lại
                                            </Button>

                                            {currentPhraseIndex < selectedLesson.phrases.length - 1 && (
                                                <Button
                                                    variant="outline"
                                                    className="bg-white text-black hover:bg-white/90 border-0"
                                                    onClick={nextPhrase}
                                                >
                                                    Câu tiếp theo <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-12 pb-24 px-4 sm:px-6 lg:px-8">
                {selectedLesson ? renderSpeakingInterface() : renderLessonSelect()}
            </main>

            <Footer />
        </div>
    );
}

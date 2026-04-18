"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { mockGrammar } from "@/data/grammar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, BookOpen, Lightbulb, GraduationCap, CheckCircle2, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function GrammarDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const grammar = mockGrammar.find(g => g.id === id);

    const [practiceMode, setPracticeMode] = useState<"read" | "write">("read");
    const [showAnswer, setShowAnswer] = useState<number | null>(null);

    if (!grammar) {
        return (
            <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Không tìm thấy ngữ pháp này</h1>
                    <Button onClick={() => router.back()}>Quay lại</Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
            <Navbar />

            <main className="flex-grow max-w-5xl mx-auto px-4 lg:px-8 py-12 w-full">
                {/* Back Button */}
                <Link href="/grammar" className="inline-flex items-center gap-2 text-ink/60 hover:text-vermillion transition-colors mb-8 font-medium">
                    <ArrowLeft className="w-5 h-5" />
                    Quay lại danh sách
                </Link>

                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-vermillion text-white rounded-full text-sm font-bold shadow-lg shadow-vermillion/20">
                            {grammar.jlpt_level}
                        </span>
                        {grammar.category && (
                            <span className="px-4 py-1.5 bg-ink/5 dark:bg-ivory/10 text-ink/60 dark:text-ivory/60 rounded-full text-sm font-bold border border-ink/5">
                                {grammar.category}
                            </span>
                        )}
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-ink dark:text-ivory mb-6 font-jp tracking-tight">
                        {grammar.title}
                    </h1>

                    {/* Formation Box */}
                    {grammar.formation && (
                        <div className="p-6 bg-white dark:bg-ink/50 rounded-2xl border-l-8 border-vermillion shadow-sm mb-8">
                            <h3 className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-vermillion"></span>
                                Cấu trúc (Formation)
                            </h3>
                            <p className="text-2xl md:text-3xl font-mono text-vermillion font-bold inter">{grammar.formation}</p>
                        </div>
                    )}

                    {/* Description & Note */}
                    <div className="space-y-6 text-lg">
                        <p className="text-ink/80 dark:text-ivory/80 leading-relaxed font-medium">
                            {grammar.description}
                        </p>

                        {grammar.note && (
                            <div className="flex gap-4 p-5 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-900/20 text-ink/70 dark:text-yellow-100/80">
                                <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                                <div>
                                    <span className="font-bold block mb-1 text-yellow-700 dark:text-yellow-500">Lưu ý:</span>
                                    {grammar.note}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Practice Section */}
                <div className="border-t border-ink/5 dark:border-ivory/5 pt-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <GraduationCap className="w-8 h-8 text-emerald-500" />
                            Luyện tập mẫu câu
                        </h2>

                        <div className="flex bg-ink/5 dark:bg-ivory/5 p-1 rounded-lg">
                            <button
                                onClick={() => setPracticeMode("read")}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${practiceMode === 'read' ? 'bg-white shadow text-ink' : 'text-ink/40 hover:text-ink/60'}`}
                            >
                                Đọc hiểu (Jp → Vi)
                            </button>
                            <button
                                onClick={() => setPracticeMode("write")}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${practiceMode === 'write' ? 'bg-white shadow text-ink' : 'text-ink/40 hover:text-ink/60'}`}
                            >
                                Dịch câu (Vi → Jp)
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {grammar.examples.map((ex, i) => (
                            <Card
                                key={i}
                                className={`cursor-pointer transition-all hover:shadow-md border-2 ${showAnswer === i ? 'border-emerald-500/50 bg-emerald-50/10' : 'border-transparent'}`}
                                onClick={() => setShowAnswer(showAnswer === i ? null : i)}
                            >
                                <div className="p-6 md:p-8">
                                    <div className="mb-4">
                                        <p className="text-sm text-ink/40 font-bold uppercase tracking-widest mb-2">Ví dụ {i + 1}</p>

                                        {/* Question Part */}
                                        <p className="text-2xl md:text-3xl font-black text-ink dark:text-ivory font-jp leading-relaxed">
                                            {practiceMode === 'read' ? ex.jp : ex.vi}
                                        </p>
                                    </div>

                                    {/* Answer Part (Hidden by default) */}
                                    <div className={`overflow-hidden transition-all duration-300 ${showAnswer === i ? 'max-h-40 opacity-100 mt-6 pt-6 border-t border-ink/5' : 'max-h-0 opacity-0'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 p-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1">Đáp án:</p>
                                                <p className="text-xl font-medium text-ink/80 dark:text-ivory/80 font-jp">
                                                    {practiceMode === 'read' ? ex.vi : ex.jp}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hint when closed */}
                                    {showAnswer !== i && (
                                        <div className="mt-4 flex justify-center">
                                            <span className="text-xs font-bold text-ink/30 uppercase tracking-widest flex items-center gap-2 group-hover:text-vermillion/60 transition-colors">
                                                <RotateCcw className="w-3 h-3" />
                                                Chạm để xem đáp án
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

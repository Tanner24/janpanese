"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { mockGrammar } from "@/data/grammar";
import { Button } from "@/components/ui/Button";
import { Search, ChevronDown, BookOpen } from "lucide-react";

export default function GrammarPage() {
    const [level, setLevel] = useState<'All' | 'N1' | 'N2' | 'N3' | 'N4' | 'N5'>('All');
    const [searchTerm, setSearchTerm] = useState("");

    const filteredGrammar = mockGrammar.filter(g =>
        (level === 'All' || g.jlpt_level === level) &&
        (g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            g.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 lg:px-8 py-12 w-full">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2 text-ink dark:text-ivory">Ngữ pháp</h1>
                        <p className="text-ink/60 dark:text-ivory/60 font-medium">Hệ thống hóa các điểm ngữ pháp cốt lõi</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm mẫu câu..."
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-ink/50 border border-ink/5 dark:border-ivory/5 rounded-2xl focus:outline-none focus:border-vermillion/40 transition-colors font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <div className="flex flex-wrap items-center gap-2 mb-8">
                    {(['All', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((l) => (
                        <Button
                            key={l}
                            variant={level === l ? "primary" : "outline"}
                            size="sm"
                            onClick={() => setLevel(l)}
                            className="min-w-16"
                        >
                            {l}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {filteredGrammar.length > 0 ? (
                        filteredGrammar.map((g) => (
                            <Card key={g.id} className="hover:border-vermillion/20 transition-all group overflow-hidden">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-ink/5 dark:border-ivory/5 pb-6 md:pb-0 md:pr-8">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-3 py-1 bg-vermillion/10 text-vermillion rounded-full text-xs font-bold">{g.jlpt_level}</span>
                                            {g.category && (
                                                <span className="px-3 py-1 bg-ink/5 text-ink/60 rounded-full text-xs font-bold">{g.category}</span>
                                            )}
                                        </div>

                                        <h2 className="text-3xl font-black text-ink dark:text-ivory mb-2 font-jp">{g.title}</h2>

                                        {g.formation && (
                                            <div className="mb-4 p-3 bg-ink/5 dark:bg-ivory/5 rounded-lg border-l-4 border-vermillion/50">
                                                <p className="text-sm font-mono text-vermillion font-bold">{g.formation}</p>
                                            </div>
                                        )}

                                        <p className="text-ink/60 dark:text-ivory/60 leading-relaxed font-medium mb-4">{g.description}</p>

                                        {g.note && (
                                            <div className="text-sm text-ink/40 italic pl-3 border-l-2 border-ink/10">
                                                <span className="font-bold not-italic mr-2">📌 Note:</span>
                                                {g.note}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow space-y-4">
                                        <h4 className="text-xs font-bold text-ink/40 uppercase tracking-widest flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            Ví dụ minh họa
                                        </h4>
                                        <div className="space-y-4">
                                            {g.examples.map((ex, i) => (
                                                <div key={i} className="p-4 bg-ink/2 dark:bg-ivory/2 rounded-2xl border border-ink/2 dark:border-ivory/2 group-hover:bg-white transition-colors">
                                                    <p className="text-xl font-bold text-ink dark:text-ivory mb-1 font-jp">{ex.jp}</p>
                                                    <p className="text-sm text-ink/60 dark:text-ivory/60 font-medium">{ex.vi}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pt-4 flex justify-end">
                                            <Link href={`/grammar/${g.id}`}>
                                                <Button variant="ghost" size="sm">Xem chi tiết luyện tập</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-ink/2 dark:bg-ivory/2 rounded-3xl border-2 border-dashed border-ink/5">
                            <p className="text-xl font-bold opacity-30">Không tìm thấy mẫu ngữ pháp phù hợp.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

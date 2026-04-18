"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { getCompoundWords } from "@/data/compound_words";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { KanjiStrokeAnimation } from "@/components/KanjiStrokeAnimation";
import { AudioButton } from "@/components/AudioButton";

interface Kanji {
    id: string;
    kanji: string;
    meaning_vi: string;
    jlpt_level: JLPTLevel;
    stroke_count: number;
    on_yomi: string[];
    kun_yomi: string[];
}

type JLPTLevel = 'ALL' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

// Estimated counts for better UX while loading
const ESTIMATED_COUNTS = {
    ALL: 550,
    N5: 80,
    N4: 170,
    N3: 100,
    N2: 100,
    N1: 100
};

export default function KanjiPage() {
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>('ALL');
    const [kanjiList, setKanjiList] = useState<Kanji[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedKanji, setSelectedKanji] = useState<Kanji | null>(null);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let data: Kanji[] = [];
                if (selectedLevel === 'ALL') {
                    const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
                    const responses = await Promise.all(levels.map(l => fetch(`/data/kanji/${l}.json`)));
                    const jsons = await Promise.all(responses.map(r => {
                        if (!r.ok) throw new Error(`Network response for ${r.url} was not ok`);
                        return r.json();
                    }));
                    const allKanji = jsons.flat();
                    // Deduplicate
                    const uniqueKanji = Array.from(new Map(allKanji.map((k: Kanji) => [k.id, k])).values());
                    data = uniqueKanji as Kanji[];
                } else {
                    const res = await fetch(`/data/kanji/${selectedLevel.toLowerCase()}.json`);
                    if (!res.ok) throw new Error('Network response was not ok');
                    data = await res.json();
                }
                setKanjiList(data);

                // Smart selection logic
                if (data.length > 0) {
                    if (!selectedKanji || !data.some(k => k.id === selectedKanji.id)) {
                        setSelectedKanji(data[0]);
                    }
                } else {
                    setSelectedKanji(null);
                }
            } catch (error) {
                console.error("Failed to load kanji data:", error);
                setKanjiList([]);
                setSelectedKanji(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedLevel]);

    // Filter Kanji
    const filteredKanji = useMemo(() => {
        let filtered = kanjiList;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(k =>
                k.meaning_vi?.toLowerCase().includes(query) ||
                k.kanji.includes(searchQuery) ||
                k.on_yomi.some(r => r.toLowerCase().includes(query)) ||
                k.kun_yomi.some(r => r.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [kanjiList, searchQuery]);

    // Stats for each level
    const levelCounts = useMemo(() => {
        if (selectedLevel === 'ALL' && kanjiList.length > 0) {
            const counts: Record<string, number> = { ALL: kanjiList.length, N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 };
            kanjiList.forEach(k => {
                if (counts[k.jlpt_level] !== undefined) counts[k.jlpt_level]++;
            });
            return counts;
        }
        return ESTIMATED_COUNTS;
    }, [kanjiList, selectedLevel]);

    return (
        <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 lg:px-8 py-12 w-full">
                <header className="mb-8">
                    <h1 className="text-4xl font-black tracking-tight mb-2 text-foreground">Từ điển Kanji</h1>
                    <p className="text-muted font-medium">Học cách viết và ý nghĩa của từng chữ Hán</p>
                </header>

                {/* Search & Filter Bar */}
                <div className="mb-8 space-y-4">
                    {/* Search Box */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                        <input
                            type="text"
                            placeholder="Tìm theo nghĩa, chữ Kanji hoặc âm đọc..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted transition-all"
                        />
                    </div>

                    {/* Level Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border ${selectedLevel === level
                                    ? 'bg-primary text-white border-primary shadow-lg'
                                    : 'bg-[var(--bg-surface)] text-foreground border-[var(--border)] hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {level === 'ALL' ? 'Tất cả' : level}
                                <span className={`ml-2 text-xs opacity-60 ${selectedLevel === level ? 'text-white' : ''}`}>
                                    ({levelCounts[level as keyof typeof levelCounts] ?? '...'})
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    {searchQuery && (
                        <p className="text-sm text-muted">
                            Tìm thấy <span className="font-bold text-primary">{filteredKanji.length}</span> kết quả
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Kanji List */}
                    <Card className="lg:col-span-1 h-fit bg-[var(--bg-surface)] border-[var(--border)]">
                        <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
                            <span className="w-2 h-6 bg-primary rounded-full" />
                            {selectedLevel === 'ALL'
                                ? `Tất cả Kanji (${filteredKanji.length})`
                                : `Kanji ${selectedLevel} (${filteredKanji.length})`
                            }
                        </h3>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : filteredKanji.length > 0 ? (
                            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                                {filteredKanji.map((k) => (
                                    <button
                                        key={k.id}
                                        onClick={() => setSelectedKanji(k)}
                                        className={`aspect-square flex items-center justify-center text-2xl font-black rounded-xl border-2 transition-all ${selectedKanji?.id === k.id
                                            ? "border-primary bg-primary text-white shadow-md transform scale-105"
                                            : "border-[var(--border)] hover:border-primary text-foreground bg-[var(--bg-surface)] hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                            }`}
                                    >
                                        {k.kanji}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-muted italic">Không tìm thấy Kanji nào</p>
                            </div>
                        )}
                    </Card>

                    {/* Kanji Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <AnimatePresence mode="wait">
                            {selectedKanji ? (
                                <motion.div
                                    key={selectedKanji.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <Card className="relative overflow-hidden bg-[var(--bg-surface)] border-[var(--border)]">
                                        <div className="flex flex-col md:flex-row gap-12 items-center">
                                            <div className="text-center">
                                                <motion.div
                                                    key={selectedKanji.kanji}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="text-[10rem] md:text-[12rem] leading-none font-black text-foreground mb-2"
                                                >
                                                    {selectedKanji.kanji}
                                                </motion.div>
                                                <p className="text-sm font-bold text-muted uppercase tracking-widest">{selectedKanji.stroke_count} nét</p>
                                            </div>

                                            <div className="flex-grow space-y-6 w-full">
                                                <div>
                                                    <h2 className="text-4xl font-black text-primary mb-2">{selectedKanji.meaning_vi}</h2>
                                                    <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm font-bold text-muted border border-[var(--border)]">
                                                        {selectedKanji.jlpt_level}
                                                    </span>
                                                </div>

                                                <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                                                    <div>
                                                        <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Âm ON (On'yomi)</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedKanji.on_yomi.map(y => (
                                                                <span key={y} className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold">{y}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Âm KUN (Kun'yomi)</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedKanji.kun_yomi.map(y => (
                                                                <span key={y} className="px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg font-bold text-foreground">{y}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <Card className="bg-[var(--bg-surface)] border-[var(--border)]">
                                            <h4 className="font-bold mb-4 text-foreground flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                                Thứ tự nét viết
                                            </h4>
                                            <div className="aspect-square bg-[var(--bg-surface)] rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-[var(--border)] p-8 relative overflow-hidden">
                                                <KanjiStrokeAnimation
                                                    kanji={selectedKanji.kanji}
                                                    size={200}
                                                    className="mb-8"
                                                />

                                                <div className="text-center mb-2 z-10 w-full">
                                                    <p className="text-sm font-bold text-muted uppercase tracking-widest">
                                                        {selectedKanji.stroke_count} nét viết
                                                    </p>
                                                    <div className="flex gap-1.5 justify-center flex-wrap max-w-[80%] mx-auto mt-2">
                                                        {Array.from({ length: selectedKanji.stroke_count }).map((_, i) => (
                                                            <div key={i} className="w-2.5 h-2.5 bg-primary/20 rounded-full" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-muted/40 italic absolute bottom-2 right-2">
                                                    Data by KanjiVG
                                                </p>
                                            </div>
                                        </Card>
                                        <Card className="bg-[var(--bg-surface)] border-[var(--border)]">
                                            <h4 className="font-bold mb-4 text-foreground flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                                Ví dụ từ ghép
                                            </h4>
                                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                                                {(() => {
                                                    const compounds = getCompoundWords(selectedKanji.kanji);
                                                    if (compounds.length > 0) {
                                                        return compounds.map((compound, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] hover:border-primary/50 hover:shadow-md transition-all group"
                                                            >
                                                                <div className="flex items-start justify-between gap-3">
                                                                    <div className="flex-grow">
                                                                        <div className="flex items-center gap-3 mb-1">
                                                                            <p className="font-black text-2xl text-foreground flex gap-0.5">
                                                                                {compound.kanji.split('').map((char, i) => (
                                                                                    <span key={i} className={char === selectedKanji.kanji ? "text-primary" : "text-foreground"}>
                                                                                        {char}
                                                                                    </span>
                                                                                ))}
                                                                            </p>
                                                                            <AudioButton text={compound.kanji} size="sm" />
                                                                        </div>
                                                                        <p className="text-sm font-medium text-muted mb-2 font-mono ml-0.5">
                                                                            {compound.reading}
                                                                        </p>
                                                                        <p className="text-base font-bold text-foreground/90 ml-0.5">
                                                                            {compound.meaning_vi}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ));
                                                    } else {
                                                        return (
                                                            <div className="py-12 text-center">
                                                                <div className="text-4xl mb-3 opacity-20 filter grayscale">📚</div>
                                                                <p className="text-muted italic text-sm">
                                                                    Chưa có ví dụ từ ghép
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                })()}
                                            </div>
                                        </Card>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex items-center justify-center p-12 text-center text-muted border-2 border-dashed border-[var(--border)] rounded-3xl bg-[var(--bg-card)]">
                                    <div>
                                        <div className="text-6xl mb-4 opacity-20">👈</div>
                                        <h3 className="text-xl font-bold mb-2">Chưa chọn chữ Kanji nào</h3>
                                        <p>Chọn một chữ từ danh sách bên trái để xem chi tiết</p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

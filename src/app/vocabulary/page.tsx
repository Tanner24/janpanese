"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Search, Volume2, BookOpen, CalendarClock, PlusCircle, CheckCircle2 } from "lucide-react";
import { allN5Vocabulary } from "@/data/vocabulary/all_n5";
import { AudioButton } from "@/components/AudioButton";
import { motion, AnimatePresence } from "framer-motion";
import { useSRS } from "@/contexts/SRSContext";
import { Button } from "@/components/ui/Button";

export default function VocabularyPage() {
    const { addWord, items } = useSRS();
    const [selectedId, setSelectedId] = useState<string | null>(allN5Vocabulary[0]?.id || null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState<string>("ALL");

    // Filter Logic
    const filteredWords = useMemo(() => {
        let filtered = allN5Vocabulary;

        // Categories
        if (filterCategory !== "ALL") {
            filtered = filtered.filter(w => w.category === filterCategory);
        }

        // Search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(w =>
                w.kanji.includes(query) ||
                w.furigana.includes(query) ||
                (w.romaji && w.romaji.toLowerCase().includes(query)) ||
                w.meaning_vi.toLowerCase().includes(query)
            );
        }
        return filtered;
    }, [searchQuery, filterCategory]);

    // Current selected word
    const selectedWord = useMemo(() => {
        return allN5Vocabulary.find(w => w.id === selectedId) || filteredWords[0];
    }, [selectedId, filteredWords]);

    // Category Mapping (English -> Vietnamese)
    const CATEGORY_MAP: Record<string, string> = {
        "ALL": "Tất cả",
        "Pronoun": "Đại từ",
        "Occupation": "Nghề nghiệp",
        "Place": "Địa điểm",
        "Action": "Hành động",
        "Country": "Quốc gia",
        "Time": "Thời gian",
        "Object": "Đồ vật",
        "Person": "Con người",
        "Vehicle": "Phương tiện",
        "Direction": "Phương hướng",
        "Adjective": "Tính từ",
        "Family": "Gia đình"
    };

    // Categories List
    const categories = useMemo(() => {
        const cats = Array.from(new Set(allN5Vocabulary.map(w => w.category))).filter((c): c is string => !!c);
        return ["ALL", ...cats];
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-[var(--primary)] selection:text-[var(--primary-fg)]">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full h-[calc(100vh-80px)] flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Từ vựng N5</h1>
                        <p className="text-muted">Bộ từ vựng cơ bản với {allN5Vocabulary.length} từ</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-2">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                            <Input
                                placeholder="Tìm kiếm..."
                                className="pl-10 h-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Categories Scroll */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${filterCategory === cat
                                ? "bg-[var(--primary)] text-[var(--primary-fg)] border-transparent shadow-md"
                                : "bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border)] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                }`}
                        >
                            {CATEGORY_MAP[cat] || cat}
                        </button>
                    ))}
                </div>

                {/* Main Content: Split View */}
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden h-full pb-6">

                    {/* Left: Word List (Scrollable) */}
                    <Card className="lg:col-span-4 h-full flex flex-col p-0 overflow-hidden">
                        <div className="overflow-y-auto flex-1 p-3 space-y-2 scrollbar-thin">
                            {filteredWords.length > 0 ? (
                                filteredWords.map((word) => (
                                    <div
                                        key={word.id}
                                        onClick={() => setSelectedId(word.id)}
                                        className={`p-3 rounded-lg cursor-pointer transition-all border ${selectedId === word.id
                                            ? "bg-[var(--primary)] text-[var(--primary-fg)] border-transparent shadow-md transform translate-x-1"
                                            : "bg-transparent text-foreground border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className={`font-bold text-lg leading-none mb-1 ${selectedId === word.id ? "text-white" : "text-foreground"}`}>
                                                    {word.kanji}
                                                </p>
                                                <p className={`text-xs font-medium ${selectedId === word.id ? "opacity-90" : "text-[var(--primary)] opacity-80"}`}>
                                                    {word.furigana}
                                                </p>
                                            </div>
                                            <span className={`text-xs font-mono opacity-60 uppercase tracking-widest ${selectedId === word.id ? "text-white" : "text-muted"}`}>{word.category?.slice(0, 3)}</span>
                                        </div>
                                        <p className={`text-sm mt-1 line-clamp-1 ${selectedId === word.id ? "opacity-90" : "text-muted"}`}>
                                            {word.meaning_vi}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center opacity-50 italic">
                                    Không tìm thấy từ nào
                                </div>
                            )}
                        </div>
                        <div className="bg-neutral-100 dark:bg-neutral-900 p-2 text-center text-xs text-muted font-mono border-t border-[var(--border)]">
                            {filteredWords.length} TỪ ĐƯỢC TÌM THẤY
                        </div>
                    </Card>

                    {/* Right: Detail View */}
                    <div className="lg:col-span-8 h-full overflow-y-auto pr-2 pb-20 lg:pb-0">
                        {selectedWord ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedWord.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    {/* Hero Card */}
                                    <Card className="relative overflow-hidden p-8">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <h1 className="text-9xl font-black text-foreground select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4 opacity-10">
                                                {selectedWord.kanji}
                                            </h1>
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-bold rounded-md uppercase tracking-wider shadow-sm">
                                                    {selectedWord.jlpt_level}
                                                </span>
                                                <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-muted text-xs font-bold rounded-md uppercase tracking-wider border border-[var(--border)]">
                                                    {selectedWord.category}
                                                </span>
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-6 mb-8 mt-6">
                                                <div className="flex-1">
                                                    <p className="text-2xl font-bold text-[var(--primary)] mb-1">{selectedWord.furigana}</p>
                                                    <h1 className="text-6xl md:text-7xl font-black text-foreground tracking-tight leading-none mb-2">
                                                        {selectedWord.kanji}
                                                    </h1>
                                                    <p className="text-lg text-muted font-mono pl-1 uppercase">{selectedWord.romaji}</p>
                                                </div>

                                                {/* Image Support */}
                                                {selectedWord.image_url && (
                                                    <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 rounded-lg overflow-hidden border border-[var(--border)] bg-neutral-100 dark:bg-neutral-800">
                                                        <img
                                                            src={selectedWord.image_url}
                                                            alt={selectedWord.kanji}
                                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}

                                                <div className="md:self-end md:mb-4">
                                                    <AudioButton
                                                        text={selectedWord.furigana || selectedWord.kanji}
                                                        audioUrl={selectedWord.audio_url}
                                                        size="lg"
                                                        label="Nghe phát âm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                <div>
                                                    <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-2">Ý nghĩa</h3>
                                                    <p className="text-3xl font-bold text-foreground">
                                                        {selectedWord.meaning_vi}
                                                    </p>
                                                </div>

                                                {/* SRS Action */}
                                                <div>
                                                    {(() => {
                                                        const srsItem = items?.find(i => i.wordId === selectedWord.id);
                                                        if (srsItem) {
                                                            const nextDate = new Date(srsItem.nextReview).toLocaleDateString("vi-VN", { day: 'numeric', month: 'numeric' });
                                                            const isDue = srsItem.nextReview <= Date.now();
                                                            return (
                                                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm border ${isDue ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                                                                    {isDue ? <CalendarClock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                                                    <span>
                                                                        {isDue ? "Cần ôn tập ngay" : `Ôn tập: ${nextDate}`}
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                        return (
                                                            <Button
                                                                onClick={() => addWord(selectedWord.id)}
                                                                className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white shadow-lg shadow-[var(--primary)]/20"
                                                            >
                                                                <PlusCircle className="w-4 h-4 mr-2" />
                                                                Thêm vào ôn tập
                                                            </Button>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Usage & Examples Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        {/* Usage Notes */}
                                        {selectedWord.usage_notes && (
                                            <Card className="col-span-1 border-t-4 border-t-[var(--primary)]">
                                                <div className="flex items-center gap-2 mb-4 text-[var(--primary)]">
                                                    <BookOpen className="w-5 h-5" />
                                                    <h3 className="font-bold">Cách dùng & Lưu ý</h3>
                                                </div>
                                                <p className="text-foreground font-medium leading-relaxed opacity-90">
                                                    {selectedWord.usage_notes}
                                                </p>
                                            </Card>
                                        )}

                                        {/* Examples */}
                                        <Card className={selectedWord.usage_notes ? "col-span-1" : "col-span-1 md:col-span-2"}>
                                            <div className="flex items-center gap-2 mb-4 text-foreground">
                                                <div className="w-1.5 h-6 bg-[var(--primary)] rounded-full" />
                                                <h3 className="font-bold text-lg">Ví dụ mẫu câu</h3>
                                            </div>

                                            <div className="space-y-4">
                                                {selectedWord.examples && selectedWord.examples.length > 0 ? (
                                                    selectedWord.examples.map((ex, idx) => (
                                                        <div key={idx} className="group p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-transparent hover:border-[var(--primary)] transition-all hover:bg-[var(--bg-surface)] hover:shadow-sm">
                                                            <div className="flex justify-between items-start gap-4">
                                                                <div>
                                                                    <p className="text-lg font-medium text-foreground mb-1">
                                                                        {ex.ja}
                                                                    </p>
                                                                    <p className="text-xs text-muted font-mono mb-2">
                                                                        {ex.romaji}
                                                                    </p>
                                                                    <p className="text-sm text-foreground opacity-80 italic font-medium">
                                                                        {ex.vi}
                                                                    </p>
                                                                </div>
                                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <AudioButton text={ex.ja} size="sm" label="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-muted italic">Chưa có ví dụ.</p>
                                                )}
                                            </div>
                                        </Card>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted">
                                Chọn một từ vựng để xem chi tiết
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}

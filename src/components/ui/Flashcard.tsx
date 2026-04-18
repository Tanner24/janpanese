"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Vocabulary } from "@/types";
import { Card } from "./Card";
import { Volume2 } from "lucide-react";
import { useSmartAudio } from "@/hooks/useAudio";

interface FlashcardProps {
    vocab: Vocabulary;
}

export function Flashcard({ vocab }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const { play, isPlaying } = useSmartAudio();

    const handlePlayAudio = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card flip
        play(vocab.kanji, vocab.audio_url, 'ja-JP');
    };

    return (
        <div
            className="w-full max-w-md mx-auto aspect-[4/3] cursor-pointer [perspective:1000px]"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full h-full [transform-style:preserve-3d]"
            >
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden]">
                    <Card className="w-full h-full flex flex-col items-center justify-center border-2 border-vermillion/10 bg-white dark:bg-ink/50 relative">
                        <span className="absolute top-4 right-4 px-3 py-1 bg-vermillion/10 text-vermillion rounded-full text-sm font-bold">
                            {vocab.jlpt_level}
                        </span>

                        {vocab.category && (
                            <span className="absolute top-4 left-4 px-3 py-1 bg-ink/5 dark:bg-ivory/5 rounded-full text-xs font-bold text-ink/40 dark:text-ivory/40 uppercase">
                                {vocab.category}
                            </span>
                        )}

                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-6xl font-black mb-2 text-ink dark:text-ivory">{vocab.kanji}</h2>
                            <p className="text-2xl text-ink/40 dark:text-ivory/40 font-jp mb-4">{vocab.furigana}</p>
                            {vocab.romaji && (
                                <p className="text-lg text-ink/30 dark:text-ivory/30 italic">{vocab.romaji}</p>
                            )}
                        </div>

                        <button
                            onClick={handlePlayAudio}
                            className="mt-6 px-6 py-3 bg-vermillion/10 hover:bg-vermillion/20 text-vermillion rounded-full font-bold flex items-center gap-2 transition-colors"
                        >
                            <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                            Phát âm
                        </button>

                        <div className="absolute bottom-6 text-xs text-ink/20 dark:text-ivory/20 font-bold uppercase tracking-widest">
                            Nhấn để xem nghĩa
                        </div>
                    </Card>
                </div>

                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <Card className="w-full h-full flex flex-col items-center justify-center bg-vermillion text-ivory border-2 border-vermillion p-8">
                        <h3 className="text-4xl font-bold mb-6">{vocab.meaning_vi}</h3>

                        <div className="text-center mb-6">
                            <p className="opacity-80 text-lg mb-1">{vocab.kanji}</p>
                            <p className="opacity-60">{vocab.furigana}</p>
                        </div>

                        {vocab.example_sentence_jp && (
                            <div className="mt-4 p-4 bg-white/10 rounded-xl w-full max-w-sm">
                                <p className="text-sm font-bold opacity-40 uppercase tracking-widest mb-2">Ví dụ</p>
                                <p className="text-lg font-jp mb-2">{vocab.example_sentence_jp}</p>
                                {vocab.example_sentence_vi && (
                                    <p className="text-sm opacity-80 italic">{vocab.example_sentence_vi}</p>
                                )}
                            </div>
                        )}

                        <div className="absolute bottom-6 text-xs opacity-40 font-bold uppercase tracking-widest">
                            Nhấn để quay lại
                        </div>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}

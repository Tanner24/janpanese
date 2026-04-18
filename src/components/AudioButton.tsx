"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Volume2, Loader2 } from "lucide-react";

interface AudioButtonProps {
    text: string; // The text to speak (Kanji or Furigana)
    audioUrl?: string; // Optional custom audio file URL
    label?: string; // Optional label
    size?: "md" | "sm" | "lg" | undefined;
}

export function AudioButton({ text, audioUrl, label = "Phát âm", size = "md" }: AudioButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    const speak = useCallback(() => {
        // If custom audio URL is provided, play it
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            setIsPlaying(true);
            audio.play().catch(err => {
                console.error("Audio playback error:", err);
                setIsPlaying(false);
            });
            audio.onended = () => setIsPlaying(false);
            audio.onerror = () => setIsPlaying(false);
            return;
        }

        // Fallback to TTS
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsPlaying(true);

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ja-JP";
            utterance.rate = 0.9;

            utterance.onend = () => setIsPlaying(false);
            utterance.onerror = () => setIsPlaying(false);

            window.speechSynthesis.speak(utterance);
        }
    }, [text, audioUrl]);

    return (
        <Button
            onClick={(e) => { e.stopPropagation(); speak(); }}
            variant="outline"
            size={size === "md" ? "default" : size}
            className={`${size === "lg" ? "px-6 py-6 text-lg" : ""} group border-vermillion/20 hover:border-vermillion/50 hover:bg-vermillion/5 text-vermillion transition-all`}
            disabled={isPlaying}
        >
            {isPlaying ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
                <Volume2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            )}
            {label}
        </Button>
    );
}

/**
 * Audio player hook with Text-to-Speech support
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseAudioPlayerReturn {
    isPlaying: boolean;
    isSupported: boolean;
    play: (text: string, lang?: string) => void;
    stop: () => void;
    error: string | null;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        // Check if browser supports speech synthesis
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            synthRef.current = window.speechSynthesis;
            setIsSupported(true);
        } else {
            setIsSupported(false);
            setError('Trình duyệt không hỗ trợ phát âm tự động');
        }

        return () => {
            // Cleanup on unmount
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, []);

    const play = useCallback((text: string, lang: string = 'ja-JP') => {
        if (!synthRef.current || !isSupported) {
            setError('Tính năng phát âm không khả dụng');
            return;
        }

        // Cancel any ongoing speech
        synthRef.current.cancel();

        try {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 0.8; // Slightly slower for clarity
            utterance.pitch = 1;
            utterance.volume = 1;

            utterance.onstart = () => {
                setIsPlaying(true);
                setError(null);
            };

            utterance.onend = () => {
                setIsPlaying(false);
            };

            utterance.onerror = (event) => {
                setIsPlaying(false);
                setError(`Lỗi phát âm: ${event.error}`);
                console.error('Speech synthesis error:', event);
            };

            utteranceRef.current = utterance;
            synthRef.current.speak(utterance);
        } catch (err) {
            setError('Đã xảy ra lỗi khi phát âm');
            console.error('Error playing audio:', err);
        }
    }, [isSupported]);

    const stop = useCallback(() => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsPlaying(false);
        }
    }, []);

    return {
        isPlaying,
        isSupported,
        play,
        stop,
        error,
    };
}

/**
 * Hook for playing audio from URL
 */
export function useAudioURL() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const play = useCallback((url: string) => {
        try {
            // Stop current audio if playing
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            const audio = new Audio(url);

            audio.onplay = () => {
                setIsPlaying(true);
                setError(null);
            };

            audio.onended = () => {
                setIsPlaying(false);
            };

            audio.onerror = () => {
                setIsPlaying(false);
                setError('Không thể phát file âm thanh');
            };

            audioRef.current = audio;
            audio.play();
        } catch (err) {
            setError('Đã xảy ra lỗi khi phát âm thanh');
            console.error('Error playing audio URL:', err);
        }
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, []);

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    return {
        isPlaying,
        play,
        stop,
        error,
    };
}

/**
 * Combined hook that tries audio URL first, falls back to TTS
 */
export function useSmartAudio() {
    const ttsPlayer = useAudioPlayer();
    const urlPlayer = useAudioURL();

    const play = useCallback((text: string, audioUrl?: string, lang: string = 'ja-JP') => {
        if (audioUrl) {
            // Try to play from URL first
            urlPlayer.play(audioUrl);
        } else {
            // Fall back to TTS
            ttsPlayer.play(text, lang);
        }
    }, [ttsPlayer, urlPlayer]);

    const stop = useCallback(() => {
        ttsPlayer.stop();
        urlPlayer.stop();
    }, [ttsPlayer, urlPlayer]);

    const isPlaying = ttsPlayer.isPlaying || urlPlayer.isPlaying;
    const error = ttsPlayer.error || urlPlayer.error;

    return {
        isPlaying,
        play,
        stop,
        error,
        isSupported: ttsPlayer.isSupported,
    };
}

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Vocabulary } from '@/types';
import { allN5Vocabulary } from '@/data/vocabulary/all_n5';

// SRS Item Structure
export interface SRSItem {
    wordId: string;
    box: number; // 1-5 (Leitner System Levels)
    nextReview: number; // Timestamp (ms)
    lastReview: number; // Timestamp (ms)
    interval: number; // Days
    easeFactor: number; // SM-2 variant (default 2.5)
    streak: number;
}

interface SRSContextType {
    items: SRSItem[];
    dueCount: number;
    addWord: (wordId: string) => void;
    processReview: (wordId: string, quality: 'fail' | 'hard' | 'good' | 'easy') => void;
    getDueItems: () => Vocabulary[];
    resetProgress: () => void;
}

const SRSContext = createContext<SRSContextType | undefined>(undefined);

// Review Intervals (in days) for a simple Leitner-like system
// We'll use a hybrid approach inspired by Anki/SM-2
const INITIAL_INTERVALS = [1, 3, 7, 14, 30];

export function SRSProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [items, setItems] = useState<SRSItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount or user change
    useEffect(() => {
        if (!user) {
            setItems([]);
            setIsLoaded(true);
            return;
        }

        const stored = localStorage.getItem(`srs_data_${user.id}`);
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse SRS data", e);
            }
        }
        setIsLoaded(true);
    }, [user]);

    // Save to LocalStorage whenever items change
    useEffect(() => {
        if (isLoaded && user) {
            localStorage.setItem(`srs_data_${user.id}`, JSON.stringify(items));
        }
    }, [items, isLoaded, user]);

    // Add a word to the review list
    const addWord = (wordId: string) => {
        if (items.find(i => i.wordId === wordId)) return; // Already exists

        const newItem: SRSItem = {
            wordId,
            box: 0,
            nextReview: Date.now(), // Due immediately
            lastReview: 0,
            interval: 0,
            easeFactor: 2.5,
            streak: 0
        };

        setItems(prev => [...prev, newItem]);
    };

    /**
     * Process review result (Anki/SM-2 Simplified Logic)
     * quality:
     *  - fail: 0 (Incorrect) -> Reset to Box 1
     *  - hard: 3 (Correct but difficult) -> 1.2x interval
     *  - good: 4 (Correct) -> 2.5x interval
     *  - easy: 5 (Perfect) -> 3.5x interval
     */
    const processReview = (wordId: string, quality: 'fail' | 'hard' | 'good' | 'easy') => {
        setItems(prev => prev.map(item => {
            if (item.wordId !== wordId) return item;

            let nextInterval = 1;
            let nextBox = item.box;
            let nextEase = item.easeFactor;
            let nextStreak = item.streak;

            const now = Date.now();
            // Milliseconds in a Day
            const DAY = 24 * 60 * 60 * 1000;

            if (quality === 'fail') {
                nextInterval = 0; // Due immediately (or 1 day later depending on preference)
                nextBox = 1; // Reset to Box 1
                nextStreak = 0;
                nextEase = Math.max(1.3, nextEase - 0.2); // Penalty
            } else {
                // Determine multiplier based on quality
                let factor = 2.5;
                if (quality === 'hard') factor = 1.2;
                if (quality === 'good') factor = 2.5;
                if (quality === 'easy') factor = 3.5;

                // Apply Ease Factor
                if (item.interval === 0) {
                    nextInterval = 1; // First success -> 1 day
                } else if (item.interval === 1) {
                    nextInterval = 3; // Second success -> 3 days
                } else {
                    nextInterval = Math.round(item.interval * factor * (nextEase / 2.5));
                }

                nextBox = Math.min(5, item.box + 1);
                nextStreak += 1;

                // Adjust Ease (simplified SM-2)
                if (quality === 'easy') nextEase += 0.15;
                if (quality === 'hard') nextEase -= 0.15;
            }

            return {
                ...item,
                box: nextBox,
                interval: nextInterval,
                nextReview: now + (nextInterval * DAY),
                lastReview: now,
                easeFactor: nextEase,
                streak: nextStreak
            };
        }));
    };

    // Calculate Items Due
    const dueCount = items.filter(i => i.nextReview <= Date.now()).length;

    // Get List of Due Vocabulary Objects
    const getDueItems = (): Vocabulary[] => {
        const dueIds = new Set(items.filter(i => i.nextReview <= Date.now()).map(i => i.wordId));
        return allN5Vocabulary.filter(w => dueIds.has(w.id));
    };

    const resetProgress = () => {
        setItems([]);
    };

    return (
        <SRSContext.Provider value={{ items, dueCount, addWord, processReview, getDueItems, resetProgress }}>
            {children}
        </SRSContext.Provider>
    );
}

export function useSRS() {
    const context = useContext(SRSContext);
    if (!context) {
        throw new Error('useSRS must be used within SRSProvider');
    }
    return context;
}

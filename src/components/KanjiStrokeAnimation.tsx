"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function KanjiStrokeAnimation({
    kanji,
    size = 200,
    className
}: {
    kanji: string;
    size?: number;
    className?: string;
}) {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!kanji) return;
        const code = kanji.charCodeAt(0).toString(16).toLowerCase().padStart(5, '0');
        // Using github raw as source for KanjiVG data
        const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${code}.svg`;

        setLoading(true);
        setSvgContent(null);

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.text();
            })
            .then(text => {
                // Process SVG text to add animations

                // We manually inject styles into each path found in the SVG string
                // This allows us to sequence the animation based on stroke order
                let pathIndex = 0;
                const processed = text.replace(/<path\s/g, (match) => {
                    pathIndex++;
                    // Animation parameters:
                    // Duration: 0.8s per stroke
                    // Delay: sequential based on index
                    // Stroke properties: hidden initially, drawn via dashoffset
                    return `<path class="kanji-stroke" style="animation: kanjiDraw 0.8s ease-out forwards; animation-delay: ${(pathIndex - 1) * 0.4}s; opacity: 0; stroke-dasharray: 500; stroke-dashoffset: 500;" `;
                });

                // Inject custom CSS styles for the animation inside the SVG
                // Using var(--primary) doesn't work well inside localized svg styles unless passed down,
                // so we use 'currentColor' and set color on the container.
                const styleTag = `
            <style>
              @keyframes kanjiDraw {
                0% { stroke-dashoffset: 500; opacity: 0; }
                10% { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
              }
              svg { width: 100%; height: 100%; overflow: visible; }
              path { 
                fill: none; 
                stroke: currentColor; 
                stroke-linecap: round; 
                stroke-linejoin: round;
              }
              /* Text for stroke numbers if present in KanjiVG data */
              text { display: none; } 
            </style>
          `;

                // Remove XML declaration if present to avoid React warnings in typical usage (though innerHTML handles it usually)
                const cleanText = processed.replace(/<\?xml.*?\?>/, "").replace(/<!DOCTYPE.*?>/, "");

                // Insert style tag before closing svg
                const finalSvg = cleanText.replace('</svg>', `${styleTag}</svg>`);

                setSvgContent(finalSvg);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load Kanji SVG", err);
                setSvgContent(null);
                setLoading(false);
            });
    }, [kanji]);

    if (loading) {
        return (
            <div style={{ width: size, height: size }} className={cn("flex items-center justify-center", className)}>
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!svgContent) {
        return (
            <div style={{ width: size, height: size }} className={cn("flex items-center justify-center relative", className)}>
                {/* Fallback static kanji */}
                <span className="text-[8rem] font-black opacity-10 select-none block leading-none">{kanji}</span>
                <p className="absolute bottom-4 text-xs text-muted">No animation available</p>
            </div>
        );
    }

    return (
        <div
            className={cn("text-primary relative", className)}
            style={{ width: size, height: size }}
        >
            <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />

            {/* Replay Button Overlay */}
            <button
                onClick={() => {
                    const content = svgContent;
                    setSvgContent(null);
                    setTimeout(() => setSvgContent(content), 10);
                }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted hover:text-primary transition-colors flex items-center gap-1"
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                Phát lại
            </button>
        </div>
    );
}

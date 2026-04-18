"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export function Card({ children, className, style, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm transition-all hover:shadow-md",
                // Remove hardcoded black shadows/borders
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
}

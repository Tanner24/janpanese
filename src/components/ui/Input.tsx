"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input(props: InputProps) {
    const { label, error, className, ...rest } = props;

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-bold text-[var(--text-main)] mb-1.5 uppercase tracking-wide opacity-80">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    "w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg py-2.5 px-4",
                    "text-[var(--text-main)] placeholder:text-[var(--text-muted)] font-medium",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent",
                    "transition-all",
                    error && "border-red-500 focus:ring-red-500",
                    className
                )}
                {...rest}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500 font-bold">{error}</p>
            )}
        </div>
    );
}

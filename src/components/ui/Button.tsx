"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
}

export function Button({
    className,
    variant = "primary",
    size = "default",
    asChild = false,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot : "button";

    const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
        primary: "bg-[var(--primary)] text-[var(--primary-fg)] hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        outline: "border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-fg)]",
        ghost: "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[var(--text-main)]",
        link: "bg-transparent text-[var(--primary)] hover:underline underline-offset-4"
    };

    const sizeStyles = {
        default: "h-11 px-8 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-10 text-lg",
        icon: "h-9 w-9 p-0",
    };

    return (
        <Comp
            className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
            {...props}
        />
    );
}

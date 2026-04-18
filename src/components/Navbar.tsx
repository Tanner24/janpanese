"use client";

import Link from "next/link";
import { Zap, Settings } from "lucide-react";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { useSRS } from "@/contexts/SRSContext";

export function Navbar() {
    const { dueCount } = useSRS();
    return (
        <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg">
                                <span className="text-white font-bold text-xl">N</span>
                            </div>
                            <span className="text-2xl font-black tracking-tight flex items-center gap-1">
                                Nihongo<span className="bg-foreground text-background px-2 py-0.5 rounded-sm skew-x-[-10deg] inline-block transform shadow-sm">Master</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8 text-foreground font-bold">
                            <Link href="/vocabulary" className="font-semibold hover:text-primary transition-colors">Từ vựng</Link>
                            <Link href="/kanji" className="font-semibold hover:text-primary transition-colors">Kanji</Link>
                            <Link href="/grammar" className="font-semibold hover:text-primary transition-colors">Ngữ pháp</Link>
                            <Link href="/review" className="font-semibold hover:text-primary transition-colors flex items-center gap-1.5 relative group">
                                Ôn tập
                                {dueCount > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm animate-pulse">
                                        {dueCount}
                                    </span>
                                )}
                            </Link>
                            <Link href="/listening" className="font-semibold hover:text-primary transition-colors">Luyện nghe</Link>
                            <Link href="/speaking" className="font-semibold hover:text-primary transition-colors text-primary">Luyện nói</Link>
                            <Link href="/practice" className="font-semibold hover:text-primary transition-colors">Thi thử JLPT</Link>
                            <Link href="/resources" className="font-semibold hover:text-primary transition-colors">Tài liệu</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-2 bg-background border border-black px-4 py-2 rounded-full shadow-sm">
                            <Zap className="w-4 h-4 text-black fill-black" />
                            <span className="font-bold text-sm text-foreground">7 ngày</span>
                        </div>
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                            <Link href="/login">Đăng nhập</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/dashboard">Bắt đầu</Link>
                        </Button>

                        <ThemeToggle />

                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex px-2 opacity-70 hover:opacity-100" asChild>
                            <Link href="/settings" aria-label="Cài đặt">
                                <Settings className="w-5 h-5 text-foreground" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

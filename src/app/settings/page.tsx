"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Moon, Sun, Volume2, User, Bell, LogOut, Globe } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-ivory dark:bg-ink">
            <Navbar />

            <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-ink dark:text-ivory mb-2">Cài đặt</h1>
                    <p className="text-ink/60 dark:text-ivory/60">Tùy chỉnh trải nghiệm học tập của bạn</p>
                </header>

                <div className="space-y-6">
                    {/* General Settings */}
                    <section>
                        <h2 className="text-xl font-bold text-ink dark:text-ivory mb-4 px-1">Chung</h2>
                        <Card className="p-0 overflow-hidden">
                            <div className="divide-y divide-ink/5 dark:divide-ivory/5">
                                <div className="p-6 flex items-center justify-between hover:bg-ink/5 dark:hover:bg-ivory/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-gray-100 dark:bg-gray-800 text-black rounded-lg border border-black/10">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-ink dark:text-ivory">Ngôn ngữ hiển thị</p>
                                            <p className="text-sm text-ink/50 dark:text-ivory/50">Tiếng Việt (Mặc định)</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">Thay đổi</Button>
                                </div>
                                <div className="p-6 flex items-center justify-between hover:bg-ink/5 dark:hover:bg-ivory/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-gray-100 dark:bg-gray-800 text-black rounded-lg border border-black/10">
                                            <Sun className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-ink dark:text-ivory">Giao diện</p>
                                            <p className="text-sm text-ink/50 dark:text-ivory/50">Mùa Xuân (Sáng)</p>
                                        </div>
                                    </div>
                                    <div className="flex bg-ink/5 dark:bg-ivory/5 rounded-lg p-1">
                                        <button className="p-1 bg-white shadow-sm rounded-md text-ink">
                                            <Sun className="w-4 h-4" />
                                        </button>
                                        <button className="p-1 text-ink/40">
                                            <Moon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Learning Settings */}
                    <section>
                        <h2 className="text-xl font-bold text-ink dark:text-ivory mb-4 px-1">Học tập</h2>
                        <Card className="p-0 overflow-hidden">
                            <div className="divide-y divide-ink/5 dark:divide-ivory/5">
                                <div className="p-6 flex items-center justify-between hover:bg-ink/5 dark:hover:bg-ivory/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-gray-100 dark:bg-gray-800 text-black rounded-lg border border-black/10">
                                            <Volume2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-ink dark:text-ivory">Tự động phát âm thanh</p>
                                            <p className="text-sm text-ink/50 dark:text-ivory/50">Phát âm khi lật thẻ từ vựng</p>
                                        </div>
                                    </div>
                                    <div className="w-11 h-6 bg-black rounded-full relative cursor-pointer border border-black">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Account Settings */}
                    <section>
                        <h2 className="text-xl font-bold text-ink dark:text-ivory mb-4 px-1">Tài khoản</h2>
                        <Card className="p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-ink/10 rounded-full flex items-center justify-center text-2xl font-black text-ink/40">
                                    N
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-ink dark:text-ivory">Người dùng Demo</h3>
                                    <p className="text-ink/50">demo@nihongo.com</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-ink/5 dark:border-ivory/5">
                                <Button variant="outline" className="w-full text-black border-black/20 hover:bg-gray-100 hover:text-black">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Đăng xuất
                                </Button>
                            </div>
                        </Card>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

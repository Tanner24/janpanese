"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Home, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('demo@nihongo.com');
    const [password, setPassword] = useState('password');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (password.length < 6) {
                throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
            }
            await login(email);
            router.push('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-ink p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">N</span>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-ink dark:text-ivory">
                            Nihongo<span className="gradient-text">Master</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-ink dark:text-ivory">Chào mừng trở lại!</h1>
                    <p className="text-ink/60 dark:text-ivory/60 mt-2">Đăng nhập để tiếp tục hành trình học tiếng Nhật</p>
                </div>

                <Card className="p-8 shadow-xl border-t-4 border-t-vermillion">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-ink dark:text-ivory mb-2">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                                className="bg-ink/5 dark:bg-ivory/5 border-transparent focus:border-vermillion focus:bg-white dark:focus:bg-ink"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-ink dark:text-ivory">Mật khẩu</label>
                                <a href="#" className="text-xs text-vermillion hover:underline">Quên mật khẩu?</a>
                            </div>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="bg-ink/5 dark:bg-ivory/5 border-transparent focus:border-vermillion focus:bg-white dark:focus:bg-ink"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-100 text-red-600 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg shadow-vermillion/20 hover:shadow-vermillion/40 transition-all" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    Đăng nhập
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-ink/5 dark:border-ivory/5 text-center">
                        <p className="text-sm text-ink/60 dark:text-ivory/60">
                            Chưa có tài khoản?{' '}
                            <Link href="/register" className="text-vermillion font-bold hover:underline">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </Card>

                <div className="mt-8 text-center">
                    <Link href="/" className="inline-flex items-center text-sm text-ink/40 dark:text-ivory/40 hover:text-ink dark:hover:text-ivory transition-colors">
                        <Home className="w-4 h-4 mr-2" />
                        Quay lại trang chủ
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

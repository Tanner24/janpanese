"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, ExternalLink, BookOpen, Navigation } from 'lucide-react';
import { awesomeResources, Resource } from '@/data/awesome_resources';

export default function ResourcesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set<string>();
        awesomeResources.forEach(res => cats.add(res.category));
        return ['All', ...Array.from(cats)];
    }, []);

    // Filter resources
    const filteredResources = useMemo(() => {
        return awesomeResources.filter(res => {
            const matchesSearch =
                res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                res.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    // Group by category for display
    const groupedResources = useMemo(() => {
        const groups: Record<string, Resource[]> = {};
        filteredResources.forEach(res => {
            if (!groups[res.category]) {
                groups[res.category] = [];
            }
            groups[res.category].push(res);
        });
        return groups;
    }, [filteredResources]);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                                <BookOpen className="w-4 h-4" />
                                Nguồn Tham Khảo
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                                Danh Sách <span className="gradient-text">Tài Liệu Hữu Ích</span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Tổng hợp học liệu tiếng Nhật tốt nhất được tuyển chọn từ cộng đồng Awesome-Japanese.
                            </p>
                        </motion.div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-12 space-y-6">
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Tìm kiếm tài liệu, website..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-12 text-lg rounded-2xl bg-card border-border shadow-sm focus-visible:ring-primary"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Resources List */}
                    {Object.keys(groupedResources).length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">Không tìm thấy tài liệu nào phù hợp.</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {Object.entries(groupedResources).map(([category, resources], idx) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <h2 className="text-2xl font-bold">{category}</h2>
                                        <div className="flex-1 h-px bg-border"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {resources.map((res, i) => (
                                            <a
                                                href={res.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                key={`${res.title}-${i}`}
                                                className="group block h-full"
                                            >
                                                <Card className="h-full p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/40 border bg-card/50 flex flex-col group-hover:-translate-y-1">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                                            {res.title}
                                                        </h3>
                                                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    </div>

                                                    {res.subCategory && res.subCategory !== category && (
                                                        <span className="inline-block px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground mb-3 self-start">
                                                            {res.subCategory}
                                                        </span>
                                                    )}

                                                    <p className="text-sm text-foreground/70 leading-relaxed mt-auto">
                                                        {res.description || 'Không có mô tả chi tiết.'}
                                                    </p>
                                                </Card>
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}


"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { MessageCircle, X, Send, User, Bot, Sparkles, RefreshCw, Mic, Volume2, StopCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatInterface() {
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isListening, setIsListening] = useState(false);

    // Use Vercel AI SDK hook
    const chatHelpers = useChat({
        body: {
            context: typeof window !== 'undefined' ? window.location.pathname : 'Unknown Page',
        },
        onError: (error: Error) => {
            console.error("Chat error:", error);
        }
    } as any) as any;

    const {
        messages = [],
        input = "",
        handleInputChange = () => { },
        handleSubmit = (e: any) => e?.preventDefault?.(),
        isLoading = false,
        reload = () => { },
        stop = () => { }
    } = chatHelpers || {};

    // Voice Input Handler
    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            // recognition.lang = 'ja-JP'; // For Japanese
            recognition.lang = 'vi-VN'; // For Vietnamese questions
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => setIsListening(true);

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                // Append to input or replace? Usually replace/append.
                // handleInputChange expects an event-like object
                handleInputChange({ target: { value: transcript } } as any);
                setIsListening(false);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognition.onend = () => setIsListening(false);

            recognition.start();
        } else {
            alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
        }
    };

    // Text to Speech
    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop previous
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP'; // Priority: Japanese reading
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="w-[380px] h-[600px] max-h-[80vh] shadow-2xl rounded-2xl overflow-hidden flex flex-col bg-background border border-border"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Kiko Sensei 🌸</h3>
                                    <p className="text-xs opacity-80 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-primary-foreground hover:bg-white/10"
                                    onClick={() => reload()}
                                    title="Regenerate response"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-primary-foreground hover:bg-white/10"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <ScrollArea className="flex-1 p-4 space-y-4 bg-muted/30" ref={scrollRef}>
                            {messages.length === 0 && (
                                <div className="text-center text-muted-foreground mt-8 text-sm px-4">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="mb-2 font-medium text-foreground">Xin chào! Kiko Sensei đây.</p>
                                    <p>Mình có thể giúp bạn giải đáp ngữ pháp, từ vựng hoặc sửa lỗi câu tiếng Nhật.</p>
                                    <div className="mt-4 grid grid-cols-1 gap-2">
                                        <Button variant="outline" size="sm" className="text-xs h-auto py-2 justify-start" onClick={() => {
                                            handleInputChange({ target: { value: "Giải thích giúp mình ngữ pháp ～てform" } } as any);
                                        }}>
                                            "Giải thích ngữ pháp ～てform"
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-xs h-auto py-2 justify-start" onClick={() => {
                                            handleInputChange({ target: { value: "Dịch câu này: Tôi thích ăn ramen" } } as any);
                                        }}>
                                            "Dịch: Tôi thích ăn món Nhật"
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {messages.map((m: any) => (
                                <div
                                    key={m.id}
                                    className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {m.role !== 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                            <Bot className="w-4 h-4 text-primary" />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm group relative ${m.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-card border border-border text-foreground rounded-tl-none'
                                            }`}
                                    >
                                        <div className="markdown-prose prose dark:prose-invert max-w-none text-sm leading-relaxed break-words">
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                    ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                                    ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                                                    strong: ({ node, ...props }) => <strong className="font-bold text-yellow-600 dark:text-yellow-400" {...props} />,
                                                }}
                                            >
                                                {m.content}
                                            </ReactMarkdown>
                                        </div>

                                        {/* Speaker Button for AI */}
                                        {m.role !== 'user' && (
                                            <button
                                                onClick={() => speakText(m.content)}
                                                className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary p-1"
                                                title="Nghe (Đọc mẫu)"
                                            >
                                                <Volume2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    {m.role === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                        <Bot className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                        </ScrollArea>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-background border-t border-border flex gap-2">
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className={`shrink-0 ${isListening ? "text-red-500 animate-pulse bg-red-100" : "text-muted-foreground"}`}
                                onClick={startListening}
                                title="Nói để nhập liệu"
                            >
                                {isListening ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                            </Button>

                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder={isListening ? "Đang nghe..." : "Hỏi Sensei (Gõ hoặc Nói)..."}
                                className="flex-1 focus-visible:ring-primary"
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="lg"
                className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-primary to-indigo-600"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
            </Button>
        </div>
    );
}

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Layers, GraduationCap, Headphones, Award, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has completed placement test
    const placementCompleted = localStorage.getItem('placementTestCompleted');

    // If first time visitor, redirect to placement test
    if (!placementCompleted) {
      router.push('/placement-test');
    }
  }, [router]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background relative z-10">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 px-4 max-w-7xl mx-auto text-center">
          <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute top-40 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" />

          {/* Decorative Kanji */}
          <motion.div
            className="absolute top-20 left-[5%] opacity-10 select-none pointer-events-none"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-6xl font-black text-primary font-jp">日</span>
          </motion.div>

          <motion.div
            className="absolute bottom-40 right-[10%] opacity-10 select-none pointer-events-none"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <span className="text-6xl font-black text-[var(--text-main)] font-jp">本</span>
          </motion.div>

          <motion.div
            className="absolute top-32 right-[15%] opacity-10 select-none pointer-events-none"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <span className="text-6xl font-black text-secondary font-jp">語</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold mb-8">
              Nền tảng học tiếng Nhật toàn diện
            </span>
            <h1 className="text-5xl lg:text-9xl font-black tracking-tight leading-[1.1] lg:leading-[0.9] mb-8 text-foreground uppercase">
              Chinh phục <br />
              <span className="bg-[#ea4c3b] text-[#2d3748] px-4 inline-block transform -skew-x-6 my-2 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)]">tiếng Nhật</span> <br />
              theo cách của bạn
            </h1>
            <p className="text-lg lg:text-xl text-foreground/60 max-w-2xl mx-auto mb-12 font-medium">
              Học từ vựng, kanji, ngữ pháp từ N5 đến N1. Ôn tập thông minh với Spaced Repetition. Luyện đề JLPT như thi thật.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/vocabulary">
                <Button size="lg" className="h-16 px-10 text-lg">
                  Bắt đầu học ngay <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="/dashboard">
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg">
                  Khám phá lộ trình
                </Button>
              </a>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-[var(--border)] pt-12">
              <div>
                <p className="text-3xl lg:text-5xl font-black gradient-text">800+</p>
                <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest mt-2">Từ vựng</p>
              </div>
              <div>
                <p className="text-3xl lg:text-5xl font-black gradient-text">300+</p>
                <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest mt-2">Chữ Kanji</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-3xl lg:text-5xl font-black gradient-text">N5→N1</p>
                <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest mt-2">Lộ trình JLPT</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-[var(--bg-surface)]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight text-foreground">
                Tất cả công cụ để <br />
                <span className="gradient-text">thành thạo tiếng Nhật</span>
              </h2>
              <p className="text-foreground/60 font-medium">
                Một nền tảng toàn diện đưa bạn từ người mới bắt đầu đến trình độ cao cấp.
              </p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { icon: BookOpen, title: "Từ vựng", desc: "Hơn 800 từ vựng với hình ảnh, audio và ví dụ thực tế. Phân loại theo N5-N1." },
                { icon: Layers, title: "Chữ Kanji", desc: "Học 300+ kanji với thứ tự nét viết, âm On/Kun và các từ ghép thông dụng." },
                { icon: GraduationCap, title: "Ngữ pháp", desc: "Hệ thống ngữ pháp từ cơ bản đến nâng cao với giải thích chi tiết tiếng Việt." },
                { icon: RefreshCw, title: "Ôn tập SRS", desc: "Hệ thống Spaced Repetition giúp bạn nhớ kiến thức lâu hơn và hiệu quả hơn." },
                { icon: Headphones, title: "Luyện nghe", desc: "Bài nghe đa dạng từ hội thoại đơn giản đến tin tức, phim ảnh." },
                { icon: Award, title: "Luyện đề JLPT", desc: "Đề thi thử JLPT từ N5 đến N1 với cấu trúc như thi thật." },
              ].map((f, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all">
                      <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{f.title}</h3>
                    <p className="text-foreground/60 leading-relaxed">{f.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* JLPT Levels Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-6xl font-black mb-16 tracking-tight text-foreground">
              Chọn cấp độ <span className="gradient-text">JLPT</span> của bạn
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { l: "N5", color: "bg-emerald-500", border: "#10b981", title: "Sơ cấp 1", desc: "Hiểu tiếng Nhật cơ bản", href: "/vocabulary?level=N5" },
                { l: "N4", color: "bg-sky-500", border: "#0ea5e9", title: "Sơ cấp 2", desc: "Tiếng Nhật thường ngày", href: "/vocabulary?level=N4" },
                { l: "N3", color: "bg-amber-500", border: "#f59e0b", title: "Trung cấp", desc: "Sử dụng linh hoạt", href: "/vocabulary?level=N3" },
                { l: "N2", color: "bg-orange-500", border: "#f97316", title: "Trung cao", desc: "Giao tiếp trôi chảy", href: "/vocabulary?level=N2" },
                { l: "N1", color: "bg-primary", border: "#7C3AED", title: "Cao cấp", desc: "Linh hồn tiếng Nhật", href: "/vocabulary?level=N1" },
              ].map((level, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-t-8 flex flex-col items-center" style={{ borderTopColor: level.border }}>
                    <div className={`w-16 h-16 ${level.color} rounded-full flex items-center justify-center text-white text-2xl font-black mb-6 shadow-xl`}>
                      {level.l}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-foreground">{level.title}</h4>
                    <p className="text-sm text-muted mb-6">{level.desc}</p>
                    <div className="mt-auto">
                      <a href={level.href}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                          Bắt đầu ngay <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

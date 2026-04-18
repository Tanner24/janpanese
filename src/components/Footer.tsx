import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background border-t border-black/10 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">N</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            NihongoMaster
                        </span>
                    </div>

                    <div className="flex gap-8 text-sm font-semibold text-foreground/60">
                        <Link href="#" className="hover:text-black transition-colors">Điều khoản</Link>
                        <Link href="#" className="hover:text-black transition-colors">Bảo mật</Link>
                        <Link href="#" className="hover:text-black transition-colors">Liên hệ</Link>
                    </div>

                    <p className="text-sm text-foreground/40">
                        © 2026 NihongoMaster. Made with ❤️ for learners.
                    </p>
                </div>
            </div>
        </footer>
    );
}

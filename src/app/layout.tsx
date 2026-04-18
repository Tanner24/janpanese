import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NihongoMaster - Chinh phục tiếng Nhật",
  description: "Nền tảng học tiếng Nhật toàn diện",
};

import { AuthProvider } from "@/contexts/AuthContext";
import { SRSProvider } from "@/contexts/SRSContext";

import { ChatInterface } from "@/components/ChatInterface";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoJP.variable} font-sans antialiased selection:bg-vermillion/20`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <SRSProvider>
              {children}
              <ChatInterface />
            </SRSProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

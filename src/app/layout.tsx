import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";
import Link from "next/link";
import { auth } from "../../auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ДОПОГ Экзамен 2026 - Подготовка онлайн",
  description: "Лучшая платформа для подготовки к экзаменам ДОПОГ (ADR). Тесты, курсы и статистика прогресса.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <Providers>
          <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-50">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <span className="text-black font-black text-xs">ADR</span>
                </div>
                <span className="font-bold text-xl tracking-tight hidden sm:block">ДОПОГ Экзамен</span>
              </Link>
              
              <nav className="flex items-center gap-3 sm:gap-4">
                {session ? (
                  <Link href="/dashboard" className="text-sm font-bold bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl transition-all shadow-md active:scale-95">
                    Личный кабинет
                  </Link>
                ) : null}
                <Link
                  href="/pricing"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-yellow-500/10"
                >
                  Тарифы
                </Link>

                {!session ? (
                  <>
                    <Link
                      href="/login"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm font-medium"
                    >
                      Вход
                    </Link>
                    <Link
                      href="/register"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm font-medium"
                    >
                      Регистрация
                    </Link>
                  </>
                ) : null}
              </nav>
            </div>
          </header>
          <main className="flex-1 flex flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

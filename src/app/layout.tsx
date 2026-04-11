import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";
import Link from "next/link";
import { auth } from "../../auth";
import { Footer } from "@/components/Footer";
import { YandexMetrica } from "@/components/YandexMetrica";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ДОПОГ Экзамен 2026: Тесты, билеты и обучение ADR онлайн ст. 2",
  description: "Официальные билеты ДОПОГ 2026 года. Подготовка к экзаменам ADR для перевозки опасных грузов. Учите тесты онлайн, сдавайте экзамены, скачивайте курсы на телефон (PWA). Лучшая платформа для водителей и автошкол.",
  keywords: "допог 2026, тесты допог, билеты допог, adr экзамен, обучение допог, перевозка опасных грузов, скачать допог, допог онлайн",
  openGraph: {
    title: "ДОПОГ Экзамен 2026: Тесты и подготовка",
    description: "Официальные билеты ДОПОГ 2026 года для подготовки водителей к перевозке опасных грузов.",
    type: "website",
    locale: "ru_RU",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ДОПОГ 2026",
  },
  formatDetection: {
    telephone: false,
  },
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
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <YandexMetrica />
        <ServiceWorkerRegistration />
        <Providers>
          <OfflineIndicator />
          <Header session={session} />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

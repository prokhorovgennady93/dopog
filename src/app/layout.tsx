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
import { OfflineSync } from "@/components/OfflineSync";
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
  title: "Подготовка к экзамену ДОПОГ 2026 | Онлайн-тесты с ответами | Сдать",
  description: "Подготовка к экзамену ДОПОГ 2026 онлайн. Бесплатный тест-драйв! Актуальные тесты с ответами и пояснениями. Сдайте экзамен в Ространснадзоре с первого раза. Начните сейчас!",
  keywords: "подготовка к экзамену ДОПОГ, сдать экзамен ДОПОГ, экзамен ДОПОГ 2026, онлайн тесты ДОПОГ, вопросы ДОПОГ 2026, ответы на тесты ДОПОГ, проверить знания ДОПОГ, обучение ДОПОГ, перевозка опасных грузов, получить свидетельство ДОПОГ, билеты ДОПОГ с ответами, экзамен ДОПОГ в Ространснадзоре, тест драйв ДОПОГ, аттестация ДОПОГ, консультант по перевозке опасных грузов, экзамен для консультанта по опасным грузам, аттестация консультантов по опасным грузам, вопросы для консультантов по ДОПОГ",
  openGraph: {
    title: "Подготовка к экзамену ДОПОГ 2026 | Онлайн-тесты с ответами",
    description: "Подготовка к экзамену ДОПОГ 2026 онлайн. Бесплатный тест-драйв! Актуальные тесты с ответами и пояснениями. Сдайте экзамен в Ространснадзоре с первого раза.",
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
          <OfflineSync />
          <Header session={session} />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Zap, Shield, Clock, ArrowRight, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuyFullAccess = async () => {
    if (!session) {
      router.push("/register");
      return;
    }
    setLoading("full");
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "full_access" }),
      });
      const data = await res.json();
      if (data.url) router.push(data.url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
            Выберите ваш путь к <span className="text-yellow-500">успеху</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            Простая и прозрачная модель оплаты. Доступ ко всем актуальным вопросам ДОПОГ 2026 на 3 месяца.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Tariff 1: Single Course */}
          <div className="group relative bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-none animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <span className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block mb-4">
                  Для узкой специализации
                </span>
                <h2 className="text-2xl font-black mb-2">Один курс</h2>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-zinc-900 dark:text-white">99 ₽</span>
                  <span className="text-lg font-bold text-red-500 line-through mb-1 opacity-50">199 ₽</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                <PricingFeature text="Доступ к 1 выбранному курсу" />
                <PricingFeature text="Актуальные вопросы 2026" />
                <PricingFeature text="Все режимы обучения" />
                <PricingFeature text="Подробная статистика" />
                <PricingFeature text="Срок доступа: 3 месяца" highlight />
              </ul>

              <Link
                href={session ? "/pricing/select-course" : "/register"}
                className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black py-4 rounded-2xl text-center transition-all hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-[0.98] shadow-xl shadow-zinc-200/50 dark:shadow-none block"
              >
                {session ? "Выбрать курс" : "Начать сейчас"}
              </Link>
            </div>
          </div>

          {/* Tariff 2: Full Access */}
          <div className="group relative bg-white dark:bg-zinc-900 border-2 border-yellow-500 rounded-[2.5rem] p-8 sm:p-10 transition-all hover:shadow-2xl hover:shadow-yellow-500/10 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
              Самый популярный
            </div>

            <div className="flex flex-col h-full">
              <div className="mb-8">
                <span className="text-xs font-black text-yellow-600 dark:text-yellow-500 uppercase tracking-[0.2em] block mb-4">
                  Максимальная выгода
                </span>
                <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                  Полный доступ <Zap className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                </h2>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-zinc-900 dark:text-white">199 ₽</span>
                  <span className="text-lg font-bold text-yellow-600/50 line-through mb-1 opacity-50">399 ₽</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                <PricingFeature text="Доступ ко ВСЕМ курсам" bold />
                <PricingFeature text="Базовый + Спецкурсы" />
                <PricingFeature text="Приоритетное обновление базы" />
                <PricingFeature text="Персональные рекомендации" />
                <PricingFeature text="Срок доступа: 3 месяца" highlight />
              </ul>

              <button
                onClick={handleBuyFullAccess}
                disabled={loading === "full"}
                className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl text-center transition-all hover:bg-yellow-400 active:scale-[0.98] shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading === "full" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Получить всё сейчас <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Trust info */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <TrustItem icon={<Shield className="w-6 h-6" />} title="Безопасная оплата" desc="Защищенные платежи через банковские карты" />
          <TrustItem icon={<Clock className="w-6 h-6" />} title="Мгновенный доступ" desc="Курсы откроются сразу после оплаты" />
          <TrustItem icon={<Zap className="w-6 h-6" />} title="Обновления 2026" desc="Всегда актуальная база вопросов ДОПОГ" />
        </div>
      </div>
    </div>
  );
}

function PricingFeature({ text, highlight, bold }: { text: string; highlight?: boolean; bold?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${highlight ? "bg-yellow-500 text-black" : "bg-green-100 dark:bg-green-500/10 text-green-600"}`}>
        <Check className="w-3 h-3 stroke-[3]" />
      </div>
      <span className={`text-sm ${bold ? "font-black text-zinc-900 dark:text-white" : "font-medium text-zinc-600 dark:text-zinc-400"}`}>
        {text}
      </span>
    </li>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 text-zinc-600 dark:text-zinc-400">
        {icon}
      </div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-xs text-zinc-500">{desc}</p>
    </div>
  );
}

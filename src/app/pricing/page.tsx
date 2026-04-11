"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Check, 
  Shield, 
  Clock, 
  Loader2, 
  Key, 
  Ticket, 
  CheckCircle2,
  Zap
} from "lucide-react";
import { useSession } from "next-auth/react";
import { PricingCards } from "@/components/pricing/PricingCards";
import { DocumentKitSection } from "@/components/pricing/DocumentKitSection";

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleRedeemPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/register");
      return;
    }
    if (!promoCode.trim()) return;

    setLoading("promo");
    setPromoStatus(null);

    try {
      const res = await fetch("/api/promo/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode }),
      });
      const data = await res.json();
      
      if (data.success) {
        setPromoStatus({ type: "success", message: data.message });
        setPromoCode("");
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        setPromoStatus({ type: "error", message: data.error || "Ошибка активации" });
      }
    } catch (e) {
      setPromoStatus({ type: "error", message: "Сетевая ошибка" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight leading-tight">
            Выберите ваш путь к <span className="text-yellow-500">успеху</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Простая и прозрачная модель оплаты. Доступ ко всем актуальным вопросам ДОПОГ 2026 на 3 месяца.
          </p>
        </div>

        {/* Unified Pricing Cards */}
        <PricingCards />

        {/* Unified Documents Kit Section */}
        <DocumentKitSection />

        {/* Promo Code Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Ticket className="w-24 h-24 rotate-12" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                <Key className="w-5 h-5 text-orange-600" /> Активация доступа
              </h3>
              <p className="text-sm font-bold text-zinc-500 mb-6">
                Вы учитесь в автошколе-партнере? Введите полученный промокод, чтобы получить мгновенный доступ.
              </p>

              <form onSubmit={handleRedeemPromo} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="Ваш промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={loading === "promo" || !promoCode.trim()}
                  className="bg-zinc-900 dark:bg-white text-white dark:text-black font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl active:scale-95 disabled:opacity-50 whitespace-nowrap"
                >
                  {loading === "promo" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Активировать"}
                </button>
              </form>

              {promoStatus && (
                <div className={`mt-4 p-4 rounded-xl text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
                  promoStatus.type === "success" 
                    ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-500 border border-green-200/50" 
                    : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-500 border border-red-200/50"
                }`}>
                  {promoStatus.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                  {promoStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust info */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <TrustItem icon={<Shield className="w-6 h-6" />} title="Безопасная оплата" desc="Защищенные платежи через банковские карты" />
          <TrustItem icon={<Clock className="w-6 h-6" />} title="Мгновенный доступ" desc="Курсы откроются сразу после оплаты" />
          <TrustItem icon={<Zap className="w-6 h-6" />} title="Работа со школами" desc="Специальные условия для учебных центров" />
        </div>
      </div>
    </div>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 text-zinc-600 dark:text-zinc-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="font-black mb-1">{title}</h4>
      <p className="text-xs text-zinc-500 font-bold">{desc}</p>
    </div>
  );
}

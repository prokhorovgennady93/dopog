"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Zap, Loader2, Clock, ChevronRight, ChevronDown, Check } from "lucide-react";
import { useSession } from "next-auth/react";

export function PricingCards() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedBasicCourse, setSelectedBasicCourse] = useState("base");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const courseNames: Record<string, string> = {
    "base": "Базовый курс",
    "tanks": "Цистерны",
    "class1": "Класс 1 (Взрывчатые)",
    "class7": "Класс 7 (Радиоактивные)"
  };

  const courseIcons: Record<string, string> = {
    "base": "🚛",
    "tanks": "⛽",
    "class1": "🧨",
    "class7": "☢️"
  };

  const handleBuy = async (type: "full_access" | "single_course", courseId?: string) => {
    if (!session) {
      router.push("/register");
      return;
    }
    setLoading(type + (courseId || ""));
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, courseId }),
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Free Tier */}
      <div className="bg-white dark:bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none">
        <div>
          <div className="mb-8">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-4">Для новичков</span>
            <h3 className="text-2xl font-black mb-2">Начальный</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">0 ₽</span>
              <span className="text-zinc-400 text-sm font-bold">/ тест-драйв</span>
            </div>
          </div>
          <ul className="space-y-4 mb-10">
            <PricingFeature text="25 обучающих вопросов" />
            <PricingFeature text="Поддержка PWA приложения" />
            <PricingFeature text="Без режима экзамена" muted />
          </ul>
        </div>
        <div>
          {session ? (
            <div className="w-full py-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 font-black block text-center opacity-40 cursor-not-allowed select-none text-sm">
              Уже активен
            </div>
          ) : (
            <Link href="/register" className="w-full py-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 font-black block text-center hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all active:scale-95 text-sm">
              Начать бесплатно
            </Link>
          )}
        </div>
      </div>

      {/* Basic Tier */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-700 flex flex-col justify-between relative shadow-2xl shadow-zinc-200/50 dark:shadow-none group hover:-translate-y-1 transition-all">
        <div>
          <div className="mb-8">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-4">Оптимальный</span>
            <h3 className="text-2xl font-black mb-2">Основной</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">99 ₽</span>
              <span className="text-zinc-500 text-sm font-bold">/ 1 курс</span>
            </div>
          </div>
          
          <div className="relative mb-8">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left bg-zinc-50 dark:bg-zinc-950 ${
                isDropdownOpen ? "border-blue-500 shadow-lg shadow-blue-500/5" : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{courseIcons[selectedBasicCourse]}</span>
                <span className="font-bold text-xs uppercase tracking-tight text-zinc-900 dark:text-white">
                  {courseNames[selectedBasicCourse]}
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {Object.entries(courseNames).map(([id, name]) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedBasicCourse(id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all text-left group ${
                      selectedBasicCourse === id ? "bg-blue-500/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{courseIcons[id]}</span>
                      <span className={`font-bold text-[11px] uppercase tracking-tight ${selectedBasicCourse === id ? "text-blue-600" : "text-zinc-500"}`}>
                        {name}
                      </span>
                    </div>
                    {selectedBasicCourse === id && <Check className="w-4 h-4 text-blue-600 stroke-[3]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            disabled={loading === "single_course" + selectedBasicCourse}
            onClick={() => handleBuy("single_course", selectedBasicCourse)}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black block text-center shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm disabled:opacity-50 flex items-center justify-center gap-2 mb-10"
          >
            {loading === "single_course" + selectedBasicCourse ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>Купить курс за 99 ₽ <ChevronRight className="w-4 h-4" /></>
            )}
          </button>

          <ul className="space-y-3 mb-10 opacity-60">
            <PricingFeature text="Оффлайн доступ" />
            <PricingFeature text="Полная база" />
            <PricingFeature text="Симуляция экзамена" highlight />
          </ul>
        </div>
      </div>

      {/* Premium Tier */}
      <div className="bg-zinc-900 dark:bg-zinc-900 p-8 rounded-[2.5rem] border-2 border-yellow-500 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-yellow-500/20 group hover:-translate-y-1 transition-all">
        <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">ХИТ</div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500 opacity-5 rounded-full blur-3xl" />
        
        <div>
          <div className="mb-8 relative z-10">
            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest block mb-4">VIP</span>
            <h3 className="text-2xl font-black mb-2 text-white">Премиум</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">199 ₽</span>
              <span className="text-zinc-500 text-sm font-bold">/ все курсы сразу</span>
            </div>
          </div>
          <ul className="space-y-4 mb-10 relative z-10">
            <PricingFeature text="Оффлайн доступ" light />
            <PricingFeature text="Полная база (800+ вопросов)" light />
            <PricingFeature text="Приоритетные обновления" light />
            <PricingFeature text="Симуляция реального экзамена" light highlight />
          </ul>
        </div>
        <button 
          onClick={() => handleBuy("full_access")}
          disabled={loading === "full_access"}
          className="w-full py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black block text-center shadow-xl shadow-yellow-500/20 transition-all active:scale-95 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading === "full_access" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Получить всё"}
        </button>
      </div>
    </div>
  );
}

function PricingFeature({ text, highlight, light, muted }: { text: string; highlight?: boolean; light?: boolean; muted?: boolean }) {
  return (
    <li className={`flex items-start gap-3 ${muted ? "opacity-40" : ""}`}>
      <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${highlight ? "bg-yellow-500 text-black" : light ? "bg-white/10 text-yellow-500" : "bg-green-100 dark:bg-green-500/10 text-green-600"}`}>
        <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <span className={`text-[13px] font-bold ${light ? "text-zinc-400" : "text-zinc-600 dark:text-zinc-400"}`}>
        {text}
      </span>
    </li>
  );
}

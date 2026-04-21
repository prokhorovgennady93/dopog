"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  ChevronDown 
} from "lucide-react";

export function PromoSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-zinc-900 border-y border-white/5 pt-12 pb-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">

          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-yellow-500/20">
              <Sparkles className="w-4 h-4" />
              Спецпредложение
            </div>

            <h2 className="text-[clamp(1.1rem,6vw,1.875rem)] sm:text-3xl font-black text-white mb-6 leading-tight max-w-none">
              {/* Force 3 lines on all devices */}
              <span className="block">Пройдите подготовку</span>{" "}
              <span className="block">и получите <span className="text-yellow-500">скидку 15%</span></span>{" "}
              <span className="block">на свидетельство об обучении</span>
            </h2>

            {/* Desktop Details */}
            <div className="hidden lg:block space-y-4">
              <PromoDetail icon={<ShieldCheck className="w-5 h-5 text-orange-500" />} title="Лицензия и аккредитация" text="Образовательная лицензия ЛО35-01276-61/02274118 от 05.05.2025 г. и аккредитация Ространснадзора." />
              <PromoDetail icon={<CheckCircle2 className="w-5 h-5 text-orange-500" />} title="Документы установленного образца" text="Вносим сразу в систему ФИС ФРДО." />
              <PromoDetail icon={<Download className="w-5 h-5 text-orange-500" />} title="Удобное получение" text="Доставка по территории всей Российской Федерации." />
            </div>

            {/* Mobile Toggle Button */}
            <div className="lg:hidden flex justify-start mt-4">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-all font-bold group py-2"
              >
                <span className="text-xs font-black uppercase tracking-widest">подробнее</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Mobile Collapsible Content */}
            <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100 mt-8 mb-4' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <PromoDetail icon={<ShieldCheck className="w-5 h-5 text-orange-500" />} title="Лицензия и аккредитация" text="Образовательная лицензия ЛО35-01276-61/02274118 от 05.05.2025 г. и аккредитация Ространснадзора." />
                  <PromoDetail icon={<CheckCircle2 className="w-5 h-5 text-orange-500" />} title="Документы" text="Вносим сразу в систему ФИС ФРДО." />
                  <PromoDetail icon={<Download className="w-5 h-5 text-orange-500" />} title="Доставка" text="По всей Российской Федерации." />
                </div>
                
                <div className="w-full">
                  <div className="pt-6 pb-10 px-8 bg-zinc-950 border border-zinc-800 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"></div>
                    <h3 className="text-xl font-bold text-white mb-2 mt-4">Получить свидетельство</h3>
                    <p className="text-zinc-500 text-sm mb-6">Скидка будет применена при выборе тарифа из каталога.</p>
                    <Link href="#documents-kit" className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-xl font-black text-lg transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20">
                      Получить скидку
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-full lg:w-[400px]">
            <div className="pt-6 pb-8 px-8 bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"></div>
              <h3 className="text-xl font-bold text-white mb-2 mt-4">Получить свидетельство</h3>
              <p className="text-zinc-500 text-sm mb-6">Скидка будет применена при выборе тарифа из каталога.</p>

              <Link href="#documents-kit" className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-xl font-black text-lg transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20">
                Получить скидку
              </Link>
              <p className="text-[10px] text-zinc-600 font-medium text-center mt-4">
                Предложение ограничено.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PromoDetail({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-white mb-0.5">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

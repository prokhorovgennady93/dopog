"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  X,
  Zap
} from "lucide-react";

interface DiscountPopupProps {
  onClose: () => void;
}

export function DiscountPopup({ onClose }: DiscountPopupProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-yellow-500/20">
            <Sparkles className="w-4 h-4" />
            Ваш прогресс вознагражден!
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white mb-8 leading-tight">
            Пройдите подготовку <br />
            и получите <span className="text-yellow-500">скидку 15%</span> <br />
            на свидетельство об обучении
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <PopupDetail icon={<ShieldCheck className="w-5 h-5 text-orange-500" />} title="Лицензия" text="Образовательная лицензия и аккредитация Ространснадзора." />
              <PopupDetail icon={<CheckCircle2 className="w-5 h-5 text-orange-500" />} title="Гос. образец" text="Вносим документы сразу в систему ФИС ФРДО." />
              <PopupDetail icon={<Download className="w-5 h-5 text-orange-500" />} title="Доставка" text="По территории всей Российской Федерации." />
            </div>

            <div className="flex flex-col justify-center">
              <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"></div>
                <h3 className="text-xl font-bold text-white mb-2 mt-2">Получить скидку</h3>
                <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                  Мы подготовим все документы. Скидка применится автоматически.
                </p>

                <Link 
                  href="#documents-kit" 
                  onClick={onClose}
                  className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-xl font-black text-lg transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20 gap-2 group"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  Забрать скидку
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Продолжить обучение без скидки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PopupDetail({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-white mb-0.5">{title}</h3>
        <p className="text-xs text-zinc-400 leading-relaxed font-medium">{text}</p>
      </div>
    </div>
  );
}

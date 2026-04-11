"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export function SecurityBanner({ hasEmail }: { hasEmail: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hasEmail) return;
    
    try {
      const hiddenUntil = localStorage.getItem('hideSecurityBannerUntil');
      if (!hiddenUntil) {
        setIsVisible(true);
        return;
      }
      
      const hiddenUntilDate = new Date(hiddenUntil);
      if (new Date() > hiddenUntilDate) {
        localStorage.removeItem('hideSecurityBannerUntil');
        setIsVisible(true);
      }
    } catch(e) {
      setIsVisible(true);
    }
  }, [hasEmail]);

  const handleClose = () => {
    setIsVisible(false);
    try {
      const hideUntil = new Date();
      hideUntil.setDate(hideUntil.getDate() + 7);
      localStorage.setItem('hideSecurityBannerUntil', hideUntil.toISOString());
    } catch(e) {}
  };

  if (hasEmail || !isVisible) return null;

  return (
    <div className="relative bg-yellow-500/10 border-2 border-yellow-500/20 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 animate-in fade-in slide-in-from-top-4 duration-1000">
      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 text-yellow-600/50 hover:text-yellow-600 transition-colors bg-yellow-500/10 hover:bg-yellow-500/20 rounded-full p-2"
        aria-label="Закрыть уведомление"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className="flex items-center gap-4 sm:gap-6 w-full pr-8 md:pr-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-yellow-600 shrink-0">
          <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight">Защитите свой аккаунт</h3>
          <p className="text-xs sm:text-sm text-zinc-500 font-bold leading-relaxed">Добавьте email, чтобы восстановить пароль.</p>
        </div>
      </div>
      <Link href="/dashboard/profile" className="w-full md:w-auto md:mr-10 lg:mr-12 text-center bg-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20 whitespace-nowrap">
        Добавить почту
      </Link>
    </div>
  );
}

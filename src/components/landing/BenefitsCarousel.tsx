"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  WifiOff,
  MessageSquare,
  Settings,
  Target,
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const benefits = [
  { icon: <ShieldCheck />, title: "Актуальные вопросы 2026", text: "Тесты полностью соответствуют последней версии Ространснадзора." },
  { icon: <WifiOff />, title: "OFFLINE версия", text: "Скачайте PWA-приложение и занимайтесь без интернета в удобное для вас время." },
  { icon: <MessageSquare />, title: "Разъяснения к тестам", text: "Подробные комментарии к каждому вопросу помогут понять, а не просто запомнить ответ." },
  { icon: <Settings />, title: "Комфорт обучения", text: "Продуманная и удобная механика прохождения тестов и экзаменов ДОПОГ." },
  { icon: <Target />, title: "Эффективность", text: "98% клиентов сдают экзамен и получают ДОПОГ с 1 раза." },
  { icon: <Award />, title: "Лицензия", text: "Лицензия ЛО35-01276-61/02274118 от 05.05.2025г. и аккредитация в Ространснадзоре." },
];

export function BenefitsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % benefits.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
      touchStartX.current = null;
    }
  };

  const onTouchEnd = () => {
    touchStartX.current = null;
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden px-4 md:hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {benefits.map((benefit, idx) => (
          <div key={idx} className="w-full flex-shrink-0 px-2">
            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm h-full">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 text-orange-600 dark:text-orange-500">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold leading-tight">{benefit.title}</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>



    </div>
  );
}

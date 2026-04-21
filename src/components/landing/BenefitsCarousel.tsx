"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const benefits = [
  { icon: "benefit-shield", title: "Актуальные вопросы 2026", text: "Тесты полностью соответствуют последней версии Ространснадзора." },
  { icon: "benefit-offline", title: "OFFLINE версия", text: "Скачайте PWA-приложение и занимайтесь без интернета в удобное для вас время." },
  { icon: "benefit-message", title: "Разъяснения к тестам", text: "Подробные комментарии к каждому вопросу помогут понять, а не просто запомнить ответ." },
  { icon: "benefit-settings", title: "Комфорт обучения", text: "Продуманная и удобная механика прохождения тестов и экзаменов ДОПОГ." },
  { icon: "benefit-target", title: "Эффективность", text: "98% клиентов сдают экзамен и получают ДОПОГ с 1 раза." },
  { icon: "benefit-award", title: "Лицензия", text: "Лицензия ЛО35-01276-61/02274118 от 05.05.2025 г. и аккредитация Ространснадзора." },
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
            <div className="group p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm h-full hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5 transition-all">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-12 h-12 bg-orange-100 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner overflow-hidden border border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Image src={`/images/benefits/${benefit.icon}.png`} alt={benefit.title} fill sizes="48px" className="object-cover" />
                </div>
                <h3 className="text-lg font-bold leading-tight group-hover:text-brand-gradient transition-colors cursor-default">{benefit.title}</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

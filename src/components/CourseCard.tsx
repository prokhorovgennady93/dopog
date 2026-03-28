"use client";

import Link from "next/link";
import { ArrowRight, CloudDownload, Lock, ShieldCheck } from "lucide-react";

interface CourseCardProps {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
  questionCount: number;
  hasAccess?: boolean;
}

export function CourseCard({ slug, title, description, icon, questionCount, hasAccess = false }: CourseCardProps) {
  const handleDownloadAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasAccess) {
      alert("Полное скачивание курса доступно только пользователям с Premium подпиской. Пожалуйста, приобретите доступ для работы офлайн.");
      return;
    }
    alert("Курс скоро будет доступен офлайн! Перейдите на страницу курса, чтобы начать скачивание всех тем.");
  };

  return (
    <>
      <style jsx>{`
        @keyframes goldPulse {
          0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(234, 179, 8, 0); }
          100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
        }
        @keyframes cycleText {
          0%, 45% { content: "Скачать"; }
          55%, 100% { content: "Premium"; }
        }
        .premium-pulse {
          animation: goldPulse 2s infinite;
        }
        .cycle-text::after {
          content: "Скачать";
          animation: cycleText 4s infinite;
        }
      `}</style>
      <Link
        href={`/course/${slug}`}
        className="group relative flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl hover:shadow-yellow-500/5 hover:-translate-y-1"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white dark:bg-zinc-950 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
            {icon || "📦"}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAll}
              className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all text-[9px] font-black uppercase tracking-wider ${
                hasAccess 
                  ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 hover:bg-yellow-500 hover:text-black premium-pulse" 
                  : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-300"
              }`}
            >
              {hasAccess ? (
                <>
                  <CloudDownload className="w-3 h-3" />
                  <span>Скачано</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  <span className="cycle-text"></span>
                </>
              )}
            </button>

            <span className="bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
              {questionCount}
            </span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-2">
          {description || "Полный курс подготовки по данной категории ДОПОГ."}
        </p>

        <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white group/btn mt-auto">
          Перейти к курсу
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </div>
      </Link>
    </>
  );
}

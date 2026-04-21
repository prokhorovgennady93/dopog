"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CloudDownload, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { checkTopicDownloaded, downloadCourse } from "@/lib/offline";

interface CourseCardProps {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
  questionCount: number;
  hasAccess?: boolean;
  themes?: { id: string }[];
}

const iconPaths: Record<string, string> = {
  "basic": "/images/courses/course-basic.png",
  "tanks": "/images/courses/course-tanks.png",
  "class1": "/images/courses/course-class1.png",
  "class7": "/images/courses/course-class7.png"
};

export function CourseCard({ id, slug, title, description, icon, questionCount, hasAccess = false, themes = [] }: CourseCardProps) {
  const [status, setStatus] = useState<"idle" | "downloading" | "downloaded" | "outdated" | "locked">("idle");
  const [progress, setProgress] = useState(0);
  const themeIds = themes.map(t => t.id);

  useEffect(() => {
    if (!hasAccess) {
      setStatus("locked");
      return;
    }
    
    const checkAllDownloaded = async () => {
      if (themeIds.length === 0) return;
      const results = await Promise.all(themeIds.map(checkTopicDownloaded));
      const allDone = results.every(res => res === "ok" || res === "outdated");
      const someOutdated = results.some(res => res === "outdated");
      
      if (allDone) {
        setStatus(someOutdated ? "outdated" : "downloaded");
      } else {
        setStatus("idle");
      }
    };
    
    checkAllDownloaded();

    const handleUpdate = () => {
      checkAllDownloaded();
    };
    
    window.addEventListener('online', handleUpdate);
    window.addEventListener('offline-status-changed', handleUpdate);
    
    const interval = setInterval(checkAllDownloaded, 2000);
    
    return () => {
      window.removeEventListener('online', handleUpdate);
      window.removeEventListener('offline-status-changed', handleUpdate);
      clearInterval(interval);
    };
  }, [themeIds.length, hasAccess]);

  const handleDownloadAll = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasAccess) {
      alert("Полное скачивание курса доступно только пользователям с Premium подпиской. Пожалуйста, приобретите доступ для работы офлайн.");
      return;
    }

    if (status === "downloading") return;

    setStatus("downloading");
    setProgress(0);

    try {
      await downloadCourse(id, slug, themeIds, (topicId, p) => {
        const idx = themeIds.indexOf(topicId);
        const totalProgress = Math.round(((idx + (p/100)) / themeIds.length) * 100);
        setProgress(totalProgress);
      });
      setStatus("downloaded");
    } catch (error) {
      console.error("Course download failed:", error);
      setStatus("idle");
      alert("Произошла ошибка при скачивании. Пожалуйста, проверьте интернет-соединение.");
    }
  };

  const imageSrc = iconPaths[slug] || "/icon.png";

  return (
    <Link
      href={`/course/${slug}`}
      className="group relative flex flex-col h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 hover:border-orange-500/30 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="relative w-14 h-14 bg-orange-100 dark:bg-orange-500/10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner overflow-hidden border border-orange-500/20">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            sizes="56px"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-500 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
            {questionCount} {(() => {
              const lastDigit = questionCount % 10;
              const lastTwoDigits = questionCount % 100;
              if (lastDigit === 1 && lastTwoDigits !== 11) return "вопрос";
              if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) return "вопроса";
              return "вопросов";
            })()}
          </span>

          <button
            onClick={handleDownloadAll}
            disabled={status === "downloading"}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-[9px] font-black uppercase tracking-wider border ${
              status === "downloaded"
                ? "bg-green-500/10 border-green-500/20 text-green-600 cursor-default"
                : status === "outdated"
                ? "bg-blue-500/10 border-blue-500/20 text-blue-600 hover:bg-blue-500/20"
                : status === "downloading"
                ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400"
                : status === "locked"
                ? "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-zinc-300"
                : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-orange-500 hover:text-orange-600 shadow-sm"
            }`}
          >
            {status === "downloading" ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>{progress}%</span>
              </>
            ) : status === "downloaded" ? (
              <>
                <ShieldCheck className="w-3 h-3" />
                <span>Офлайн</span>
              </>
            ) : status === "outdated" ? (
              <>
                <CloudDownload className="w-3 h-3" />
                <span>Рев.</span>
              </>
            ) : status === "locked" ? (
              <>
                <Lock className="w-3 h-3" />
                <span className="opacity-50">Premium</span>
              </>
            ) : (
              <>
                <CloudDownload className="w-3 h-3" />
                <span>Скачать</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-black mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors leading-tight">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
        {description || "Полный курс подготовки для водителей, перевозящих опасные грузы."}
      </p>

      <div className="flex items-center gap-1 text-[11px] font-black text-zinc-400 group-hover:text-orange-500 group/btn mt-auto uppercase tracking-widest transition-colors">
        Подробнее
        <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
      </div>
    </Link>
  );
}

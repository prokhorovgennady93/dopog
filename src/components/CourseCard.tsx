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
      alert("Полное скачивание курса доступно только пользователям с Premium подпиской.");
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
        .premium-pulse {
          animation: goldPulse 2s infinite;
        }
      `}</style>
      <Link
      href={`/course/${slug}`}
      className="group relative block bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl hover:shadow-yellow-500/5 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-white dark:bg-zinc-950 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
          {icon || "📦"}
        </div>
        <span className="bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
          {questionCount} Вопросов
        </span>
      </div>
      
      <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-2">
        {description || "Полный курс подготовки по данной категории ДОПОГ."}
      </p>

      <div className="flex items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white group/btn">
          Перейти к курсу
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </div>

        <button
          onClick={handleDownloadAll}
          className={`relative group/dl flex items-center justify-center w-10 h-10 rounded-xl border transition-all ${
            hasAccess 
              ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 hover:bg-yellow-500 hover:text-black shadow-lg shadow-yellow-500/10 premium-pulse" 
              : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 opacity-60 hover:border-zinc-300"
          }`}
          title={hasAccess ? "Скачать весь курс офлайн" : "Требуется Premium"}
        >
          {hasAccess ? (
            <>
              <CloudDownload className="w-5 h-5 animate-pulse" />
              <div className="absolute -top-1 -right-1">
                <ShieldCheck className="w-4 h-4 text-yellow-500 fill-white dark:fill-zinc-900" />
              </div>
            </>
          ) : (
            <Lock className="w-4 h-4" />
          )}
          
          {/* Label appearing on hover */}
          <span className="absolute bottom-full mb-2 bg-zinc-900 text-white text-[10px] font-black uppercase px-2 py-1 rounded opacity-0 group-hover/dl:opacity-100 transition-opacity whitespace-nowrap">
            {hasAccess ? "Скачать курс" : "Premium"}
          </span>
        </button>
      </div>
    </Link>
    </>
  );
}

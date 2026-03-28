import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CourseCardProps {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
  questionCount: number;
}

export function CourseCard({ slug, title, description, icon, questionCount }: CourseCardProps) {
  return (
    <div className="group relative block bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-[32px] p-6 transition-all hover:border-orange-600/30 hover:shadow-2xl hover:shadow-orange-950/10 hover:-translate-y-1">
      <Link href={`/course/${slug}`} className="block">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-950 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-zinc-100 dark:border-zinc-800 transform group-hover:scale-110 transition-transform duration-500">
            {icon || "📦"}
          </div>
          <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-orange-950/20">
            {questionCount} Вопросов
          </span>
        </div>
        
        <h3 className="text-xl font-black mb-2 group-hover:text-orange-600 transition-colors tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-2 font-bold leading-relaxed">
          {description || "Полный курс подготовки по данной категории ДОПОГ."}
        </p>
      </Link>

      <div className="flex flex-col gap-3 pt-4 border-t border-zinc-50 dark:border-zinc-800">
        <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-sm hover:bg-orange-600 hover:text-white transition-all active:scale-95 flex flex-col items-center justify-center gap-0.5 group/dl relative overflow-hidden">
           <div className="absolute top-0 right-0 px-2 py-0.5 bg-orange-600 text-white text-[8px] font-black uppercase tracking-tighter rounded-bl-lg">Премиум</div>
           <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-90 group-hover/dl:translate-y-1 transition-transform" />
              <span>Скачать все темы</span>
           </div>
           <span className="text-[10px] opacity-60 font-bold">Доступ без интернета</span>
        </button>
        
        <Link 
          href={`/course/${slug}`}
          className="w-full text-center py-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-orange-600 transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

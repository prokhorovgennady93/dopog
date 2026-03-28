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

      <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white group/btn">
        Перейти к курсу
        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
      </div>
    </Link>
  );
}

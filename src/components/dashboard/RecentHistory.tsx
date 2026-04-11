"use client";

import { Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Attempt {
  id: string;
  courseTitle: string;
  score: number;
  percentage: number;
  isPassed: boolean;
  timeTaken: number | null;
  startedAt: Date;
}

interface RecentHistoryProps {
  attempts: Attempt[];
}

export function RecentHistory({ attempts }: RecentHistoryProps) {
  if (attempts.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black mb-1">История экзаменов</h3>
          <p className="text-xs text-zinc-500 font-medium">Ваши последние результаты</p>
        </div>
        <Link href="/dashboard/history" className="text-sm font-black text-orange-600 hover:translate-x-1 transition-transform flex items-center gap-2">
           Вся история <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {attempts.map((attempt) => (
          <div key={attempt.id} className="relative flex flex-col p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-transparent hover:border-orange-500/20 transition-all group gap-2">
            <div className="flex items-start justify-between gap-4">
              <h4 className="font-bold text-zinc-900 dark:text-white leading-tight">{attempt.courseTitle}</h4>
              <div className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-black tracking-widest ${attempt.isPassed ? 'bg-green-100/50 text-green-700 dark:bg-green-900/30' : 'bg-red-100/50 text-red-700 dark:bg-red-900/30'}`}>
                {attempt.percentage}%
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl flex items-center justify-center ${attempt.isPassed ? 'bg-green-100 text-green-600 dark:bg-green-500/10' : 'bg-red-100 text-red-600 dark:bg-red-500/10'}`}>
                  {attempt.isPassed ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1 whitespace-nowrap"><Clock className="w-3 h-3 text-zinc-300 dark:text-zinc-500" /> {attempt.timeTaken ? `${Math.floor(attempt.timeTaken / 60)}м ${attempt.timeTaken % 60}с` : '—'}</span>
                  <span className="whitespace-nowrap">{new Date(attempt.startedAt).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className={`text-lg sm:text-xl font-black leading-none ${attempt.isPassed ? 'text-green-600' : 'text-red-600'}`}>
                    {attempt.score}<span className="text-xs sm:text-sm text-zinc-400">/25</span>
                  </span>
                </div>
                <Link href={`/exam/results/${attempt.id}`} className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-orange-600 group-hover:bg-orange-50 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 z-10 before:absolute before:inset-0" aria-label="Смотреть результат">
                   <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

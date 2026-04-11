import { auth } from "@/../auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      examAttempts: {
        orderBy: { startedAt: "desc" },
        include: { course: true }
      }
    }
  }) as any;

  if (!user) {
    redirect("/login");
  }

  const attempts = user.examAttempts.map((a: any) => ({
    id: a.id,
    courseTitle: a.course.title,
    score: Math.round((a.score / 100) * 25),
    percentage: a.score,
    isPassed: a.isPassed,
    timeTaken: a.timeTaken,
    startedAt: a.startedAt
  }));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-white pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-black text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl w-fit">
          <ArrowLeft className="w-4 h-4" /> В Личный кабинет
        </Link>
        
        <div>
          <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">История экзаменов</h1>
          <p className="text-zinc-500 font-bold text-base md:text-lg">Детальная история всех ваших попыток сдачи.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 sm:p-8 shadow-sm">
          {attempts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 font-bold">Вы пока не сдавали экзамены.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {attempts.map((attempt: any) => (
                <div key={attempt.id} className="relative flex flex-col p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-transparent hover:border-orange-500/20 transition-all group gap-3">
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
          )}
        </div>
      </div>
    </div>
  );
}

import { db } from "@/lib/db";
import { auth } from "@/../auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Timer, Award, ArrowLeft, RefreshCw } from "lucide-react";

export default async function ResultsPage({ params }: { params: { attemptId: string } }) {
  const { attemptId } = await params;
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const attempt = await db.examAttempt.findUnique({
    where: { id: attemptId },
    include: { course: true },
  });

  if (!attempt || attempt.userId !== session.user?.id) {
    notFound();
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}м ${secs}с`;
  };

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Header Icon */}
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl ${attempt.isPassed ? 'bg-green-500 shadow-green-500/20' : 'bg-red-500 shadow-red-500/20'}`}>
          {attempt.isPassed ? <Award className="w-12 h-12 text-white" /> : <XCircle className="w-12 h-12 text-white" />}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-center mb-2">
          {attempt.isPassed ? "Экзамен Сдан!" : "Экзамен не сдан"}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-center mb-10 max-w-md">
          Результат симуляции по курсу: {attempt.course.title}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
           <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Ваш результат</span>
              <span className={`text-4xl font-black ${attempt.score >= 75 ? 'text-green-500' : 'text-red-500'}`}>{attempt.score}%</span>
              <span className="text-xs text-zinc-500 mt-2">Порог прохождения: 75%</span>
           </div>
           
           <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Timer className="w-3 h-3" /> Время прохождения
              </span>
              <span className="text-4xl font-black">{formatTime(attempt.timeTaken || 0)}</span>
              <span className="text-xs text-zinc-500 mt-2">Завершено {new Date(attempt.finishedAt || "").toLocaleDateString()}</span>
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
           <Link
             href={`/exam/${attempt.courseId}`}
             className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all"
           >
             <RefreshCw className="w-5 h-5" />
             Попробовать снова
           </Link>
           <Link
             href="/dashboard"
             className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-all"
           >
             <ArrowLeft className="w-5 h-5" />
             Вернуться в Личный кабинет
           </Link>
        </div>

        <p className="mt-8 text-xs text-zinc-400 text-center max-w-sm leading-relaxed">
          Это симуляция экзамена. Официальный результат может быть получен только в аккредитованных центрах Rostransnadzor.
        </p>

      </div>
    </div>
  );
}

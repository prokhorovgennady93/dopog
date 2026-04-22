import { db } from "@/lib/db";
import { auth } from "@/../auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Timer, Award, ArrowLeft, RefreshCw, ChevronDown } from "lucide-react";
import { ExamResultsPopupTrigger } from "@/components/exam/ExamResultsPopupTrigger";

export default async function ResultsPage({ params }: { params: Promise<{ attemptId: string }> }) {
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
           {(() => {
             const detailsData = JSON.parse((attempt as any).details || "[]");
             const mistakesCount = detailsData.filter((d: any) => !d.isCorrect).length;
             const isBasic = attempt.course.slug === "basic";
             const maxMistakes = isBasic ? 6 : 3;
             
             return (
               <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Ваш результат</span>
                  <span className={`text-4xl font-black ${attempt.isPassed ? 'text-green-500' : 'text-red-500'}`}>
                    {mistakesCount} {mistakesCount === 1 ? 'ошибка' : (mistakesCount > 1 && mistakesCount < 5 ? 'ошибки' : 'ошибок')}
                  </span>
                  <span className="text-xs text-zinc-500 mt-2">Допустимо: {maxMistakes}</span>
               </div>
             );
           })()}
           
           <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Timer className="w-3 h-3" /> Время прохождения
              </span>
              <span className="text-4xl font-black">{formatTime(attempt.timeTaken || 0)}</span>
              <span className="text-xs text-zinc-500 mt-2">Завершено {new Date(attempt.finishedAt || "").toLocaleDateString()}</span>
           </div>
        </div>

        {/* Mistakes Section (Collapsible "Cut") */}
        {(attempt as any).details && (
          <details className="w-full mt-8 mb-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden group shadow-sm [&_summary::-webkit-details-marker]:hidden">
             <summary className="flex items-center justify-between p-6 sm:p-8 cursor-pointer select-none transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                   <CheckCircle2 className="w-6 h-6 text-orange-500" />
                 </div>
                 <div>
                   <h2 className="text-xl sm:text-2xl font-black">Работа над ошибками</h2>
                   <p className="text-sm text-zinc-500 font-medium mt-1">Нажмите, чтобы посмотреть разбор по темам</p>
                 </div>
               </div>
               <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-transform duration-300 group-open:-rotate-180 flex-shrink-0">
                 <ChevronDown className="w-5 h-5 text-zinc-500" />
               </div>
             </summary>
             
             <div className="p-6 sm:p-8 pt-0 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
             {(() => {
               try {
                 const detailsData = JSON.parse((attempt as any).details);
                 const mistakes = detailsData.filter((d: any) => !d.isCorrect);
                 
                 if (mistakes.length === 0) {
                   return (
                     <div className="mt-8 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 p-6 rounded-2xl text-green-700 dark:text-green-400 font-bold text-center">
                       Отлично! У вас нет ни одной ошибки.
                     </div>
                   );
                 }

                 // Group by topic
                 const groupedMistakes = mistakes.reduce((acc: any, mistake: any) => {
                   const theme = mistake.topicTitle || "Без темы";
                   if (!acc[theme]) acc[theme] = [];
                   acc[theme].push(mistake);
                   return acc;
                 }, {});

                 return (
                   <div className="space-y-4 mt-6">
                     {Object.entries(groupedMistakes).map(([theme, items]: [string, any], groupIdx) => (
                       <details key={groupIdx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden group/theme shadow-sm [&_summary::-webkit-details-marker]:hidden">
                         <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                           <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center font-bold text-red-500 text-sm">
                               {items.length}
                             </div>
                             <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex-1">{theme}</h3>
                           </div>
                           <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-transform duration-300 group-open/theme:-rotate-180 flex-shrink-0">
                             <ChevronDown className="w-4 h-4 text-zinc-500" />
                           </div>
                         </summary>
                         
                         <div className="p-4 sm:p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800 space-y-4 mt-4">
                           {items.map((mistake: any, idx: number) => {
                             const correctOpt = mistake.options.find((o: any) => o.isCorrect);
                             const userOpt = mistake.options.find((o: any) => o.id === mistake.userAnswerId);
                             return (
                               <div key={idx} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl">
                                 <h4 className="font-bold text-lg mb-4 leading-relaxed">{mistake.text}</h4>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                   <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm font-medium">
                                     <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-1.5 flex items-center gap-1"><XCircle className="w-3 h-3"/> Ваш ответ</span>
                                     {userOpt?.text || "Не отвечено"}
                                   </div>
                                   <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium">
                                     <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-1.5 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Правильный вариант</span>
                                     {correctOpt?.text || "Неизвестно"}
                                   </div>
                                 </div>
                                 {mistake.explanation && (
                                   <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-white dark:bg-black/20 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/50 leading-relaxed">
                                     <span className="font-bold text-zinc-900 dark:text-zinc-300 mr-2">Пояснение:</span>
                                     {mistake.explanation}
                                   </p>
                                 )}
                               </div>
                             );
                           })}
                         </div>
                       </details>
                     ))}
                   </div>
                 );
               } catch (e) {
                 return <p className="text-red-500 text-center font-medium mt-6">Ошибка загрузки деталей тестирования</p>;
               }
             })()}
             </div>
          </details>
        )}

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
      <ExamResultsPopupTrigger />
    </div>
  );
}

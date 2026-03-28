import { auth, signOut } from "@/../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Zap, BookOpen, Crown, CheckCircle2, Award, Flame, Target, TrendingUp, ChevronRight, Mail } from "lucide-react";
import { db } from "@/lib/db";
import { OverallMasteryGauge, MasteryHeatmap, WeakestThemeCard } from "@/components/dashboard/DashboardCharts";
import { RecentHistory } from "@/components/dashboard/RecentHistory";
import { AchievementGrid, DailyStreakCard } from "@/components/dashboard/Achievements";
import { PushManager } from "@/components/PushManager";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Use as any to bypass potentially stale local Prisma types since we can't run prisma generate
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      purchases: {
        include: { course: true }
      },
      examAttempts: {
        orderBy: { startedAt: "desc" },
        take: 5,
        include: { course: true }
      },
      progress: {
        include: { question: { include: { topic: true } } }
      }
    }
  }) as any;

  if (!user) {
    redirect("/login");
  }

  const hasFullAccess = user.hasFullAccess || user.isPremium;
  const purchasedCourseIds = user.purchases.map((p: any) => p.courseId);

  // Get all available courses
  const allCourses = await db.course.findMany({
    include: {
      _count: {
        select: { questions: true }
      },
      themes: {
        include: {
          _count: { select: { questions: true } }
        }
      }
    }
  }) as any[];

  const myCourses = hasFullAccess ? allCourses : allCourses.filter(c => purchasedCourseIds.includes(c.id));

  // --- ANALYTICS CALCULATIONS ---
  
  // 1. Mastery Calculation
  const topicStatsMap = new Map();
  
  // Initialize with all topics in my courses
  myCourses.forEach(course => {
    course.themes.forEach((theme: any) => {
      topicStatsMap.set(theme.id, {
        id: theme.id,
        title: theme.title,
        totalQuestions: theme._count.questions,
        correctAnswers: 0,
        mastery: 0
      });
    });
  });

  // Aggregate user progress
  user.progress.forEach((p: any) => {
    if (p.isCorrect && topicStatsMap.has(p.question.topicId)) {
      const stats = topicStatsMap.get(p.question.topicId);
      stats.correctAnswers += 1;
    }
  });

  // Finalize mastery
  const topicMastery = Array.from(topicStatsMap.values()).map(stats => ({
    ...stats,
    mastery: stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0
  })).sort((a, b) => b.mastery - a.mastery);

  const weakestTheme = topicMastery.length > 0 ? [...topicMastery].sort((a, b) => a.mastery - b.mastery)[0] : null;

  // 2. Overall Course Mastery %
  const totalQuestionsPool = myCourses.reduce((sum, c) => sum + c._count.questions, 0);
  const totalCorrectAnswers = Array.from(topicStatsMap.values()).reduce((sum, s) => sum + s.correctAnswers, 0);
  const overallMastery = totalQuestionsPool > 0 ? Math.round((totalCorrectAnswers / totalQuestionsPool) * 100) : 0;

  // 3. Streak Calculation (Mock/Basic for now based on last activity)
  const streak = user.examAttempts.length > 0 ? 3 : 1; 

  // 4. Mock Achievements
  const achievements = [
    { id: "1", title: "Первый шаг", description: "Начали изучение первого курса", icon: <Target className="w-8 h-8" />, isUnlocked: true, unlockedAt: user.createdAt },
    { id: "2", title: "Марафонец", description: "Ударный режим 3+ дня", icon: <Flame className="w-8 h-8" />, isUnlocked: streak >= 3, unlockedAt: new Date() },
    { id: "3", title: "Идеальный экзамен", description: "Сдали тест на 25/25", icon: <Award className="w-8 h-8" />, isUnlocked: user.examAttempts.some((a: any) => a.score === 25) },
    { id: "4", title: "Знаток цистерн", description: "Тема 'Цистерны' на 80%+", icon: <Zap className="w-8 h-8" />, isUnlocked: topicMastery.some((t: any) => t.title.toLowerCase().includes("цистерн") && t.mastery >= 80) },
  ];

  const recentAttempts = user.examAttempts.map((a: any) => ({
    id: a.id,
    courseTitle: a.course.title,
    score: a.score,
    isPassed: a.isPassed,
    timeTaken: a.timeTaken,
    startedAt: a.startedAt
  }));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
             <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Pro Account</span>
                <span className="text-zinc-400 text-xs font-bold font-mono">ID: {user.id.substring(0, 8).toUpperCase()}</span>
             </div>
             <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none">
               Привет, <span className="text-orange-600">{user.name?.split(" ")[0] || "Студент"}</span>! 👋
             </h1>
             <p className="text-zinc-500 font-bold text-lg">Ваш личный центр управления подготовкой.</p>
          </div>
          <div className="flex items-center gap-3">
             <form action={async () => { "use server"; await signOut(); }}>
               <button className="bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-black px-6 py-3 rounded-2xl transition-all active:scale-95">
                 Выйти
               </button>
             </form>
          </div>
        </header>

        <PushManager />

        {/* Email Recovery Alert */}
        {!user.email && (
          <div className="bg-orange-600 rounded-[32px] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-orange-950/20 animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-lg font-black tracking-tight leading-tight">Безопасность вашего аккаунта</h3>
                      <p className="text-white/80 text-sm font-bold">Привяжите Email для восстановления пароля в случае его утраты.</p>
                   </div>
                </div>
                <Link 
                  href="/dashboard/profile"
                  className="w-full sm:w-auto bg-white text-orange-600 px-8 py-3 rounded-xl font-black text-sm hover:bg-zinc-100 transition-all text-center"
                >
                  Привязать Email
                </Link>
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
           <OverallMasteryGauge mastery={overallMastery} />
           <DailyStreakCard streak={streak} />
           <WeakestThemeCard theme={weakestTheme} />
           <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 shadow-sm flex flex-col justify-between">
              <div>
                 <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                    <TrendingUp className="w-6 h-6" />
                 </div>
                 <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Всего попыток</h3>
                 <p className="text-4xl font-black">{user.examAttempts.length}</p>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-4 leading-relaxed">
                 {user.examAttempts.filter((a: any) => a.isPassed).length} Успешных экзамена
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2">
              <MasteryHeatmap topicMastery={topicMastery} />
           </div>
           <div className="lg:col-span-1">
              <RecentHistory attempts={recentAttempts} />
           </div>
        </div>

        <AchievementGrid achievements={achievements} />

        <section className="space-y-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter flex items-center gap-4">
               Мои курсы
               <span className="text-sm px-4 py-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black rounded-full font-black">{myCourses.length}</span>
            </h2>
            <Link href="/pricing" className="text-sm font-black text-orange-600 hover:underline">Все курсы</Link>
          </div>
          
          {myCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course: any) => (
                 <Link href={`/course/${course.slug}`} key={course.id} className="block group">
                    <div className="bg-white dark:bg-zinc-900 border-2 border-transparent hover:border-orange-600 rounded-[40px] p-8 transition-all shadow-sm hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between h-full">
                      <div>
                        <div className="text-6xl mb-8 transform group-hover:scale-115 transition-transform duration-500 drop-shadow-xl">{course.icon || "📚"}</div>
                        <h3 className="font-black text-2xl mb-3 leading-tight tracking-tight group-hover:text-orange-600 transition-colors">{course.title}</h3>
                        <p className="text-sm text-zinc-500 font-bold mb-8 opacity-60 line-clamp-2">{course.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800">
                         <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{course._count.questions} Вопросов</span>
                         <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
                            <ChevronRight className="w-5 h-5" />
                         </div>
                      </div>
                    </div>
                 </Link>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[56px] p-24 text-center">
              <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                 <BookOpen className="w-12 h-12 text-zinc-400" />
              </div>
              <h3 className="text-3xl font-black mb-4">У вас нет активных курсов</h3>
              <p className="text-zinc-500 max-w-sm mx-auto mb-10 text-lg font-bold">Присоединяйтесь к тысячам водителей, готовящихся по самым актуальным материалам.</p>
              <Link href="/pricing" className="inline-flex bg-orange-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-950/20">
                 Выбрать тариф
              </Link>
            </div>
          )}
        </section>

        {!hasFullAccess && (
          <section className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-[64px] p-12 sm:p-24 text-white relative overflow-hidden shadow-3xl shadow-orange-950/20 group">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 blur-[120px] transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000" />
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block px-4 py-1.5 bg-white text-orange-600 text-xs font-black uppercase tracking-widest rounded-full mb-6">
                     Ограниченное предложение!
                  </span>
                  <h2 className="text-5xl sm:text-7xl font-black mb-8 leading-[0.95] tracking-tighter">Все курсы за <br /><span className="text-black/30">199 ₽</span></h2>
                  <p className="text-white/80 font-bold mb-12 text-xl max-w-xl">Получите безлимитный доступ к базе обучения, всем статьям и неограниченным экзаменам навсегда.</p>
                  
                  <Link href="/pricing" className="inline-flex bg-white text-orange-600 px-16 py-6 rounded-3xl font-black text-2xl hover:bg-zinc-100 active:scale-95 transition-all shadow-2xl">
                    Активировать доступ
                  </Link>
                </div>
                
                <div className="hidden md:flex flex-shrink-0 relative">
                  <div className="w-72 h-72 bg-white/10 rounded-[64px] border-4 border-white/20 flex items-center justify-center shadow-3xl backdrop-blur-xl group-hover:rotate-12 transition-transform duration-700">
                     <Crown className="w-40 h-40 text-white drop-shadow-2xl" />
                  </div>
                </div>
             </div>
          </section>
        )}
      </div>
    </div>
  );
}


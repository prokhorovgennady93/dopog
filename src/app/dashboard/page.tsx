import { auth, signOut } from "@/../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Zap, 
  BookOpen, 
  Crown, 
  CheckCircle2, 
  Award, 
  Flame, 
  Target, 
  TrendingUp, 
  ChevronRight, 
  AlertTriangle, 
  ShieldCheck,
  Package,
  Truck,
  ExternalLink,
  CreditCard,
  UserCircle,
  Phone,
  MapPin
} from "lucide-react";
import { db } from "@/lib/db";
import { OverallMasteryGauge, MasteryHeatmap, WeakestThemeCard } from "@/components/dashboard/DashboardCharts";
import { RecentHistory } from "@/components/dashboard/RecentHistory";
import { AchievementGrid, DailyStreakCard } from "@/components/dashboard/Achievements";
import { PushManager } from "@/components/PushManager";
import { SecurityBanner } from "@/components/dashboard/SecurityBanner";
import { OrderPaymentButton } from "@/components/dashboard/OrderPaymentButton";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

function OrderComposition({ courseIds }: { courseIds: string | null }) {
  const kitPrices: Record<string, number> = {
    "base": 5000,
    "tanks": 1500,
    "class1": 1500,
    "class7": 1500
  };
  const courseNames: Record<string, string> = {
    "base": "Базовый курс",
    "tanks": "Цистерны",
    "class1": "Класс 1",
    "class7": "Класс 7"
  };

  try {
    const ids = JSON.parse(courseIds || "[]");
    return (
      <>
        {ids.map((id: string) => (
          <div key={id} className="flex justify-between items-center text-xs">
            <span className="font-bold text-zinc-600 dark:text-zinc-400">{courseNames[id] || id}</span>
            <span className="font-black text-zinc-900 dark:text-white">{kitPrices[id] || 1500} ₽</span>
          </div>
        ))}
        <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <span className="font-bold text-zinc-600 dark:text-zinc-400">Доставка</span>
          <span className="font-black text-zinc-900 dark:text-white">0 ₽</span>
        </div>
      </>
    );
  } catch (e) {
    return <p className="text-xs text-red-500">Ошибка состава заказа</p>;
  }
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

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

  const userOrders = await db.order.findMany({
    where: { 
      userId: session.user.id,
      isSentToDashboard: true
    },
    orderBy: { createdAt: "desc" }
  });

  if (!user) {
    redirect("/login");
  }

  const hasFullAccess = user.hasFullAccess || user.isPremium;
  const purchasedCourseIds = user.purchases.map((p: any) => p.courseId);

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

  const myCourses = hasFullAccess 
    ? allCourses 
    : allCourses.filter(course => purchasedCourseIds.includes(course.id));

  const topicStatsMap = new Map();
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

  user.progress.forEach((p: any) => {
    if (p.isCorrect && p.question?.topicId && topicStatsMap.has(p.question.topicId)) {
      const stats = topicStatsMap.get(p.question.topicId);
      stats.correctAnswers += 1;
    }
  });

  const topicMastery = Array.from(topicStatsMap.values()).map(stats => ({
    ...stats,
    mastery: stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0
  })).sort((a, b) => b.mastery - a.mastery);

  const weakestTheme = topicMastery.length > 0 ? [...topicMastery].sort((a, b) => a.mastery - b.mastery)[0] : null;
  const totalQuestionsPool = myCourses.reduce((sum, c) => sum + (c._count?.questions || 0), 0);
  const totalCorrectAnswers = Array.from(topicStatsMap.values()).reduce((sum, s) => sum + s.correctAnswers, 0);
  const overallMastery = totalQuestionsPool > 0 ? Math.round((totalCorrectAnswers / totalQuestionsPool) * 100) : 0;
  const streak = user.examAttempts.length > 0 ? 3 : 1; 

  const achievements = [
    { id: "1", title: "Первый шаг", description: "Начали изучение первого курса", icon: "Target", isUnlocked: true, unlockedAt: user.createdAt.toISOString() },
    { id: "2", title: "Марафонец", description: "Ударный режим 3+ дня", icon: "Flame", isUnlocked: streak >= 3, unlockedAt: new Date().toISOString() },
    { id: "3", title: "Идеальный экзамен", description: "Сдали тест на 25/25", icon: "Award", isUnlocked: user.examAttempts.some((a: any) => a.score === 100), unlockedAt: undefined },
    { id: "4", title: "Знаток цистерн", description: "Тема 'Цистерны' на 80%+", icon: "Zap", isUnlocked: topicMastery.some((t: any) => t.title.toLowerCase().includes("цистерн") && t.mastery >= 80), unlockedAt: undefined },
  ];

  const recentAttempts = user.examAttempts.map((a: any) => ({
    id: a.id,
    courseTitle: a.course.title,
    score: Math.round((a.score / 100) * 25),
    percentage: a.score,
    isPassed: a.isPassed,
    timeTaken: a.timeTaken,
    startedAt: a.startedAt.toISOString() // Serialize Date
  }));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-white pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        <SecurityBanner hasEmail={!!user.email} />

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-4">
          <div className="space-y-1">
             <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Pro Account</span>
                <span className="text-zinc-400 text-xs font-bold font-mono">ID: {user.id.substring(0, 8).toUpperCase()}</span>
             </div>
             <h1 className="text-3xl sm:text-4xl font-black tracking-tighter leading-none">
               Обучение <span className="text-orange-600">ADR</span> 🚛
             </h1>
             <p className="text-zinc-500 font-bold text-sm">Ваш личный центр управления подготовкой.</p>
          </div>
          <div className="flex items-center gap-3">
             <form action={async () => { "use server"; await signOut(); }}>
               <button className="bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-black px-6 py-3 rounded-2xl transition-all active:scale-95">
                 Выйти
               </button>
             </form>
          </div>
        </header>

        {/* Orders Section - AT THE TOP */}
        {userOrders.length > 0 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
              <Package className="w-5 h-5 text-orange-600" /> Мои заказы документов
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userOrders.map((order: any) => {
                const trackingUrls: Record<string, string> = {
                  "POCHTA": `https://www.pochta.ru/tracking?barcode=${order.trackNumber}`,
                  "CDEK": `https://www.cdek.ru/ru/tracking?order_id=${order.trackNumber}`,
                  "DHL": `https://www.dhl.com/ru-ru/home/tracking.html?tracking_number=${order.trackNumber}`
                };

                return (
                  <div key={order.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm group hover:border-orange-500/30 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                            {order.status === "SENT" ? "В пути" : order.status === "COMPLETED" ? "Получен" : "Оформление"}
                          </span>
                          {!order.isPaid && (
                            <span className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Ожидает оплаты</span>
                          )}
                        </div>
                        <h3 className="text-xl font-black">Комплект документов</h3>
                        <p className="text-[10px] text-zinc-400 font-bold mt-1">Оформлен {format(new Date(order.createdAt), "d MMMM yyyy", { locale: ru })}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black">{order.totalAmount} ₽</p>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">К оплате</p>
                      </div>
                    </div>

                    <div className="mb-6 space-y-2 bg-zinc-50 dark:bg-zinc-800/30 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Состав заказа</p>
                      <OrderComposition courseIds={order.courseIds} />
                    </div>

                    <div className="space-y-3 mb-6">
                       <div className="flex items-center gap-3 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                         <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                           <MapPin className="w-4 h-4" />
                         </div>
                         <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400 leading-snug">
                           {order.address || "С вами свяжется менеджер для уточнения деталей заказа"}
                         </span>
                       </div>
                       
                       {order.trackNumber && (
                         <div className="flex items-center justify-between p-3 rounded-xl bg-orange-600/5 border border-orange-600/10">
                            <div className="flex items-center gap-3">
                              <Truck className="w-4 h-4 text-orange-600" />
                              <div>
                                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest leading-none mb-1">Трек-номер</p>
                                <p className="text-sm font-black">{order.trackNumber}</p>
                              </div>
                            </div>
                            <a 
                              href={trackingUrls[order.deliveryCompany || "POCHTA"]} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-600/20"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                         </div>
                       )}
                    </div>

                    <div className="flex gap-2">
                       {!order.isPaid ? (
                         <OrderPaymentButton orderId={order.id} hasAddress={Boolean(order.address)} />
                       ) : (
                         <div className="flex-1 bg-green-500/10 text-green-600 font-black py-2.5 rounded-xl text-center border border-green-500/20 flex items-center justify-center gap-2">
                           <CheckCircle2 className="w-5 h-5" /> Оплачено
                         </div>
                       )}
                       <a 
                        href="tel:+79934520505" 
                        className="w-11 h-11 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 hover:text-orange-600 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                       >
                         <Phone className="w-4 h-4" />
                       </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <PushManager />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
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
           </div>
           <div className="lg:col-span-1">
              <Link href="/dashboard/profile" className="block group h-full bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:bg-zinc-800 transition-all">
                 <div className="space-y-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                       <UserCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-white">Ваши данные</h3>
                    <p className="text-sm font-bold text-zinc-400 leading-relaxed">
                       Управление профилем, добавление email для безопасности.
                    </p>
                 </div>
                 <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-6">
                    <span className="text-xs font-black uppercase tracking-widest text-orange-500 group-hover:pl-2 transition-all">Перейти к настройкам</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-orange-500 transition-all">
                       <ChevronRight className="w-4 h-4" />
                    </div>
                 </div>
              </Link>
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

        <section className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter flex items-center gap-4">
               Мои курсы
               <span className="text-xs px-3 py-0.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black rounded-full font-black">{myCourses.length}</span>
            </h2>
            <Link href="/pricing" className="text-sm font-black text-orange-600 hover:underline">Все курсы</Link>
          </div>
          
          {myCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course: any) => (
                  <Link href={`/course/${course.slug}`} key={course.id} className="block group">
                    <div className="bg-white dark:bg-zinc-900 border-2 border-transparent hover:border-orange-600 rounded-3xl p-6 transition-all shadow-sm hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between h-full">
                      <div>
                        <div className="text-5xl mb-6 transform group-hover:scale-115 transition-transform duration-500 drop-shadow-xl">{course.icon || "📚"}</div>
                        <h3 className="font-black text-xl mb-2 leading-tight tracking-tight group-hover:text-orange-600 transition-colors">{course.title}</h3>
                        <p className="text-xs text-zinc-500 font-bold mb-6 opacity-60 line-clamp-2">{course.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800">
                         <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{course._count?.questions || 0} Вопросов</span>
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
                     Офлайн-режим и скачивание
                  </span>
                  <h2 className="text-5xl sm:text-7xl font-black mb-8 leading-[0.95] tracking-tighter">Обучение <br /><span className="text-black/30">без интернета</span></h2>
                  <p className="text-white/80 font-bold mb-12 text-xl max-w-xl">Все тесты онлайн доступны бесплатно. Учитесь в дороге, в лесу или за границей без ограничений связи! Скачайте приложение и всю базу курсов навсегда за 199 ₽.</p>
                  
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

import { auth, signOut } from "@/../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Zap, BookOpen, Crown, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db";

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
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  const hasFullAccess = user.hasFullAccess;
  const purchasedCourseIds = user.purchases.map(p => p.courseId);

  // Get all available courses
  const allCourses = await db.course.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      icon: true,
      _count: {
        select: { questions: true }
      }
    }
  });

  const myCourses = hasFullAccess ? allCourses : allCourses.filter(c => purchasedCourseIds.includes(c.id));
  const availableToBuy = hasFullAccess ? [] : allCourses.filter(c => !purchasedCourseIds.includes(c.id));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black mb-1">
              Привет, {user.name || "Студент"}! 👋
            </h1>
            <p className="text-zinc-500 font-medium">Добро пожаловать в личный кабинет.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <form action={async () => { "use server"; await signOut(); }} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold px-6 py-3 rounded-xl transition-colors">
                Выйти
              </button>
            </form>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <StatCard 
            title="Ваш тариф" 
            value={hasFullAccess ? "Полный доступ" : (myCourses.length > 0 ? "Базовый+" : "Демо")} 
            icon={hasFullAccess ? <Crown className="w-6 h-6 text-yellow-500" /> : <Zap className="w-6 h-6 text-blue-500" />}
            accent={hasFullAccess ? "text-yellow-600 dark:text-yellow-500" : "text-blue-600 dark:text-blue-500"}
          />
          <StatCard 
            title="Куплено курсов" 
            value={hasFullAccess ? "Все" : myCourses.length.toString()} 
            icon={<BookOpen className="w-6 h-6 text-green-500" />} 
          />
          <StatCard 
            title="Номер аккаунта" 
            value={"#"+user.id.substring(0,6).toUpperCase()} 
            icon={<CheckCircle2 className="w-6 h-6 text-zinc-400" />} 
          />
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-3">
             Мои курсы
             <span className="text-sm px-3 py-1 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 rounded-full font-bold">{myCourses.length}</span>
          </h2>
          {myCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myCourses.map(course => (
                 <Link href={`/course/${course.slug}`} key={course.id} className="block group">
                    <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-yellow-500 dark:hover:border-yellow-500 rounded-2xl p-6 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
                      <div className="text-4xl mb-4">{course.icon || "📚"}</div>
                      <h3 className="font-bold text-lg mb-2 leading-tight">{course.title}</h3>
                      <p className="text-sm text-zinc-500 font-medium">{course._count.questions} вопросов</p>
                    </div>
                 </Link>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center">
              <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                 <BookOpen className="w-10 h-10 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">У вас пока нет купленных курсов</h3>
              <p className="text-zinc-500 max-w-sm mx-auto mb-8">Пройдите демо-версию или приобретите доступ к курсам прямо сейчас.</p>
            </div>
          )}
        </section>

        {!hasFullAccess && (
          <section className="mt-12 pt-12 border-t border-zinc-200 dark:border-zinc-800">
             <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-500/10 dark:to-orange-500/5 border border-yellow-200 dark:border-yellow-500/20 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="flex-1 text-center md:text-left">
                     <span className="inline-block px-4 py-1.5 bg-yellow-500 text-black text-xs font-black uppercase tracking-widest rounded-full mb-4 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                        Специальное предложение
                     </span>
                     <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">Безлимитный доступ ко всем материалам</h2>
                     <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-6 text-lg max-w-xl">Получите полный доступ ко всем текущим курсам и неограниченную сдачу пробных экзаменов. Подготовиться к ДОПОГ стало еще проще!</p>
                     
                     <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/pricing" className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black font-black px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                          Купить всё за 199 ₽
                        </Link>
                        <span className="text-sm font-bold text-zinc-400 line-through">Вместо 399 ₽</span>
                     </div>
                   </div>
                   
                   {/* Decorative icon / illustration abstract */}
                   <div className="hidden md:flex flex-shrink-0 relative">
                     <div className="absolute inset-0 bg-yellow-400 blur-[80px] opacity-40 mix-blend-multiply"></div>
                     <div className="w-48 h-48 bg-white dark:bg-zinc-900 rounded-full border-4 border-yellow-500 flex items-center justify-center shadow-2xl relative z-10">
                        <Crown className="w-24 h-24 text-yellow-500" />
                     </div>
                   </div>
                </div>
             </div>
          </section>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, accent = "" }: { title: string; value: string; icon: React.ReactNode, accent?: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex items-center gap-5 relative overflow-hidden group">
      <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-950 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
        <p className={`text-2xl font-black ${accent}`}>{value}</p>
      </div>
    </div>
  );
}

import { db } from "@/lib/db";
import { auth } from "@/../auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Play, CheckCircle, Lock, CloudDownload } from "lucide-react";
import { DownloadTopicButton } from "@/components/DownloadTopicButton";
import { DownloadCourseButton } from "@/components/DownloadCourseButton";
import { HelpTooltip } from "@/components/HelpTooltip";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();

  const course = await (db.course as any).findUnique({
    where: { slug },
    include: {
      themes: {
        orderBy: { order: "asc" },
        include: {
          _count: { select: { questions: true } }
        }
      },
      _count: {
        select: { questions: true }
      }
    }
  });

  if (!course) {
    notFound();
  }

  const isLoggedIn = !!session;
  const user = session?.user as any;
  const isFullAccess = user?.hasFullAccess === true;
  const fullAccessExpiry = user?.fullAccessExpiresAt ? new Date(user.fullAccessExpiresAt) : null;
  const isFullAccessActive = isFullAccess && (!fullAccessExpiry || fullAccessExpiry > new Date());
  
  const coursePurchase = user?.purchases?.find((p: any) => p.courseId === course.id);
  const purchaseExpiry = coursePurchase?.expiresAt ? new Date(coursePurchase.expiresAt) : null;
  const isPurchaseActive = !!coursePurchase && (!purchaseExpiry || purchaseExpiry > new Date());

  const hasAccess = isFullAccessActive || isPurchaseActive;

  return (
    <div className="flex-1 bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Course Info */}
          <div className="flex-1">
            <Link 
              href="/" 
              className="text-sm font-medium text-zinc-500 hover:text-yellow-600 dark:hover:text-yellow-500 mb-6 inline-block"
            >
              ← К списку курсов
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
               <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                {course.icon || "📦"}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black">{course.title}</h1>
            </div>

            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              {course.description || "Полный курс подготовки по данной категории ДОПОГ. Изучите все необходимые темы и подготовьтесь к официальному экзамену."}
            </p>

            <div className="space-y-4 mb-12">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-yellow-500" />
                  Темы обучения
                </h2>
                <div className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-8">
                  <HelpTooltip />
                  <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest w-12 sm:w-16 text-center">вопросов</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {(course as any).themes.map((topic: any) => (
                  <div 
                    key={topic.id} 
                    className="flex items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-yellow-500/50 transition-all group lg:pr-8"
                  >
                    <Link 
                      href={`/study/${course.id}?topicId=${topic.id}`}
                      className="flex-1 flex items-center gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-zinc-300 group-hover:text-yellow-500" />
                      <span className="text-sm font-semibold">{topic.title}</span>
                    </Link>
                    
                    <div className="flex items-center gap-6">
                       <DownloadTopicButton 
                         topicId={topic.id} 
                         topicTitle={topic.title} 
                         courseId={course.id}
                         hasAccess={hasAccess} 
                       />
                       <span className="text-xs sm:text-sm font-black text-zinc-600 dark:text-zinc-300 w-12 sm:w-16 pl-2 sm:pl-4 text-center border-l border-zinc-200 dark:border-zinc-800">
                          {topic._count.questions}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="w-full md:w-80 sticky top-24">
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-zinc-200/50 dark:shadow-none">
              <div className="mb-6">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Статус</span>
                <div className="flex items-center gap-2 mt-1">
                  {hasAccess ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">Премиум доступ</span>
                    </>
                  ) : isLoggedIn ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-sm font-medium">Бесплатный режим</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-zinc-400" />
                      <span className="text-sm font-medium">Гостевой доступ</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/study/${course.id}`}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-black dark:text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Начать изучение
                </Link>

                {isLoggedIn && (
                  <>
                    <Link
                      href={`/exam/${course.id}`}
                      className="w-full bg-zinc-900 dark:bg-yellow-500 hover:bg-zinc-800 dark:hover:bg-yellow-400 text-white dark:text-black font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Начать экзамен
                    </Link>
                    
                    <DownloadCourseButton 
                      courseId={course.id}
                      themeIds={(course as any).themes.map((t: any) => t.id)}
                      hasAccess={hasAccess}
                    />
                  </>
                )}
                
                {!isLoggedIn && (
                  <Link
                    href="/register"
                    className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-zinc-900 dark:text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <Lock className="w-4 h-4 opacity-50" />
                    Регистрация
                  </Link>
                )}
              </div>

              <p className="text-[10px] text-zinc-400 mt-6 leading-tight text-center">
                Все вопросы соответствуют актуальной редакции ДОПОГ 2026 года.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

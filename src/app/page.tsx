import { db } from "@/lib/db";
import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { auth } from "@/../auth";

export default async function Home() {
  const session = await auth();
  const courses = await db.course.findMany({
    include: {
      themes: {
        select: { id: true }
      },
      _count: {
        select: { questions: true }
      }
    } as any
  });

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-zinc-950 pt-16 pb-20 sm:py-32 border-b border-zinc-100 dark:border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,179,8,0.05)_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mt-24 sm:mt-0">
            <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 border border-yellow-200 dark:border-yellow-500/20">
              <Sparkles className="w-3 h-3" />
              Обновлено для ДОПОГ 2026
            </div>
            <h1 className="text-3xl sm:text-6xl font-black text-zinc-900 dark:text-white mb-6 leading-tight">
              Сдайте экзамен <span className="text-yellow-600 dark:text-yellow-500">ДОПОГ</span> с первого раза
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 sm:mb-10 leading-relaxed">
              Интерактивные тесты по всем категориям, актуальная база вопросов и детальная статистика подготовки. Начинайте бесплатно прямо сейчас.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8 sm:mt-0 transition-all duration-300">
              <Link
                href={session ? "#courses" : "/register"}
                className="bg-zinc-900 dark:bg-yellow-500 hover:bg-zinc-800 dark:hover:bg-yellow-400 text-white dark:text-black px-8 py-4 rounded-xl font-bold text-lg shadow-xl dark:shadow-yellow-500/20 transition-all active:opacity-60 active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                {session ? "Начать обучение" : "Регистрация"}
                <CheckCircle2 className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="#courses"
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 px-8 py-4 rounded-xl font-bold text-lg transition-all active:opacity-60 active:scale-[0.98] text-center"
              >
                Смотреть курсы
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Catalog */}
      <section id="courses" className="mt-12 sm:mt-0 scroll-mt-20 py-16 sm:py-24 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div className="w-full text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Каталог курсов</h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">Выберите категорию для начала подготовки</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any) => (
              <CourseCard
                key={course.id}
                id={course.id}
                slug={course.slug}
                title={course.title}
                description={course.description}
                icon={course.icon}
                questionCount={course._count.questions}
                hasAccess={
                  session?.user && (
                    (session.user as any).hasFullAccess || 
                    (session.user as any).purchases?.some((p: any) => p.courseId === course.id)
                  )
                }
                themes={course.themes}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema.org Microdata */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="space-y-6">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-lg mb-2">Что такое ДОПОГ (ADR)?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                ДОПОГ — это европейское соглашение о международной дорожной перевозке опасных грузов. Для работы водителем в этой сфере необходимо иметь специальное свидетельство, которое выдается после успешной сдачи экзамена.
              </p>
            </div>
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-lg mb-2">Как проходит подготовка на платформе?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Мы предоставляем актуальную базу вопросов 2026 года, структурированную по темам. Вы можете учиться в режиме «Тренировка» или пройти симуляцию реального экзамена с ограничением по времени и количеству ошибок.
              </p>
            </div>
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-lg mb-2">Можно ли учиться без интернета?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Да! Наша платформа является PWA-приложением. После скачивания курса в личном кабинете или на странице курса, вы сможете проходить тесты полностью офлайн.
              </p>
            </div>
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-lg mb-2">Сколько вопросов в реальном экзамене?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                В базовом курсе обычно 25 вопросов, на которые дается 45 минут. Допускается не более 2 ошибок. Для специализированных курсов (цистерны, 1 класс, 7 класс) количество вопросов — 15.
              </p>
            </div>
          </div>
        </div>

        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Что такое ДОПОГ (ADR)?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ДОПОГ — это европейское соглашение о международной дорожной перевозке опасных грузов. Для работы водителем необходимо специальное свидетельство."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Как проходит подготовка на платформе?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Мы предоставляем актуальную базу вопросов 2026 года, режимы тренировки и симуляции экзамена."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Можно ли учиться без интернета?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Да, наше приложение поддерживает офлайн-режим через PWA."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Сколько вопросов в реальном экзамене?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "В базовом курсе 25 вопросов, для спецкурсов — 15 вопросов."
                  }
                }
              ]
            })
          }}
        />
      </section>
    </div>
  );
}

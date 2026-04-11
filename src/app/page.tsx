import { db } from "@/lib/db";
import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Zap,
  WifiOff,
  MessageSquare,
  Settings,
  Target,
  Award,
  ChevronDown,
  Download
} from "lucide-react";
import { auth } from "@/../auth";
import { PricingCards } from "@/components/pricing/PricingCards";
import { DocumentKitSection } from "@/components/pricing/DocumentKitSection";
import { BenefitsCarousel } from "@/components/landing/BenefitsCarousel";
import { PromoSection } from "@/components/landing/PromoSection";

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
      <section className="relative overflow-hidden bg-white dark:bg-zinc-950 pt-2 pb-8 sm:pt-12 sm:pb-24 border-b-0 sm:border-b border-zinc-100 dark:border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,179,8,0.05)_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mt-6 sm:mt-0">
            <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 border border-yellow-200 dark:border-yellow-500/20">
              <Sparkles className="w-3 h-3" />
              АКТУАЛЬНЫЕ ВОПРОСЫ 2026 г.
            </div>
            <h1 className="text-3xl sm:text-6xl font-black text-zinc-900 dark:text-white mb-6 sm:mb-8 leading-tight">
              Сдайте экзамен <span className="text-yellow-600 dark:text-yellow-500">ДОПОГ</span> с первого раза
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg font-medium mb-4 sm:mb-6 max-w-2xl px-4 sm:px-0 mx-auto opacity-90 leading-relaxed">
              Платформа для подготовки водителей и консультантов по перевозке опасных грузов. Интерактивные тесты с ответами и комментариями. Начните бесплатно прямо сейчас.
            </p>

            {/* Hero Trust Badges */}
            <div className="mt-6 mb-10 pt-6 border-t border-zinc-100 dark:border-zinc-900/50 w-full max-w-4xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <div className="text-left font-bold text-[11px] sm:text-xs text-zinc-900 dark:text-white leading-tight">
                    Аккредитация Ространснадзора
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <WifiOff className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <div className="text-left font-bold text-[11px] sm:text-xs text-zinc-900 dark:text-white leading-tight">
                    Можно заниматься без интернета
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <div className="text-left font-bold text-[11px] sm:text-xs text-zinc-900 dark:text-white leading-tight">
                    Ответы и комментарии на все вопросы
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Settings className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <div className="text-left font-bold text-[11px] sm:text-xs text-zinc-900 dark:text-white leading-tight">
                    Продуманная механика работы с тестами
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2 transition-all duration-300">
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

      {/* Promo Section */}
      <PromoSection />

      {/* Benefits Section */}
      <section className="pt-16 pb-0 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">6 причин учиться с нами</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Современный подход к обучению водителей и консультантов на ДОПОГ</p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard icon={<ShieldCheck />} title="Актуальные вопросы 2026" text="Тесты полностью соответствуют последней версии Ространснадзора." />
            <BenefitCard icon={<WifiOff />} title="OFFLINE версия" text="Скачайте PWA-приложение и занимайтесь без интернета в удобное для вас время." />
            <BenefitCard icon={<MessageSquare />} title="Разъяснения к тестам" text="Подробные комментарии к каждому вопросу помогут понять, а не просто запомнить ответ." />
            <BenefitCard icon={<Settings />} title="Комфорт обучения" text="Продуманная и удобная механика прохождения тестов и экзаменов ДОПОГ." />
            <BenefitCard icon={<Target />} title="Эффективность" text="98% клиентов сдают экзамен и получают ДОПОГ с 1 раза." />
            <BenefitCard icon={<Award />} title="Лицензия" text="Лицензия ЛО35-01276-61/02274118 от 05.05.2025г. и аккредитация в Ространснадзоре." />
          </div>

          {/* Mobile Carousel */}
          <BenefitsCarousel />
        </div>
      </section>

      {/* Courses Catalog */}
      <section id="courses" className="pt-8 sm:pt-12 scroll-mt-20 pb-16 sm:pb-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div className="w-full text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Каталог курсов</h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium">Выберите категорию для начала подготовки</p>
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

      {/* Pricing Section */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">Выберите ваш доступ</h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-bold">Начните бесплатно и переходите на премиум, когда будете готовы</p>
          </div>

          <PricingCards />
          <DocumentKitSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-12 tracking-tight">Часто задаваемые вопросы</h2>
          <div className="space-y-6">
            <FAQItem question="Что такое ДОПОГ (ADR)?" answer="ДОПОГ — это европейское соглашение о международной дорожной перевозке опасных грузов. Для работы водителем в этой сфере необходимо иметь специальное свидетельство, которое выдается после успешной сдачи экзамена." />
            <FAQItem question="Как проходит подготовка на платформе?" answer="Мы предоставляем актуальную базу вопросов 2026 года, структурированную по темам. Вы можете учиться в режиме «Тренировка» или пройти симуляцию реального экзамена." />
            <FAQItem question="Можно ли учиться без интернета?" answer="Да! Наша платформа является PWA-приложением. После скачивания курса вы сможете проходить тесты полностью офлайн." />
            <FAQItem question="Сколько вопросов в реальном экзамене?" answer="В базовом курсе обычно 25 вопросов, на которые дается 45 минут. Допускается не более 2 ошибок. Для специализированных курсов (цистерны, 1 класс, 7 класс) количество вопросов — 15." />
          </div>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-yellow-500/50 transition-all group shadow-sm">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-orange-600 dark:text-orange-500">
          {icon}
        </div>
        <h3 className="text-lg font-bold leading-tight">{title}</h3>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{text}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
      <h3 className="font-bold text-lg mb-2">{question}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{answer}</p>
    </div>
  );
}



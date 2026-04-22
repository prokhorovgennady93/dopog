import { db } from "@/lib/db";
import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import Image from "next/image";
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
      <section className="relative overflow-hidden bg-white dark:bg-zinc-950 pt-10 pb-8 sm:pt-12 sm:pb-24 border-b-0 sm:border-b border-zinc-100 dark:border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,179,8,0.05)_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mt-6 sm:mt-0">
            <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 border border-yellow-200 dark:border-yellow-500/20">
              <Sparkles className="w-3 h-3" />
              АКТУАЛЬНЫЕ ВОПРОСЫ 2026 г.
            </div>
            <h1 className="text-3xl sm:text-6xl font-black text-zinc-900 dark:text-white mb-6 sm:mb-8 leading-tight">
              Сдайте экзамен <span className="text-brand-gradient drop-shadow-sm">ДОПОГ</span> с первого раза
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl font-medium mb-4 sm:mb-6 max-w-2xl px-4 sm:px-0 mx-auto opacity-90 leading-relaxed">
              Платформа для подготовки водителей и консультантов по перевозке опасных грузов.
            </p>

            {/* Hero Trust Badges */}
            <div className="mt-6 mb-10 pt-6 border-t border-zinc-100 dark:border-zinc-900/50 w-full max-w-4xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                    <Image src="/images/benefits/benefit-shield.png" alt="Аккредитация" fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="text-left font-bold text-[11px] sm:text-xs text-zinc-900 dark:text-white leading-tight">
                    Аккредитация Ространснадзора
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                    <Image src="/images/benefits/benefit-offline.png" alt="Без интернета" fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="text-left font-bold text-[11px] sm:text-xs text-zinc-900 dark:text-white leading-tight">
                    Можно заниматься без интернета
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                    <Image src="/images/benefits/benefit-message.png" alt="Ответы на вопросы" fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="text-left font-bold text-[11px] sm:text-xs text-zinc-900 dark:text-white leading-tight">
                    Ответы и комментарии на все вопросы
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                    <Image src="/images/benefits/benefit-settings.png" alt="Механика тестов" fill sizes="40px" className="object-cover" />
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
                className="bg-brand-gradient text-white border-none px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/20 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
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


      {/* Benefits Section */}
      <section className="pt-16 pb-0 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">6 причин учиться с нами</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Современный подход к обучению водителей и консультантов на ДОПОГ</p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard icon="benefit-shield" title="Актуальные вопросы 2026" text="Тесты полностью соответствуют последней версии Ространснадзора." />
            <BenefitCard icon="benefit-offline" title="OFFLINE версия" text="Скачайте PWA-приложение и занимайтесь без интернета в удобное для вас время." />
            <BenefitCard icon="benefit-message" title="Разъяснения к тестам" text="Подробные комментарии к каждому вопросу помогут понять, а не просто запомнить ответ." />
            <BenefitCard icon="benefit-settings" title="Комфорт обучения" text="Продуманная и удобная механика прохождения тестов и экзаменов ДОПОГ." />
            <BenefitCard icon="benefit-target" title="Эффективность" text="98% клиентов сдают экзамен и получают ДОПОГ с 1 раза." />
            <BenefitCard icon="benefit-award" title="Лицензия" text="Лицензия ЛО35-01276-61/02274118 от 05.05.2025 г. и аккредитация Ространснадзора." />
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
            <FAQItem question="Что такое ДОПОГ (ADR)?" answer="ДОПОГ — это европейское соглашение о международной дорожной перевозке опасных грузов. Для перевозки опасных грузов водитель должен иметь специальное свидетельство, которое выдается после успешной сдачи экзамена." />
            <FAQItem question="Как проходит подготовка на платформе?" answer="Мы предоставляем актуальные тесты 2026 года, с ответами и комментариями. Все вопросы структурированы по темам, что позволяет организовать удобную механику обучения. Вы можете учиться в режиме «Тренировка» или пройти симуляцию реального экзамена." />
            <FAQItem question="Можно ли учиться без интернета?" answer="Да! Наша платформа является PWA-приложением. В отличии от всех обычных сайтов и платформ, после скачивания курса вы сможете проходить тесты полностью офлайн." />
            <FAQItem question="Сколько вопросов на реальном экзамене по ДОПОГ?" answer="Если вы в первый раз получаете свидетельство ДОПОГ, то в Базовом курсе будет 25 вопросов, на которые дается 45 минут. Допускается совершить не более 6 ошибок. Для специализированных курсов (цистерны, 1 класс, 7 класс) количество вопросов — 15 и допускается не более 3 ошибок." />
            <FAQItem question="Сколько времени действует ДОПОГ?" answer="Свидетельство действует 5 лет с даты сдачи экзамена по соответствующему курсу подготовки. По окончании этого срока необходимо пройти переподготовку и повторно сдать экзамен." />
          </div>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-orange-500/50 transition-all group shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1">
      <div className="flex items-center gap-4 mb-3">
        <div className="relative w-12 h-12 bg-orange-100 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner overflow-hidden border border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
          <Image src={`/images/benefits/${icon}.png`} alt={title} fill sizes="48px" className="object-cover" />
        </div>
        <h3 className="text-lg font-bold leading-tight group-hover:text-brand-gradient transition-colors">{title}</h3>
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



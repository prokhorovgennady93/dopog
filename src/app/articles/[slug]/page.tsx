import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, Shield, Zap, Info, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

// Simple content map for SEO articles
const ARTICLE_CONTENT: Record<string, any> = {
  "chto-takoe-dopog": {
    title: "Что такое ДОПОГ и кому он нужен?",
    description: "Полное руководство по международному соглашению о перевозке опасных грузов (ADR).",
    tag: "Основы",
    date: "24 марта 2026",
    content: (
      <>
        <h2 className="text-2xl font-black mb-6">Определение и цели соглашения</h2>
        <p className="mb-6 leading-relaxed">
            <strong>ДОПОГ (ADR)</strong> — это «Дорожная перевозка опасных грузов», европейское соглашение о международной дорожной перевозке опасных грузов. Оно было принято в Женеве в 1957 году и с тех пор регулярно обновляется (текущая актуальная версия — 2026 год).
        </p>
        <p className="mb-8">
            Основная цель ДОПОГ — повышение безопасности международных дорожных перевозок и защита окружающей среды. Соглашение унифицирует требования к упаковке, маркировке грузов и конструкции транспортных средств.
        </p>

        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 mb-10">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" /> Основные требования
            </h3>
            <ul className="space-y-4 font-medium text-zinc-600 dark:text-zinc-400">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Наличие специального свидетельства у водителя.</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Соответствие транспортного средства техническим нормам.</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Правильная маркировка (таблички оранжевого цвета, знаки опасности).</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Наличие комплекта дополнительного оборудования (ADR-комплект).</li>
            </ul>
        </div>

        <h2 className="text-2xl font-black mb-6">Кому необходимо обучение?</h2>
        <p className="mb-6">
            Обучение и получение свидетельства ДОПОГ обязательно для всех водителей, планирующих перевозить грузы, признанные опасными согласно классификации ООН. Сюда входят горючие жидкости, газы, взрывчатые и токсичные вещества.
        </p>
      </>
    )
  },
  "klassy-opasnykh-gruzov-2026": {
    title: "Классы опасных грузов 2026: полная таблица",
    description: "Подробный разбор 9 классов опасности ADR для водителей.",
    tag: "Маркировка",
    date: "25 марта 2026",
    content: (
      <>
        <h2 className="text-2xl font-black mb-6">Девять классов опасности</h2>
        <p className="mb-8 font-medium italic text-zinc-500">
            В 2026 году классификация остается стабильной, однако требования к упаковке литиевых батарей и некоторых химикатов были ужесточены.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
                { n: "1", t: "Взрывчатые вещества" },
                { n: "2", t: "Газы (сжатые, сжиженные)" },
                { n: "3", t: "Легковоспламеняющиеся жидкости" },
                { n: "4", t: "Легковоспламеняющиеся твердые вещества" },
                { n: "5", t: "Окисляющие вещества" },
                { n: "6", t: "Токсичные и инфекционные вещества" },
                { n: "7", t: "Радиоактивные материалы" },
                { n: "8", t: "Коррозионные вещества" },
                { n: "9", t: "Прочие опасные вещества" }
            ].map(cls => (
                <div key={cls.n} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-600/10 text-orange-600 rounded-xl flex items-center justify-center font-black">
                        {cls.n}
                    </div>
                    <span className="font-bold text-sm">{cls.t}</span>
                </div>
            ))}
        </div>

        <h2 className="text-2xl font-black mb-6">Зачем знать классы опасности?</h2>
        <p>
            Знание класса груза позволяет водителю правильно выбрать маршрут (учитывая ограничения тоннелей категорий B, C, D, E), применить верную систему тушения пожара и обеспечить личную безопасность в случае аварии.
        </p>
      </>
    )
  },
  "kak-poluchit-svidetelstvo-adr": {
    title: "Как получить свидетельство водителя ADR",
    description: "Процедура получения удостоверения ДОПОГ в 2026 году.",
    tag: "Обучение",
    date: "26 марта 2026",
    content: (
      <>
        <h2 className="text-2xl font-black mb-6">Пошаговый алгоритм</h2>
        <div className="space-y-8 mb-10">
            <div className="relative pl-8 border-l-2 border-zinc-100 dark:border-zinc-800">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-yellow-500 border-4 border-white dark:border-zinc-950" />
                <h4 className="font-black mb-2 uppercase tracking-wide text-zinc-900 dark:text-white">Шаг 1: Обучение</h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">Запишитесь в сертифицированный учебный центр. Минимальный стаж вождения категории C/CE — 3 года.</p>
            </div>
            <div className="relative pl-8 border-l-2 border-zinc-100 dark:border-zinc-800">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-yellow-500 border-4 border-white dark:border-zinc-950" />
                <h4 className="font-black mb-2 uppercase tracking-wide text-zinc-900 dark:text-white">Шаг 2: Тестирование</h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">Пройдите внутренний экзамен. Используйте наш онлайн-тренажер для симуляции реальных билетов.</p>
            </div>
            <div className="relative pl-8 border-l-2 border-zinc-100 dark:border-zinc-800">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-yellow-500 border-4 border-white dark:border-zinc-950" />
                <h4 className="font-black mb-2 uppercase tracking-wide text-zinc-900 dark:text-white">Шаг 3: ГИБДД</h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">Сдайте итоговый тест в государственном органе. Свидетельство выдается сроком на 5 лет.</p>
            </div>
        </div>
      </>
    )
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLE_CONTENT[slug];
  if (!article) return {};
  return {
    title: `${article.title} — ДОПОГ База знаний`,
    description: article.description,
  };
}

export default async function ArticleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLE_CONTENT[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12 sm:py-20 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto">
        {/* Navigation / Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-bold animate-in fade-in duration-700">
            <Link href="/articles" className="flex items-center gap-2 text-zinc-400 hover:text-orange-600 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Статьи
            </Link>
            <span className="text-zinc-200">/</span>
            <span className="text-orange-600 uppercase tracking-widest text-[10px]">{article.tag}</span>
        </div>

        {/* Hero Section */}
        <header className="mb-12 animate-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl sm:text-5xl font-black mb-8 tracking-tight leading-tight">
                {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                    <Clock className="w-4 h-4" />
                    <span>~7 мин чтения</span>
                </div>
                <button className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white ml-auto transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Поделиться</span>
                </button>
            </div>
        </header>

        {/* Main Content Area */}
        <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none prose-headings:font-black prose-strong:text-zinc-900 dark:prose-strong:text-white prose-a:text-orange-600 animate-in fade-in duration-1000 delay-300">
            {article.content}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 p-8 sm:p-10 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                    <GraduationCap className="w-7 h-7 text-black" />
                </div>
                <div>
                    <h4 className="font-black text-lg">Нужно сдать экзамен?</h4>
                    <p className="text-sm text-zinc-500 font-medium">Бесплатный демо-режим тренировки ДОПОГ.</p>
                </div>
            </div>
            <Link 
              href="/register" 
              className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-black rounded-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto text-center"
            >
              Начать тест
            </Link>
        </div>
      </article>
    </div>
  );
}

// Simple placeholder icon mapping
function GraduationCap(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5L2 10Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

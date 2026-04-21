import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Shield, Zap, Info, FileText, LayoutList } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "База знаний ДОПОГ 2026 — Статьи, правила, подготовка",
  description: "Полезные материалы для водителей и консультантов по опасным грузам. Все о правилах ДОПОГ (ADR) в 2026 году.",
};

const ARTICLES = [
  {
    slug: "changes-2026",
    title: "Обзор изменений ДОПОГ 2026",
    excerpt: "Самый полный гайд по актуальным изменениям в правилах перевозки опасных грузов на 2025-2026 годы.",
    tag: "Аналитика",
    readTime: "15 мин",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
  },
  {
    slug: "how-to-pass",
    title: "Как сдать экзамен с первого раза",
    excerpt: "Практические советы и стратегия подготовки к тестированию в Ространснадзоре.",
    tag: "Обучение",
    readTime: "10 мин",
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
  },
  {
    slug: "materials",
    title: "Полезные материалы и документы",
    excerpt: "Ссылки на официальные издания ООН (Том 1 и 2), таблицы ООН и справочники.",
    tag: "Документы",
    readTime: "5 мин",
    icon: <FileText className="w-5 h-5" />,
    color: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
  },
  {
    slug: "kak-proverit-svidetelstvo",
    title: "Как проверить ДОПОГ на подлинность",
    excerpt: "Пошаговая инструкция по проверке свидетельства на официальном сайте Росавтотранса.",
    tag: "Проверка",
    readTime: "5 мин",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
  },
  {
    slug: "ekzamen-dopog",
    title: "Квалификационный экзамен на ДОПОГ",
    excerpt: "Регламент экзамена, количество попыток, время на прохождение и допустимые ошибки.",
    tag: "Экзамен",
    readTime: "6 мин",
    icon: <LayoutList className="w-5 h-5" />,
    color: "bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400"
  },
  {
    slug: "pravila-perevozki",
    title: "Общие правила перевозки",
    excerpt: "Фундаментальные требования к упаковке, совместной погрузке и обработке грузов.",
    tag: "Правила",
    readTime: "20 мин",
    icon: <LayoutList className="w-5 h-5" />,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
  },
  {
    slug: "svidetelstvo-voditelya",
    title: "Свидетельство водителя ДОПОГ",
    excerpt: "Требования к водителям, категории курсов (базовый, спецкурсы) и продление.",
    tag: "Квалификация",
    readTime: "8 мин",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
  },
  {
    slug: "specrazreshenie",
    title: "Спецразрешение на перевозку",
    excerpt: "Когда оно необходимо, как получить и какие грузы считаются грузами повышенной опасности.",
    tag: "Закон",
    readTime: "7 мин",
    icon: <Info className="w-5 h-5" />,
    color: "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
  },
  {
    slug: "svidetelstvo-konsultanta",
    title: "Консультант по безопасности",
    excerpt: "Роль консультанта в транспортной компании, его обязанности и процесс аттестации.",
    tag: "Профи",
    readTime: "9 мин",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
  }
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-20 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6 font-bold text-xs uppercase tracking-widest text-zinc-500">
            <BookOpen className="w-4 h-4 text-orange-600" />
            База знаний ДОПОГ
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
            Полезные статьи и <span className="text-orange-600">Обучение</span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Мы собрали все необходимые материалы в одном месте, чтобы ваша подготовка к экзамену была максимально эффективной.
          </p>
        </header>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {ARTICLES.map((article) => (
            <Link 
                key={article.slug} 
                href={`/articles/${article.slug}`}
                className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-600/50 hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-500"
            >
              <div className="p-8 flex-1">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${article.color}`}>
                  {article.icon}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg">
                    {article.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> {article.readTime}
                  </div>
                </div>

                <h2 className="text-xl font-black mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                  {article.excerpt}
                </p>
              </div>
              
              <div className="px-8 pb-8">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600 group-hover:gap-4 transition-all">
                   Подробнее <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-[2.5rem] bg-zinc-900 text-white relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 animate-in fade-in duration-1000 delay-500 shadow-2xl">
            <div className="relative z-10 max-w-md">
                <h3 className="text-3xl font-black mb-4 tracking-tighter">Готовы к тесту?</h3>
                <p className="text-zinc-400 font-bold opacity-80">Переходите в тренажер экзамена ДОПОГ 2026 и проверьте свои знания.</p>
            </div>
            <Link 
              href="/#courses" 
              className="relative z-10 px-10 py-5 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 active:scale-95 transition-all shadow-xl shadow-yellow-500/20 whitespace-nowrap"
            >
              Начать обучение
            </Link>
        </div>
      </div>
    </div>
  );
}

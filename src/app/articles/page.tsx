import Link from "next/link";
import { BookOpen, GraduationCap, ArrowRight, ChevronRight, Bookmark, ShieldCheck, Truck, FileText, Award } from "lucide-react";
import Image from "next/image";

const articles = [
  {
    id: "changes-2026",
    title: "ДОПОГ 2026: Главные изменения в правилах",
    description: "Разбор актуального соглашения 2025/2026. Литиевые батареи, цифровизация документов и новые требования к безопасности.",
    icon: <Bookmark className="w-6 h-6 text-orange-600" />,
    date: "28 марта 2026",
    readTime: "15 мин",
    tag: "Тренды 2026"
  },
  {
    id: "markirovka-og",
    title: "Маркировка ОГ: Ромбы и Оранжевые плиты",
    description: "Полный гид по знакам опасности и информационным таблицам согласно ГОСТ Р 57479. Схемы размещения на ТС.",
    icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
    date: "28 марта 2026",
    readTime: "10 мин",
    tag: "Маркировка"
  },
  {
    id: "how-to-pass",
    title: "Как сдать экзамен и получить свидетельство",
    description: "Стратегия подготовки в Ространснадзоре. Разбор сложных вопросов, ловушек и психологическая подготовка.",
    icon: <GraduationCap className="w-6 h-6 text-orange-600" />,
    date: "27 марта 2026",
    readTime: "12 мин",
    tag: "Экзамен"
  },
  {
    id: "pravila-perevozki",
    title: "Правила перевозки: Постановление №2200",
    description: "Разбор законодательной базы РФ. Электронные накладные, обязанности экипажа и требования к оборудованию.",
    icon: <Truck className="w-6 h-6 text-orange-600" />,
    date: "28 марта 2026",
    readTime: "12 мин",
    tag: "Законы РФ"
  },
  {
    id: "svidetelstvo-voditelya",
    title: "Свидетельство водителя: Базовый и спецкурсы",
    description: "Различия между Базовым курсом, Цистернами и спецкурсами 1 и 7 классов. Сроки действия и продление.",
    icon: <Award className="w-6 h-6 text-orange-600" />,
    date: "28 марта 2026",
    readTime: "14 мин",
    tag: "Сертификация"
  },
  {
    id: "specrazreshenie",
    title: "Спецразрешение на грузы повышенной опасности",
    description: "Порядок оформления через Госуслуги. Когда оно нужно и какие штрафы за отсутствие документа.",
    icon: <FileText className="w-6 h-6 text-orange-600" />,
    date: "28 марта 2026",
    readTime: "11 мин",
    tag: "Допуски"
  },
  {
    id: "svidetelstvo-konsultanta",
    title: "Консультант по безопасности: Роль и экзамен",
    description: "Обязанности по разделу 1.8.3 ДОПОГ. Как стать экспертом по безопасности опасных грузов.",
    icon: <BookOpen className="w-6 h-6 text-orange-600" />,
    date: "28 марта 2026",
    readTime: "12 мин",
    tag: "Карьера"
  },
  {
    id: "materials",
    title: "Библиотека материалов и томов ДОПОГ",
    description: "Прямые ссылки на официальные издания ООН 2025/2026. Учебники, справочники и методические пособия.",
    icon: <BookOpen className="w-6 h-6 text-orange-600" />,
    date: "26 марта 2026",
    readTime: "5 мин",
    tag: "Ресурсы"
  }
];

export default function ArticlesPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {/* Header section with glassmorphism */}
      <header className="relative bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-20 sm:py-32 overflow-hidden">
        <Image 
          src="/images/articles/hero.png" 
          alt="ДОПОГ Библиотека" 
          fill 
          className="object-cover opacity-10 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,88,12,0.08)_0%,transparent_50% )]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-zinc-400 hover:text-orange-600 transition-colors mb-8 group">
             <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
             На главную
          </Link>
          <h1 className="text-5xl sm:text-8xl font-black mb-6 tracking-tighter leading-none">
            База знаний <span className="text-orange-600">ДОПОГ</span>
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed font-bold">
            Профессиональная библиотека для водителей и экспертов. Исчерпывающая база знаний по правилам перевозки опасных грузов.
          </p>
        </div>
      </header>

      {/* Grid section for cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.id}`}
              className="group bg-white dark:bg-zinc-900 border-2 border-transparent hover:border-orange-600 hover:scale-[1.02] rounded-[48px] p-10 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-orange-950/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center group-hover:bg-orange-600/10 transition-all duration-500">
                    {article.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-full">
                    {article.tag}
                  </span>
                </div>
                
                <h2 className="text-3xl font-black mb-4 leading-[1.05] group-hover:text-orange-600 transition-colors tracking-tight">
                  {article.title}
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-10 line-clamp-3 font-bold group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                  {article.description}
                </p>
              </div>

              <div className="pt-8 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Время на чтение</span>
                   <span className="text-sm font-black text-zinc-900 dark:text-white">{article.readTime}</span>
                </div>
                <div className="w-14 h-14 rounded-3xl bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                  <ChevronRight className="w-6 h-6 flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Learning - Premium Banner */}
        <section className="mt-32 bg-orange-600 rounded-[56px] p-12 sm:p-24 overflow-hidden relative group shadow-3xl shadow-orange-950/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 blur-[100px] transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl sm:text-7xl font-black text-white mb-6 leading-none tracking-tighter">Начните подготовку <br />по актуальным билетам</h2>
            <p className="text-white/80 text-xl font-bold mb-12 max-w-xl mx-auto">
               Теория становится сильнее только с практикой. Переходите к тренажеру экзамена ДОПОГ прямо сейчас.
            </p>
            <Link 
              href="/#courses" 
              className="bg-white hover:bg-zinc-100 text-orange-600 px-16 py-6 rounded-3xl font-black text-xl transition-all active:scale-95 shadow-2xl shadow-orange-950/20"
            >
              Открыть каталог курсов
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

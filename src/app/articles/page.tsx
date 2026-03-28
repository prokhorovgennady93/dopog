import Link from "next/link";
import { BookOpen, GraduationCap, FileText, ArrowRight, ChevronRight, Bookmark } from "lucide-react";

const articles = [
  {
    id: "changes-2026",
    title: "ДОПОГ 2026: Главные изменения в правилах",
    description: "Разбираем актуальные требования к перевозке опасных грузов, обновленные классификации и новые правила маркировки.",
    icon: <Bookmark className="w-6 h-6 text-yellow-500" />,
    date: "28 марта 2026",
    readTime: "8 мин",
    tag: "Правила"
  },
  {
    id: "how-to-pass",
    title: "Как сдать экзамен ДОПОГ с первого раза",
    description: "Секреты успешной подготовки, разбор самых сложных вопросов и психологические советы для водителей.",
    icon: <GraduationCap className="w-6 h-6 text-yellow-500" />,
    date: "27 марта 2026",
    readTime: "6 мин",
    tag: "Обучение"
  },
  {
    id: "materials",
    title: "Полезные материалы и официальные учебники",
    description: "Список рекомендованной литературы, ссылки на официальные тома ДОПОГ от ООН и методические пособия.",
    icon: <BookOpen className="w-6 h-6 text-yellow-500" />,
    date: "26 марта 2026",
    readTime: "5 мин",
    tag: "Справочник"
  }
];

export default function ArticlesPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {/* Header section with glassmorphism */}
      <header className="relative bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,8,0.05)_0%,transparent_50% )]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-yellow-600 transition-colors mb-8 group">
             <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
             На главную
          </Link>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
            База знаний <span className="text-yellow-500">ДОПОГ</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed font-medium">
            Актуальные статьи, разбор изменений в законодательстве и советы экспертов по подготовке к экзаменам.
          </p>
        </div>
      </header>

      {/* Grid section for cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.id}`}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 hover:border-yellow-500 dark:hover:border-yellow-500 transition-all shadow-sm hover:shadow-2xl hover:shadow-yellow-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-yellow-500/10 transition-all duration-300">
                    {article.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                    {article.tag}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 leading-snug group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                  {article.title}
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                  {article.description}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="text-[10px] font-bold text-zinc-400">
                      {article.date} • {article.readTime}
                   </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <ChevronRight className="w-5 h-5 flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Learning */}
        <section className="mt-20 bg-zinc-900 dark:bg-white rounded-3xl p-8 sm:p-12 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-white dark:text-black mb-2">Хватит теории?</h2>
              <p className="text-zinc-400 dark:text-zinc-600 font-medium">Пора проверить знания на реальных тестах ДОПОГ.</p>
            </div>
            <Link 
              href="/#courses" 
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black transition-all active:scale-95 shadow-xl shadow-yellow-500/20 whitespace-nowrap"
            >
              Перейти в каталог
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

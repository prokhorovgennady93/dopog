import Link from "next/link";
import { ArrowLeft, BookOpen, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Changes2026Page() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-20 font-sans">
      <article className="max-w-4xl mx-auto px-4">
        {/* Navigation Header */}
        <header className="mb-12">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-yellow-600 transition-colors mb-8 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
             Назад к статьям
          </Link>
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-yellow-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Обновлено в 2026</span>
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">8 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
            ДОПОГ 2026: Главные изменения в правилах перевозки опасных грузов
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
             Разбираемся, какие нововведения вступили в силу, как изменились требования к маркировке и на что инспекторы ГИБДД обращают внимание в первую очередь в 2026 году.
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
           <section>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-4">
                 <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-black shrink-0 shadow-lg shadow-yellow-500/20">
                    <BookOpen className="w-5 h-5" />
                 </div>
                 Актуальная редакция и переходный период
              </h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                 Хотя основные положения ДОПОГ обновляются каждые два года (последняя крупная редакция 2025 года), в 2026 году завершается переходный период для многих важных поправок. Редакция 2026 года фокусируется на цифровизации транспортных документов и ужесточении требований к перевозке литиевых батарей — самого динамичного сегмента рынка опасных грузов.
              </p>
           </section>

           <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 mb-12">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                 <AlertTriangle className="w-6 h-6 text-red-500" />
                 Ключевые пункты обновлений 2025-2026
              </h3>
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400 font-medium">
                 <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0" />
                    <span><b>Цифровые транспортные накладные:</b> В 2026 году в ряде регионов использование электронных документов для перевозки ОГ становится приоритетным.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0" />
                    <span><b>Литиевые батареи (Класс 9):</b> Введены новые категории для поврежденных или дефектных батарей, требующие специальной сертифицированной тары.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0" />
                    <span><b>Экологические стандарты:</b> Расширен список веществ, представляющих опасность для водной среды, с новыми требованиями к маркировке «Рыба и Дерево».</span>
                 </li>
              </ul>
           </div>

           <section>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mb-6">
                 Маркировка и знаки опасности
              </h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium mb-6">
                 В 2026 году особое внимание уделяется качеству знаков опасности. Использование выцветших или поврежденных наклеек теперь приравнивается к их отсутствию. Знак должен сохранять читаемость после 3-месячного пребывания в морской воде — это золотой стандарт ДОПОГ.
              </p>
              <div className="aspect-video bg-zinc-900 rounded-3xl flex items-center justify-center p-8 relative overflow-hidden">
                 <div className="absolute inset-0 bg-yellow-500/5 backdrop-blur-3xl" />
                 <div className="text-center relative z-10">
                    <ShieldCheck className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <p className="text-white text-xl font-bold">Проверьте знаки перед выездом!</p>
                 </div>
              </div>
           </section>

           <section className="bg-yellow-500 rounded-3xl p-8 sm:p-12 text-black mt-12">
              <h2 className="text-3xl font-black mb-4 tracking-tight">Готовы к экзамену?</h2>
              <p className="text-lg mb-8 font-bold opacity-80">
                 Все изменения 2026 года уже включены в наши экзаменационные билеты. Начните подготовку сейчас, чтобы сдать с первого раза!
              </p>
              <Link 
                href="/#courses" 
                className="inline-flex bg-black text-white px-8 py-4 rounded-2xl font-black hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-yellow-900/10"
              >
                Начать обучение
              </Link>
           </section>
        </div>
      </article>

      {/* Footer / Sidebar mini */}
      <footer className="max-w-4xl mx-auto px-4 mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-400">
         <p>© 2026 ДОПОГ Экзамен</p>
         <div className="flex gap-6">
            <Link href="/articles" className="hover:text-yellow-600 transition-colors">Другие статьи</Link>
            <Link href="/" className="hover:text-yellow-600 transition-colors">Главная</Link>
         </div>
      </footer>
    </div>
  );
}

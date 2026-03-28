import Link from "next/link";
import { ArrowLeft, GraduationCap, CheckCircle, Target, BrainCircuit } from "lucide-react";

const tips = [
  {
    title: "Изучите структуру билетов",
    description: "Экзамен состоит из базового курса и спецкурсов. Поймите, сколько вопросов в каждом и какой процент ошибок допустим (обычно не более 10%).",
    icon: <Target className="w-5 h-5 text-yellow-500" />
  },
  {
    title: "Метод регулярной практики",
    description: "Проходите по 2-3 теста каждый день, а не 50 за раз. Мозг лучше усваивает информацию порционно.",
    icon: <BrainCircuit className="w-5 h-5 text-yellow-500" />
  },
  {
    title: "Разбирайте объяснения",
    description: "Не зазубривайте ответы! Если ошиблись — прочитайте пункт ДОПОГ в наших комментариях. Понимание логики правил — 90% успеха.",
    icon: <CheckCircle className="w-5 h-5 text-yellow-500" />
  }
];

export default function HowToPassPage() {
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
             <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Советы экспертов</span>
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">6 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-8 leading-[1.1] tracking-tight text-zinc-900 dark:text-white">
            Как сдать экзамен ДОПОГ <span className="text-yellow-500">с первого раза</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
             Экзамен в Ространснадзоре считается одним из самых сложных для водителей. Мы собрали практические советы тех, кто уже прошел этот путь и получил свидетельство.
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
           <section>
              <h2 className="text-2xl sm:text-3xl font-black mb-8 flex items-center gap-4">
                 Стратегия подготовки
                 <div className="flex-1 h-[2px] bg-zinc-100 dark:bg-zinc-800" />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                 {tips.map((tip, i) => (
                    <div key={i} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-3xl group hover:border-yellow-500 transition-all">
                       <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-yellow-500/10 group-hover:scale-110 transition-all">
                          {tip.icon}
                       </div>
                       <h3 className="font-bold text-lg mb-3">{tip.title}</h3>
                       <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{tip.description}</p>
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-zinc-900 rounded-3xl p-8 sm:p-12 text-zinc-400 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500 opacity-5 blur-3xl" />
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">Частые ловушки в вопросах</h2>
              <p className="text-lg leading-relaxed font-medium mb-8">
                 Авторы билетов часто используют похожие термины: «грузовой транспорт», «транспортная единица», «перевозка в упаковках». Разберитесь в отличиях между ними — именно на таких нюансах «валятся» 40% кандидатов.
              </p>
              <Link 
                href="/#courses" 
                className="inline-flex items-center gap-2 text-yellow-500 font-black uppercase text-xs tracking-widest hover:text-white transition-colors"
              >
                Начать тренировку сейчас <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
           </section>

           <section>
              <h2 className="text-2xl sm:text-3xl font-black mb-6">День экзамена: Рекомендации</h2>
              <ul className="space-y-6">
                 <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-black shrink-0">1</div>
                    <div>
                       <h4 className="font-bold text-lg mb-1">Не спешите</h4>
                       <p className="text-zinc-500 dark:text-zinc-400 font-medium">На базовый курс дается 45 минут. Читайте вопрос до конца, даже если ответ кажется очевидным.</p>
                    </div>
                 </li>
                 <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-black shrink-0">2</div>
                    <div>
                       <h4 className="font-bold text-lg mb-1">Используйте логику</h4>
                       <p className="text-zinc-500 dark:text-zinc-400 font-medium">ДОПОГ — это не просто закон, это правила безопасности. Представьте реальную ситуацию на дороге, и правильный ответ придет сам собой.</p>
                    </div>
                 </li>
              </ul>
           </section>

           <section className="bg-yellow-50 border-2 border-yellow-200 dark:bg-yellow-500/5 dark:border-yellow-500/20 rounded-3xl p-8 sm:p-12 text-center">
              <GraduationCap className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-3xl font-black text-yellow-700 dark:text-yellow-500 mb-4">Готовы подтвердить квалификацию?</h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-bold mb-8 max-w-lg mx-auto leading-relaxed">
                 Наша система обучения адаптируется под ваши ошибки и помогает закрыть пробелы в знаниях за несколько вечеров.
              </p>
              <Link 
                href="/#courses" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-12 py-5 rounded-2xl font-black transition-all active:scale-95 shadow-xl shadow-yellow-500/20"
              >
                Открыть каталог курсов
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

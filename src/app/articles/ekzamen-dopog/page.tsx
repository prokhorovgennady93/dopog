import Link from "next/link";
import { ArrowLeft, Clock, FileCheck, ShieldAlert, Award, AlertTriangle, LayoutList, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const table1 = [
  { c: "Базовый курс", t: "444", b: "18", q: "25", time: "45 минут", err: "6" },
  { c: "Цистерны", t: "154", b: "11", q: "15", time: "30 минут", err: "3" },
  { c: "Класс 1", t: "143", b: "10", q: "15", time: "30 минут", err: "3" },
  { c: "Класс 7", t: "147", b: "10", q: "15", time: "30 минут", err: "3" }
];

const table2 = [
  { c: "Базовый курс", t: "444", b: "18", q: "15", time: "30 минут", err: "3" },
  { c: "Цистерны", t: "154", b: "11", q: "10", time: "20 минут", err: "2" },
  { c: "Класс 1", t: "143", b: "10", q: "10", time: "20 минут", err: "2" },
  { c: "Класс 7", t: "147", b: "10", q: "10", time: "20 минут", err: "2" }
];

export default function ExamPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-10 sm:py-20 font-sans text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation Header */}
        <header className="mb-12">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-slate-600 transition-colors mb-8 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
             Назад к библиотеке
          </Link>
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-slate-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Guide 2026</span>
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">8 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            Квалификационный <span className="text-slate-600">экзамен ДОПОГ</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-bold mb-12 max-w-3xl font-sans">
             Подробный регламент экзамена: допуск, количество попыток, время на прохождение и допустимые ошибки. Различия при первичном и повторном получении.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/images/articles/permit.png" 
                alt="Экзамен ДОПОГ" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-2xl font-black max-w-md italic tracking-widest uppercase text-xs">Правила аттестации.</p>
             </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16 font-medium font-sans">
           
           <section className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[48px] p-8 sm:p-12 mt-8">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 uppercase flex items-center gap-3">
                 <FileCheck className="w-8 h-8 text-slate-600" /> Допуск к сдаче экзамена
              </h3>
              <p className="text-zinc-500 mb-6 font-bold">Допуск к сдаче экзамена осуществляется строго при предъявлении оригинала и копии следующих документов:</p>
              <ul className="space-y-4 font-bold text-zinc-600 dark:text-zinc-400 text-sm">
                 <li className="flex gap-3 items-center bg-white dark:bg-zinc-950 p-4 rounded-2xl"><div className="w-6 h-6 bg-slate-100 dark:bg-slate-900 text-slate-600 rounded-full flex items-center justify-center text-xs shrink-0">1</div> Паспорт</li>
                 <li className="flex gap-3 items-center bg-white dark:bg-zinc-950 p-4 rounded-2xl"><div className="w-6 h-6 bg-slate-100 dark:bg-slate-900 text-slate-600 rounded-full flex items-center justify-center text-xs shrink-0">2</div> Свидетельство о прохождении обучения</li>
                 <li className="flex gap-3 items-center bg-white dark:bg-zinc-950 p-4 rounded-2xl"><div className="w-6 h-6 bg-slate-100 dark:bg-slate-900 text-slate-600 rounded-full flex items-center justify-center text-xs shrink-0">3</div> Водительское удостоверение</li>
                 <li className="flex gap-3 items-center bg-white dark:bg-zinc-950 p-4 rounded-2xl"><div className="w-6 h-6 bg-slate-100 dark:bg-slate-900 text-slate-600 rounded-full flex items-center justify-center text-xs shrink-0">4</div> Действующее свидетельство ДОПОГ (при наличии)</li>
              </ul>
              <div className="mt-6 flex items-start gap-4 p-4 border border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-500/10 rounded-2xl">
                 <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-1 shrink-0" />
                 <p className="text-sm font-bold text-emerald-800 dark:text-emerald-500">На экзамене необходимо сдать ровно 1 билет по каждой программе, на которую вы проходили обучение.</p>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white uppercase text-sm tracking-widest leading-none">Попытки и сроки</h2>
              <div className="flex gap-8 items-start p-8 sm:p-12 border border-zinc-100 dark:border-zinc-800 rounded-[48px] bg-white dark:bg-zinc-900">
                 <Clock className="w-12 h-12 text-slate-600 shrink-0 mt-2" />
                 <div>
                    <h4 className="text-xl font-black mb-4 uppercase tracking-tighter italic">Жесткие временные рамки</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed font-bold">
                       Водитель имеет право на <b>3 попытки</b> сдачи экзамена по каждому курсу. <br/><br/>
                       <span className="text-red-600 dark:text-red-500">Важно:</span> все пересдачи должны быть завершены в течение <b>2 месяцев</b> с даты окончания обучения в учебном центре. Если вы не уложитесь в этот срок, потребуется заново проходить платное обучение.
                    </p>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8 text-zinc-900 dark:text-white uppercase text-sm tracking-widest leading-none">Регламент экзамена</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-bold mb-8">
                 Квалификационный экзамен отличается для тех, кто в первый раз получает ДОПОГ, и для тех, кто получает его повторно (через 5 лет). 
              </p>

              <div className="mb-12">
                 <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-4 italic">Таблица 1. Первичное получение (подготовка)</h3>
                 <div className="overflow-x-auto rounded-[32px] border border-zinc-100 dark:border-zinc-800">
                    <table className="w-full text-left font-sans text-sm font-bold bg-white dark:bg-zinc-900">
                       <thead className="bg-zinc-50 dark:bg-zinc-950 uppercase text-[10px] tracking-widest">
                          <tr>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">Название курса</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">Всего вопросов</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">Кол-во билетов</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">Вопросов в билете</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-slate-600">Время на решение</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-red-600">Ошибок</th>
                          </tr>
                       </thead>
                       <tbody>
                          {table1.map((row, i) => (
                             <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-white">{row.c}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">{row.t}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">{row.b}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-orange-600">{row.q}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-slate-600 dark:text-slate-400">{row.time}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-red-600 text-lg">{row.err}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="mb-8">
                 <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-4 italic">Таблица 2. Повторное получение (переподготовка)</h3>
                 <div className="overflow-x-auto rounded-[32px] border border-zinc-100 dark:border-zinc-800">
                    <table className="w-full text-left font-sans text-sm font-bold bg-white dark:bg-zinc-900">
                       <thead className="bg-zinc-50 dark:bg-zinc-950 uppercase text-[10px] tracking-widest">
                          <tr>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">Название курса</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">Всего вопросов</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">Кол-во билетов</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">Вопросов в билете</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-slate-600">Время на решение</th>
                             <th className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-red-600">Ошибок</th>
                          </tr>
                       </thead>
                       <tbody>
                          {table2.map((row, i) => (
                             <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-white">{row.c}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">{row.t}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">{row.b}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-orange-600">{row.q}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-slate-600 dark:text-slate-400">{row.time}</td>
                                <td className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 text-red-600 text-lg">{row.err}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-[40px] p-8 sm:p-12 mb-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                     <AlertTriangle className="w-16 h-16 text-amber-600 shrink-0" />
                     <div>
                        <h3 className="text-xl font-black text-amber-900 dark:text-amber-500 mb-2 uppercase">Важное замечание</h3>
                        <p className="text-sm text-amber-800/80 dark:text-amber-500/80 font-bold leading-relaxed">
                           Первый этап экзамена — Базовый курс. <b>Только после его успешной сдачи</b> кандидат допускается к сдаче билетов по специальным курсам (Цистерны, Класс 1, Класс 7). Провалив базовый, вы не сможете продолжить экзамен.
                        </p>
                     </div>
                  </div>
              </div>
           </section>

           <section className="bg-slate-600 rounded-[64px] p-12 sm:p-24 text-white text-center shadow-3xl shadow-slate-950/40 relative group overflow-hidden border border-zinc-800">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white opacity-10 blur-3xl group-hover:scale-150 transition-all duration-1000" />
              <div className="relative z-10 flex flex-col items-center">
                 <LayoutList className="w-24 h-24 mb-8 text-slate-200 drop-shadow-2xl" />
                 <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tighter italic leading-none">Симуляция <br />реального экзамена</h2>
                 <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto font-medium font-sans leading-relaxed">
                    Проверьте свои знания в режиме реального времени на нашем тренажере, который учитывает время и количество допустимых ошибок.
                 </p>
                 <Link 
                    href="/#courses" 
                    className="bg-black text-white px-16 py-6 rounded-3xl font-black text-xl hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl uppercase tracking-widest"
                 >
                    Начать тесты
                 </Link>
              </div>
           </section>
        </div>
      </div>
      
      <footer className="max-w-4xl mx-auto px-4 mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-400">
         <p>© 2026 ДОПОГ Экзамен</p>
         <div className="flex gap-6">
            <Link href="/articles" className="hover:text-slate-500 transition-colors cursor-pointer">Библиотека</Link>
            <Link href="/" className="hover:text-slate-500 transition-colors cursor-pointer">Главная</Link>
         </div>
      </footer>
    </div>
  );
}

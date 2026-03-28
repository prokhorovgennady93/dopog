import Link from "next/link";
import { ArrowLeft, UserCheck, ShieldCheck, GraduationCap, Gavel, HelpCircle, Target, BookOpen, AlertCircle, Clock } from "lucide-react";
import Image from "next/image";

export default function ConsultantPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-10 sm:py-20 font-sans text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation Header */}
        <header className="mb-12">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-orange-600 transition-colors mb-8 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
             Назад к библиотеке
          </Link>
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Library</span>
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">14 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            <span className="text-orange-600">Консультант</span> по безопасности ДОПОГ
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl font-sans leading-relaxed">
             Полный профессиональный обзор квалификационных требований к консультантам (DGSA) в соответствии с разделом 1.8.3 ДОПОГ и Приказом Минтранса №257.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/images/articles/consultant.png" 
                alt="Консультант ДОПОГ" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-2xl font-black max-w-md italic tracking-widest uppercase text-xs">Профессиональная экспертиза 2026.</p>
             </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16 font-medium font-sans">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest leading-none">1. Правовое основание и Свидетельство</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                 <p>С 2022 года требования к аттестации консультантов по безопасности регулируются <b>Приказом Минтранса РФ №257 от 23.06.2022</b>. Согласно ДОПОГ 1.8.3, любое предприятие (за исключением случаев, предусмотренных в 1.8.3.2), перевозящее опасные грузы, обязано иметь в штате (или по договору) сертифицированного консультанта.</p>
                 <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-[32px] border border-zinc-100 dark:border-zinc-800 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 opacity-5 blur-3xl group-hover:scale-150 transition-all font-sans" />
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-widest text-[10px]">Критерии успешной аттестации:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                          <h5 className="font-black text-orange-600 mb-2 uppercase text-[10px]">Письменный тест</h5>
                          <p className="text-xs font-bold">40 вопросов. Требуется минимум <b>75%</b> правильных ответов (30 из 40).</p>
                       </div>
                       <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                          <h5 className="font-black text-orange-600 mb-2 uppercase text-[10px]">Практическая задача</h5>
                          <p className="text-xs font-bold">Детальный кейс. Требуется <b>100%</b> корректное решение без методологических ошибок.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white uppercase text-sm tracking-widest">2. Обязанности и ответственность (Chapter 8)</h2>
              <div className="space-y-10">
                 <div className="flex gap-8 items-start">
                    <BookOpen className="w-10 h-10 text-orange-600 shrink-0" />
                    <div>
                       <h4 className="text-xl font-black mb-3 italic">Классификация и аудит</h4>
                       <p className="text-sm text-zinc-500 mb-4 leading-relaxed">Консультант обязан проверять правильность идентификации грузов предприятием и соответствие маркировки требованиям ДОПОГ. Он проводит внутренний аудит транспортных процедур не реже одного раза в квартал.</p>
                    </div>
                 </div>
                 <div className="flex gap-8 items-start">
                    <Gavel className="w-10 h-10 text-orange-600 shrink-0" />
                    <div>
                       <h4 className="text-xl font-black mb-3 italic">Ежегодный отчет</h4>
                       <p className="text-sm text-zinc-500 leading-relaxed">Главный официальный документ консультанта. Отчет должен храниться на предприятии в течении 5 лет и предоставляться по первому требованию Ространснадзора. В отчете фиксируются все инциденты, объемы перевезенных грузов и нарушения.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-zinc-900 p-8 sm:p-16 rounded-[56px] text-zinc-400 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 opacity-5 blur-3xl group-hover:scale-150 transition-all duration-1000" />
              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 italic">
                 <Clock className="w-6 h-6 text-orange-600" /> Валидность и Сроки
              </h2>
              <div className="space-y-6 text-sm leading-relaxed font-bold font-sans">
                 <p className="text-zinc-200">Свидетельство консультанта по безопасности ДОПОГ действительно в течение <b>5 лет</b>.</p>
                 <p>Для продления свидетельства на новый пятилетний период владелец должен успешно сдать контрольный экзамен в течение последнего года, предшествующего дате истечения срока действия свидетельства.</p>
                 <div className="mt-8 pt-8 border-t border-zinc-800 text-xs uppercase tracking-widest font-black leading-none text-zinc-600">Область действия: Все страны-участницы ДОПОГ.</div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8 italic">Экзаменационные темы</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {["Классификация", "Упаковка", "Маркировка", "Документация", "Цистерны", "Транспорт", "Экипаж", "Операции"].map((t) => (
                    <div key={t} className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-center group hover:border-orange-600 transition-all">
                       <span className="text-xs font-black uppercase tracking-widest group-hover:text-orange-600 transition-colors leading-none">{t}</span>
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-zinc-50 dark:bg-zinc-900 border-l-8 border-orange-600 rounded-r-[56px] p-12 sm:p-20 shadow-2xl shadow-orange-950/20">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="w-24 h-24 bg-orange-600 rounded-3xl flex items-center justify-center shrink-0 rotate-12 group-hover:rotate-0 transition-transform">
                    <GraduationCap className="w-12 h-12 text-white" />
                 </div>
                 <div className="text-center md:text-left">
                    <h2 className="text-4xl font-black mb-4 text-zinc-900 dark:text-white uppercase leading-none">Станьте экспертом</h2>
                    <p className="text-zinc-500 font-bold leading-relaxed mb-10 max-w-md font-sans leading-relaxed">Программа обучения консультантов — это высшая ступень в системе ДОПОГ. Подготовьтесь к государственному экзамену на нашем профессиональном тренажере.</p>
                    <Link 
                       href="/#courses" 
                       className="bg-zinc-900 dark:bg-white text-white dark:text-black px-12 py-5 rounded-2xl font-black text-sm hover:scale-[1.05] transition-all uppercase tracking-widest shadow-xl shadow-zinc-950/50"
                    >
                       Пройти тест
                    </Link>
                 </div>
              </div>
           </section>
        </div>
      </div>
      
      <footer className="max-w-4xl mx-auto px-4 mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-400">
         <p>© 2026 ДОПОГ Экзамен</p>
         <div className="flex gap-6">
            <Link href="/articles" className="hover:text-orange-500 transition-colors cursor-pointer">Библиотека</Link>
            <Link href="/" className="hover:text-orange-500 transition-colors cursor-pointer">Главная</Link>
         </div>
      </footer>
    </div>
  );
}

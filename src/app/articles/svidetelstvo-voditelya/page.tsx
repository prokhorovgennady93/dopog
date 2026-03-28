import Link from "next/link";
import { ArrowLeft, UserCheck, ShieldCheck, GraduationCap, Gavel, HelpCircle, Target, Award, Globe, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function DriverCertPage() {
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
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">18 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            <span className="text-orange-600">Свидетельство</span> водителя ДОПОГ
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-bold mb-12 max-w-3xl font-sans leading-relaxed">
             Полный профессиональный разбор требований к водителям ОГ в соответствии с Приказом Минтранса №265. Правила экзаменов Ространснадзора 2026.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/adr_driver_certificate_1774706813658.png" 
                alt="Свидетельство водителя ДОПОГ" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-2xl font-black max-w-md italic tracking-widest uppercase text-xs">Допуск к опасным грузам 2026.</p>
             </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16 font-medium font-sans">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest">1. Нормативная база (Паритет №265)</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-bold">
                 <p>С 2021 года порядок выдачи свидетельств ДОПОГ о подготовке водителей ТС в России регулируется <b>Приказом Министерства транспорта РФ от 30.07.2020 №265</b>. Свидетельство является международным документом и признается во всех странах-участницах ДОПОГ.</p>
                 <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-[48px] border border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-xl font-black mb-6 uppercase tracking-widest text-[10px] text-zinc-900 dark:text-white">Обязательные курсы подготовки:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="flex gap-4 p-4 border border-zinc-100 dark:border-zinc-800 rounded-3xl group hover:border-orange-600 transition-all">
                          <CheckCircle2 className="w-6 h-6 text-orange-600 shrink-0" />
                          <div>
                             <h5 className="font-black text-xs uppercase mb-1">Базовый курс</h5>
                             <p className="text-[10px] text-zinc-500 font-bold">Основы перевозки ОГ в упаковках (кроме Классов 1 и 7).</p>
                          </div>
                       </div>
                       <div className="flex gap-4 p-4 border border-zinc-100 dark:border-zinc-800 rounded-3xl group hover:border-orange-600 transition-all">
                          <Truck className="w-6 h-6 text-orange-600 shrink-0" />
                          <div>
                             <h5 className="font-black text-xs uppercase mb-1">Спецкурс Цистерны</h5>
                             <p className="text-[10px] text-zinc-500 font-bold">Перевозка в автоцистернах, контейнерах-цистернах и МЭГК.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white uppercase text-sm tracking-widest leading-none">2. Правила сдачи и пересдачи</h2>
              <div className="space-y-8">
                 <div className="flex gap-8 items-start">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-xl rotate-3"><Target className="w-6 h-6" /></div>
                    <div>
                       <h4 className="text-xl font-black mb-2 uppercase tracking-tighter italic">Попытки и сроки</h4>
                       <p className="text-sm text-zinc-500 leading-relaxed font-bold">Водитель имеет право на <b>3 попытки</b> сдачи экзамена по каждому курсу. Важно: все пересдачи должны быть завершены в течение 2 месяцев с даты окончания обучения в учебном центре.</p>
                    </div>
                 </div>
                 <div className="flex gap-8 items-start">
                    <div className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center shrink-0 text-white dark:text-black shadow-xl -rotate-3"><Clock className="w-6 h-6" /></div>
                    <div>
                       <h4 className="text-xl font-black mb-2 uppercase tracking-tighter italic">Процессинг после сдачи</h4>
                       <p className="text-sm text-zinc-500 leading-relaxed font-bold">После успешного прохождения теста и оплаты госпошлины, Ространснадзор обязан выдать свидетельство в течение <b>3 рабочих дней</b>. Свидетельство выдается в форме пластиковой карты с защитными элементами.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-[48px] p-8 sm:p-16 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500 opacity-10 blur-3xl group-hover:scale-150 transition-all" />
              <div className="flex flex-col md:flex-row gap-12 items-center">
                 <AlertTriangle className="w-16 h-16 text-amber-600 shrink-0 drop-shadow-lg" />
                 <div>
                    <h3 className="text-3xl font-black text-amber-900 dark:text-amber-500 mb-4 leading-none uppercase italic">Утеря или повреждение</h3>
                    <p className="text-lg text-amber-800/80 dark:text-amber-500/70 font-bold leading-relaxed font-sans">
                       В случае порчи или кражи карты, водитель обращается в Ространснадзор для получения дубликата. Дубликат выдается на основании данных реестра без повторной сдачи экзамена, но срок действия остается прежним (5 лет от даты оригинала).
                    </p>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white uppercase text-sm tracking-widest leading-none">3. Продление (Refresher Course)</h2>
              <div className="space-y-6">
                 <p className="text-sm text-zinc-500 leading-relaxed font-bold">Чтобы продлить свидетельство на следующие 5 лет, водитель должен:</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                       <h5 className="font-black text-xs uppercase mb-2 leading-none text-orange-600">Шаг 01</h5>
                       <p className="text-[10px] font-bold">Пройти курс переподготовки (Refresh) в течение последнего года действия свидетельства.</p>
                    </div>
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                       <h5 className="font-black text-xs uppercase mb-2 leading-none text-orange-600">Шаг 02</h5>
                       <p className="text-[10px] font-bold">Успешно сдать контрольный экзамен ДО даты окончания текущей карты.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-orange-600 rounded-[64px] p-12 sm:p-24 text-white text-center shadow-3xl shadow-orange-950/40 relative group overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white opacity-10 blur-3xl group-hover:scale-150 transition-all duration-1000" />
              <div className="relative z-10 flex flex-col items-center">
                 <Award className="w-24 h-24 mb-8 text-white drop-shadow-2xl" />
                 <h2 className="text-4xl sm:text-7xl font-black mb-6 tracking-tighter italic leading-none">Ваше свидетельство <br /> ждет Вас!</h2>
                 <p className="text-xl mb-12 opacity-80 max-w-xl mx-auto font-medium font-sans leading-relaxed italic">
                    Наш онлайн-тренажер содержит самую актуальную базу вопросов Ространснадзора 2026. Подготовьтесь к сдаче без нервов.
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
            <Link href="/articles" className="hover:text-orange-500 transition-colors cursor-pointer">Библиотека</Link>
            <Link href="/" className="hover:text-orange-500 transition-colors cursor-pointer">Главная</Link>
         </div>
      </footer>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

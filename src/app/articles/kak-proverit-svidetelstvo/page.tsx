import Link from "next/link";
import { ArrowLeft, Search, ShieldCheck, FileCheck, ShieldAlert, Award, Globe, XCircle } from "lucide-react";
import Image from "next/image";

export default function CheckCertPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-10 sm:py-20 font-sans text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation Header */}
        <header className="mb-12">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-red-600 transition-colors mb-8 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
             Назад к библиотеке
          </Link>
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Проверка</span>
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">5 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            Как проверить ДОПОГ на <span className="text-red-600">подлинность?</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-bold mb-12 max-w-3xl font-sans">
             Подробная инструкция: как найти информацию о водителе в официальном реестре Протоколов экзаменационной комиссии и не стать жертвой фальсификации.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/images/articles/permit.png" 
                alt="Проверка ДОПОГ" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-2xl font-black max-w-md italic tracking-widest uppercase text-xs">Защита от подделок 2026.</p>
             </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16 font-medium font-sans">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest">Способ 1. Протокол экзаменационной комиссии</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">
                 <p>Найти на сайте Агентства автомобильного транспорта информацию о водителе в Протоколе экзаменационной комиссии — это самый достоверный способ.</p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 sm:p-12 rounded-[48px] border border-zinc-100 dark:border-zinc-800">
                 <h4 className="text-xl font-black mb-6 uppercase tracking-widest text-[10px] text-zinc-900 dark:text-white">Пошаговая инструкция:</h4>
                 <div className="space-y-4 font-bold text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex gap-4 items-start p-4 hover:bg-white dark:hover:bg-zinc-950 rounded-2xl transition-all">
                       <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 font-black flex items-center justify-center shrink-0">1</div>
                       <p className="mt-1">Переходим на официальный сайт Агентства автомобильного транспорта (Росавтотранс) в раздел Экзаменационных комиссий.</p>
                    </div>
                    <div className="flex gap-4 items-start p-4 hover:bg-white dark:hover:bg-zinc-950 rounded-2xl transition-all">
                       <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 font-black flex items-center justify-center shrink-0">2</div>
                       <p className="mt-1">Смотрим на серию выданного свидетельства — она соответствует цифровому коду региона, в котором было выдано свидетельство.</p>
                    </div>
                    <div className="flex gap-4 items-start p-4 hover:bg-white dark:hover:bg-zinc-950 rounded-2xl transition-all">
                       <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 font-black flex items-center justify-center shrink-0">3</div>
                       <p className="mt-1">На сайте выбираем нужный округ (к которому относится регион), а затем соответствующий город.</p>
                    </div>
                    <div className="flex gap-4 items-start p-4 hover:bg-white dark:hover:bg-zinc-950 rounded-2xl transition-all">
                       <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 font-black flex items-center justify-center shrink-0">4</div>
                       <p className="mt-1">После этого на странице, под составом комиссии, появится архивный список протоколов.</p>
                    </div>
                    <div className="flex gap-4 items-start p-4 hover:bg-white dark:hover:bg-zinc-950 rounded-2xl transition-all">
                       <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 font-black flex items-center justify-center shrink-0">5</div>
                       <p className="mt-1">Чтобы узнать нужный месяц и год протокола, <b>отнимите от даты окончания свидетельства ровно 5 лет</b>. Открыв скачанный документ, вы сможете найти водителя по его ФИО.</p>
                    </div>
                 </div>
              </div>

              <div className="mt-8 flex gap-6 p-6 border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-500/5 rounded-r-[32px] items-center">
                 <ShieldCheck className="w-10 h-10 text-emerald-600 shrink-0" />
                 <p className="text-sm font-bold text-emerald-900 dark:text-emerald-500 leading-relaxed">
                    <b>Результат:</b> Если в нужном протоколе указано, что водитель успешно сдал экзамен, то удостоверение подлинное. Если же его ФИО там нет — документ является фальсификацией.
                 </p>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white uppercase text-sm tracking-widest leading-none">Способ 2. Проверка онлайн</h2>
              <div className="flex gap-8 items-start p-8 sm:p-12 border border-zinc-100 dark:border-zinc-800 rounded-[48px] bg-white dark:bg-zinc-900">
                 <Search className="w-12 h-12 text-red-600 shrink-0 mt-2" />
                 <div>
                    <h4 className="text-xl font-black mb-4 uppercase tracking-tighter italic">Электронный запрос</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed font-bold">
                       Для онлайн-проверки заполните официальное заявление на сайте Министерства транспорта РФ или направьте запрос на почту <b>info@mintrans.ru</b>. <br/><br/>
                       Также можно обратиться к независимым специалистам или позвонить по телефону горячей линии для уточнения данных.
                    </p>
                 </div>
              </div>
           </section>

           <section className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-[48px] p-8 sm:p-16 relative overflow-hidden group mt-16">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-500 opacity-10 blur-3xl group-hover:scale-150 transition-all" />
              <div className="flex flex-col md:flex-row gap-12 items-center">
                 <XCircle className="w-16 h-16 text-red-600 shrink-0 drop-shadow-lg" />
                 <div>
                    <h3 className="text-3xl font-black text-red-900 dark:text-red-500 mb-4 leading-none uppercase italic">Осторожно: Подделки!</h3>
                    <p className="text-lg text-red-800/80 dark:text-red-500/70 font-bold leading-relaxed font-sans">
                       Будьте предельно внимательны и <u>ни в коем случае</u> не соглашайтесь на получение свидетельства ДОПОГ без сдачи экзамена и личного посещения отделения Ространснадзора.<br/><br/>
                       В 100% случаев вы получите поддельный документ, а это уголовное преступление по ч. 3 ст. 327 УК РФ (подделка, изготовление или оборот поддельных документов).
                    </p>
                 </div>
              </div>
           </section>

           <section className="bg-zinc-900 rounded-[64px] p-12 sm:p-24 text-white text-center shadow-3xl shadow-zinc-950/40 relative group overflow-hidden border border-zinc-800">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600 opacity-10 blur-3xl group-hover:scale-150 transition-all duration-1000" />
              <div className="relative z-10 flex flex-col items-center">
                 <Award className="w-24 h-24 mb-8 text-red-500 drop-shadow-2xl" />
                 <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tighter italic leading-none">Пройдите обучение <br /> легально!</h2>
                 <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto font-medium font-sans leading-relaxed">
                    Учитесь в нашем учебном центре (Лицензия № Л035-01276-61/02274118 выдана Министерством образования) и получите свидетельство ДОПОГ без рисков.
                 </p>
                 <Link 
                    href="/#courses" 
                    className="bg-red-600 text-white px-16 py-6 rounded-3xl font-black text-xl hover:bg-red-700 transition-all active:scale-95 shadow-2xl uppercase tracking-widest"
                 >
                    Начать обучение
                 </Link>
              </div>
           </section>
        </div>
      </div>
      
      <footer className="max-w-4xl mx-auto px-4 mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-400">
         <p>© 2026 ДОПОГ Экзамен</p>
         <div className="flex gap-6">
            <Link href="/articles" className="hover:text-red-500 transition-colors cursor-pointer">Библиотека</Link>
            <Link href="/" className="hover:text-red-500 transition-colors cursor-pointer">Главная</Link>
         </div>
      </footer>
    </div>
  );
}

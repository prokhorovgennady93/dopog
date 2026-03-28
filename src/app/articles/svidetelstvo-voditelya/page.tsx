import Link from "next/link";
import { ArrowLeft, UserCheck, ShieldCheck, GraduationCap, Gavel, HelpCircle, Target, Award, Globe } from "lucide-react";
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
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">14 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white">
            <span className="text-orange-600">Свидетельство</span> водителя ДОПОГ
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl">
             Для легальной перевозки опасных грузов водитель обязан иметь действующее свидетельство ДОПОГ. Мы разберем структуру курсов, правила сдачи экзамена в Ространснадзоре и нюансы продления.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/adr_driver_certificate_1774706813658.png" 
                alt="Свидетельство водителя ДОПОГ" 
                fill 
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-2xl font-black max-w-md">Профессиональная квалификация: Пластиковая карта — Ваш допуск к спецгрузам.</p>
             </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16 font-medium">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest">1. Типы учебных курсов</h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">Свидетельство ДОПОГ не выдается единоразово на всё. Оно состоит из отметок о прохождении конкретных курсов подготовки:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <h4 className="font-bold text-xl mb-3 text-zinc-900 dark:text-white uppercase tracking-tighter">Базовый курс</h4>
                    <p className="text-sm">Фундаментальный блок: общие требования, маркировка, оборудование, первая помощь. Обязателен для всех водителей.</p>
                 </div>
                 <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <h4 className="font-bold text-xl mb-3 text-zinc-900 dark:text-white uppercase tracking-tighter">Спецкурс «Цистерны»</h4>
                    <p className="text-sm">Подготовка водителей для перевозки в автоцистернах, съемных цистернах и контейнерах-цистернах емкостью более 1000 литров.</p>
                 </div>
                 <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <h4 className="font-bold text-xl mb-3 text-zinc-900 dark:text-white uppercase tracking-tighter">Спецкурс «Класс 1»</h4>
                    <p className="text-sm">Обучение для перевозки взрывчатых веществ и изделий из них (пиротехника, боеприпасы и пр.).</p>
                 </div>
                 <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <h4 className="font-bold text-xl mb-3 text-zinc-900 dark:text-white uppercase tracking-tighter">Спецкурс «Класс 7»</h4>
                    <p className="text-sm">Обучение для перевозки радиоактивных материалов и соответствующих упаковок.</p>
                 </div>
              </div>
           </section>

           <section className="bg-zinc-900 border-2 border-orange-600 rounded-[56px] p-12 sm:p-20 text-white">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="w-32 h-32 bg-orange-600 rounded-full flex items-center justify-center shrink-0">
                    <Award className="w-16 h-16 text-white" />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black mb-4">Экзамен в Ространснадзоре</h2>
                    <p className="text-zinc-400 leading-relaxed font-medium">После обучения в учебном центре (наличие удостоверения о повышении квалификации обязательно), водитель подает документы в региональную экзаменационную комиссию. Экзамен проходит в форме тестирования. У Вас есть 45 минут на 25 вопросов (Базовый курс) и 30 минут на 15 вопросов (Цистерны).</p>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8">Нюансы продления</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                 <p>Свидетельство ДОПОГ на водителя действительно в течение <b>5 лет</b>. Важно: для продления необходимо пройти повторный курс обучения и сдать экзамен <u>до даты окончания</u> текущей карты.</p>
                 <div className="bg-yellow-500/10 border-l-4 border-orange-600 p-8 rounded-r-3xl italic">
                    «Если вы не успели сдать экзамен до даты X на Вашей карте, Вам придется проходить всё обучение заново, а не по ускоренной программе продления».
                 </div>
                 <p>Новое свидетельство при продлении выдается также на 5 лет, причем дата отсчитывается от даты окончания предыдущего документа (при условии успешной сдачи за год до окончания).</p>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white">Как проверяется подлинность?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                       <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">База данных</h4>
                       <p className="text-sm">Все легальные свидетельства заносятся в Реестр выданных свидетельств ДОПОГ Ространснадзора.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                       <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Qr-код и чип</h4>
                       <p className="text-sm">Современные карты ДОПОГ содержат микрочип и элементы защиты от подделки.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-orange-600 rounded-[56px] p-12 sm:p-24 text-white text-center">
              <GraduationCap className="w-20 h-20 mx-auto mb-8 text-white" />
              <h2 className="text-4xl sm:text-6xl font-black mb-6">Готовы к обучению?</h2>
              <p className="text-xl mb-12 opacity-80 max-w-xl mx-auto font-medium">
                 Наш тренажер содержит 100% вопросов из базы Ространснадзора 2026. Подготовьтесь к любому спецкурсу за несколько вечеров.
              </p>
              <Link 
                 href="/#courses" 
                 className="inline-flex bg-white text-orange-600 px-16 py-6 rounded-3xl font-black text-xl hover:bg-zinc-100 transition-all active:scale-95 shadow-2xl"
              >
                 Начать тесты
              </Link>
           </section>
        </div>
      </div>
      
      <footer className="max-w-4xl mx-auto px-4 mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-400">
         <p>© 2026 ДОПОГ Экзамен</p>
         <div className="flex gap-6">
            <Link href="/articles" className="hover:text-orange-500 transition-colors">Библиотека</Link>
            <Link href="/" className="hover:text-orange-500 transition-colors">Главная</Link>
         </div>
      </footer>
    </div>
  );
}

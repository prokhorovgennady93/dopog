import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle, Info, HelpCircle, ShieldAlert, Globe } from "lucide-react";
import Image from "next/image";

export default function SpecPermitPage() {
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
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">11 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white">
            <span className="text-orange-600">Спецразрешение</span> на опасные грузы
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl">
             Для перевозки грузов повышенной опасности в России требуется специальное разрешение Ространснадзора. Разберемся, кому оно нужно, как его получить через Госуслуги и какие документы подготовить.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/adr_special_permit_digital_1774706987867.png" 
                alt="Спецразрешение ДОПОГ Госуслуги" 
                fill 
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-2xl font-black max-w-md">Цифровой формат: Подача заявки через портал государственных услуг.</p>
             </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16 font-medium">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest">1. Кому нужно спецразрешение?</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                 <p>Многие ошибочно полагают, что спецразрешение нужно на любой опасный груз. Это не так. Согласно Приказу Минтранса №127, документ требуется только для так называемых <b>«грузов повышенной опасности»</b>, перечень которых приведен в главе 1.10.3 ДОПОГ.</p>
                 
                 <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Типичные грузы повышенной опасности:</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                       <li>Взрывчатые вещества (Класс 1) в определенных количествах;</li>
                       <li>Легковоспламеняющиеся жидкости (Класс 3) более 3000 литров в цистерне;</li>
                       <li>Токсичные газы (Класс 2) в баллонах или цистернах;</li>
                       <li>Радиоактивные материалы (Класс 7).</li>
                    </ul>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white">Процесс получения (Пошагово)</h2>
              <div className="space-y-8">
                 <div className="flex gap-8 items-start">
                    <div className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center shrink-0 text-white dark:text-black font-black">1</div>
                    <div>
                       <h4 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Регистрация в ГИС ЭПД</h4>
                       <p className="text-sm">Перед подачей заявления убедитесь, что Ваша организация зарегистрирована в системе электронных перевозочных документов.</p>
                    </div>
                 </div>
                 <div className="flex gap-8 items-start">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shrink-0 text-white font-black">2</div>
                    <div>
                       <h4 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Подача через Госуслуги</h4>
                       <p className="text-sm">Прикрепите скан-копии СТС, свидетельства ДОПОГ на ТС и свидетельства на водителя. Укажите маршрут следования (начальный и конечный пункты).</p>
                    </div>
                 </div>
                 <div className="flex gap-8 items-start">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 text-zinc-900 dark:text-white font-black">3</div>
                    <div>
                       <h4 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Срок выдачи</h4>
                       <p className="text-sm">Обычно разрешение выдается в течение 5–10 рабочих дней на срок до 1 года (или на срок действия свидетельств ДОПОГ).</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-[40px] p-8 sm:p-12">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                 <div className="w-24 h-24 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-12 h-12 text-red-600" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-red-900 dark:text-red-500 mb-4">Штрафы за отсутствие</h3>
                    <p className="text-lg text-red-800/80 dark:text-red-500/70 font-bold leading-relaxed">
                       Перевозка груза повышенной опасности без спецразрешения влечет штраф до 500 000 рублей для юридических лиц и лишение прав для водителя. Это самое серьезное нарушение в сфере ДОПОГ.
                    </p>
                 </div>
              </div>
           </section>

           <section className="bg-zinc-900 p-8 sm:p-16 rounded-[56px] text-white">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                 <div className="max-w-md">
                    <Globe className="w-16 h-16 text-orange-600 mb-6" />
                    <h2 className="text-3xl font-black mb-4">Нужна помощь в подготовке?</h2>
                    <p className="text-zinc-400 font-medium leading-relaxed">Раздел «Спецразрешения» входит в расширенный курс подготовки водителей. Мы научим Вас отличать грузы повышенной опасности и правильно оформлять документы.</p>
                 </div>
                 <Link 
                    href="/#courses" 
                    className="bg-orange-600 text-white px-12 py-5 rounded-3xl font-black text-lg hover:bg-orange-500 transition-all active:scale-95 whitespace-nowrap"
                 >
                    Курс обучения
                 </Link>
              </div>
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

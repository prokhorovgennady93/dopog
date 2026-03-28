import Link from "next/link";
import { ArrowLeft, FileText, Info, ShieldCheck, HelpCircle, FileDigit, Truck } from "lucide-react";
import Image from "next/image";

export default function RulesPage() {
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
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">12 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white">
            Правила <span className="text-orange-600">перевозки</span> ОГ в России
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl">
             Базовый документ, регулирующий движение опасных грузов по дорогам России — Постановление Правительства РФ №2200. Мы разберем все тонкости оформления документов и требования к транспортным операциям.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/adr_transport_rules_1774706828665.png" 
                alt="Правила перевозки ОГ" 
                fill 
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-2xl font-black max-w-md">Электронные накладные: Цифровая революция в логистике ДОПОГ.</p>
             </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16 font-medium">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest">1. Законодательная база</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                 <p>С 1 января 2021 года в России действуют Правила перевозки грузов автомобильным транспортом, утвержденные Правительством в Постановлении №2200. Пункт 3 этих правил устанавливает безусловный приоритет ДОПОГ (Приложения А и В) для внутрироссийских рейсов.</p>
                 <p>Важно помнить: любые требования Ространснадзора основываются именно на пунктах ДОПОГ, а ПДД РФ устанавливают лишь общие рамки движения. Если вы перевозите опасный груз, Вашим «законом» становится синий двухтомник ADR.</p>
              </div>
           </section>

           <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 sm:p-16 rounded-[48px] border border-zinc-100 dark:border-zinc-800">
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white">Обязательные документы на борту</h2>
              
              <div className="space-y-8">
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                       <FileDigit className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Транспортная накладная (ТН)</h4>
                       <p className="text-sm">Оформляется в бумажном виде или как ЭТрН (Электронная транспортная накладная). Должна содержать UN номер, класс опасности и Группу упаковки груза.</p>
                    </div>
                 </div>

                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                       <ShieldCheck className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Свидетельство ДОПОГ на водителя</h4>
                       <p className="text-sm">Обязательно наличие оригинала пластиковой карты. Копии или цифровые сканы на данный момент не являются легальной заменой в РФ.</p>
                    </div>
                 </div>

                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                       <Info className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Письменные инструкции (Письменки)</h4>
                       <p className="text-sm">Должны соответствовать образцу из ДОПОГ 5.4.3 и быть на языке, на котором говорят члены экипажа.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8">Экипаж и безопасность</h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">
                 Раздел 8 ДОПОГ устанавливает строгие запреты для экипажа. В кабине ТС с опасным грузом категорически запрещено курение (включая вейпы и электронные сигареты). Любое использование открытого огня допустимо на расстоянии не менее 50 метров от ТС.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="border border-zinc-100 dark:border-zinc-800 p-8 rounded-3xl group hover:border-orange-500 transition-all">
                    <Truck className="w-8 h-8 text-orange-600 mb-6" />
                    <h4 className="font-bold mb-3 text-lg">Оборудование ТС</h4>
                    <p className="text-sm text-zinc-500">Минимум одна противооткатная колодка, два переносных огнетушителя (общей емкостью от 4 до 12 кг в зависимости от массы ТС) и два знака аварийной остановки.</p>
                 </div>
                 <div className="border border-zinc-100 dark:border-zinc-800 p-8 rounded-3xl group hover:border-orange-500 transition-all">
                    <FileText className="w-8 h-8 text-orange-600 mb-6" />
                    <h4 className="font-bold mb-3 text-lg">Паспорт безопасности</h4>
                    <p className="text-sm text-zinc-500">MSDS (Material Safety Data Sheet). Хотя формально он не входит в обязательный перечень для ГИБДД по №2200, он необходим водителю для понимания химической опасности груза.</p>
                 </div>
              </div>
           </section>

           <section className="bg-zinc-900 border-2 border-orange-600 rounded-[56px] p-12 sm:p-24 text-white text-center shadow-3xl shadow-orange-900/10">
              <HelpCircle className="w-20 h-20 mx-auto mb-8 text-orange-600" />
              <h2 className="text-4xl sm:text-6xl font-black mb-6">Тесты на знание <span className="text-orange-600">правил</span></h2>
              <p className="text-xl mb-12 opacity-80 max-w-xl mx-auto font-medium">
                 Вопросы по ПДД и общим правилам перевозки составляют основу Базового курса. Убедитесь, что вы готовы на 100%.
              </p>
              <Link 
                 href="/#courses" 
                 className="inline-flex bg-orange-600 text-white px-16 py-6 rounded-3xl font-black text-xl hover:bg-orange-500 transition-all active:scale-95 shadow-2xl"
              >
                 Начать тренировку
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

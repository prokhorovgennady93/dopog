import Link from "next/link";
import { ArrowLeft, FileText, Info, ShieldCheck, HelpCircle, FileDigit, Truck, CheckCircle2, ChevronRight, Award } from "lucide-react";
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
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">18 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white">
            Правила <span className="text-orange-600">перевозки</span> ОГ в России
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl">
             Полный юридический разбор Постановления Правительства РФ №2200 и сопутствующих приказов Минтранса. Глубокое погружение в документооборот и операционные требования.
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
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16 font-medium font-sans">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest">1. Нормативное регулирование</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                 <p>Основным документом являются «Правила перевозки грузов автомобильным транспортом», утвержденные <b>Постановлением Правительства РФ от 21.12.2020 №2200</b>. Согласно пункту 3 данных правил, перевозка опасных грузов в городском, пригородном и междугородном сообщении осуществляется в соответствии с требованиями приложений А и В к ДОПОГ.</p>
                 <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <h4 className="font-black text-xs uppercase tracking-widest mb-4">Виды маркировки груза (доп. требования):</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm">
                          <h5 className="font-bold text-orange-600 mb-2">Основная</h5>
                          <p className="text-xs">Наименование грузоотправителя, грузополучателя, масса нетто и брутто грузового места.</p>
                       </div>
                       <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm">
                          <h5 className="font-bold text-orange-600 mb-2">Дополнительная</h5>
                          <p className="text-xs">Машиночитаемый код (QR-код), знаки, информирующие о способах обращения с грузом.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white uppercase text-sm tracking-widest">2. Документооборот (Паритет №2200)</h2>
              <div className="space-y-10">
                 <div className="flex gap-8 items-start">
                    <FileDigit className="w-10 h-10 text-orange-600 shrink-0" />
                    <div>
                       <h4 className="text-xl font-black mb-3">Транспортная накладная (ТН)</h4>
                       <p className="text-sm text-zinc-500 mb-4 leading-relaxed">Главный документ, подтверждающий заключение договора перевозки. Может быть оформлен в электронном виде (ЭТрН), подписанном УКЭП всеми участниками. ТН должна содержать полную информацию о UN-номере, классе опасности и группе упаковки груза.</p>
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-green-600" /> Подпись грузополучателя</li>
                          <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-green-600" /> Отметки о взвешивании</li>
                       </ul>
                    </div>
                 </div>

                 <div className="flex gap-8 items-start">
                    <FileText className="w-10 h-10 text-orange-600 shrink-0" />
                    <div>
                       <h4 className="text-xl font-black mb-3">Заказ-наряд на фрахтование</h4>
                       <p className="text-sm text-zinc-500 mb-4 leading-relaxed">Оформляется в случае, если перевозка осуществляется по договору фрахтования (предоставление всей вместимости ТС). Должен содержать условия перевозки, сведения о фрахтователе и фрахтовщике.</p>
                    </div>
                 </div>

                 <div className="flex gap-8 items-start">
                    <Info className="w-10 h-10 text-orange-600 shrink-0" />
                    <div>
                       <h4 className="text-xl font-black mb-3">Сопроводительная ведомость</h4>
                       <p className="text-sm text-zinc-500 leading-relaxed">Используется при перевозке контейнеров. В ней фиксируются номера пломб и состояние контейнера при приеме-передаче.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-zinc-900 p-8 sm:p-16 rounded-[48px] text-white">
              <h2 className="text-2xl font-black mb-8">Обязательства перевозчика (Cargo Verification)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <div className="p-6 bg-zinc-800 rounded-3xl border border-zinc-700">
                       <h5 className="font-bold text-orange-600 mb-3">Взвешивание</h5>
                       <p className="text-xs text-zinc-400">Перевозчик обязан проверить массу груза, если способ ее определения указан в ТН. При погрузке в контейнер фиксируется только масса брутто.</p>
                    </div>
                    <div className="p-6 bg-zinc-800 rounded-3xl border border-zinc-700">
                       <h5 className="font-bold text-orange-600 mb-3">Опломбирование</h5>
                       <p className="text-xs text-zinc-400">Пломбы устанавливаются грузоотправителем. Перевозчик проверяет их целостность и записывает номера пломбировочных устройств в накладную.</p>
                    </div>
                 </div>
                 <div className="flex flex-col justify-center">
                    <ShieldCheck className="w-16 h-16 text-orange-600 mb-6" />
                    <h4 className="text-xl font-black mb-4">Приемка груза</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium font-sans">При приеме опасного груза перевозчик обязан проверить целостность упаковки и отсутствие повреждений, которые могли бы привести к утечке или рассыпанию вещества в пути.</p>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8">Экипаж и безопасность (Глава 8.1)</h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8 font-sans">
                 Раздел 8 ДОПОГ устанавливает строгие запреты для экипажа. В кабине ТС с опасным грузом категорически запрещено курение (включая вейпы и электронные сигареты). Любое использование открытого огня допустимо на расстоянии не менее 50 метров от ТС.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="border border-zinc-100 dark:border-zinc-800 p-8 rounded-3xl group hover:border-orange-500 transition-all">
                    <Truck className="w-8 h-8 text-orange-600 mb-6" />
                    <h4 className="font-bold mb-3 text-lg">Оборудование ТС</h4>
                    <ul className="space-y-2 text-sm text-zinc-500">
                       <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-600" /> Фонари переносные БЕЗ металлических поверхностей</li>
                       <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-600" /> Жилеты со световозвращающими элементами (EN 471)</li>
                       <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-600" /> Защитные перчатки и очки</li>
                    </ul>
                 </div>
                 <div className="border border-zinc-100 dark:border-zinc-800 p-8 rounded-3xl group hover:border-orange-500 transition-all">
                    <Award className="w-8 h-8 text-orange-600 mb-6" />
                    <h4 className="font-bold mb-3 text-lg">Огнетушители</h4>
                    <p className="text-sm text-zinc-500 font-sans">ТС массой {'>'} 7.5т должны иметь огнетушители общей массой (порошок) не менее 12 кг, из которых один — не менее 6 кг.</p>
                 </div>
              </div>
           </section>

           <section className="bg-orange-600 rounded-[56px] p-12 sm:p-24 text-white text-center shadow-3xl shadow-orange-900/10">
              <HelpCircle className="w-20 h-20 mx-auto mb-8 text-white" />
              <h2 className="text-4xl sm:text-6xl font-black mb-6">Тесты на знание <span className="text-black">правил</span></h2>
              <p className="text-xl mb-12 opacity-80 max-w-xl mx-auto font-medium font-sans">
                 Вопросы по ПДД и документации составляют 30% Базового курса. Проверьте свою готовность к экзамену Ространснадзора.
              </p>
              <Link 
                 href="/#courses" 
                 className="inline-flex bg-white text-orange-600 px-16 py-6 rounded-3xl font-black text-xl hover:bg-zinc-100 transition-all active:scale-95 shadow-2xl"
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

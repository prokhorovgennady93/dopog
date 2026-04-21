import Link from "next/link";
import { ArrowLeft, BookOpen, AlertTriangle, UserCheck, CheckCircle2, Truck, ShieldAlert, Award, Globe, Clock, Target, FileText, Banknote } from "lucide-react";
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
             <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Guide 2026</span>
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">18 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            <span className="text-orange-600">Свидетельство</span> водителя ДОПОГ
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-bold mb-12 max-w-3xl font-sans">
             К водителям, которые осуществляют перевозку опасных грузов, предъявляются особые требования, поэтому они проходят специализированное обучение. ДОПОГ — свидетельство, на основании которого водитель может работать в этой области. Получить его можно, отучившись в лицензированном учебном центре и сдав экзамен в Ространснадзоре.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/images/articles/driver_card.png" 
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
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest">1. Программы подготовки</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-bold mb-8">
                 <p>ДОПОГ (англ. ADR) является международным соглашением, которое было заключено более пятидесяти лет назад. В зависимости от того какие опасные грузы / на каком виде ТС будет перевозить водитель - существует 4 программы подготовки:</p>
              </div>

              <div className="space-y-6">
                 <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[32px] border border-zinc-100 dark:border-zinc-800 hover:border-orange-500 transition-all flex gap-6">
                    <BookOpen className="w-10 h-10 text-orange-600 shrink-0" />
                    <div>
                        <h4 className="text-xl font-black mb-3 text-zinc-900 dark:text-white uppercase tracking-tighter">1) Базовый курс подготовки (обязательный)</h4>
                        <p className="text-sm text-zinc-500 font-bold leading-relaxed">
                          Водитель получает основополагающие знания, включая изучение характеристик опасных грузов, требования к подвижному составу и доп. оборудованию, особенности организации перевозок, меры по предотвращению инцидентов. Выдает право перевозить ОГ в упаковках, за исключением классов 1, 7 и цистерн.
                        </p>
                    </div>
                 </div>

                 <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[32px] border border-zinc-100 dark:border-zinc-800 hover:border-orange-500 transition-all flex gap-6">
                    <Truck className="w-10 h-10 text-orange-600 shrink-0" />
                    <div>
                        <h4 className="text-xl font-black mb-3 text-zinc-900 dark:text-white uppercase tracking-tighter">2) Специализированный курс: Цистерны</h4>
                        <p className="text-sm text-zinc-500 font-bold leading-relaxed">
                          Изучение специфических вопросов, связанных с особенностями транспортировки ОГ в цистернах, динамических характеристик цистерн, способы заливки и слива. После успешной сдачи водитель имеет право перевозить опасные грузы в автоцистернах.
                        </p>
                    </div>
                 </div>

                 <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[32px] border border-zinc-100 dark:border-zinc-800 hover:border-orange-500 transition-all flex gap-6">
                    <AlertTriangle className="w-10 h-10 text-orange-600 shrink-0" />
                    <div>
                        <h4 className="text-xl font-black mb-3 text-zinc-900 dark:text-white uppercase tracking-tighter">3) Специализированный курс: Класс 1</h4>
                        <p className="text-sm text-zinc-500 font-bold leading-relaxed">
                          Особенности перевозки взрывчатых веществ и изделий, физико-химические свойства, совместная перевозка, требования к ТС и упаковкам.
                        </p>
                    </div>
                 </div>

                 <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[32px] border border-zinc-100 dark:border-zinc-800 hover:border-orange-500 transition-all flex gap-6">
                    <ShieldAlert className="w-10 h-10 text-orange-600 shrink-0" />
                    <div>
                        <h4 className="text-xl font-black mb-3 text-zinc-900 dark:text-white uppercase tracking-tighter">4) Специализированный курс: Класс 7</h4>
                        <p className="text-sm text-zinc-500 font-bold leading-relaxed">
                          Изучаются особенности перевозки радиоактивных материалов, способы радиационной защиты, требования к упаковкам и дополнительному оборудованию транспортных средств.
                        </p>
                    </div>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8 text-zinc-900 dark:text-white uppercase text-sm tracking-widest leading-none">2. Нормативная база и Требования</h2>
              <div className="space-y-6 text-lg font-bold text-zinc-600 dark:text-zinc-400">
                  <p>С 2021 года порядок выдачи свидетельств ДОПОГ о подготовке водителей ТС в России регулируется <b>Приказом Министерства транспорта РФ от 30.07.2020 №265</b>.</p>
              </div>

              <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-[40px] p-8 sm:p-12 mt-8">
                  <h3 className="text-2xl font-black text-red-900 dark:text-red-500 mb-6 uppercase flex items-center gap-3">
                     <UserCheck className="w-8 h-8" /> Требования к обучаемому
                  </h3>
                  <ul className="space-y-4 font-bold text-red-800/80 dark:text-red-500/80 text-sm">
                     <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 shrink-0" /> Наличие национального водительского удостоверения соответствующих категорий (С, СЕ или С1Е) и стаж работы в качестве водителя транспортного средства указанных категорий не менее 3 лет.</li>
                     <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 shrink-0" /> Отсутствие в течение последнего года административного наказания в виде лишения права управления транспортным средством либо административного ареста за нарушения ПДД.</li>
                  </ul>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-8 border border-zinc-100 dark:border-zinc-800 rounded-[32px]">
                    <FileText className="w-8 h-8 text-orange-600 mb-4" />
                    <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Документы для обучения</h4>
                    <ul className="space-y-2 text-sm font-bold text-zinc-500">
                       <li>1. Паспорт</li>
                       <li>2. Водительское удостоверение</li>
                       <li>3. СНИЛС</li>
                       <li>4. Действующее свидетельство ДОПОГ (при наличии)</li>
                    </ul>
                 </div>
                 <div className="p-8 border border-zinc-100 dark:border-zinc-800 rounded-[32px]">
                    <Clock className="w-8 h-8 text-orange-600 mb-4" />
                    <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Сроки обучения</h4>
                    <p className="text-sm font-bold text-zinc-500">
                       Минимальный срок обучения по программам ДОПОГ составляет <b>5 рабочих дней</b>.<br/><br/>
                       После подготовки выдается свидетельство установленного образца и направление на экзамен в Ространснадзор.
                    </p>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8 text-zinc-900 dark:text-white uppercase text-sm tracking-widest leading-none">3. Срок действия, замена и утрата</h2>
              <div className="space-y-6">
                 <div className="flex gap-6 p-6 border border-zinc-100 dark:border-zinc-800 rounded-[32px] items-center group hover:border-orange-600 transition-all">
                    <div className="text-orange-600 font-black text-4xl opacity-50 group-hover:opacity-100 transition-all">1</div>
                    <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">Срок действия свидетельства составляет <b>5 лет</b> с даты сдачи водителем экзамена по соответствующему курсу. Через 5 лет процесс получения нового начинается с прохождения обучения.</p>
                 </div>
                 <div className="flex gap-6 p-6 border border-zinc-100 dark:border-zinc-800 rounded-[32px] items-center group hover:border-orange-600 transition-all">
                    <div className="text-orange-600 font-black text-4xl opacity-50 group-hover:opacity-100 transition-all">2</div>
                    <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">В случае смены ФИО, утрате или повреждении, водитель обращается в Ространснадзор для получения дубликата. Дубликат выдается без повторной сдачи экзамена, но срок действия остается прежним.</p>
                 </div>
                 <div className="flex gap-6 p-6 border border-zinc-100 dark:border-zinc-800 rounded-[32px] items-center group hover:border-orange-600 transition-all">
                    <div className="text-orange-600 font-black text-4xl opacity-50 group-hover:opacity-100 transition-all">3</div>
                    <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">Если у водителя уже есть действующее свидетельство ДОПОГ, и ему нужно открыть новую категорию (Цистерны, Класс 1, Класс 7) — он обучается и сдает экзамен только на эту категорию. Общий срок действия оригинального документа останется прежним!</p>
                 </div>
              </div>
           </section>
           
           <section className="bg-zinc-900 p-8 sm:p-16 rounded-[48px] text-zinc-400 relative overflow-hidden group border border-zinc-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 opacity-5 blur-3xl group-hover:scale-150 transition-all duration-1000" />
              <Banknote className="w-12 h-12 text-orange-600 mb-6" />
              <h3 className="text-2xl font-black text-white mb-4 italic">Оплата госпошлины и получение</h3>
              <p className="text-lg leading-relaxed font-bold font-sans">
                 Госпошлина оплачивается после успешной сдачи экзамена. При первичном получении ДОПОГа ее размер составляет <b>2000 рублей</b>, а при переподготовке <b>650 рублей</b>.<br/><br/>
                 Ространснадзор обязан выдать пластиковое свидетельство ДОПОГ в течении <b>3 рабочих дней</b>.
              </p>
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

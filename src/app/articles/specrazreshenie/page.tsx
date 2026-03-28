import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle, Info, HelpCircle, ShieldAlert, Globe, XCircle, Clock } from "lucide-react";
import Image from "next/image";

const rejectionPoints = [
  { t: "Несоответствие документов", d: "Сведения в заявлении не совпадают с приложенными сканами СТС или свидетельств ДОПОГ." },
  { t: "Истечение срока свидетельств", d: "Срок действия свидетельства на водителя или ТС заканчивается раньше периода перевозки." },
  { t: "Отсутствие паспорта ТБ", d: "На ТС не оформлен паспорт обеспечения транспортной безопасности (согласно Постановлению №1640)." },
  { t: "Ошибка в маршруте", d: "Указанный маршрут технически не предназначен для проезда ТС с заявленными весовыми характеристиками." },
  { t: "Неверный груз", d: "Заявленный груз не относится к категории повышенной опасности (в этом случае разрешение не требуется)." }
];

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
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">16 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white">
            <span className="text-orange-600">Спецразрешение</span> на опасные грузы
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl">
             Полный юридический гайд по получению спецразрешения в Ространснадзоре. Разберем 5 причин отказа, сроки согласования и требования Приказа Минтранса №127.
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
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest">1. Законодательство и Приказы</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                 <p>Порядок выдачи специальных разрешений на движение по автомобильным дорогам транспортных средств, осуществляющих перевозки опасных грузов, установлен <b>Приказом Минтранса России от 11.04.2022 №127</b>.</p>
                 <p>Разрешение выдается Ространснадзором (Госавтодорнадзором) только для грузов повышенной опасности (Раздел 1.10.3 ДОПОГ). Если Ваш груз опасен, но не входит в этот список — получение спецразрешения <u>не требуется</u>.</p>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white uppercase text-sm tracking-widest leading-none">2. Сроки и этапы согласования</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-8 bg-zinc-900 rounded-[40px] text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 opacity-10 blur-3xl group-hover:scale-150 transition-transform" />
                    <Clock className="w-10 h-10 text-orange-600 mb-6" />
                    <h4 className="text-xl font-black mb-4 uppercase tracking-tighter italic">2 рабочих дня</h4>
                    <p className="text-xs text-zinc-400 font-bold leading-relaxed">В этот срок Ространснадзор обязан направить запрос владельцам автомобильных дорог для согласования маршрута ТС.</p>
                 </div>
                 <div className="p-8 bg-zinc-900 rounded-[40px] text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 opacity-10 blur-3xl group-hover:scale-150 transition-transform" />
                    <CheckCircle className="w-10 h-10 text-orange-600 mb-6" />
                    <h4 className="text-xl font-black mb-4 uppercase tracking-tighter italic">1 год</h4>
                    <p className="text-xs text-zinc-400 font-bold leading-relaxed">Максимальный срок, на который выдается разрешение. Оно может быть аннулировано при истечении срока ДОПОГ на водителя или ТС.</p>
                 </div>
              </div>
           </section>

           <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 sm:p-16 rounded-[48px] border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-950/20">
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white uppercase text-sm tracking-widest">3. Особенности отказа в выдаче</h2>
              <p className="text-sm text-zinc-400 font-black mb-10 uppercase tracking-widest italic">Почему 30% заявок отклоняются:</p>
              <div className="space-y-4">
                 {rejectionPoints.map((p, i) => (
                    <div key={i} className="flex gap-6 items-start p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 group hover:border-orange-600 transition-all">
                       <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                       <div>
                          <h5 className="font-black text-zinc-900 dark:text-white mb-1 uppercase text-xs tracking-widest">{p.t}</h5>
                          <p className="text-xs text-zinc-500 font-bold leading-relaxed">{p.d}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-[40px] p-8 sm:p-12">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                 <div className="w-24 h-24 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-12 h-12 text-red-600" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-red-900 dark:text-red-500 mb-4">Безопасность (Постановление №1640)</h3>
                    <p className="text-lg text-red-800/80 dark:text-red-500/70 font-bold leading-relaxed">
                       С 2021 года отсутствие паспорта транспортной безопасности ТС является законным основанием для отказа в выдаче спецразрешения. Убедитесь, что Ваше транспортное средство внесено в реестр категорированных объектов.
                    </p>
                 </div>
              </div>
           </section>

           <section className="bg-orange-600 rounded-[56px] p-12 sm:p-24 text-white text-center shadow-3xl shadow-orange-900/40 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 blur-3xl transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-all duration-1000" />
              <Globe className="w-20 h-20 mx-auto mb-8 text-white drop-shadow-lg" />
              <h2 className="text-4xl sm:text-6xl font-black mb-6">Нужна помощь?</h2>
              <p className="text-xl mb-12 opacity-80 max-w-xl mx-auto font-medium font-sans italic">
                 Раздел «Спецразрешения» — один из сложнейших в курсе ДОПОГ. Подготовьтесь к тестам и разберите все правовые тонкости на нашем тренажере.
              </p>
              <Link 
                 href="/#courses" 
                 className="inline-flex bg-black text-white px-16 py-6 rounded-3xl font-black text-xl hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl"
              >
                 Курсы подготовки
              </Link>
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

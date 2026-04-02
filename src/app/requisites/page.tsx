import Link from "next/link";
import { ArrowLeft, Building2, CreditCard, FileText, Phone, Mail, MapPin, User, ShieldCheck, Download } from "lucide-react";

export default function RequisitesPage() {
  const requisites = [
    { label: "Полное наименование", value: "Общество с ограниченной ответственностью «Учебный центр Технологии Знаний»" },
    { label: "Краткое наименование", value: "ООО «УЦ Технологии Знаний»" },
    { label: "Юридический адрес", value: "344029, г. Ростов-на-Дону, ул. 1-й Конной Армии, зд. 15, ком. 2а" },
    { label: "Фактический адрес", value: "344029, г. Ростов-на-Дону, ул. 1-й Конной Армии, зд. 15, ком. 2а" },
    { label: "ИНН", value: "6166132362" },
    { label: "КПП", value: "616601001" },
    { label: "ОГРН", value: "1256100004654" },
    { label: "Наименование банка", value: "АО «ТБанк»" },
    { label: "Расчетный счет", value: "40702810710001873124" },
    { label: "Корреспондентский счет", value: "30101810145250000974" },
    { label: "БИК", value: "044525974" },
    { label: "Лицензия", value: "№ Л035-01276-61/02274118 от 05.05.2025г." },
    { label: "Руководитель", value: "Директор, Карманович Виктория Игоревна" },
    { label: "Основание деятельности", value: "Устав" },
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-24 font-sans selection:bg-orange-500/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-orange-600 transition-all mb-12 group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> На главную
        </Link>
        
        {/* Header Section */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-black uppercase tracking-widest mb-6">
            <Building2 className="w-3 h-3" /> Официальная информация
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-8 tracking-tighter text-zinc-900 dark:text-white leading-none">
            Реквизиты <span className="text-orange-600">организации</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed">
            Полные юридические и банковские сведения ООО «Учебный центр Технологии Знаний» для оформления договоров и официальных запросов.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Table Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl shadow-zinc-200/50 dark:shadow-none">
               <div className="p-8 sm:p-12">
                  <div className="space-y-8">
                    {requisites.map((item, index) => (
                      <div key={index} className="group">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6 group-last:border-0 group-last:pb-0">
                          <span className="text-xs font-black uppercase tracking-widest text-zinc-400 shrink-0 min-w-[180px]">
                            {item.label}
                          </span>
                          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 break-words text-left sm:text-right">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            {/* Quick Contacts */}
            <div className="bg-orange-600 p-10 rounded-[40px] text-white shadow-xl shadow-orange-900/20">
               <h3 className="text-2xl font-black mb-8 tracking-tight">Свяжитесь с нами</h3>
               <div className="space-y-6">
                  <a href="tel:+79934520505" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Телефон</p>
                      <p className="font-bold">+7 993 452 05 05</p>
                    </div>
                  </a>
                  <a href="mailto:znania.group@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Email</p>
                      <p className="font-bold whitespace-nowrap">znania.group@gmail.com</p>
                    </div>
                  </a>
               </div>
            </div>

            {/* Verification Badge */}
            <div className="bg-zinc-900 p-10 rounded-[40px] border border-zinc-800">
               <div className="w-12 h-12 rounded-2xl bg-orange-600/20 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-orange-600" />
               </div>
               <h3 className="text-xl font-bold text-white mb-4 italic">Лицензированный центр</h3>
               <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  Мы осуществляем образовательную деятельность на основании лицензии № Л035-01276-61/02274118. Проверить статус можно в реестре Рособрнадзора.
               </p>
               <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95">
                  <Download className="w-4 h-4" /> Скачать реквизиты (PDF)
               </button>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800 text-center">
           <p className="text-sm text-zinc-400 font-medium">
             © 2026 ООО «Учебный центр Технологии Знаний». <br className="sm:hidden" />
             Все данные актуальны на текущий момент.
           </p>
        </div>
      </div>
    </div>
  );
}

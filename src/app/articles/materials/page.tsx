import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Globe, FileStack, ShieldAlert } from "lucide-react";

const materials = [
  {
    title: "ДОПОГ 2025 — Том 1 (Официальное издание ООН)",
    description: "Полная действующая редакция Приложения А на русском языке. Включает общие положения, классификацию опасных веществ (Классы 1–9) и перечень опасных грузов (Таблица А). Данный документ является первоисточником для всех экзаменационных вопросов.",
    link: "https://unece.org/sites/default/files/2025-01/2412006_R_ECE_TRANS_352_Vol.I_WEB.pdf",
    type: "PDF (UNECE) • 2026",
    icon: <Globe className="w-5 h-5 text-blue-500" />
  },
  {
    title: "ДОПОГ 2025 — Том 2 (Официальное издание ООН)",
    description: "Второй том соглашения, содержащий Приложение В. Охватывает требования к транспортному оборудованию, конструкцию транспортных средств (FL, AT, EX/III), требования к экипажу, маркировке упаковок и проведению транспортных операций.",
    link: "https://unece.org/sites/default/files/2025-01/2412010_R_ECE_TRANS_352_Vol.II_WEB.pdf",
    type: "PDF (UNECE) • 2026",
    icon: <Globe className="w-5 h-5 text-blue-500" />
  },
  {
    title: "Список экзаменационных вопросов",
    description: "Официальный перечень экзаменационных вопросов для водителей и консультантов по вопросам безопасности перевозки опасных грузов.",
    link: "https://rosavtotransport.ru/ru/activities/dangerous-goods/examination-questions/",
    type: "Росавтотранс",
    icon: <FileStack className="w-5 h-5 text-yellow-500" />
  },
  {
    title: "Адрес экзаменационных комиссий",
    description: "Актуальные адреса региональных экзаменационных комиссий Ространснадзора для сдачи экзамена ДОПОГ по всей России.",
    link: "https://rosavtotransport.ru/ru/activities/dangerous-goods/exam-boards-address/",
    type: "Росавтотранс",
    icon: <Globe className="w-5 h-5 text-blue-500" />
  }
];

export default function MaterialsPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-20 font-sans">
      <article className="max-w-4xl mx-auto px-4">
        {/* Navigation Header */}
        <header className="mb-12 text-center md:text-left">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-yellow-600 transition-colors mb-8 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
             К списку статей
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div>
                <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight tracking-tight">
                  Полезные материалы по <span className="text-yellow-500">ДОПОГ 2026</span>
                </h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium max-w-2xl">
                   Собрали для вас все необходимые документы, ссылки на официальные источники и учебные пособия для профессиональной подготовки.
                </p>
             </div>
          </div>
        </header>

        {/* Materials Grid */}
        <div className="space-y-6 mb-16">
          {materials.map((m, i) => (
            <a 
              key={i} 
              href={m.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col sm:flex-row items-center gap-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[32px] hover:border-yellow-500 transition-all group"
            >
              <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110">
                 {m.icon}
              </div>
              <div className="flex-1 text-center sm:text-left">
                 <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">{m.type}</div>
                 <h2 className="text-2xl font-black mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">{m.title}</h2>
                 <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {m.description}
                 </p>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                 <div className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-xs transition-colors group-hover:bg-yellow-500 group-hover:text-black flex items-center gap-2">
                    Открыть <ExternalLink className="w-4 h-4" />
                 </div>
              </div>
            </a>
          ))}
        </div>

        {/* Important Warning */}
        <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-3xl p-8 sm:p-12 mb-20 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center text-red-600 shrink-0">
               <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
               <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">Осторожно: Устаревшие данные</h3>
               <p className="text-sm text-red-800/80 dark:text-red-500/60 font-medium leading-relaxed">
                  Будьте внимательны при поиске билетов и учебников на сторонних ресурсах. Использование материалов редакций 2021-2023 гг. может привести к ошибкам на экзамене Ространснадзора в 2026 году. Пользуйтесь только проверенными источниками!
               </p>
            </div>
        </div>

        {/* Conversion Block */}
        <section className="bg-yellow-500 rounded-3xl p-10 sm:p-16 text-black text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
           <header className="mb-8">
              <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">Нужна практика?</h2>
              <p className="text-lg font-bold opacity-80 max-w-xl mx-auto">
                 Теория — это хорошо, но без решения тестов сдать сложно. Переходите к тренажеру экзамена ДОПОГ 2026.
              </p>
           </header>
           <Link 
             href="/#courses" 
             className="inline-flex bg-black text-white px-12 py-5 rounded-2xl font-black hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-yellow-900/10"
           >
             Начать тесты бесплатно
           </Link>
        </section>
      </article>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto px-4 mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-400">
         <p>© 2026 ДОПОГ Экзамен</p>
         <div className="flex gap-6">
            <Link href="/articles" className="hover:text-yellow-600 transition-colors transition-all">Другие статьи</Link>
            <Link href="/" className="hover:text-yellow-600 transition-colors transition-all">Главная</Link>
         </div>
      </footer>
    </div>
  );
}

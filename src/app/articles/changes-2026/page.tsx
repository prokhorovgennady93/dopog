import Link from "next/link";
import { ArrowLeft, BookOpen, AlertTriangle, ShieldCheck, Microscope, Info, ChevronRight, FileDigit } from "lucide-react";
import Image from "next/image";

export default function Changes2026Page() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-10 sm:py-20 font-sans">
      <article className="max-w-4xl mx-auto px-4">
        {/* Navigation Header */}
        <header className="mb-12">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-yellow-600 transition-colors mb-8 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
             Назад к базе знаний
          </Link>
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Аналитика 2026</span>
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">15 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white">
            Полный обзор изменений <span className="text-orange-600">ДОПОГ 2026</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-10 max-w-3xl">
             Перевозка опасных грузов автомобильным транспортом в 2026 году регулируется обновленным соглашением ДОПОГ (ADR 2025/2026), которое вносит существенные коррективы в классификацию, маркировку и сопроводительную документацию. Мы подготовили самый объемный и подробный гайд для водителей и экспертов.
          </p>
          
          {/* Main Banner Image */}
          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl shadow-orange-950/20 mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/images/articles/hero.png" 
                alt="ДОПОГ 2026 Изменения" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 sm:p-12">
                <span className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2">Exclusive Insight</span>
                <p className="text-white text-2xl font-black max-w-md">Безопасность. Цифровизация. Контроль. Ключевые тренды 2026 года.</p>
             </div>
          </div>
        </header>

        {/* Long Content Section */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16">
           
           {/* Section 1: Intro Expansion */}
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 flex items-center gap-4">
                 <div className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black shrink-0 shadow-xl">1</div>
                 Введение: Структура и правовые рамки
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                 <p>
                    ДОПОГ (ADR) — это Европейское соглашение о международной дорожной перевозке опасных грузов, принятое в Женеве более 60 лет назад. В 2026 году в России полностью действуют положения редакции 2025 года, которые стали обязательными после завершения шестимесячного переходного периода. 
                 </p>
                 <p>
                    Важно понимать, что Постановление Правительства РФ №2200 напрямую ссылается на Приложения А и В ДОПОГ как на основной регулятор внутрироссийских перевозок. Поэтому знание международных стандартов — это не выбор, а законная обязанность каждого участника логистической цепочки. 
                 </p>
                 <p>
                    Приложение А (Части 1-7) фокусируется на самих грузах: их классификации, упаковке, маркировке и условиях погрузки. Приложение В (Части 8-9) детально описывает требования к транспортным средствам и персоналу. В 2026 году мы видим фундаментальный сдвиг в обеих частях.
                 </p>
              </div>
           </section>

           {/* Section 2: Technical Breakdown */}
           <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 sm:p-16 rounded-[48px] border border-zinc-100 dark:border-zinc-800">
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8">Технические изменения 2025/2026</h2>
              
              <div className="grid grid-cols-1 gap-12">
                 <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center shrink-0 shadow-sm">
                       <Microscope className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold mb-4">Классификация и новые ООН номера</h3>
                       <p className="text-zinc-500 dark:text-zinc-400 mb-6">В перечень опасных веществ добавлены новые позиции, в частности для химических продуктов под давлением и новых видов аккумуляторных батарей. Особое внимание уделено разделу 2.1.5 (Изделия, содержащие опасные грузы, н.у.к.).</p>
                       <ul className="space-y-3 text-sm font-bold">
                          <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-500" /> Обновленные требования к литиевым батареям (UN 3536)</li>
                          <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-500" /> Изменения в Группах Упаковки для Класса 8</li>
                       </ul>
                    </div>
                 </div>

                 <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center shrink-0 shadow-sm">
                       <FileDigit className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold mb-4">Электронные транспортные документы (e-ADR)</h3>
                       <p className="text-zinc-500 dark:text-zinc-400">2026 год станет переломным для внедрения цифровых накладных. Новые поправки в Раздел 5.4.0.2 ДОПОГ легализуют использование электронных носителей информации вместо бумажных транспортных документов при условии обеспечения их доступности для инспекционных органов.</p>
                       <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl">
                          <p className="text-sm font-black text-orange-700 dark:text-yellow-500 flex items-center gap-2">
                             <Info className="w-4 h-4" /> Важно: Устройство должно быть доступно для проверки в любой момент пути!
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           {/* More Detailed Sections to reach the 12-15x expansion */}
           <section>
              <h2 className="text-3xl font-black mb-8">Экологические требования и маркировка</h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium mb-8">
                 С 2025-2026 гг. ужесточаются требования к веществам, опасным для окружающей среды (Environmental Hazardous Substances). Знак «Рыба и дерево» теперь обязателен даже для небольших количеств, если они перевозятся как опасный груз в соответствии со специальными положениями 335 и 375.
              </p>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium mb-12">
                 Внесены изменения в критерии классификации водных загрязнителей. Теперь расчет токсичности (острой и хронической) должен производиться по более строгому алгоритму GHS, что может привести к тому, что грузы, ранее считавшиеся безопасными, попадут под действие 9-го класса опасности.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="border border-zinc-100 dark:border-zinc-800 p-8 rounded-3xl hover:border-orange-500 transition-colors">
                    <AlertTriangle className="w-8 h-8 text-orange-600 mb-6" />
                    <h4 className="font-bold mb-3 text-lg">Поврежденные батареи</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Специальное положение 376 детально описывает перевозку литиевых батарей, которые могут иметь дефекты или повреждения. Для них требуется специальная тара (упаковочная инструкция P911 или LP906), предотвращающая выброс тепла и пламени.</p>
                 </div>
                 <div className="border border-zinc-100 dark:border-zinc-800 p-8 rounded-3xl hover:border-orange-500 transition-colors">
                    <ShieldCheck className="w-8 h-8 text-orange-600 mb-6" />
                    <h4 className="font-bold mb-3 text-lg">Защита от искр</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">В Главе 9.2 (Требования к ТС) изменены требования к электрооборудованию транспортных средств типов FL и EX/III. Особое внимание уделено защите проводки от механических повреждений и искрообразования.</p>
                 </div>
              </div>
           </section>

           <section className="bg-orange-600 rounded-[48px] p-10 sm:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 max-w-2xl">
                 <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">Проверьте свои знания в тестах 2026</h2>
                 <p className="text-white/80 text-xl font-bold mb-10">
                    Все описанные изменения уже внедрены в нашу базу вопросов. Начните подготовку по самым актуальным билетам, одобренным Ространснадзором.
                 </p>
                 <Link 
                    href="/#courses" 
                    className="inline-flex bg-white text-orange-600 px-12 py-5 rounded-2xl font-black hover:bg-zinc-100 transition-all active:scale-95 shadow-2xl shadow-orange-900/40"
                 >
                    Проверить себя
                 </Link>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8">Заключение: Как подготовиться?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { t: "Обновите документы", d: "Проверьте срок действия свидетельств ДОПОГ и сертификатов на цистерны." },
                   { t: "Перейдите на e-ADR", d: "Изучите возможности использования электронных накладных в вашем регионе." },
                   { t: "Регулярное обучение", d: "Проходите тесты ежемесячно, чтобы не терять хватку и быть в курсе малейших правок." }
                 ].map((box, i) => (
                    <div key={i} className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl">
                       <div className="text-orange-600 font-black mb-4">0{i+1}</div>
                       <h4 className="font-bold mb-2">{box.t}</h4>
                       <p className="text-xs text-zinc-500 font-medium">{box.d}</p>
                    </div>
                 ))}
              </div>
           </section>

        </div>
      </article>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto px-4 mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-400">
         <p>© 2026 ДОПОГ Экзамен</p>
         <div className="flex gap-6">
            <Link href="/articles" className="hover:text-orange-500 transition-colors">База знаний</Link>
            <Link href="/" className="hover:text-orange-500 transition-colors">Главная</Link>
         </div>
      </footer>
    </div>
  );
}

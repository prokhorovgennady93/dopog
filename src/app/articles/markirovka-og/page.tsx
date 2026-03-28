import Link from "next/link";
import { ArrowLeft, AlertCircle, Info, ShieldCheck, HelpCircle } from "lucide-react";
import Image from "next/image";

export default function MarkingPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-10 sm:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation Header */}
        <header className="mb-12">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-orange-600 transition-colors mb-8 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
             Назад к библиотеке
          </Link>
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Library</span>
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">10 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white">
            Маркировка <span className="text-orange-600">ОГ</span>: Знаки и Таблички
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl">
             Правильная маркировка опасного груза — это основа безопасности дорожного движения. Ошибки в размещении информационных табло или знаков опасности ведут к огромным штрафам и задержкам на постах ГИБДД.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/adr_marking_signs_1774706797521.png" 
                alt="Маркировка ДОПОГ" 
                fill 
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-2xl font-black max-w-md">ГОСТ Р 57479-2017: Стандарты маркировки 2026 года.</p>
             </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 flex items-center gap-4">
                 Общие требования к маркировке
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium font-sans">
                 <p>
                    Маркировка опасных грузов должна быть четкой, долговечной и видимой. В соответствии с разделом 5.2 ДОПОГ, на каждую упаковку должны быть нанесены знаки опасности, соответствующие классу груза, и номер ООН с предшествующими ему буквами «UN».
                 </p>
                 <p>
                    Для морских перевозок (или мультимодальных маршрутов) маркировка должна оставаться разборчивой даже после пребывания в морской воде в течение 3 месяцев. Это требование подчеркивает важность использования качественных самоклеящихся материалов, устойчивых к агрессивной среде.
                 </p>
              </div>
           </section>

           <section className="bg-zinc-50 dark:bg-zinc-900 p-8 sm:p-12 rounded-[40px] border border-zinc-100 dark:border-zinc-800">
              <h3 className="text-2xl font-black mb-8">Информационные таблицы (Оранжевые плиты)</h3>
              <div className="space-y-6 text-zinc-500 font-medium">
                 <p>Транспортные единицы, перевозящие опасные грузы, должны иметь две вертикальные прямоугольные оранжевые таблицы размером 400x300 мм. Одна из них должна крепиться спереди, а другая — сзади транспортной единицы.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm">
                       <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Верхнее число</h4>
                       <p className="text-sm">Идентификационный номер опасности (HIN). Указывает на тип опасности груза.</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm">
                       <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Нижнее число</h4>
                       <p className="text-sm">Номер ООН (UN). Указывает на конкретное вещество или группу веществ.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8">Знаки опасности (Hazard Diamonds)</h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium mb-8">
                 Знаки опасности имеют форму ромба с углом 45 градусов. Минимальный размер знака на упаковке — 100x100 мм. На цистернах используются «большие знаки опасности» (плакаты) размером не менее 250x250 мм.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {[
                   { id: "1", n: "Взрывчатые вещества" },
                   { id: "2", n: "Газы" },
                   { id: "3", n: "Легковоспламеняющиеся жидкости" },
                   { id: "4", n: "Твердые вещества" },
                   { id: "5", n: "Окислители" },
                   { id: "8", n: "Коррозионные вещества" }
                 ].map((c) => (
                    <div key={c.id} className="bg-zinc-900 p-6 rounded-2xl text-center">
                       <div className="text-orange-500 font-black text-2xl mb-2">Класс {c.id}</div>
                       <div className="text-[10px] text-white/50 uppercase font-bold tracking-widest">{c.n}</div>
                    </div>
                 ))}
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8">Специальная маркировка</h2>
              <div className="space-y-6">
                 <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center shrink-0">
                       <ShieldCheck className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Вещества, опасные для среды</h4>
                       <p className="text-zinc-500 text-sm">Маркировочный знак «Рыба и дерево». Обязателен для веществ, классифицированных как загрязнители водной среды (ADR 2.2.9.1.10).</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center shrink-0">
                       <AlertCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Повышенная температура</h4>
                       <p className="text-zinc-500 text-sm">Треугольник с изображением термометра. Обязателен при перевозке жидкостей при T ≥ 100°C или твердых веществ при T ≥ 240°C.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-orange-600 rounded-[56px] p-12 sm:p-24 text-white text-center">
              <HelpCircle className="w-20 h-20 mx-auto mb-8 text-white" />
              <h2 className="text-4xl sm:text-6xl font-black mb-6">Сдаете экзамен?</h2>
              <p className="text-xl mb-12 opacity-80 max-w-xl mx-auto font-medium">
                 Вопросы по маркировке — одни из самых популярных в тестах ДОПОГ. Закрепите теорию на практике прямо сейчас.
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

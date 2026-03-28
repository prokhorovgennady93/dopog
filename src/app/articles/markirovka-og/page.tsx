import Link from "next/link";
import { ArrowLeft, AlertCircle, Info, ShieldCheck, HelpCircle, ChevronRight } from "lucide-react";
import Image from "next/image";

const hinCodes = [
  { c: "20", d: "Удушающий газ или газ, не представляющий дополнительной опасности" },
  { c: "22", d: "Охлажденный сжиженный газ, удушающий" },
  { c: "223", d: "Охлажденный сжиженный газ, воспламеняющийся" },
  { c: "225", d: "Охлажденный сжиженный газ, окисляющий (интенсифицирующий горение)" },
  { c: "23", d: "Воспламеняющийся газ" },
  { c: "238", d: "Воспламеняющийся газ, коррозионный" },
  { c: "239", d: "Воспламеняющийся газ, способный к самопроизвольной полимеризации" },
  { c: "25", d: "Окисляющий (интенсифицирующий горение) газ" },
  { c: "26", d: "Токсичный газ" },
  { c: "263", d: "Токсичный газ, воспламеняющийся" },
  { c: "265", d: "Токсичный газ, окисляющий (интенсифицирующий горение)" },
  { c: "268", d: "Токсичный газ, коррозионный" },
  { c: "30", d: "Легковоспламеняющаяся жидкость (t всп от 23°С до 60°С)" },
  { c: "323", d: "Легковоспламеняющаяся жидкость, реагирующая с водой с выделением воспл. газов" },
  { c: "X323", d: "Легк. воспл. жидкость, опасно реагирующая с водой с выделением воспл. газов" },
  { c: "33", d: "Легковоспламеняющаяся жидкость (t всп ниже 23°С)" },
  { c: "333", d: "Пирофорная жидкость" },
  { c: "X333", d: "Пирофорная жидкость, опасно реагирующая с водой" },
  { c: "336", d: "Сильновоспламеняющаяся жидкость, токсичная" },
  { c: "338", d: "Сильновоспламеняющаяся жидкость, коррозионная" },
  { c: "339", d: "Сильновоспламеняющаяся жидкость, способная к самопроизвольной полимеризации" },
  { c: "36", d: "Легковоспламеняющаяся жидкость, токсичная" },
  { c: "X362", d: "Легк. воспл. жидкость, токсичная, опасно реагирующая с водой с выд. воспл. газов" },
  { c: "38", d: "Легковоспламеняющаяся жидкость, коррозионная" },
  { c: "382", d: "Легк. воспл. жидкость, коррозионная, реагирующая с водой с выд. воспл. газов" },
  { c: "X382", d: "Легк. воспл. жидкость, коррозионная, опасно реагирующая с водой с выд. воспл. газов" },
  { c: "39", d: "Легковоспламеняющаяся жидкость, способная к самопроизвольной полимеризации" },
  { c: "40", d: "Легковоспламеняющееся твердое вещество или самореактивное вещество" },
  { c: "423", d: "Твердое вещество, реагирующее с водой с выделением воспламеняющихся газов" },
  { c: "X423", d: "Твердое вещество, опасно реагирующее с водой с выделением воспламеняющихся газов" },
  { c: "43", d: "Самонагревающееся (пирофорное) твердое вещество" },
  { c: "44", d: "Легковоспламеняющееся твердое вещество, находящееся в расплавленном состоянии" },
  { c: "446", d: "Легковоспламеняющееся твердое в-во, расплавленное при пов. температуре, токсичное" },
  { c: "46", d: "Легковоспламеняющееся твердое вещество, токсичное" },
  { c: "48", d: "Легковоспламеняющееся твердое вещество, коррозионное" },
  { c: "50", d: "Окисляющее (интенсифицирующее горение) вещество" },
  { c: "539", d: "Легковоспламеняющийся органический пероксид" },
  { c: "55", d: "Сильноокисляющее вещество" },
  { c: "556", d: "Сильноокисляющее вещество, токсичное" },
  { c: "558", d: "Сильноокисляющее вещество, коррозионное" },
  { c: "559", d: "Сильноокисляющее вещество, способное к самопроизвольной полимеризации" },
  { c: "56", d: "Окисляющее вещество, токсичное" },
  { c: "568", d: "Окисляющее вещество, коррозионное" },
  { c: "58", d: "Окисляющее вещество, коррозионное" },
  { c: "59", d: "Окисляющее вещество, способное к самопроизвольной полимеризации" },
  { c: "60", d: "Токсичное или слаботоксичное вещество" },
  { c: "606", d: "Инфекционное вещество" },
  { c: "623", d: "Токсичная жидкость, реагирующая с водой с выделением воспламеняющихся газов" },
  { c: "63", d: "Токсичное вещество, воспламеняющееся (t всп от 23°С до 60°С)" },
  { c: "638", d: "Токсичное вещество, воспламеняющееся, коррозионное" },
  { c: "639", d: "Токсичное вещество, воспламеняющееся, способное к самопроизвольной полимеризации" },
  { c: "642", d: "Токсичное твердое вещество, реагирующее с водой с выделением воспламеняющихся газов" },
  { c: "66", d: "Сильнотоксичное вещество" },
  { c: "663", d: "Сильнотоксичное вещество, воспламеняющееся (t всп не выше 60°С)" },
  { c: "664", d: "Сильнотоксичное твердое вещество, воспламеняющееся или самонагревающееся" },
  { c: "665", d: "Сильнотоксичное вещество, окисляющее (интенсифицирующее горение)" },
  { c: "668", d: "Сильнотоксичное вещество, коррозионное" },
  { c: "669", d: "Сильнотоксичное в-во, способное к самопроизвольной полимеризации" },
  { c: "68", d: "Токсичное вещество, коррозионное" },
  { c: "69", d: "Токсичное вещество, способное к самопроизвольной полимеризации" },
  { c: "70", d: "Радиоактивный материал" },
  { c: "78", d: "Радиоактивный материал, коррозионный" },
  { c: "80", d: "Коррозионное или слабокоррозионное вещество" },
  { c: "X80", d: "Коррозионное вещество, опасно реагирующее с водой" },
  { c: "823", d: "Коррозионная жидкость, реагирующая с водой с выд. воспламеняющихся газов" },
  { c: "83", d: "Коррозионное вещество, воспламеняющееся (t всп от 23°С до 60°С)" },
  { c: "X83", d: "Коррозионное в-во, воспламеняющееся, опасно реагирующее с водой" },
  { c: "839", d: "Коррозионное в-во, воспламеняющееся, способное к самопроизвольной полимеризации" },
  { c: "842", d: "Коррозионное твердое вещество, реагирующее с водой с выд. воспл. газов" },
  { c: "85", d: "Коррозионное вещество, окисляющее (интенсифицирующее горение)" },
  { c: "856", d: "Коррозионное в-во, окисляющее и токсичное" },
  { c: "86", d: "Коррозионное вещество, токсичное" },
  { c: "88", d: "Сильнокоррозионное вещество" },
  { c: "X88", d: "Сильнокоррозионное вещество, опасно реагирующее с водой" },
  { c: "883", d: "Сильнокоррозионное вещество, воспламеняющееся (t всп от 23°С до 60°С)" },
  { c: "885", d: "Сильнокоррозионное вещество, окисляющее (интенсифицирующее горение)" },
  { c: "886", d: "Сильнокоррозионное вещество, токсичное" },
  { c: "X886", d: "Сильнокоррозионное вещество, токсичное, опасно реагирующее с водой" },
  { c: "89", d: "Коррозионное вещество, способное к самопроизвольной полимеризации" },
  { c: "90", d: "Опасное для окружающей среды вещество; прочие опасные вещества" },
  { c: "99", d: "Прочие опасные вещества, перевозимые при повышенной температуре" }
];

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
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">20 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white">
            Маркировка <span className="text-orange-600">ОГ</span>: Знаки и Таблички
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl">
             Полный технический гайд по маркировке опасных грузов в соответствии с ДОПОГ и ГОСТ Р 57479-2017. Исчерпывающие списки кодов и требования к материалам.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/images/articles/marking.png" 
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
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8">Общие требования к маркировке</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                 <p>Маркировка опасных грузов — это не просто наклейка, а технически строго регламентированный элемент безопасности. Основной документ — <b>ГОСТ Р 57479-2017 «Грузы опасные. Маркировка»</b>.</p>
                 <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-widest text-xs">Технические характеристики носителей:</h4>
                    <ul className="space-y-4 text-sm font-bold">
                       <li className="flex items-start gap-3"><ChevronRight className="w-4 h-4 text-orange-600 shrink-0 mt-1" /> Толщина пленки: не менее 60 микрон.</li>
                       <li className="flex items-start gap-3"><ChevronRight className="w-4 h-4 text-orange-600 shrink-0 mt-1" /> Клеевой слой: адгезия не менее 7 Н/см при угле 180°.</li>
                       <li className="flex items-start gap-3"><ChevronRight className="w-4 h-4 text-orange-600 shrink-0 mt-1" /> Долговечность: сохранность после 3-месячного пребывания в морской воде.</li>
                    </ul>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 uppercase text-sm tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-4">Таблицы HIN-кодов (Приложение А)</h2>
              <p className="text-sm text-zinc-400 mb-8 font-bold">Ниже представлен полный список идентификационных номеров опасности (верхнее число на оранжевой плите).</p>
              <div className="overflow-hidden rounded-3xl border border-zinc-100 dark:border-zinc-800">
                 <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                       <thead className="sticky top-0 bg-zinc-900 text-white z-10">
                          <tr>
                             <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Код</th>
                             <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Значение опасности</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                          {hinCodes.map((item) => (
                             <tr key={item.c} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                                <td className="px-6 py-3 font-black text-orange-600 font-mono">{item.c}</td>
                                <td className="px-6 py-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium">{item.d}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
              <div className="mt-8 bg-amber-500/10 border-l-4 border-amber-600 p-6 rounded-r-2xl">
                 <p className="text-sm font-bold text-amber-700 dark:text-amber-500">
                    <AlertCircle className="inline w-4 h-4 mr-2" /> 
                    Буква «X» перед цифровым кодом означает, что вещество опасно реагирует с водой!
                 </p>
              </div>
           </section>

           <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-zinc-50 dark:bg-zinc-900 p-10 rounded-[48px] border border-zinc-100 dark:border-zinc-800">
                 <h3 className="text-2xl font-black mb-6">Оранжевые плиты</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed mb-8">Прямоугольные плиты размером 400x300 мм. При небольших габаритах ТС допускается размер 300x120 мм с кантом 10 мм.</p>
                 <div className="space-y-4">
                    <div className="flex gap-4 items-center p-4 bg-white dark:bg-zinc-950 rounded-2xl shadow-sm">
                       <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0">1</div>
                       <p className="text-xs font-bold">Спереди и сзади для ТС с упаковками.</p>
                    </div>
                    <div className="flex gap-4 items-center p-4 bg-white dark:bg-zinc-950 rounded-2xl shadow-sm">
                       <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0">2</div>
                       <p className="text-xs font-bold">На боковых сторонах цистерн (для каждого отсека).</p>
                    </div>
                 </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-10 rounded-[48px] border border-zinc-100 dark:border-zinc-800">
                 <h3 className="text-2xl font-black mb-6">Знаки на упаковках</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed mb-8">Минимальный размер 100x100 мм. На баллонах Класса 2 малого объема допускается уменьшение размера.</p>
                 <ul className="space-y-2 text-sm font-bold">
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-600" /> Номер ООН (высота букв {'>'} 12 мм)</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-600" /> Текстовые надписи (если требуются)</li>
                 </ul>
              </div>
           </section>

           <section className="bg-orange-600 rounded-[56px] p-12 sm:p-24 text-white text-center shadow-3xl shadow-orange-900/10">
              <HelpCircle className="w-20 h-20 mx-auto mb-8 text-white" />
              <h2 className="text-4xl sm:text-6xl font-black mb-6">Сдаете экзамен?</h2>
              <p className="text-xl mb-12 opacity-80 max-w-xl mx-auto font-medium">
                 Вопросы по HIN-кодам и маркировке — одни из самых популярных в тестах ДОПОГ. Закрепите теорию на практике прямо сейчас.
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

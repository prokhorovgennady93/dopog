import Link from "next/link";
import { ArrowLeft, Copyright, Shield, FileText, Globe, AlertCircle } from "lucide-react";

export default function CopyrightPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-24 font-sans text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-orange-600 transition-colors mb-12 group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> На главную
        </Link>
        
        <h1 className="text-4xl sm:text-6xl font-black mb-12 tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Авторские <span className="text-orange-600">права</span>
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 font-medium">
          <section className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 italic text-sm">
             Настоящая страница содержит информацию о правах собственности и правилах использования материалов, размещенных на сайте prodopog.ru.
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" /> 1. Общие положения
             </h2>
             <div className="space-y-4">
                <p>
                  Вся текстовая информация, элементы дизайна, технические решения, текстовая и графическая часть вопросов, тестов и комментарии к ним (далее по тексту — Материалы) на сайте <a href="https://prodopog.ru/" className="text-orange-600 hover:underline">https://prodopog.ru/</a> (далее по тексту — Сайт), являются собственностью ООО «УЦ Технологии Знаний».
                </p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" /> 2. Правила использования
             </h2>
             <div className="space-y-4">
                <p>
                  Копирование и воспроизведение Материалов в любой форме, их распространение, преобразование, в том числе, но не ограничиваясь, перевод, переработка, совмещение между собой, с материалами третьих лиц возможны исключительно на основании письменного разрешения ООО «УЦ Технологии Знаний».
                </p>
                <p>
                  Не допускается любые изменения Материалов в том числе, но не ограничиваясь, переработка, дополнения, снятие вотермарков с изображений.
                </p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-600" /> 3. Ограничения
             </h2>
             <div className="space-y-4">
                <p>
                  Использование (копирование, изменение, переработка, воспроизведение на сторонних ресурсах) Материалов без письменного разрешения ООО «УЦ Технологии Знаний» допускается только в информационных или личных целях, такое использование должно носить некоммерческий и непубличный характер.
                </p>
             </div>
          </section>

          <section className="bg-orange-600/5 border border-orange-600/20 p-8 rounded-3xl">
             <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" /> 4. Обязательные условия
             </h2>
             <ul className="list-disc pl-6 space-y-3">
                <li>При использовании Материалов обязательно размещение ссылки на источник <a href="https://prodopog.ru/" className="text-orange-600 hover:underline">https://prodopog.ru/</a>.</li>
                <li>При использовании никакие Материалы, расположенные на Сайте, не должны изменяться никаким способом.</li>
                <li>Никакие визуальные материалы, расположенные на Сайте, не должны использоваться отдельно от сопровождающего их текста.</li>
             </ul>
          </section>

          <section className="bg-zinc-900 p-8 sm:p-12 rounded-[40px] text-zinc-400">
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Copyright className="w-5 h-5 text-orange-600" /> 2026 ООО «УЦ Технологии Знаний»
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div>
                   <p className="font-bold text-zinc-200">ООО «УЦ Технологии Знаний»</p>
                   <p>ИНН 6166132362</p>
                   <p>Email: <a href="mailto:znania.group@gmail.com" className="text-orange-600 hover:underline">znania.group@gmail.com</a></p>
                </div>
                <div className="flex items-center">
                   <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600 opacity-50">Все права защищены.</p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}

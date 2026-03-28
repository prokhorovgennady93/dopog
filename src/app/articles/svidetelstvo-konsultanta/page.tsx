import Link from "next/link";
import { ArrowLeft, UserCheck, ShieldCheck, GraduationCap, Gavel, HelpCircle, Target } from "lucide-react";
import Image from "next/image";

export default function ConsultantPage() {
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
            <span className="text-orange-600">Консультант</span> по безопасности ДОПОГ
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl">
             Согласно разделу 1.8.3 ДОПОГ, каждое предприятие, деятельность которого связана с перевозкой опасных грузов, обязано назначить одного или нескольких консультантов по вопросам безопасности.
          </p>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-zinc-100 dark:border-zinc-800">
             <Image 
                src="/adr_safety_consultant_pro_1774707024983.png" 
                alt="Консультант ДОПОГ" 
                fill 
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-2xl font-black max-w-md">Профессиональная экспертиза: Гарантия безопасности и отсутствия штрафов.</p>
             </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16 font-medium">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase text-sm tracking-widest">1. Роль и обязанности</h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                 <p>Основной задачей консультанта является поиск путей осуществления деятельности предприятия в соответствии с правилами ДОПОГ наиболее безопасными способами.</p>
                 <p><b>Ключевые обязанности включают:</b></p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>Контроль за соблюдением правил классификации и маркировки грузов;</li>
                    <li>Проработка маршрутов для грузов повышенной опасности;</li>
                    <li>Инструктаж персонала и проверка оборудования ТС;</li>
                    <li>Подготовка ежегодных отчетов по безопасности для руководства предприятия.</li>
                 </ul>
              </div>
           </section>

           <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 sm:p-16 rounded-[48px] border border-zinc-100 dark:border-zinc-800">
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white">Сложность экзамена 2026</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                       <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Тестирование</h4>
                       <p className="text-sm">40 сложных вопросов. Для успешной сдачи необходимо ответить правильно минимум на 32 из них (80%).</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                       <Gavel className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Практический кейс</h4>
                       <p className="text-sm">Решение реальной задачи (ситуации) с использованием томов ДОПОГ. Оценивается логика и правильность выбранных ссылок.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl font-black mb-8">Требования к кандидатам</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                 <p>Кандидат в консультанты должен пройти специализированный курс обучения (от 40 до 80 часов) в аккредитованном центре. Наличие высшего технического или юридического образования является преимуществом, но не обязательным требованием по закону.</p>
                 <div className="bg-yellow-500/10 border-l-4 border-orange-600 p-8 rounded-r-3xl italic">
                    «Свидетельство консультанта выдается сроком на 5 лет. Для продления необходимо пройти обучение и успешно сдать экзамен в течение последнего года действия текущего свидетельства».
                 </div>
              </div>
           </section>

           <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className="bg-zinc-900 p-8 rounded-3xl group hover:border-orange-600 border border-transparent transition-all">
                 <ShieldCheck className="w-8 h-8 text-orange-600 mb-6" />
                 <h4 className="text-xl font-black text-white mb-4">Отчетность</h4>
                 <p className="text-sm text-zinc-500 font-medium">Консультант готовит ежегодный отчет для предприятия, который должен храниться на предприятии в течение 5 лет и предоставляться по запросу Ространснадзора.</p>
              </div>
              <div className="bg-zinc-900 p-8 rounded-3xl group hover:border-orange-600 border border-transparent transition-all">
                 <UserCheck className="w-8 h-8 text-orange-600 mb-6" />
                 <h4 className="text-xl font-black text-white mb-4">Аудит</h4>
                 <p className="text-sm text-zinc-500 font-medium">Консультант имеет право проводить внеплановые аудиты транспортных операций для выявления нарушений требований ДОПОГ.</p>
              </div>
           </section>

           <section className="bg-orange-600 rounded-[56px] p-12 sm:p-24 text-white text-center">
              <GraduationCap className="w-20 h-20 mx-auto mb-8 text-white" />
              <h2 className="text-4xl sm:text-6xl font-black mb-6">Подготовка <span className="text-black">Консультантов</span></h2>
              <p className="text-xl mb-12 opacity-80 max-w-xl mx-auto font-medium">
                 Станьте востребованным экспертом в сфере опасных грузов. Все темы экзамена консультанта включены в наш профессиональный курс.
              </p>
              <Link 
                 href="/#courses" 
                 className="inline-flex bg-white text-orange-600 px-16 py-6 rounded-3xl font-black text-xl hover:bg-zinc-100 transition-all active:scale-95 shadow-2xl"
              >
                 Начать обучение
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

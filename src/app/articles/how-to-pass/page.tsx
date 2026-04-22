import Link from "next/link";
import { ArrowLeft, GraduationCap, CheckCircle, Target, BrainCircuit, ShieldAlert, Award, Clock } from "lucide-react";
import Image from "next/image";

const roadmap = [
  { step: "1-5 День", t: "Базовый курс (Классификация)", d: "Изучение классов опасности (1-9). Основное внимание на Класс 3, 8 и 9 — это 60% вопросов." },
  { step: "6-10 День", t: "Маркировка и знаки", d: "Разбор оранжевых табличек и Hazard Diamonds. Правила их размещения на цистернах и фургонах." },
  { step: "11-20 День", t: "Практика в режиме 'Тема'", d: "Проходите вопросы по темам: Спецразрешения, Оборудование ТС, Меры первой помощи." },
  { step: "21-30 День", t: "Имитация экзамена", d: "Решайте билеты целиком. Ваша цель — 3 дня подряд без единой ошибки." }
];

export default function HowToPassPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-10 sm:py-20 font-sans">
      <article className="max-w-4xl mx-auto px-4">
        {/* Navigation Header */}
        <header className="mb-12">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-orange-600 transition-colors mb-8 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
             К списку статей
          </Link>
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-green-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Guide 2026</span>
             <span className="text-zinc-400 text-sm font-bold tracking-tight px-4 border-l border-zinc-100 dark:border-zinc-800">12 мин чтения</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-zinc-900 dark:text-white">
            Как сдать экзамен <span className="text-orange-600">с первого раза</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-3xl">
             Экзамен в комиссии Ространснадзора — это не просто проверка знаний, а психологическое испытание со множеством ловушек. Мы подготовили исчерпывающую стратегию подготовки, чтобы вы ушли оттуда с заветной пластиковой карточкой ДОПОГ.
          </p>
        </header>

        {/* Content Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-16">
           
           <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 flex items-center gap-4 uppercase tracking-tighter">
                 <Award className="w-10 h-10 text-orange-600 shrink-0" />
                 Структура Вашего успеха
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                  <p>
                    На Базовый курс отводится 45 минут (25 вопросов, макс. 6 ошибок), на спецкурсы (Цистерны и др.) — 30 минут (15 вопросов, макс. 3 ошибки). 
                  </p>
                  <p>
                    Основная ловушка кроется в том, что вопросы часто сформулированы максимально похоже. Например, отличия «грузового отделения» от «транспортной единицы» может показаться незначительной деталью, но в ДОПОГ это фундаментально разные понятия с разными требованиями к тушению пожара или маркировке.
                  </p>
              </div>
           </section>

           <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 sm:p-16 rounded-[48px] border border-zinc-100 dark:border-zinc-800">
              <h2 className="text-3xl font-black mb-10 text-zinc-900 dark:text-white">Техника работы с вопросами</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="flex gap-6">
                    <Target className="w-8 h-8 text-orange-600 shrink-0 mt-1" />
                    <div>
                       <h4 className="font-bold text-lg mb-2">Метод исключения</h4>
                       <p className="text-sm text-zinc-500">Обычно из 4 вариантов 2 являются абсолютно абсурдными. Уберите их сразу. Оставшиеся два будут отличаться одним ключевым словом (например, «только» или «всегда»). Ищите подвох в этих словах.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <BrainCircuit className="w-8 h-8 text-orange-600 shrink-0 mt-1" />
                    <div>
                       <h4 className="font-bold text-lg mb-2">Логика безопасности</h4>
                       <p className="text-sm text-zinc-500">Если вы не знаете правильный ответ, выбирайте тот, который в реальности приведет к максимальной безопасности. ДОПОГ строится на минимизации любого риска.</p>
                    </div>
                 </div>
              </div>
           </section>



           <section className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-[40px] p-8 sm:p-12">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                 <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-12 h-12 text-amber-600" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-amber-900 dark:text-amber-500 mb-4">Главный совет: Не зазубривайте!</h3>
                    <p className="text-lg text-amber-800/80 dark:text-amber-500/70 font-bold leading-relaxed">
                       База вопросов Ространснадзора в 2026 году регулярно обновляется. Зазубривание «правильных ответов» — это путь в никуда. Понимая логику классов опасности и требований к ТС, вы ответите даже на вопрос, который видите впервые.
                    </p>
                 </div>
              </div>
           </section>

           <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className="border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500 transition-all">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Clock className="w-24 h-24 text-black dark:text-white" />
                 </div>
                 <h3 className="text-xl font-black mb-4">Тайм-менеджмент</h3>
                 <p className="text-zinc-500 font-medium leading-relaxed">Не зацикливайтесь на «трудных» вопросах — пройдите все легкие вопросы, а к ним вернитесь в конце. </p>
              </div>
              <div className="border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500 transition-all">
                 <h3 className="text-xl font-black mb-4">День накануне</h3>
                 <p className="text-zinc-500 font-medium leading-relaxed">Никакой учебы после 18:00. Мозгу нужно отдохнуть. Крепкий сон важнее, чем еще одна пройденная тема. Приходите на экзамен на 20 минут раньше, чтобы настроиться и не волноваться из-за спешки.</p>
              </div>
           </section>

           <section className="bg-orange-600 rounded-[56px] p-12 sm:p-24 text-white text-center shadow-3xl shadow-orange-950/20">
              <GraduationCap className="w-20 h-20 mx-auto mb-8 text-white drop-shadow-lg" />
              <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">Ваш тренажер <span className="text-black">ДОПОГ 2026</span></h2>
              <p className="text-xl mb-12 opacity-80 max-w-xl mx-auto font-medium">
                 Все описанные методики и правила внедрены в нашу систему обучения. Начните тренироваться сейчас и будьте уверены в своем результате.
              </p>
              <Link 
                 href="/#courses" 
                 className="inline-flex bg-black text-white px-16 py-6 rounded-3xl font-black text-xl hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl"
              >
                 Начать подготовку
              </Link>
           </section>
        </div>
      </article>

      <footer className="max-w-4xl mx-auto px-4 mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-400">
         <p>© 2026 ДОПОГ Экзамен</p>
         <div className="flex gap-6">
            <Link href="/articles" className="hover:text-orange-600 transition-colors">База знаний</Link>
            <Link href="/" className="hover:text-orange-600 transition-colors">Главная</Link>
         </div>
      </footer>
    </div>
  );
}

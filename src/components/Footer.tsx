import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Info Section */}
          <div className="space-y-4 max-w-sm">
            <h3 className="font-bold text-lg">ДОПОГ Экзамен 2026</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              Профессиональная платформа для подготовки к экзаменам ДОПОГ. 
              Актуальные вопросы, статистика прогресса и удобные режимы обучения.
            </p>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col gap-3">
             <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Навигация</h4>
             <Link 
               href="/articles" 
               className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-widest px-4 py-3 rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-95 mb-2 text-center"
             >
                База знаний
             </Link>
             <Link href="/terms" className="text-sm text-zinc-500 hover:text-yellow-600 transition-colors font-bold">Пользовательское соглашение</Link>
             <Link href="/privacy" className="text-sm text-zinc-500 hover:text-yellow-600 transition-colors font-bold">Политика конфиденциальности</Link>
             <Link href="/data-policy" className="text-sm text-zinc-500 hover:text-yellow-600 transition-colors font-bold">Обработка персональных данных</Link>
             <Link href="/copyright" className="text-sm text-zinc-500 hover:text-yellow-600 transition-colors font-bold">Авторские права</Link>
          </div>

          {/* Owner Section */}
          <div className="flex flex-col gap-3">
             <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Контакты</h4>
             <div className="space-y-2">
               <p className="text-sm text-zinc-500 dark:text-zinc-400 font-bold leading-tight uppercase tracking-tighter">ООО «УЦ Технологии Знаний»</p>
               <p className="text-[13px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
                 344029, г. Ростов-на-Дону, ул. 1-й Конной Армии, зд. 15, ком. 2а
               </p>
               <div className="flex flex-col gap-1 text-[13px] text-zinc-400 uppercase tracking-tighter">
                 <span>ИНН: 6166132362</span>
                 <span>КПП: 616601001</span>
                 <span>ОГРН: 1256100004654</span>
               </div>
               <p className="text-sm text-zinc-500 dark:text-zinc-400 font-bold text-wrap max-w-xs leading-snug">
                 Лицензия № Л035-01276-61/02274118 выдана министерством образования Ростовской области, бессрочно.
               </p>
               <div className="flex flex-col gap-1 pt-2">
                 <a href="tel:+79934520505" className="text-sm text-zinc-500 hover:text-yellow-600 transition-colors font-bold">+7 993 452 05 05</a>
                 <a href="mailto:znania.group@gmail.com" className="text-sm text-zinc-500 hover:text-yellow-600 transition-colors font-bold">znania.group@gmail.com</a>
               </div>
             </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400 font-bold">
            © 2026 ДОПОГ Экзамен. Все права защищены.
          </p>
          <div className="flex items-center gap-1">
             <div className="w-1 h-1 rounded-full bg-yellow-500" />
             <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-black">
                Сделано с заботой о безопасности перевозок
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

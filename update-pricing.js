const fs = require('fs');

const pricingSection = `{/* Pricing Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Выберите свой доступ</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Начните бесплатно и переходите на премиум, когда будете готовы</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Начальный</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">0 ₽</span>
                    <span className="text-zinc-400">/ тест-драйв</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    25 обучающих вопросов
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Поддержка PWA приложения
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-400 opacity-50">
                    <Clock className="w-5 h-5" />
                    Без режима экзамена
                  </li>
                </ul>
              </div>
              <div>
                {session ? (
                  <div className="w-full py-4 rounded-xl border-2 border-zinc-100 dark:border-zinc-800 font-bold block text-center opacity-50 cursor-not-allowed select-none">
                    Уже активен
                  </div>
                ) : (
                  <Link href="/register" className="w-full py-4 rounded-xl border-2 border-zinc-100 dark:border-zinc-800 font-bold block text-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                    Начать бесплатно
                  </Link>
                )}
              </div>
            </div>

            {/* Basic Tier */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-700 flex flex-col justify-between relative shadow-lg">
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Основной</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">99 ₽</span>
                    <span className="text-zinc-500">/ 1 курс</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Оффлайн доступ
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <Zap className="w-5 h-5 text-blue-500 fill-blue-500" />
                    Полная база (более 800 вопросов)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Поддержка PWA приложения
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Симуляция реального экзамена
                  </li>
                </ul>
              </div>
              <Link href={session ? "/pricing" : "/register"} className="w-full py-4 rounded-xl border-2 border-blue-500 text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 font-bold block text-center transition-colors">
                Выбрать курс
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="bg-zinc-900 dark:bg-zinc-900 p-8 rounded-3xl border-2 border-yellow-500 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-yellow-500/10">
              <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">Популярно</div>
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2 text-white">Премиум</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">199 ₽</span>
                    <span className="text-zinc-500">/ все курсы</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                    Оффлайн доступ
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-300">
                    <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    Полная база (более 800 вопросов)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                    Поддержка PWA приложения
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                    Симуляция реального экзамена
                  </li>
                </ul>
              </div>
              <Link href={session ? "/pricing" : "/register"} className="w-full py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-black block text-center shadow-lg shadow-yellow-500/20 transition-all active:scale-[0.98]">
                Получить доступ
              </Link>
            </div>
          </div>
        </div>
      </section>`;

let c = fs.readFileSync('src/app/page.tsx', 'utf8');

c = c.replace(/\{\/\* Pricing Section \*\/\}[\s\S]*?<\/section>/, pricingSection);

fs.writeFileSync('src/app/page.tsx', c);
console.log('Pricing section updated.');

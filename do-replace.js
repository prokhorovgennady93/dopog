const fs = require('fs');

const promoSectionCode = `{/* Promo Section */}
      <section className="bg-zinc-900 border-y border-white/5 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            
            {/* Context/Texts */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-yellow-500/20">
                <Sparkles className="w-4 h-4" />
                Спецпредложение
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 leading-tight">
                Пройдите подготовку и получите <span className="text-yellow-500">скидку 15%</span> на получение свидетельства
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5">Лицензия и аккредитация</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Образовательная лицензия ЛО35-01276-61/02274118 от 05.05.2025г. и аккредитация в Ространснадзоре.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5">Документы установленного образца</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Вносим сразу в систему ФИС ФРДО.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                    <Download className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5">Удобное получение</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Доставка по территории всей Российской Федерации.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="w-full lg:w-[400px]">
              <div className="p-8 bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"></div>
                <h3 className="text-xl font-bold text-white mb-2">Получить свидетельство</h3>
                <p className="text-zinc-500 text-sm mb-6">Скидка автоматически применяется при выборе тарифа из каталога.</p>

                <Link href="/pricing" className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-xl font-black text-lg transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20">
                  Получить скидку
                </Link>
                <p className="text-[10px] text-zinc-600 font-medium text-center mt-4">
                  Предложение ограничено.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>`;

let c = fs.readFileSync('src/app/page.tsx', 'utf8');
c = c.replace(/\{\/\* Stats Bar \*\/\}[\s\S]*?<\/section>/, promoSectionCode);
fs.writeFileSync('src/app/page.tsx', c);
console.log('Replaced correctly!');

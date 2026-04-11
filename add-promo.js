const fs = require('fs');
let file = 'src/app/page.tsx';
let c = fs.readFileSync(file, 'utf8');

const promoSection = `      {/* Promo Section */}
      <section className="bg-zinc-900 border-y border-white/5 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            
            {/* Context/Texts */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-yellow-500/20">
                <Sparkles className="w-4 h-4" />
                Спецпредложение
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                Пройдите подготовку и получите <span className="text-yellow-500">скидку 15%</span> на получение свидетельства
              </h2>
              
              <div className="space-y-6 mt-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Лицензия и аккредитация</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Образовательная лицензия ЛО35-01276-61/02274118 от 05.05.2025г. и аккредитация в Ространснадзоре.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Документы установленного образца</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Вносим сразу в систему ФИС ФРДО.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                    <Download className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Удобное получение</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Доставка по территории всей Российской Федерации.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="w-full lg:w-[480px]">
              <div className="p-8 sm:p-10 bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"></div>
                <h3 className="text-2xl font-bold text-white mb-2">Оставить заявку</h3>
                <p className="text-zinc-500 text-sm mb-8">Заполните форму, и наш менеджер свяжется с вами для оформления скидки.</p>

                <form className="space-y-4" action="#">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Ваше имя</label>
                    <input 
                      type="text" 
                      placeholder="Иван Иванов"
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-medium placeholder:text-zinc-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Номер телефона</label>
                    <input 
                      type="tel" 
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-medium placeholder:text-zinc-700" 
                    />
                  </div>
                  <button type="button" className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-black text-lg transition-all active:scale-[0.98] shadow-lg shadow-yellow-500/20">
                    Получить скидку
                  </button>
                  <p className="text-[10px] text-zinc-600 font-medium text-center mt-4">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}`;

c = c.replace('{/* Pricing Section */}', promoSection);
fs.writeFileSync(file, c);
console.log('Promo section added.');

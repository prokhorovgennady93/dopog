const fs = require('fs');
let file = 'src/app/page.tsx';
let c = fs.readFileSync(file, 'utf8');

const newImports = `import { Sparkles, CheckCircle2, Download, BookOpen, ShieldCheck, BarChart3, Clock, Zap, WifiOff, MessageSquare, Settings, Target, Award } from "lucide-react";`;
c = c.replace(/import { Sparkles[^}]+} from "lucide-react";/, newImports);

const sectionRegex = /\{\/\* Benefits Section \*\/\}.*?<\/section>/s;
const newSection = `{/* Benefits Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">6 причин учиться с нами</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Современный подход к обучению водителей и консультантов на ДОПОГ</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-yellow-500/50 transition-all group shadow-sm">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-orange-600 dark:text-orange-500" />
                </div>
                <h3 className="text-lg font-bold leading-tight">Актуальные вопросы 2026</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Тесты полностью соответствуют последней версии Ространснадзора.</p>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-yellow-500/50 transition-all group shadow-sm">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <WifiOff className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                </div>
                <h3 className="text-lg font-bold leading-tight">OFFLINE версия</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Скачайте PWA-приложение и занимайтесь без интернета в удобное для вас время.</p>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-yellow-500/50 transition-all group shadow-sm">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-500" />
                </div>
                <h3 className="text-lg font-bold leading-tight">Разъяснения к тестам</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Подробные комментарии к каждому вопросу помогут понять, а не просто запомнить ответ.</p>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-yellow-500/50 transition-all group shadow-sm">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-purple-600 dark:text-purple-500" />
                </div>
                <h3 className="text-lg font-bold leading-tight">Комфорт обучения</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Продуманная и удобная механика прохождения тестов и экзаменов ДОПОГ.</p>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-yellow-500/50 transition-all group shadow-sm">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-rose-600 dark:text-rose-500" />
                </div>
                <h3 className="text-lg font-bold leading-tight">Эффективность</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">98% клиентов сдают экзамен и получают ДОПОГ с 1 раза.</p>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-yellow-500/50 transition-all group shadow-sm">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-lg font-bold leading-tight">Лицензия и аккредитация</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Образовательная лицензия ЛО35-01276-61/02274118 от 05.05.2025г. и аккредитация в Ространснадзоре. Вносим выдаваемые документы в ФИС ФРДО.</p>
            </div>
          </div>
        </div>
      </section>`;

c = c.replace(sectionRegex, newSection);
fs.writeFileSync(file, c);
console.log('Benefits section replaced.');

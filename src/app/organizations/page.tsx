import { 
  Building2, 
  Users, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  Briefcase,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function OrganizationsPage() {
  const benefits = [
    {
      icon: Users,
      title: "Контроль успеваемости",
      description: "Отслеживайте прогресс каждого студента в реальном времени. Видьте ошибки, время подготовки и готовность к экзамену."
    },
    {
      icon: BarChart3,
      title: "Групповая статистика",
      description: "Получайте сводные отчеты по целым группам или подразделениям вашей компании."
    },
    {
      icon: FileText,
      title: "Работа по договору",
      description: "Никаких банковских карт сотрудников. Выставляем счета, предоставляем закрывающие документы для бухгалтерии."
    },
    {
      icon: ShieldCheck,
      title: "Корпоративные лицензии",
      description: "Гибкая система промокодов. Активируйте доступы массово и управляйте ими из единого кабинета."
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 pb-20 overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-zinc-950 dark:via-zinc-950/90 dark:to-transparent z-10" />
          <img 
            src="/adr_b2b_partners_hero_1774716039123_1774726858603.png" 
            alt="ADR Partners" 
            className="w-full h-full object-cover object-right opacity-80 dark:opacity-40"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 border border-orange-200 dark:border-orange-500/20 mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <Building2 className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-black tracking-widest">Для бизнеса и автошкол</span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              Масштабируйте <br />
              <span className="text-orange-600">обучение</span>
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 font-bold mb-12 leading-tight max-w-xl animate-in fade-in slide-in-from-left-12 duration-1000 delay-300">
              Профессиональная экосистема для контроля подготовки водителей ДОПОГ 2026. Надежность. Прозрачность. Результат.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <Link 
                href="/register"
                className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-orange-900/40 hover:scale-105 hover:bg-orange-500 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Начать партнерство <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white px-10 py-5 rounded-2xl font-black text-lg border-2 border-zinc-100 dark:border-zinc-800 hover:border-orange-600/30 transition-all flex items-center justify-center">
                Тарифы
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-orange-500/30 transition-all duration-300">
                <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-950/20">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black mb-3">{benefit.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Tier Callout */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-zinc-900 to-black dark:from-zinc-900 dark:to-zinc-950 rounded-[40px] p-8 sm:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-6 leading-none">
                Персональные предложения для крупных автошкол
              </h2>
              <p className="text-lg text-zinc-400 font-bold mb-10">
                Нужна интеграция с вашей LMS или специальный тариф для сотен учеников? Мы договоримся.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Приоритетная техподдержка",
                  "Брендированный кабинет организации",
                  "Спец-курсы под ваши требования",
                  "Выгрузка статистики в Excel/PDF"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white font-bold">
                    <CheckCircle2 className="w-5 h-5 text-orange-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full sm:w-auto bg-orange-600 text-white font-black px-10 py-5 rounded-2xl hover:bg-orange-500 transition-all shadow-xl shadow-orange-950/50">
                Связаться с отделом продаж
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Briefcase className="w-12 h-12 text-zinc-300 mx-auto mb-6" />
          <h2 className="text-3xl font-black mb-10">Доверьте подготовку профессионалам</h2>
          <div className="grid grid-cols-2 gap-8 text-left">
             <div>
                <span className="text-4xl font-black text-orange-600">50+</span>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-2">Автошкол-партнеров</p>
             </div>
             <div>
                <span className="text-4xl font-black text-orange-600">10k+</span>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-2">Успешных сдач</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

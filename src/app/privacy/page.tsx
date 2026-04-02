import Link from "next/link";
import { ArrowLeft, ShieldCheck, Fingerprint, Lock, Globe, UserCheck, AlertCircle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-24 font-sans text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-orange-600 transition-colors mb-12 group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> На главную
        </Link>
        
        <h1 className="text-4xl sm:text-6xl font-black mb-12 tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Политика <span className="text-orange-600">конфиденциальности</span>
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 font-medium">
          <section className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 italic text-sm">
             Настоящая Политика конфиденциальности действует в отношении всей информации, которую Сайт prodopog.ru может получить о Пользователе во время его использования. Мы гарантируем защиту Ваших данных от несанкционированного доступа.
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-orange-600" /> 1. Определение терминов
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Администрация сайта</h3>
                   <p className="text-sm">Уполномоченные лица на управление Сайтом, действующие от имени ООО «УЦ Технологии Знаний», организующие обработку данных.</p>
                </div>
                <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Персональные данные</h3>
                   <p className="text-sm">Любая информация, относящаяся к прямо или косвенно определенному физическому лицу (субъекту персональных данных).</p>
                </div>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">2. Предмет политики</h2>
             <p>2.1. Настоящая Политика устанавливает обязательства Администрации по неразглашению и обеспечению защиты персональных данных Пользователя.</p>
             <p>2.2. Персональные данные, разрешённые к обработке:</p>
             <ul className="list-disc pl-6 space-y-2 font-bold text-zinc-700 dark:text-zinc-300">
                <li>Адрес электронной почты (e-mail);</li>
                <li>Данные Cookies (автоматически передаваемые при посещении);</li>
                <li>Технические данные об IP-адресе, версии браузера и операционной системе.</li>
             </ul>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">3. Цели сбора информации</h2>
             <div className="space-y-4">
                <p>3.1. Идентификация Пользователя для предоставления оплаченного доступа.</p>
                <p>3.2. Предоставление доступа к Личному кабинету и возможность сохранения статистики обучения.</p>
                <p>3.3. Установление обратной связи, уведомлений о состоянии заказов и новостях сервиса.</p>
                <p>3.4. Обеспечение безопасности Сервиса и предотвращение несанкционированного доступа.</p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-600" /> 4. Сторонние сервисы и данные
             </h2>
             <p>4.1. Администрация вправе передавать персональные данные третьим лицам только в целях выполнения Вашего заказа (платежные системы) или сбора анонимной статистики.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                   <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Яндекс Метрика</h4>
                   <p className="text-xs">Мы автоматически передаем анонимные данные ООО «ЯНДЕКС» для улучшения работы сайта и анализа посещаемости.</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 border-l-4 border-l-orange-600">
                   <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Платежные шлюзы</h4>
                   <p className="text-xs">Данные банковских карт обрабатываются на защищенных страницах банковской системы и не сохраняются на нашем сервере.</p>
                </div>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">5. Обязательства администрации</h2>
             <ul className="space-y-4">
                <li><b>Конфиденциальность:</b> Не разглашать персональные данные Пользователя без его предварительного согласия.</li>
                <li><b>Безопасность:</b> Принимать организационные и технические меры для защиты данных от утраты или неправомерного использования.</li>
                <li><b>Блокировка:</b> Осуществлять блокирование персональных данных по запросу Пользователя или в случае выявления недостоверных данных.</li>
             </ul>
          </section>

          <section className="bg-orange-600/5 border border-orange-600/20 p-8 rounded-3xl">
             <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" /> 6. Изменения и уведомления
             </h2>
             <p className="text-sm font-bold">Администрация оставляет за собой право вносить изменения в настоящую Политику без персонального уведомления Пользователя. Изменения вступают в силу через 3 календарных дня с момента их публикации на Сайте.</p>
          </section>

          <section className="bg-zinc-900 p-8 sm:p-12 rounded-[40px] text-zinc-400">
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Lock className="w-5 h-5 text-orange-600" /> Контактная информация
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div>
                   <p className="font-bold text-zinc-200">ООО «Учебный центр Технологии Знаний»</p>
                   <p>ИНН 6166132362</p>
                   <p>Email: <a href="mailto:znania.group@gmail.com" className="text-orange-600 hover:underline">znania.group@gmail.com</a></p>
                </div>
                <div className="flex items-center">
                   <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600 opacity-50">Prodopog.ru © 2026. Все права защищены.</p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}

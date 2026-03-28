import Link from "next/link";
import { ArrowLeft, ShieldCheck, Fingerprint } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-24 font-sans text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-yellow-600 transition-colors mb-12 group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> На главную
        </Link>
        
        <h1 className="text-4xl sm:text-6xl font-black mb-12 tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Политика <span className="text-yellow-500">конфиденциальности</span>
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 font-medium">
          <section className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 italic text-sm">
             Настоящая Политика конфиденциальности действует в отношении всей информации, которую Сайт prodopog.ru может получить о Пользователе во время его использования.
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">1. Определение терминов</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-yellow-500" /> Администрация сайта
                   </h3>
                   <p className="text-sm">Уполномоченные лица на управление Сайтом, действующие от имени ИП Карманович А. С., организующие обработку данных.</p>
                </div>
                <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                      <Fingerprint className="w-4 h-4 text-yellow-500" /> Персональные данные
                   </h3>
                   <p className="text-sm">Любая информация, относящаяся к прямо или косвенно определенному физическому лицу.</p>
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
                <li>Информация об IP-адресе, версии браузера и операционной системе.</li>
             </ul>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">3. Цели сбора информации</h2>
             <div className="space-y-4">
                <p>3.1. Идентификация Пользователя для приобретения платного доступа.</p>
                <p>3.2. Предоставление доступа к Личному кабинету и статистике обучения.</p>
                <p>3.3. Установление обратной связи, уведомлений о состоянии заказов и новостях сервиса.</p>
                <p>3.4. Предотвращение мошенничества и обеспечение безопасности Сервиса.</p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">4. Способы и сроки обработки</h2>
             <p>4.1. Обработка персональных данных осуществляется без ограничения срока, любым законным способом.</p>
             <p>4.2. Персональные данные Пользователя могут быть переданы уполномоченным органам государственной власти РФ только на основаниях и в порядке, установленным законодательством.</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">5. Сторонние сервисы</h2>
             <p>5.1. Сайт использует сервисы аналитики (Яндекс Метрика) для сбора анонимных данных о посещаемости. Мы автоматически передаем анонимные данные, генерируемые Вами при посещении страниц, сервисам ООО «ЯНДЕКС».</p>
          </section>

          <section className="bg-zinc-50 dark:bg-zinc-900 p-8 sm:p-12 rounded-3xl border border-zinc-100 dark:border-zinc-800">
             <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">6. Реквизиты владельца</h2>
             <p className="font-bold flex justify-between items-center text-zinc-900 dark:text-white">
                <span>ИП Карманович Алексей Сергеевич</span>
                <span className="text-xs text-zinc-400 font-normal">ИНН 611405438968</span>
             </p>
             <p className="mt-2 text-sm">Email: <a href="mailto:grevelien@yandex.ru" className="text-yellow-600 hover:underline">grevelien@yandex.ru</a></p>
             <p className="mt-6 text-[10px] text-zinc-400 uppercase tracking-widest font-black">Prodopog.ru © 2026. Все права защищены.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

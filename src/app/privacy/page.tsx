import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-yellow-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black mb-8 leading-tight">Политика конфиденциальности</h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          <p>Настоящая Политика конфиденциальности (далее — Политика) действует в отношении всей информации, которую ИП Карманович Алексей Сергеевич (далее — Оператор) может получить о пользователе во время использования им сайта prodopog.ru.</p>
          
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">1. Основные понятия</h2>
            <p>1.1. Персональные данные — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).</p>
            <p>1.2. Обработка персональных данных — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">2. Цели сбора персональных данных</h2>
            <p>2.1. Идентификация пользователя на сайте.</p>
            <p>2.2. Предоставление доступа к персонализированным ресурсам сайта (курсы, тесты, личный кабинет).</p>
            <p>2.3. Установление обратной связи с пользователем, включая направление уведомлений и запросов.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">3. Состав собираемых данных</h2>
            <p>Оператор может собирать следующие персональные данные: ФИО, адрес электронной почты, номер телефона, данные об использовании сайта (cookies).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">4. Обязательства Сторон</h2>
            <p>4.1. Оператор обязан использовать полученную информацию исключительно для целей, указанных в настоящей Политике.</p>
            <p>4.2. Пользователь обязан предоставить достоверную информацию о своих персональных данных.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">5. Реквизиты</h2>
            <p>ИП Карманович Алексей Сергеевич<br />
            ИНН 611405438968<br />
            Email: grevelien@yandex.ru</p>
          </section>

          <p className="pt-8 text-sm text-zinc-400 italic">Дата последнего обновления: 28 марта 2026 г.</p>
        </div>
      </div>
    </div>
  );
}

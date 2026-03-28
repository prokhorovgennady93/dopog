import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, Gavel, FileLock, UserCheck, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-24 font-sans text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-orange-600 transition-colors mb-12 group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> На главную
        </Link>
        
        <h1 className="text-4xl sm:text-6xl font-black mb-12 tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Пользовательское <span className="text-orange-600">соглашение</span>
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 font-medium">
          <section className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 italic text-sm">
             Настоящее Соглашение является публичной офертой и регулирует отношения между ИП Карманович Алексей Сергеевич (далее — «Администрация») и любым физическим лицом (далее — «Пользователь»), использующим Сайт prodopog.ru.
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <FileLock className="w-5 h-5 text-orange-600" /> 1. Термины и определения
             </h2>
             <ul className="space-y-4">
                <li><b>Сайт</b> — программно-аппаратный комплекс, доступный по адресу https://prodopog.ru.</li>
                <li><b>Контент</b> — все объекты интеллектуальной собственности (тексты, дизайн, изображения, базы данных, программный код), размещенные на Сайте.</li>
                <li><b>Личный кабинет</b> — персональный раздел Пользователя, доступный после авторизации с использованием логина и пароля.</li>
                <li><b>Платный доступ</b> — предоставление Пользователю расширенных функций Сайта (тестирование по темам, экзамен, статистика) на возмездной основе.</li>
             </ul>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">2. Предмет соглашения</h2>
             <p>2.1. Администрация предоставляет Пользователю неисключительную, непередаваемую лицензию на использование Сайта и его Контента для личных некоммерческих целей (подготовка к экзаменам ДОПОГ).</p>
             <p>2.2. Настоящее Соглашение считается заключенным в момент фактического начала использования Пользователем Сайта или перехода по любой его ссылке.</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">3. Регистрация и Безопасность</h2>
             <p>3.1. Для получения полного доступа Пользователь обязан предоставить достоверный адрес электронной почты.</p>
             <p>3.2. Пользователь несет полную ответственность за сохранность своего пароля и за любые действия, совершенные под его учетной записью.</p>
             <p>3.3. Передача доступа к Личному кабинету третьим лицам категорически запрещена и является основанием для блокировки без возврата средств.</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">4. Интеллектуальная собственность</h2>
             <p>4.1. Весь Контент на Сайте является собственностью Администрации или её лицензиаров и защищен законодательством РФ об авторском праве.</p>
             <p>4.2. Пользователю запрещается копировать, воспроизводить, распространять или иным образом использовать Контент вне Сайта без письменного согласия Администрации.</p>
             <p>4.3. Использование автоматизированных средств (скриптов, парсеров, роботов) для сбора информации или доступа к Контенту строго запрещено.</p>
          </section>

          <section className="bg-orange-600/5 border border-orange-600/20 p-8 rounded-3xl">
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-wider text-sm flex items-center gap-2 font-black">
                <Scale className="w-5 h-5 text-orange-600" /> 5. Условия оплаты и политика возврата
             </h2>
             <p className="font-bold text-zinc-900 dark:text-white mb-4">5.1. Доступ к Полной версии предоставляется после 100% предоплаты в соответствии с тарифами, указанными на Сайте.</p>
             <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-orange-600/40 shadow-xl shadow-orange-950/20">
                <p className="text-orange-700 dark:text-orange-500 font-black flex items-start gap-3">
                   <AlertCircle className="w-5 h-5 shrink-0 mt-1" />
                   ВАЖНО: В соответствии с законодательством РФ (Закон о защите прав потребителей, ст. 25), цифровой контент (электронный доступ к обучающим материалам) надлежащего качества не подлежит возврату или обмену после его активации или предоставления доступа в Личном кабинете Пользователя.
                </p>
                <p className="mt-4 text-sm font-bold">Услуга считается оказанной в полном объеме в момент предоставления доступа к функционалу Сайта. Денежные средства, оплаченные за доступ, возврату не подлежат.</p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">6. Ограничение ответственности</h2>
             <p>6.1. Сайт предоставляется по принципу «как есть» (as is). Администрация не гарантирует, что Сайт будет соответствовать всем ожиданиям Пользователя.</p>
             <p>6.2. Администрация не несет ответственности за успешную сдачу Пользователем государственного экзамена — Сайт является лишь вспомогательным инструментом подготовки.</p>
             <p>6.3. Согласованная максимальная материальная ответственность Администрации перед Пользователем ограничена суммой, оплаченной Пользователем за доступ к Сайту.</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">7. Разрешение споров</h2>
             <p>7.1. Все споры решаются путем переговоров. Обязательный досудебный срок рассмотрения претензии — 30 календарных дней.</p>
             <p>7.2. В случае невозможности урегулирования, спор передается на рассмотрение в суд по месту нахождения Администрации (г. Ростов-на-Дону).</p>
          </section>

          <section className="bg-zinc-900 p-8 sm:p-12 rounded-[40px] text-zinc-400">
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 italic">
                <UserCheck className="w-5 h-5 text-orange-600" /> Реквизиты владельца
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div>
                   <p className="font-bold text-zinc-200">ИП Карманович Алексей Сергеевич</p>
                   <p>ИНН 611405438968</p>
                   <p>ОГРНИП 319619600122291</p>
                </div>
                <div>
                   <p className="font-bold text-zinc-200 text-lg mb-2">Техническая поддержка:</p>
                   <p className="text-xl font-black text-orange-600">grevelien@yandex.ru</p>
                </div>
             </div>
             <p className="mt-12 text-[10px] uppercase font-black tracking-widest text-zinc-600 pt-8 border-t border-zinc-800">Все права защищены © 2026 prodopog.ru</p>
          </section>
        </div>
      </div>
    </div>
  );
}

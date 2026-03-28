import Link from "next/link";
import { ArrowLeft, Lock, Gavel } from "lucide-react";

export default function DataPolicyPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-24 font-sans text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-yellow-600 transition-colors mb-12 group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> На главную
        </Link>
        
        <h1 className="text-4xl sm:text-6xl font-black mb-12 tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Политика обработки <span className="text-yellow-500">персональных данных</span>
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 font-medium">
          <section className="bg-yellow-500/5 dark:bg-yellow-500/10 border border-yellow-500/20 p-8 rounded-3xl mb-12">
             <h2 className="text-xl font-bold text-yellow-700 dark:text-yellow-500 mb-4 flex items-center gap-2">
                <Gavel className="w-5 h-5" /> Правовое основание
             </h2>
             <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-300">Настоящая Политика составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных ИП Карманович Алексей Сергеевич.</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">1. Общие положения</h2>
             <div className="space-y-4">
                <p>1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
                <p>1.2. Настоящая Политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта prodopog.ru.</p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">2. Основные понятия, используемые в Политике</h2>
             <ul className="space-y-4 text-sm italic border-l-2 border-zinc-100 dark:border-zinc-800 pl-6">
                <li><b>Автоматизированная обработка персональных данных</b> – обработка персональных данных с помощью средств вычислительной техники;</li>
                <li><b>Блокирование персональных данных</b> – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных);</li>
                <li><b>Обезличивание персональных данных</b> – действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю;</li>
                <li><b>Предоставление персональных данных</b> – действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц;</li>
                <li><b>Уничтожение персональных данных</b> – любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления.</li>
             </ul>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">3. Оператор может обрабатывать следующие данные</h2>
             <div className="space-y-4">
                <p>3.1. Фамилия, имя, отчество (при указании в профиле).</p>
                <p>3.2. Электронный адрес (e-mail).</p>
                <p>3.3. Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика и других).</p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">4. Цели обработки</h2>
             <div className="space-y-4">
                <p>4.1. Цель обработки персональных данных Пользователя — предоставление доступа к образовательному Контенту и сервисам личного кабинета; информирование Пользователя посредством отправки электронных писем.</p>
                <p>4.2. Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных предложениях и различных событиях.</p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">5. Заключительные положения</h2>
             <div className="space-y-4">
                <p>5.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты <a href="mailto:grevelien@yandex.ru" className="text-yellow-600">grevelien@yandex.ru</a>.</p>
                <p>5.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.</p>
             </div>
          </section>

          <section className="bg-zinc-900 p-8 sm:p-16 rounded-[48px] text-zinc-400 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-5 blur-3xl group-hover:opacity-10 transition-opacity" />
             <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Lock className="w-5 h-5 text-yellow-500" /> Реквизиты оператора
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed">
                <div>
                   <p className="font-bold text-zinc-200 text-lg mb-2">ИП Карманович Алексей Сергеевич</p>
                   <p className="font-bold">ИНН: 611405438968</p>
                </div>
                <div>
                   <p className="font-bold text-zinc-200 mb-2">Техническая поддержка:</p>
                   <p className="text-xl font-black text-yellow-500">grevelien@yandex.ru</p>
                </div>
             </div>
             <p className="mt-16 text-[10px] uppercase font-black tracking-widest text-zinc-600 border-t border-zinc-800 pt-8">
                Все права защищены © 2026 prodopog.ru
             </p>
          </section>
        </div>
      </div>
    </div>
  );
}

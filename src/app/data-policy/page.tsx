import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, Lock, UserCheck, AlertCircle, Bookmark } from "lucide-react";

export default function DataPolicyPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-10 sm:py-20 font-sans text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-orange-600 transition-colors mb-10 group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> На главную
        </Link>
        
        <h1 className="text-4xl sm:text-6xl font-black mb-10 tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Политика обработки <span className="text-orange-600">персональных данных</span>
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 font-medium">
          <section className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 italic text-sm">
             Настоящая Политика разработана в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению их безопасности в ИП Карманович Алексей Сергеевич.
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <Scale className="w-5 h-5 text-orange-600 font-black" /> 1. Общие положения
             </h2>
             <p>1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
             <p>1.2. Настоящая Политика применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://prodopog.ru.</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-orange-600 font-black" /> 2. Основные понятия
             </h2>
             <ul className="space-y-4">
                <li><b>Автоматизированная обработка</b> — обработка персональных данных с помощью средств вычислительной техники.</li>
                <li><b>Блокирование</b> — временное прекращение обработки персональных данных.</li>
                <li><b>Информационная система</b> — совокупность персональных данных, содержащихся в базах данных, и обеспечивающих их обработку информационных технологий.</li>
                <li><b>Оператор</b> — индивидуальный предприниматель Карманович Алексей Сергеевич (ИНН 611405438968).</li>
             </ul>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2 font-black">
                <UserCheck className="w-5 h-5 text-orange-600" /> 3. Объем обрабатываемых данных
             </h2>
             <p>3.1. Оператор может обрабатывать следующие данные Пользователя:</p>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none font-bold text-zinc-700 dark:text-zinc-300">
                <li className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">Фамилия, Имя;</li>
                <li className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">Адрес электронной почты;</li>
                <li className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">Обезличенные данные о посетителях (cookies);</li>
                <li className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">Технические данные об устройстве.</li>
             </ul>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 font-black" /> 4. Цели обработки
             </h2>
             <p>4.1. Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки электронных писем; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте.</p>
             <p>4.2. Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных предложениях и различных событиях.</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-600 font-black" /> 5. Порядок сбора и передачи
             </h2>
             <p>5.1. Безопасность персональных данных обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований законодательства.</p>
             <p>5.2. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.</p>
             <p>5.3. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm flex items-center gap-2 font-black">
                <ShieldCheck className="w-5 h-5 text-orange-600" /> 6. Заключительные положения
             </h2>
             <p>6.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты <b>grevelien@yandex.ru</b>.</p>
             <p>6.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.</p>
          </section>

          <section className="bg-zinc-900 p-8 sm:p-12 rounded-[40px] text-zinc-500 text-xs">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[10px] uppercase font-black tracking-widest leading-relaxed">
                <div>
                   <p className="text-zinc-200">ИП Карманович Алексей Сергеевич</p>
                   <p>ИНН 611405438968</p>
                   <p>Россия, Ростовская область</p>
                </div>
                <div className="flex flex-col justify-end text-zinc-700">
                   <p>© 2026 prodopog.ru — Образовательная платформа по подготовке к экзаменам ДОПОГ.</p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}

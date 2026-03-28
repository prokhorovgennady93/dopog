import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-24 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-yellow-600 transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> На главную
        </Link>
        
        <h1 className="text-4xl sm:text-6xl font-black mb-12 tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Пользовательское <span className="text-yellow-500">соглашение</span>
        </h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 text-zinc-600 dark:text-zinc-400 font-medium">
          
          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">1. Общие положения</h2>
             <div className="space-y-4">
                <p>1.1. Настоящее Пользовательское соглашение (далее – Соглашение) относится к сайту, расположенному по адресу prodopog.ru (далее - Сайт).</p>
                <p>1.2. Сайт является собственностью ИП Карманович Алексей Сергеевич (ИНН 611405438968, далее - Администрация).</p>
                <p>1.3. Настоящее Соглашение регулирует отношения между Администрацией сайта и Пользователем данного Сайта.</p>
                <p>1.4. Администрация оставляет за собой право в любое время изменять, добавлять или удалять пункты настоящего Соглашения без персонального уведомления Пользователя. Все изменения вступают в силу с момента их публикации на Сайте.</p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">2. Определения терминов</h2>
             <div className="space-y-4 italic text-sm border-l-4 border-yellow-500 pl-6">
                <p>2.1. Администрация сайта – уполномоченные сотрудники на управление Сайтом.</p>
                <p>2.2. Пользователь сайта (далее ‑ Пользователь) – лицо, имеющее доступ к Сайту через Интернет и использующее его функционал.</p>
                <p>2.3. Контент – охраняемые результаты интеллектуальной деятельности, включая тексты, графику, интерфейсы, базы данных, а также дизайн и структуру Сайта.</p>
                <p>2.4. Личный кабинет – персональный раздел Пользователя на Сайте, доступный после регистрации.</p>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">3. Предмет соглашения</h2>
             <div className="space-y-4">
                <p>3.1. Предметом настоящего Соглашения является предоставление Пользователю доступа к Контенту и сервисам Сайта для подготовки к экзаменам ДОПОГ.</p>
                <p>3.2. Сайт может предоставлять Пользователю следующие услуги:</p>
                <ul className="list-disc pl-6 space-y-2">
                   <li>Доступ к базе тестовых вопросов и ответов (в базовом или расширенном режиме);</li>
                   <li>Средства навигации и поиска по темам ДОПОГ;</li>
                   <li>Доступ к информационным статьям и учебным материалам;</li>
                   <li>Возможность оплаты платных тарифов (Премиум-доступ).</li>
                </ul>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">4. Права и обязанности сторон</h2>
             <div className="space-y-6">
                <div>
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-2">4.1. Администрация вправе:</h3>
                   <ul className="list-disc pl-6 space-y-2">
                      <li>Изменять правила пользования Сайтом и его Контент;</li>
                      <li>Ограничивать доступ к Сайту в случае нарушения Пользователем условий Соглашения;</li>
                      <li>Изменять стоимость и перечень платных услуг в одностороннем порядке.</li>
                   </ul>
                </div>
                <div>
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-2">4.2. Пользователь обязуется:</h3>
                   <ul className="list-disc pl-6 space-y-2">
                      <li>Не предпринимать действий, которые могут рассматриваться как нарушающие нормальную работу Сайта;</li>
                      <li>Соблюдать имущественные и авторские права Администрации;</li>
                      <li>Не передавать данные своей учетной записи третьим лицам.</li>
                   </ul>
                </div>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">5. Использование сайта</h2>
             <p>5.1. Сайт и Контент принадлежат Администрации. Любое использование Контента в коммерческих целях без письменного согласия Администрации запрещено.</p>
             <p>5.2. Приобретая платные услуги («Премиум»), Пользователь признает, что ознакомился с функционалом и объемом предоставляемых услуг в режиме «как есть».</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">6. Ответственность</h2>
             <p>6.1. Любые убытки, возникшие вследствие неосторожного нарушения Пользователем условий Соглашения, Администрацией не возмещаются.</p>
             <p>6.2. Администрация не гарантирует, что Сайт будет работать бесперебойно или без ошибок, однако стремится к постоянному улучшению качества сервиса.</p>
             <p>6.3. Информация на Сайте предоставляется в ознакомительных целях. Администрация не несет ответственности за результаты сдачи экзамена Пользователем в государственных органах.</p>
          </section>

          <section>
             <h2 className="text-2xl font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-sm">7. Возврат товара</h2>
             <p>7.1. В соответствии с законодательством РФ, возврат денежных средств за уже предоставленные цифровые услуги (доступ к Контенту) невозможен, так как услуга считается оказанной в момент предоставления доступа к закрытому разделу Сайта.</p>
             <p>7.2. В случае технических сбоев, не позволяющих получить оплаченную услугу, возврат производится по заявлению Пользователя в течение 10 рабочих дней.</p>
          </section>

          <section className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
             <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">8. Реквизиты владельца</h2>
             <p className="font-bold">ИП Карманович Алексей Сергеевич</p>
             <p>ИНН: 611405438968</p>
             <p>Email: grevelien@yandex.ru</p>
             <p className="mt-4 text-xs italic text-zinc-400">Дата последнего обновления: 28 марта 2026 г.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

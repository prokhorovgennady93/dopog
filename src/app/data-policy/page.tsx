import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DataPolicyPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-yellow-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black mb-8 leading-tight">Политика обработки персональных данных</h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          <p>Настоящая Политика обработки персональных данных (далее — Политика) действует в отношении всех персональных данных, которые Оператор может получить от Пользователей во время использования ими сайта prodopog.ru.</p>
          
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">1. Сведения об Операторе</h2>
            <p>1.1. Наименование: ИП Карманович Алексей Сергеевич.</p>
            <p>1.2. ИНН: 611405438968.</p>
            <p>1.3. Контактный адрес: grevelien@yandex.ru.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">2. Цели и принципы</h2>
            <p>2.1. Обработка персональных данных осуществляется на законной и справедливой основе.</p>
            <p>2.2. Мы собираем только те данные, которые необходимы для предоставления доступа к функционалу сайта и ведения статистики обучения.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">3. Передача данных третьим лицам</h2>
            <p>Оператор не передает ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ (например, по запросу правоохранительных органов).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">4. Согласие пользователя</h2>
            <p>Регистрируясь на сайте или оставляя свои данные в формах обратной связи, Пользователь выражает свое полное согласие на обработку его персональных данных в соответствии с настоящей Политикой.</p>
          </section>
          
          <p className="pt-8 text-sm text-zinc-400 italic">Срок действия согласия: бессрочно.</p>
        </div>
      </div>
    </div>
  );
}

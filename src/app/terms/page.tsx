import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-yellow-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black mb-8 leading-tight">Пользовательское соглашение</h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          <p>Настоящее Пользовательское соглашение (далее — Соглашение) регулирует порядок использования сайта prodopog.ru пользователями.</p>
          
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">1. Предмет соглашения</h2>
            <p>1.1. Предметом настоящего Соглашения является предоставление Клиенту доступа к использованию сайта и его функционала для подготовки к экзаменам ДОПОГ.</p>
            <p>1.2. Использование сайта означает полное и безоговорочное согласие Клиента с условиями настоящего Соглашения.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">2. Права и обязанности сторон</h2>
            <p>2.1. Клиент имеет право пользоваться функционалом сайта в объеме, предусмотренном выбранным тарифом.</p>
            <p>2.2. Клиент обязан не осуществлять несанкционированное копирование материалов сайта.</p>
            <p>2.3. ИП Карманович А. С. имеет право в одностороннем порядке изменять условия Соглашения.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">3. Ответственность участников</h2>
            <p>ИП Карманович А. С. не несёт ответственности за качество подготовки Пользователя, а лишь предоставляет инструменты для самостоятельного обучения.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">4. Реквизиты</h2>
            <p>ИП Карманович Алексей Сергеевич<br />
            ИНН 611405438968<br />
            Email: grevelien@yandex.ru</p>
          </section>

          <p className="pt-8 text-sm text-zinc-400 italic text-center">Дата последнего обновления: 28 марта 2026 г.</p>
        </div>
      </div>
    </div>
  );
}

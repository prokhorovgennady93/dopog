import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, XCircle, Play } from 'lucide-react';

interface SharePageProps {
  searchParams: Promise<{ s?: string, t?: string, c?: string }>;
}

export async function generateMetadata({ searchParams }: SharePageProps): Promise<Metadata> {
  const params = await searchParams;
  const score = params.s || '0';
  const total = params.t || '0';
  const category = params.c || 'ДОПОГ';
  
  const title = `Результат теста: ${score} / ${total} (${category})`;
  const description = `Я прошел тест по теме ${category} на ADR Platform. Проверь свои знания прямо сейчас!`;
  const ogImage = `/api/og?s=${score}&t=${total}&c=${category}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ADR Exam Result',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SharePage({ searchParams }: SharePageProps) {
  const params = await searchParams;
  const score = Number(params.s || 0);
  const total = Number(params.t || 0);
  const category = params.c || 'ДОПОГ';
  
  const percentage = total > 0 ? (score / total) * 100 : 0;
  const isPassed = percentage >= 80;

  return (
    <div className="flex-1 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-6 min-h-[80vh]">
      <div className="max-w-md w-full bg-zinc-50 dark:bg-zinc-900/50 p-8 sm:p-12 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-2xl text-center animate-in fade-in zoom-in duration-500">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl ${isPassed ? 'bg-green-500 shadow-green-500/20' : 'bg-red-500 shadow-red-500/20'}`}>
          {isPassed ? <CheckCircle2 className="w-10 h-10 text-white" /> : <XCircle className="w-10 h-10 text-white" />}
        </div>

        <h1 className="text-3xl font-black mb-2">{isPassed ? 'Экзамен сдан!' : 'Не сдано'}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-8 uppercase tracking-widest text-xs">
          Результат по категории {category}
        </p>

        <div className="flex items-baseline justify-center gap-2 mb-10">
          <span className="text-7xl font-black">{score}</span>
          <span className="text-3xl font-bold text-zinc-400">/ {total}</span>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="w-full bg-zinc-900 dark:bg-yellow-500 hover:bg-zinc-800 dark:hover:bg-yellow-400 text-white dark:text-black font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-current" />
            Пройти тест самому
          </Link>
          <p className="text-xs text-zinc-400 mt-6 leading-relaxed">
            Подготовься к экзамену ДОПОГ 2026 бесплатно на нашем портале. Актуальная база вопросов и симуляция реального теста.
          </p>
        </div>
      </div>
    </div>
  );
}

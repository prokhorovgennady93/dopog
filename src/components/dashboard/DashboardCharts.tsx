"use client";

import { Target, AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";

interface TopicMastery {
  id: string;
  title: string;
  totalQuestions: number;
  correctAnswers: number;
  mastery: number; // 0-100
}

interface DashboardChartsProps {
  topicMastery: TopicMastery[];
}

export function MasteryHeatmap({ topicMastery }: DashboardChartsProps) {
  if (topicMastery.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black mb-1">Мастерство по темам</h3>
          <p className="text-xs text-zinc-500 font-medium">Ваш прогресс в изучении материалов ДОПОГ</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-400">
           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800"></div> 0%</div>
           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div> 100%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicMastery.slice(0, 3).map((topic) => (
          <TopicProgressItem key={topic.id} topic={topic} />
        ))}
      </div>

      {topicMastery.length > 3 && (
        <details className="mt-8 group/heatmap [&_summary::-webkit-details-marker]:hidden border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <summary className="flex items-center justify-center gap-2 cursor-pointer select-none text-zinc-500 hover:text-orange-600 dark:hover:text-orange-500 transition-colors font-bold text-sm uppercase tracking-widest">
            <span className="group-open/heatmap:hidden">Развернуть все темы ({topicMastery.length - 3})</span>
            <span className="hidden group-open/heatmap:inline">Скрыть темы</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-open/heatmap:rotate-180" />
          </summary>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
            {topicMastery.slice(3).map((topic) => (
              <TopicProgressItem key={topic.id} topic={topic} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

export function WeakestThemeCard({ theme }: { theme: TopicMastery | null }) {
  if (!theme || theme.mastery >= 90) return null;

  return (
    <div className="bg-orange-500 text-white rounded-3xl p-6 shadow-xl shadow-orange-900/10 flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
         <AlertCircle className="w-16 h-16" />
      </div>
      
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest mb-3">Нужна практика</span>
        <h3 className="text-xl font-black mb-1 leading-tight">Слабая тема:</h3>
        <p className="text-base font-bold opacity-90 truncate mb-3">{theme.title}</p>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
           <span className="text-3xl font-black">{theme.mastery}%</span>
           <span className="text-[10px] font-bold opacity-70">точность ответов</span>
        </div>
        <button className="w-full bg-white text-orange-600 font-black py-3 rounded-xl hover:bg-zinc-100 transition-all shadow-lg active:scale-95 text-sm">
           Подтянуть знания
        </button>
      </div>
    </div>
  );
}

export function OverallMasteryGauge({ mastery }: { mastery: number }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="relative w-28 h-28 mb-4">
        {/* Simple SVG gauge */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            className="text-zinc-100 dark:text-zinc-800"
          />
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={364.4}
            strokeDashoffset={364.4 - (364.4 * mastery) / 100}
            strokeLinecap="round"
            className="text-orange-500 transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black">{mastery}%</span>
        </div>
      </div>
      <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-1">Общий прогресс</h3>
      <p className="text-xs font-bold text-zinc-500 leading-relaxed">Курс пройден на {mastery}% от общего пула вопросов.</p>
    </div>
  );
}

function TopicProgressItem({ topic }: { topic: TopicMastery }) {
  return (
    <div className="group relative">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 leading-snug">{topic.title}</h4>
        <span className={`text-xs font-black shrink-0 mt-0.5 ${topic.mastery >= 80 ? 'text-green-600' : topic.mastery >= 40 ? 'text-orange-600' : 'text-zinc-400'}`}>
          {topic.mastery}%
        </span>
      </div>
      
      <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${
            topic.mastery >= 80 ? 'bg-green-500' : 
            topic.mastery >= 40 ? 'bg-orange-500' : 
            'bg-zinc-300 dark:bg-zinc-700'
          }`}
          style={{ width: `${topic.mastery}%` }}
        />
      </div>
      
      <div className="mt-2 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
         <span>{topic.correctAnswers} / {topic.totalQuestions} Вопросов</span>
      </div>
    </div>
  );
}

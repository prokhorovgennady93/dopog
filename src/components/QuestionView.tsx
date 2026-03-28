"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, XCircle, Lock, Zap, Loader2 } from "lucide-react";
import { PremiumModal } from "./PremiumModal";
import { useSession } from "next-auth/react";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  topic: string;
  explanation: string | null;
  imageUrl: string | null;
  options: Option[];
}

interface QuestionViewProps {
  courseTitle: string;
  courseId: string;
  questions: Question[];
  themes: { id: string; title: string; _count: { questions: number } }[];
  currentTopicId?: string;
  isLoggedIn: boolean;
}

const GUEST_LIMIT = 25;

type Phase = 'QUESTION' | 'INTERMEDIATE' | 'FINAL';

export function QuestionView({
  courseTitle,
  courseId,
  questions,
  themes,
  currentTopicId,
  isLoggedIn
}: QuestionViewProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const storageKey = `study_${courseId}_${currentTopicId || 'all'}`;

  const [phase, setPhase] = useState<Phase>('QUESTION');
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try { return JSON.parse(saved).currentIndex || 0; } catch { return 0; }
      }
    }
    return 0;
  });
  const [answers, setAnswers] = useState<Record<number, { selectedId: string, isCorrect: boolean }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try { return JSON.parse(saved).answers || {}; } catch { return {}; }
      }
    }
    return {};
  });
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);

  // Save answers and position to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify({ answers, currentIndex }));
    }
  }, [answers, currentIndex, storageKey]);

  const user = session?.user as any;
  const isUserFull = user?.hasFullAccess ?? false;
  const fullAccessExpiry = user?.fullAccessExpiresAt ? new Date(user.fullAccessExpiresAt) : null;
  const isFullAccessActive = isUserFull && (!fullAccessExpiry || fullAccessExpiry > new Date());

  const coursePurchase = user?.purchases?.find((p: any) => p.courseId === courseId);
  const purchaseExpiry = coursePurchase?.expiresAt ? new Date(coursePurchase.expiresAt) : null;
  const isPurchaseActive = !!coursePurchase && (!purchaseExpiry || purchaseExpiry > new Date());

  const hasValidAccess = isFullAccessActive || isPurchaseActive;
  const isGuestRestricted = !hasValidAccess && currentIndex >= GUEST_LIMIT;
  const currentQuestion = questions[currentIndex] || null;

  const hasAnsweredCurrentInfo = answers[currentIndex];
  const showAnswer = !!hasAnsweredCurrentInfo;
  const selectedOptionId = hasAnsweredCurrentInfo?.selectedId || null;

  // Auto-scroll the active nav button into view
  useEffect(() => {
    if (phase === 'QUESTION') {
      const activeBtn = document.getElementById(`nav-btn-${currentIndex}`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex, phase]);

  const handleOptionSelect = (optionId: string) => {
    if (showAnswer || isGuestRestricted) return;

    const isCorrect = currentQuestion.options.find(o => o.id === optionId)?.isCorrect || false;

    setAnswers(prev => ({
      ...prev,
      [currentIndex]: { selectedId: optionId, isCorrect }
    }));
  };

  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNextStep = () => {
    if (isLastQuestion) {
      if (currentTopicId && themes.length > 0) {
        const currentThemeIndex = themes.findIndex(t => t.id === currentTopicId);
        // If it's the absolute last theme, we can just go straight to FINAL, but let's show INTERMEDIATE first
        setPhase('INTERMEDIATE');
      } else {
        setPhase('FINAL');
      }
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleNextTheme = () => {
    const currentThemeIndex = themes.findIndex(t => t.id === currentTopicId);
    if (currentThemeIndex !== -1 && currentThemeIndex < themes.length - 1) {
      const nextTheme = themes[currentThemeIndex + 1];
      // Reset state for new questions
      setPhase('QUESTION');
      setCurrentIndex(0);
      setAnswers({});
      router.push(`/study/${courseId}?topicId=${nextTheme.id}`);
    } else {
      setPhase('FINAL');
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const restart = () => {
    setPhase('QUESTION');
    setCurrentIndex(0);
    setAnswers({});
    setImageErrors({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  };

  const handlePurchase = async (type: 'single_course' | 'full_access') => {
    if (!isLoggedIn) {
      router.push('/register');
      return;
    }
    setPurchaseLoading(type);
    try {
      const returnUrl = `/study/${courseId}${currentTopicId ? `?topicId=${currentTopicId}` : ''}`;
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          courseId: type === 'single_course' ? courseId : undefined,
          returnUrl,
        }),
      });
      const data = await res.json();
      if (data.url) router.push(data.url);
    } catch (e) {
      console.error(e);
    } finally {
      setPurchaseLoading(null);
    }
  };

  // Metrics Logic
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  let correctCount = 0;
  let incorrectCount = 0;

  Object.values(answers).forEach(ans => {
    if (ans.isCorrect) correctCount++;
    else incorrectCount++;
  });

  const correctPerc = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const incorrectPerc = totalQuestions > 0 ? (incorrectCount / totalQuestions) * 100 : 0;

  if (phase === 'INTERMEDIATE') {
    const currentTheme = themes.find(t => t.id === currentTopicId);

    // Calculate skipped
    const skippedCount = totalQuestions - answeredCount;

    return (
      <div className="flex-1 flex flex-col p-4 max-w-2xl mx-auto w-full font-sans justify-center">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none">
          <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 border border-yellow-200 dark:border-yellow-500/20">
            <CheckCircle2 className="w-12 h-12 text-yellow-600 dark:text-yellow-500" />
          </div>
          <h2 className="text-3xl font-black mb-2">Тема завершена!</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 font-medium">{currentTheme?.title || "Все вопросы отвечены"} • {Math.round((answeredCount / totalQuestions) * 100)}% пройдено</p>

          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 flex gap-6 sm:gap-8 mb-10 w-full justify-center flex-wrap">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-black text-green-500/80 dark:text-green-500 mb-1">{correctCount}</span>
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">Верных</span>
            </div>
            <div className="w-px bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-black text-red-500/80 dark:text-red-500 mb-1">{incorrectCount}</span>
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">Ошибок</span>
            </div>
            {skippedCount > 0 && (
              <>
                <div className="w-px bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-black text-zinc-400 mb-1">{skippedCount}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">Пропущено</span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleNextTheme}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-2xl transition-all shadow-xl shadow-yellow-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Перейти к следующей теме <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'FINAL') {
    const correctDeg = totalQuestions > 0 ? (correctCount / totalQuestions) * 360 : 0;

    // Find the topic with the most errors
    const errorsByTopic: Record<string, number> = {};
    Object.entries(answers).forEach(([idx, ans]) => {
      if (!ans.isCorrect) {
        const topicName = questions[Number(idx)]?.topic;
        if (topicName) {
          errorsByTopic[topicName] = (errorsByTopic[topicName] || 0) + 1;
        }
      }
    });

    let worstTopic = null;
    let maxTopicErrors = 0;
    for (const [t, count] of Object.entries(errorsByTopic)) {
      if (count > maxTopicErrors) {
        maxTopicErrors = count;
        worstTopic = t;
      }
    }

    return (
      <div className="flex-1 flex flex-col p-4 max-w-2xl mx-auto w-full font-sans justify-center">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none">
          <h2 className="text-4xl font-black mb-2">Отличная работа!</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">Вы завершили прохождение модуля.</p>

          <div className="relative w-48 h-48 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/10"
            style={{ background: `conic-gradient(#22c55e ${correctDeg}deg, #fb7185 ${correctDeg}deg 360deg)` }}>
            <div className="w-36 h-36 bg-white dark:bg-zinc-900 rounded-full flex flex-col items-center justify-center shadow-inner">
              <span className="text-4xl font-black text-zinc-900 dark:text-white">{Math.round((correctCount / totalQuestions) * 100)}%</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Точность</span>
            </div>
          </div>

          {worstTopic && (
            <div className="mb-10 p-4 bg-red-50 dark:bg-red-500/5 rounded-2xl border border-red-100 dark:border-red-500/10 max-w-md w-full">
              <span className="text-[10px] font-bold text-red-500/80 uppercase tracking-wider block mb-1">Где больше всего ошибок</span>
              <p className="text-sm text-red-900 dark:text-red-400 font-medium leading-snug">«{worstTopic}» ({maxTopicErrors} ош.)</p>
            </div>
          )}

          <div className="flex gap-4 w-full">
            <button
              onClick={restart}
              className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-750 text-zinc-900 dark:text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <Link
              href="/"
              className="flex-[3] bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-2xl transition-all shadow-xl shadow-yellow-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Завершить курс <CheckCircle2 className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-2 sm:p-4 max-w-3xl mx-auto w-full font-sans">
      <div className="flex flex-col gap-4 w-full">
        {/* Main: Question Section */}
        <div className="flex-1 flex flex-col gap-3">

          {/* Progress Bar Header */}
          <div className="w-full bg-white dark:bg-zinc-900/40 p-3 sm:p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400">Прогресс модуля: <span className="text-zinc-900 dark:text-white">{Math.round((answeredCount / totalQuestions) * 100)}%</span></span>
              <div className="flex gap-4 text-[10px] sm:text-xs font-bold text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500/80 dark:bg-green-500 shadow-sm shadow-green-500/20" /> {correctCount} верных</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500 shadow-sm shadow-red-500/20" /> {incorrectCount} ошибок</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full flex overflow-hidden">
              <div className="h-full bg-green-500/80 dark:bg-green-500 transition-all duration-500 ease-out" style={{ width: `${correctPerc}%` }} />
              <div className="h-full bg-red-400 dark:bg-red-500 transition-all duration-500 ease-out" style={{ width: `${incorrectPerc}%` }} />
            </div>
          </div>

          {/* Quick Navigation Panel */}
          {!isGuestRestricted && (
            <div className="relative group/nav">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none z-20" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none z-20" />

              <div className="flex gap-2 overflow-x-auto scroll-smooth py-2 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {questions.map((q, idx) => {
                  const isActive = currentIndex === idx;
                  const ans = answers[idx];
                  let btnClass = isActive
                    ? 'bg-yellow-500 text-black border-2 border-yellow-600 shadow-md ring-2 ring-yellow-500/20'
                    : 'bg-white dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-750';

                  if (ans) {
                    if (ans.isCorrect) {
                      btnClass = isActive
                        ? 'bg-green-500 text-white border-2 border-green-600 shadow-md ring-2 ring-green-500/20'
                        : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800';
                    } else {
                      btnClass = isActive
                        ? 'bg-red-500 text-white border-2 border-red-600 shadow-md ring-2 ring-red-500/20'
                        : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800';
                    }
                  }

                  return (
                    <button
                      key={q.id || idx}
                      id={`nav-btn-${idx}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={`min-w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 relative z-40 select-none touch-manipulation cursor-pointer transition-all duration-200 ${btnClass} active:opacity-50 active:scale-95`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}


          {isGuestRestricted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-yellow-500/20">
                <Lock className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-4">Время перейти на новый уровень!</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-8 leading-relaxed font-medium">
                Вы успешно ознакомились с первыми 25 вопросами. Получите доступ ко всем {questions.length} вопросам этого курса и неограниченному режиму экзамена!
              </p>

              <div className="flex flex-col gap-6 w-full max-w-2xl justify-center mb-8 transition-all">
                {/* Tariff 1: Single Course */}
                <div className="flex-1 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-3xl p-6 text-left relative hover:border-yellow-500 dark:hover:border-yellow-500 transition-all">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">Только этот курс</span>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-black">99 ₽</span>
                    <span className="text-sm font-bold text-red-500 line-through pb-1">199 ₽</span>
                  </div>

                  <button
                    onClick={() => handlePurchase('single_course')}
                    disabled={purchaseLoading === 'single_course'}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {purchaseLoading === 'single_course' ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLoggedIn ? "Купить курс" : "Войти и купить")}
                  </button>
                </div>

                {/* Tariff 2: Full Access */}
                <div className="flex-1 bg-gradient-to-br from-yellow-400 to-yellow-500 border-2 border-yellow-300 dark:border-yellow-600 rounded-3xl p-6 text-left relative shadow-xl shadow-yellow-500/20 transform sm:-translate-y-2">
                  <div className="absolute top-0 right-0 bg-black text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl rounded-tr-2xl tracking-widest">
                    Выгодно
                  </div>
                  <span className="text-xs font-bold text-yellow-900 uppercase tracking-widest block mb-2">Полный доступ</span>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-black text-black">199 ₽</span>
                    <span className="text-sm font-bold text-yellow-800/60 line-through pb-1">399 ₽</span>
                  </div>

                  <button
                    onClick={() => handlePurchase('full_access')}
                    disabled={purchaseLoading === 'full_access'}
                    className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-zinc-800 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {purchaseLoading === 'full_access' ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                      <>Купить всё <Zap className="w-4 h-4 fill-current text-yellow-500" /></>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={restart}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-bold transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Начать заново
              </button>
            </div>
          ) : (currentQuestion && (
            <div className="flex-1 flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white dark:bg-zinc-900/40 p-5 sm:p-6 rounded-r-3xl rounded-l-none border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500" />
                <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-500 uppercase tracking-[0.2em] mb-2 block">
                  {currentQuestion.topic}
                </span>
                <h3 className="text-lg sm:text-xl font-bold leading-relaxed">
                  {currentQuestion.text}
                </h3>
              </div>

              {/* Question image */}
              {currentQuestion.imageUrl && !imageErrors[currentIndex] && (
                <div className="rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/20 flex justify-center p-4">
                  <img
                    src={currentQuestion.imageUrl}
                    alt="Иллюстрация к вопросу"
                    className="max-h-64 object-contain shadow-lg rounded-xl"
                    onError={() => setImageErrors(prev => ({ ...prev, [currentIndex]: true }))}
                  />
                </div>
              )}

              {/* Options grid */}
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let statusClasses = "border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800";

                  if (showAnswer) {
                    if (option.isCorrect) {
                      statusClasses = "border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-2 ring-green-500/5";
                    } else if (isSelected && !option.isCorrect) {
                      statusClasses = "border-red-500 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 ring-2 ring-red-500/5";
                    } else {
                      statusClasses = "opacity-50 grayscale hover:bg-transparent cursor-default border-zinc-100 dark:border-zinc-800";
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={showAnswer}
                      className={`w-full text-left p-3 sm:p-4 rounded-2xl border-2 flex items-start gap-3 relative z-30 select-none touch-manipulation cursor-pointer transition-all duration-200 ${statusClasses} group active:opacity-60 active:scale-[0.99]`}
                    >
                      <div className={`mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all ${showAnswer && option.isCorrect ? 'bg-green-500 border-green-500 text-white' : (showAnswer && isSelected && !option.isCorrect ? 'bg-red-500 border-red-500 text-white' : 'border-zinc-300 dark:border-zinc-600 group-hover:border-yellow-500')}`}>
                        {showAnswer && option.isCorrect && <CheckCircle2 className="w-3 h-3" />}
                        {showAnswer && isSelected && !option.isCorrect && <XCircle className="w-3 h-3" />}
                      </div>
                      <span className="text-sm sm:text-base font-medium leading-snug tracking-tight">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Block */}
              {showAnswer && currentQuestion.explanation && (
                <details className="group bg-yellow-50 dark:bg-yellow-500/5 border border-yellow-200 dark:border-yellow-500/20 rounded-2xl p-4 sm:p-5 animate-in slide-in-from-top-4 duration-500 cursor-pointer hover:bg-yellow-100/50 dark:hover:bg-yellow-500/10 transition-colors">
                  <summary className="flex items-center gap-3 list-none marker:hidden outline-none">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xl pb-[2px] font-black text-black shrink-0 shadow-sm transition-transform group-open:rotate-180">▿</div>
                    <h4 className="text-sm font-black text-yellow-700 dark:text-yellow-500 uppercase tracking-widest flex-1">Показать объяснение</h4>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-yellow-200/50 dark:border-yellow-500/20">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </details>
              )}

              {/* Controls */}
              <footer className="mt-4 flex items-center justify-between gap-4">
                <button
                  onClick={prevQuestion}
                  disabled={currentIndex === 0}
                  className="h-14 px-6 flex items-center gap-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 disabled:opacity-0 transition-all font-bold"
                >
                  <ArrowLeft className="w-4 h-4" /> Назад
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={!showAnswer}
                  className={`h-14 px-8 rounded-2xl font-black transition-all flex items-center gap-3 ${!showAnswer ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 opacity-50 cursor-not-allowed' : 'bg-zinc-900 dark:bg-yellow-500 text-white dark:text-black hover:-translate-y-1 shadow-xl active:translate-y-0 shadow-zinc-200/50 dark:shadow-none'}`}
                >
                  {isLastQuestion ? (currentTopicId ? "К следующей теме" : "Завершить курс") : "Следующий вопрос"}
                  {isLastQuestion ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

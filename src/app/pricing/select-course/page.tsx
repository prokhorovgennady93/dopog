"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  slug: string;
  title: string;
  icon: string | null;
  _count: { questions: number };
}

export default function SelectCoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBuyCourse = async (courseId: string) => {
    setPurchasing(courseId);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "single_course", courseId }),
      });
      const data = await res.json();
      if (data.url) router.push(data.url);
    } catch (e) {
      console.error(e);
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Назад к тарифам
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            Выберите курс
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            Доступ к выбранному курсу на 3 месяца за 99 ₽
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-yellow-500 dark:hover:border-yellow-500 transition-all hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-4">{course.icon || "📦"}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-zinc-500 mb-6">
                  {course._count.questions} вопросов
                </p>
                <button
                  onClick={() => handleBuyCourse(course.id)}
                  disabled={purchasing === course.id}
                  className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {purchasing === course.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Купить за 99 ₽ <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

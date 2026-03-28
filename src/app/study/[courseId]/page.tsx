import { db } from "@/lib/db";
import { auth } from "@/../auth";
import { notFound, redirect } from "next/navigation";
import { QuestionView } from "@/components/QuestionView";
import Link from "next/link";

export default async function StudyPage({
  params,
  searchParams
}: {
  params: { courseId: string };
  searchParams: { topicId?: string };
}) {
  const { courseId } = await params;
  const { topicId } = await searchParams;
  const session = await auth();
  const isLoggedIn = !!session;

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      themes: {
        orderBy: { order: "asc" },
        include: {
          _count: { select: { questions: true } }
        }
      },
      questions: {
        where: topicId ? { topicId } : undefined,
        include: {
          options: true,
          topic: true
        }
      }
    }
  });

  if (!course) {
    notFound();
  }

  // Pre-process questions for the component
  const questions = (course as any).questions.map((q: any) => ({
    id: q.id,
    text: q.text,
    topic: q.topic?.title || "Без темы",
    explanation: q.explanation,
    imageUrl: q.imageUrl,
    options: q.options.map((o: any) => ({
      id: o.id,
      text: o.text,
      isCorrect: o.isCorrect
    }))
  }));

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-zinc-950">
        <h1 className="text-2xl font-bold mb-2">В этой теме пока нет вопросов</h1>
        <p className="text-zinc-500 mb-8 max-w-md">Мы работаем над наполнением этого раздела. Пожалуйста, выберите другую тему для обучения.</p>
        <Link href={`/course/${course.slug}`} className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold">
          Вернуться к курсу
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-zinc-950 flex flex-col">
      <QuestionView
        courseTitle={course.title}
        courseId={course.id}
        questions={questions}
        themes={(course as any).themes}
        currentTopicId={topicId}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

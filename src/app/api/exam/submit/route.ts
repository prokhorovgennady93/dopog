import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  let session: any = null;
  try {
    session = await auth();
    if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId, questionIds, answers, timeTaken } = await req.json();

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: { questions: { include: { options: true, topic: true } } },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  // Оставляем только те вопросы, которые реально были в этом экзамене
  const examQuestions = course.questions.filter((q: any) => questionIds?.includes(q.id));

  let correctCount = 0;
  const totalQuestions = examQuestions.length || 1;
  const detailsList = [];

  // Calculate score
  for (const question of examQuestions) {
    const userAnswerId = answers[question.id];
    const correctOption = question.options.find((o: any) => o.isCorrect);
    const isCorrect = userAnswerId === correctOption?.id;
    
    if (isCorrect) {
      correctCount++;
    }

    detailsList.push({
      questionId: question.id,
      text: question.text,
      explanation: question.explanation,
      options: question.options.map((o: any) => ({
        id: o.id,
        text: o.text,
        isCorrect: o.isCorrect
      })),
      userAnswerId,
      isCorrect,
      topicTitle: question.topic?.title || "Без темы"
    });
  }

  const mistakesCount = totalQuestions - correctCount;
  const isBasic = course.slug === "basic";
  const maxMistakes = isBasic ? 6 : 3;
  
  const isPassed = mistakesCount <= maxMistakes;

  // Save attempt
  const attempt = await db.examAttempt.create({
    data: {
      userId: session.user.id,
      courseId,
      score,
      isPassed,
      timeTaken,
      finishedAt: new Date(),
      details: JSON.stringify(detailsList),
    } as any,
  });

  // Update user progress for individual questions in a transaction for performance
  try {
    await db.$transaction(
      examQuestions.map((q: any) => {
        const isCorrect = answers[q.id] === q.options.find((o: any) => o.isCorrect)?.id;
        return db.userProgress.upsert({
          where: {
            userId_questionId: {
              userId: session.user.id!,
              questionId: q.id,
            },
          },
          update: {
            isCorrect,
            lastAttemptedAt: new Date(),
          },
          create: {
            userId: session.user.id!,
            questionId: q.id,
            isCorrect,
          },
        });
      })
    );
  } catch (progressError) {
    console.warn("PROGRESS UPDATE FAILED (non-critical):", progressError);
    // We continue even if progress update fails, as the attempt itself is saved
  }

  return NextResponse.json({ attemptId: attempt.id });
  } catch (err: any) {
    console.error("CRITICAL: EXAM SUBMIT ERROR:", {
      message: err.message,
      stack: err.stack,
      userId: session?.user?.id
    });
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: err.message 
    }, { status: 500 });
  }
}

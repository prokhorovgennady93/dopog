import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId, answers, timeTaken } = await req.json();

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: { questions: { include: { options: true } } },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  let correctCount = 0;
  const totalQuestions = course.questions.length;

  // Calculate score
  for (const question of course.questions) {
    const userAnswerId = answers[question.id];
    const correctOption = question.options.find((o: any) => o.isCorrect);
    if (userAnswerId === correctOption?.id) {
      correctCount++;
    }
  }

  const score = Math.round((correctCount / totalQuestions) * 100);
  const passThreshold = 75; // ДОПОГ standard
  const isPassed = score >= passThreshold;

  // Save attempt
  const attempt = await db.examAttempt.create({
    data: {
      userId: session.user.id,
      courseId,
      score,
      isPassed,
      timeTaken,
      finishedAt: new Date(),
    },
  });

  // Update user progress for individual questions
  const progressUpserts = course.questions.map((q: any) => {
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
  });

  await Promise.all(progressUpserts);

  return NextResponse.json({ attemptId: attempt.id });
}

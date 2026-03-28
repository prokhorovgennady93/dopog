import { db } from "@/lib/db";
import { auth } from "@/../auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  BookOpen, 
  HelpCircle,
  Edit2,
  Image as ImageIcon,
  CheckCircle,
  ChevronRight
} from "lucide-react";
import { QuestionEditForm } from "@/components/admin/QuestionEditForm";

export default async function AdminCoursePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const session = await auth();

  if (!session || !(session.user as any)?.isAdmin) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: { id },
    include: {
      themes: {
        include: {
          questions: {
            include: { options: true },
            orderBy: { id: "asc" }
          }
        },
        orderBy: { order: "asc" }
      }
    }
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад в панель
            </Link>
            <div className="h-5 w-px bg-zinc-200" />
            <div className="flex items-center gap-2">
              <span className="text-xl">{course.icon}</span>
              <h1 className="text-lg font-black text-zinc-900">
                {course.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {(course as any).themes.map((topic: any) => (
          <section key={topic.id} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-yellow-600" />
              <h2 className="text-xl font-bold text-zinc-900">{topic.title}</h2>
              <span className="text-xs font-medium text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                {topic.questions.length} вопр.
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {topic.questions.map((question: any) => (
                <div 
                  key={question.id} 
                  className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Question Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">ID: {question.id}</span>
                          <h3 className="font-bold text-zinc-900 leading-tight">
                            {question.text}
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {question.options.map((option: any) => (
                          <div 
                            key={option.id}
                            className={`text-xs p-3 rounded-lg border flex items-center gap-2 ${
                              option.isCorrect 
                                ? "bg-green-50 border-green-200 text-green-700" 
                                : "bg-zinc-50 border-zinc-100 text-zinc-500"
                            }`}
                          >
                            {option.isCorrect && <CheckCircle className="w-3 h-3 flex-shrink-0" />}
                            {option.text}
                          </div>
                        ))}
                      </div>

                      {question.explanation && (
                        <div className="bg-yellow-50/50 border border-yellow-100 p-4 rounded-xl">
                          <p className="text-xs text-yellow-800 italic">
                            <span className="font-bold not-italic">Объяснение: </span>
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Meta & Actions */}
                    <div className="lg:w-64 space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-zinc-100 lg:pl-8">
                      {question.imageUrl ? (
                        <div className="aspect-video bg-zinc-100 rounded-xl overflow-hidden mb-4 border border-zinc-200 flex items-center justify-center">
                          <img 
                            src={question.imageUrl} 
                            alt="Question preview" 
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-300 mb-4">
                          <ImageIcon className="w-6 h-6 mb-2" />
                          <span className="text-[10px] font-bold uppercase">Нет изображения</span>
                        </div>
                      )}

                      <QuestionEditForm question={JSON.parse(JSON.stringify(question))} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

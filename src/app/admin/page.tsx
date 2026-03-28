import { auth } from "@/../auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  TrendingUp,
  Crown,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Shield,
  Clock,
  LogOut,
  Search,
  Building2
} from "lucide-react";
import { UserActionsCell } from "@/components/admin/UserActionsCell";

export const metadata = {
  title: "Панель администратора — ДОПОГ Экзамен",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const { search } = await searchParams;
  const session = await auth();

  // Redirect if not logged in
  if (!session?.user?.email) {
    redirect("/login");
  }

  // Check isAdmin — either from JWT session or direct DB lookup (for stale tokens)
  let isAdmin = (session.user as any)?.isAdmin ?? false;
  if (!isAdmin) {
    const dbUser = await db.user.findUnique({
      where: { email: session.user.email },
      select: { isAdmin: true },
    });
    isAdmin = dbUser?.isAdmin ?? false;
  }

  if (!isAdmin) {
    redirect("/");
  }

  // Fetch all stats in parallel
  const [users, courses, examAttempts] = await Promise.all([
    db.user.findMany({
      where: search ? {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
        ],
      } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        examAttempts: {
          include: { course: { select: { title: true, slug: true } } },
          orderBy: { startedAt: "desc" },
        },
        purchases: {
          include: { course: { select: { title: true } } }
        },
        ownedCodes: {
          select: { id: true, usedCount: true, maxUses: true }
        },
        _count: { select: { progress: true } },
      },
    }),
    db.course.findMany({
      include: {
        _count: { select: { questions: true, examAttempts: true } },
      },
      orderBy: { title: "asc" },
    }),
    db.examAttempt.findMany({
      where: { isPassed: true },
    }),
  ]);

  const totalStudents = users.length;
  const premiumStudents = users.filter((u: any) => u.hasFullAccess).length;
  // Simulate payment sum: 199 RUB for Full Access
  const PREMIUM_PRICE = 199;
  const totalRevenue = premiumStudents * PREMIUM_PRICE;
  const totalExams = examAttempts.length;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              На сайт
            </Link>
            <div className="h-5 w-px bg-zinc-200" />
            <h1 className="text-lg font-black text-zinc-900">
              Панель администратора
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-lg">
            <Crown className="w-4 h-4 text-yellow-600" />
            <span className="text-xs font-bold text-yellow-700">
              {session.user?.name || session.user?.email}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Stats Overview */}
        <section>
          <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">
            Общая статистика
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Users className="w-5 h-5 text-blue-600" />}
              bg="bg-blue-50"
              label="Всего студентов"
              value={String(totalStudents)}
            />
            <StatCard
              icon={<Crown className="w-5 h-5 text-yellow-600" />}
              bg="bg-yellow-50"
              label="Полный доступ"
              value={String(premiumStudents)}
              sub={`${totalStudents > 0 ? Math.round((premiumStudents / totalStudents) * 100) : 0}% от всех`}
            />
            <StatCard
              icon={<CreditCard className="w-5 h-5 text-green-600" />}
              bg="bg-green-50"
              label="Сумма оплат"
              value={`${totalRevenue.toLocaleString("ru-RU")} ₽`}
              sub={`${premiumStudents} × ${PREMIUM_PRICE} ₽`}
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
              bg="bg-purple-50"
              label="Экзаменов сдано"
              value={String(totalExams)}
            />
          </div>
        </section>

        {/* Courses */}
        <section>
          <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">
            Курсы
          </h2>
          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="text-left px-6 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    Название курса
                  </th>
                  <th className="text-center px-4 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    Вопросов
                  </th>
                  <th className="text-center px-4 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    Попыток экзамена
                  </th>
                  <th className="text-center px-4 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {courses.map((course: any) => (
                  <tr key={course.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{course.icon}</span>
                        <span className="font-semibold text-zinc-900">
                          {course.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="font-bold text-zinc-700">
                        {course._count.questions}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="font-bold text-zinc-700">
                        {course._count.examAttempts}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="text-xs font-bold text-yellow-600 hover:text-yellow-700 transition-colors"
                      >
                        Управлять →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Students */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest">
              Учащиеся ({totalStudents})
            </h2>
            
            <form action="/admin" className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                name="search"
                defaultValue={search}
                placeholder="Поиск по имени или email..." 
                className="pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all w-full sm:w-64"
              />
            </form>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                      Пользователь
                    </th>
                    <th className="text-left px-4 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                      Доступ / Роль
                    </th>
                    <th className="text-center px-4 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                      Лицензии
                    </th>
                    <th className="text-center px-4 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                      Ответов
                    </th>
                    <th className="text-center px-4 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                      Дата регистрации
                    </th>
                    <th className="text-center px-4 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {users.map((user: any) => {
                    const uniqueCourses = [
                      ...new Map(
                        user.examAttempts.map((a: any) => [a.courseId, a.course])
                      ).values(),
                    ];
                    return (
                      <tr key={user.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-zinc-900">
                              {user.name || "—"}
                            </p>
                            <p className="text-xs text-zinc-400 mt-0.5">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1">
                            {user.hasFullAccess && (
                              <span className="inline-flex flex-col items-start bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded-full">
                                <span className="flex items-center gap-1"><Crown className="w-3 h-3" /> Полный доступ</span>
                                {user.fullAccessExpiresAt && (
                                  <span className="text-[8px] opacity-70 ml-4">до {new Date(user.fullAccessExpiresAt).toLocaleDateString("ru-RU")}</span>
                                )}
                              </span>
                            )}
                            {user.purchases.length > 0 && user.purchases.map((p: any) => (
                              <span key={p.id} className="inline-flex flex-col bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded border border-blue-100">
                                <span>{p.course.title}</span>
                                {p.expiresAt && (
                                  <span className="text-[8px] opacity-70">до {new Date(p.expiresAt).toLocaleDateString("ru-RU")}</span>
                                )}
                              </span>
                            ))}
                            {!user.hasFullAccess && user.purchases.length === 0 && (
                              <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-500 text-xs font-bold px-2 py-1 rounded-full">
                                Демо
                              </span>
                            )}
                          </div>
                          {user.isAdmin && (
                            <span className="mt-1 inline-flex items-center gap-1 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full">
                              Admin
                            </span>
                          )}
                          {user.isOrganization && (
                            <span className="mt-1 inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full">
                              <Building2 className="w-3 h-3" /> Орг: {user.orgName || "—"}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {user.isOrganization ? (
                            <div className="flex flex-col items-center">
                              <span className="font-bold text-zinc-700">
                                {user.ownedCodes.reduce((sum: number, c: any) => sum + c.usedCount, 0)} / {user.ownedCodes.reduce((sum: number, c: any) => sum + c.maxUses, 0)}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-medium">кодов</span>
                            </div>
                          ) : (
                            <span className="text-zinc-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-zinc-700">
                            {user._count.progress}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1 text-xs text-zinc-400">
                             <Clock className="w-3 h-3" />
                             {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <UserActionsCell 
                            userId={user.id} 
                            hasFullAccess={user.hasFullAccess} 
                            isAdmin={user.isAdmin} 
                            isOrganization={user.isOrganization}
                            userEmail={user.email} 
                            currentUserEmail={session.user?.email} 
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  bg,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-xs font-medium text-zinc-400 mb-1">{label}</p>
      <p className="text-2xl font-black text-zinc-900">{value}</p>
      {sub && <p className="text-xs text-zinc-400 mt-1">{sub}</p>}
    </div>
  );
}

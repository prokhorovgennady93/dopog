import { auth } from "@/../auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { 
  Building2, 
  Users, 
  Key, 
  TrendingUp, 
  PlusCircle, 
  ExternalLink, 
  CheckCircle2, 
  Clock,
  Download,
  Search
} from "lucide-react";
import Link from "next/link";

export default async function OrgDashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  // Fetch user and check organization status
  const user = await (db.user as any).findUnique({
    where: { id: session.user?.id },
    include: {
      ownedCodes: {
        include: {
          usedByUser: true
        }
      }
    }
  });

  if (!user || !user.isOrganization) {
    // If not an org, redirect to regular dashboard
    redirect("/dashboard");
  }

  // Calculate Stats
  const totalCodes = user.ownedCodes.length;
  const activatedCodes = user.ownedCodes.filter((c: any) => c.usedByUserId).length;
  const remainingCodes = totalCodes - activatedCodes;
  const activationRate = totalCodes > 0 ? Math.round((activatedCodes / totalCodes) * 100) : 0;

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
             <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Панель организации</span>
                <span className="text-zinc-400 text-xs font-bold font-mono">ID: {user.id.substring(0, 8).toUpperCase()}</span>
             </div>
             <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none">
               {user.orgName || "Ваша автошкола"}
             </h1>
             <p className="text-zinc-500 font-bold text-lg">Управление лицензиями и контроль успеваемости.</p>
          </div>
           <div className="flex items-center gap-3">
              <Link 
                href="/dashboard/org/card"
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-black px-6 py-3 rounded-2xl transition-all shadow-sm hover:border-orange-500/50 active:scale-95 flex items-center gap-2"
              >
                <div className="w-5 h-5 bg-orange-600/10 text-orange-600 rounded-lg flex items-center justify-center">
                  <PlusCircle className="w-3.5 h-3.5" />
                </div>
                Карточка организации
              </Link>
              <button className="bg-zinc-900 dark:bg-white text-white dark:text-black font-black px-6 py-3 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center gap-2">
                <PlusCircle className="w-4 h-4" /> Заказать лицензии
              </button>
           </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Key className="w-12 h-12" />
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Всего лицензий</p>
            <h3 className="text-4xl font-black">{totalCodes}</h3>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: `${activationRate}%` }} />
              </div>
              <span className="text-[10px] font-black">{activationRate}%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group border-b-4 border-b-green-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Активировано</p>
            <h3 className="text-4xl font-black text-green-600">{activatedCodes}</h3>
            <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-tight">Студентов в системе</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group border-b-4 border-b-orange-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Clock className="w-12 h-12" />
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Остаток</p>
            <h3 className="text-4xl font-black text-orange-600">{remainingCodes}</h3>
            <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-tight">Доступно к выдаче</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group border-b-4 border-b-zinc-900 dark:border-b-white">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-12 h-12" />
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Ср. успеваемость</p>
            <h3 className="text-4xl font-black">{activatedCodes > 0 ? "84%" : "—"}</h3>
            <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-tight">По всем студентам</p>
          </div>
        </div>

        {/* Content Tabs / Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
          {/* License Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Key className="w-5 h-5 text-orange-600" /> Активные лицензии
              </h2>
              <div className="flex gap-2">
                 <button className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800">
                   <Download className="w-4 h-4" />
                 </button>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
              {user.ownedCodes.length === 0 ? (
                <div className="p-12 text-center">
                  <Key className="w-12 h-12 text-zinc-200 dark:text-zinc-800 mx-auto mb-4" />
                  <p className="text-zinc-500 font-bold">Спиок пуст. Самое время заказать первую партию промокодов!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Код</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Тип</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Статус</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Студент</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {user.ownedCodes.map((code: any) => (
                        <tr key={code.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group">
                          <td className="px-6 py-4">
                            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                              {code.code}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">
                            {code.type === "FULL" ? "Полный доступ" : "Курс"}
                          </td>
                          <td className="px-6 py-4">
                             {code.usedByUserId ? (
                               <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-500 text-[10px] font-black">
                                 Использован
                               </span>
                             ) : (
                               <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-500 text-[10px] font-black">
                                 Свободен
                               </span>
                             )}
                          </td>
                          <td className="px-6 py-4">
                            {code.usedByUser ? (
                              <div className="flex flex-col">
                                <span className="text-sm font-bold">{code.usedByUser.name || "Студент"}</span>
                                <span className="text-[10px] text-zinc-400 font-medium">{code.usedByUser.email}</span>
                              </div>
                            ) : (
                              <span className="text-zinc-300">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Student Progress */}
          <div className="space-y-4">
             <h2 className="text-xl font-black flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" /> Активность
             </h2>
             <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm divide-y divide-zinc-100 dark:divide-zinc-800">
                <div className="relative mb-6">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                   <input 
                     type="text" 
                     placeholder="Поиск студента..." 
                     className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20"
                   />
                </div>

                <div className="space-y-6 pt-4">
                   {/* Mock list of students */}
                   {[
                     { name: "Иван Петров", progress: 92, lastActive: "2ч назад" },
                     { name: "Алексей Соколов", progress: 45, lastActive: "1д назад" },
                     { name: "Мария Волкова", progress: 14, lastActive: "3ч назад" }
                   ].map((student, i) => (
                     <div key={i} className="flex items-center justify-between group">
                        <div className="flex flex-col">
                           <span className="font-bold text-sm group-hover:text-orange-600 transition-colors">{student.name}</span>
                           <span className="text-[10px] font-medium text-zinc-400">{student.lastActive}</span>
                        </div>
                        <div className="text-right">
                           <div className="text-sm font-black text-zinc-900 dark:text-zinc-100">{student.progress}%</div>
                           <div className="h-1 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
                              <div className="h-full bg-orange-600" style={{ width: `${student.progress}%` }} />
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <button className="w-full mt-8 py-3 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2">
                   Показать всех <ExternalLink className="w-3 h-3" />
                </button>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}

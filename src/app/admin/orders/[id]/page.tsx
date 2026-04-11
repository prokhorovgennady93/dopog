"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  Truck, 
  CreditCard,
  User,
  Phone,
  Package,
  MapPin,
  Save,
  Loader2,
  AlertCircle,
  Link as LinkIcon,
  Tag,
  DollarSign,
  Send,
  Trash2,
  Plus,
  X,
  Check as CheckToggle
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { AdminNotifyManager } from "@/components/admin/AdminNotifyManager";

type Order = {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  address: string | null;
  courseIds: string;
  deliveryCost: number;
  discountPercent: number;
  totalAmount: number;
  status: string;
  trackNumber: string | null;
  deliveryCompany: string | null;
  isSentToDashboard: boolean;
  isPaid: boolean;
  createdAt: string;
  updatedAt?: string;
  user?: {
    examAttempts: Array<{
      course: { slug: string };
      isPassed: boolean;
    }>;
  };
};

const statusMap: Record<string, { label: string; color: string }> = {
  "NEW": { label: "Новая", color: "bg-blue-500" },
  "CONTACTED": { label: "Связались", color: "bg-purple-500" },
  "THINKING": { label: "Думает", color: "bg-yellow-500" },
  "ADDRESS_FILLED": { label: "Адрес получен", color: "bg-indigo-500" },
  "SENT": { label: "Отправлено", color: "bg-orange-500" },
  "COMPLETED": { label: "Завершена", color: "bg-green-500" },
};

const deliveryCompanies = [
  { id: "POCHTA", name: "Почта России" },
  { id: "CDEK", name: "СДЭК" },
  { id: "DHL", name: "DHL" },
];

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [originalOrder, setOriginalOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders?id=${id}`);
      const data = await res.json();
      // Since our GET /api/orders returns an array, we find the one we need
      const found = data.find((o: Order) => o.id === id);
      if (found) {
        setOrder(found);
        setOriginalOrder(found);
      }
      else setError("Заказ не найден");
    } catch (e) {
      setError("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleUpdate = async (updateData: Partial<Order>, silent = false) => {
    if (!silent) setSaving(true);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updateData }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrder(updated);
        setOriginalOrder(updated);
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!silent) setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
    </div>
  );

  if (!order) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h1 className="text-2xl font-black mb-4">Ошибка</h1>
      <p className="text-zinc-500 mb-8">{error}</p>
      <Link href="/admin/orders" className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold">Назад к списку</Link>
    </div>
  );

  const courseIds: string[] = JSON.parse(order.courseIds);
  const courseNames: Record<string, string> = {
    "base": "Базовый курс",
    "tanks": "Цистерны",
    "class1": "Класс 1",
    "class7": "Класс 7"
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-8">
      <AdminNotifyManager />
      <div className="max-w-5xl mx-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/admin/orders"
            className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> К списку заявок
          </Link>
          <div className="flex gap-2">
             <button
               onClick={() => handleUpdate(order)}
               disabled={saving || JSON.stringify(order) === JSON.stringify(originalOrder)}
               className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-orange-600/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
               {JSON.stringify(order) === JSON.stringify(originalOrder) ? "Сохранено" : "Сохранить"}
             </button>
             <div className="px-3 py-2 rounded-xl bg-orange-600/10 text-orange-600 text-[10px] font-black uppercase flex items-center gap-1.5 border border-orange-600/20">
               <Tag className="w-3.5 h-3.5" /> ID: {order.id.slice(-6)}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* User & Order Section */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <User className="w-6 h-6 text-orange-600" /> Информация о заказчике
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">Имя курсанта</label>
                  <input 
                    type="text"
                    value={order.userName}
                    onChange={(e) => setOrder({...order, userName: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">Телефон</label>
                  <p className="text-xl font-black text-orange-600 px-1">{order.userPhone}</p>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 mb-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Адрес доставки</label>
                <textarea 
                  rows={3}
                  value={order.address || ""}
                  placeholder="Введите полный адрес: индекс, город, улица..."
                  onChange={(e) => setOrder({...order, address: e.target.value})}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-base focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 block px-1">Выбранные курсы (отметьте нужные)</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(courseNames).map(([id, name]) => {
                    const isActive = courseIds.includes(id);
                    const attempts = (order as any).user?.examAttempts || [];
                    const isPassed = attempts.some((a: any) => a.course.slug === id && a.isPassed);
                    
                    return (
                      <button 
                        key={id} 
                        type="button"
                        onClick={() => {
                          const newCourses = isActive 
                            ? courseIds.filter(cid => cid !== id)
                            : [...courseIds, id];
                          handleUpdate({ courseIds: JSON.stringify(newCourses) }, true);
                        }}
                        className={`flex items-start gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                          isActive 
                          ? "bg-orange-500/10 border-orange-500/40 text-orange-600" 
                          : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-zinc-300"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-1 transition-all ${
                          isActive ? "bg-orange-600 border-orange-600" : "border-zinc-300 dark:border-zinc-700"
                        }`}>
                          {isActive && <CheckToggle className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[13px] uppercase tracking-tight leading-none">{name}</span>
                          <span className={`text-[9px] font-black uppercase mt-1 px-1.5 py-0.5 rounded-full inline-block w-fit ${
                            isPassed ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-500"
                          }`}>
                            {isPassed ? "Сдан" : "Не сдан"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Truck className="w-6 h-6 text-orange-600" /> Доставка
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">Транспортная компания</label>
                  <select 
                    value={order.deliveryCompany || ""}
                    onChange={(e) => handleUpdate({ deliveryCompany: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Не выбрана</option>
                    {deliveryCompanies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">Трек-номер</label>
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="800..."
                      value={order.trackNumber || ""}
                      onChange={(e) => setOrder({...order, trackNumber: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all"
                    />
                    <LinkIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Status Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8 shadow-sm">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 block">Текущий статус</label>
              <select 
                value={order.status}
                onChange={(e) => handleUpdate({ status: e.target.value })}
                className={`w-full ${statusMap[order.status]?.color || "bg-zinc-200"} text-white font-black py-3 px-4 rounded-xl appearance-none focus:outline-none shadow-lg shadow-black/5 cursor-pointer text-center mb-6 text-base transition-all`}
              >
                {Object.entries(statusMap).map(([id, { label }]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>

              <div className="space-y-3">
                 <button 
                  onClick={() => {
                    if (!order.isPaid) {
                      const confirmed = window.confirm("Статус оплаты меняется автоматически после поступления средств. Вы уверены, что хотите изменить его вручную?");
                      if (!confirmed) return;
                    }
                    handleUpdate({ isPaid: !order.isPaid });
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all ${order.isPaid ? "border-green-600 bg-green-600/5 text-green-600 shadow-md" : "border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-zinc-300"}`}
                 >
                   <div className="flex items-center gap-2 font-black text-xs">
                     <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${order.isPaid ? "bg-green-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"}`}>
                        {order.isPaid ? <CheckToggle className="w-4 h-4 stroke-[3]" /> : <CreditCard className="w-4 h-4" />}
                     </div>
                     <span className="uppercase tracking-tighter">{order.isPaid ? "Оплачено" : "Ожидает"}</span>
                   </div>
                   <div className={`w-8 h-4.5 rounded-full relative transition-colors ${order.isPaid ? "bg-green-600" : "bg-zinc-200 dark:bg-zinc-800"}`}>
                      <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all shadow-sm ${order.isPaid ? "left-4" : "left-0.5"}`} />
                   </div>
                 </button>

                 <button 
                  onClick={() => handleUpdate({ isSentToDashboard: !order.isSentToDashboard })}
                  className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all ${order.isSentToDashboard ? "border-orange-500 bg-orange-500/5 text-orange-600 shadow-md" : "border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-zinc-300"}`}
                 >
                   <div className="flex items-center gap-2 font-black text-xs">
                     <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${order.isSentToDashboard ? "bg-orange-500 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
                        <Send className="w-4 h-4" />
                     </div>
                     <span className="uppercase tracking-tighter">В кабинете</span>
                   </div>
                   <div className={`w-8 h-4.5 rounded-full relative transition-colors ${order.isSentToDashboard ? "bg-orange-500" : "bg-zinc-200 dark:bg-zinc-800"}`}>
                      <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all shadow-sm ${order.isSentToDashboard ? "left-4" : "left-0.5"}`} />
                   </div>
                 </button>
              </div>
            </div>

            {/* Financial Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl" />
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6 block">Расчет стоимости</label>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-zinc-400 font-bold text-sm">
                     <Tag className="w-4 h-4" /> Скидка
                   </div>
                   <div className="flex items-center gap-2">
                     <input 
                      type="number" 
                      value={order.discountPercent}
                      onChange={(e) => handleUpdate({ discountPercent: parseInt(e.target.value) || 0 })}
                      className="w-16 bg-zinc-800 border border-zinc-700 rounded-lg py-1 px-3 text-white font-black text-center focus:outline-none focus:ring-1 focus:ring-orange-600"
                     />
                     <span className="font-black">%</span>
                   </div>
                </div>

                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-zinc-400 font-bold text-sm">
                     <Truck className="w-4 h-4" /> Доставка
                   </div>
                   <div className="flex items-center gap-2">
                     <input 
                      type="number" 
                      value={order.deliveryCost}
                      onChange={(e) => handleUpdate({ deliveryCost: parseFloat(e.target.value) || 0 })}
                      className="w-20 bg-zinc-800 border border-zinc-700 rounded-lg py-1 px-3 text-white font-black text-center focus:outline-none focus:ring-1 focus:ring-orange-600"
                     />
                     <span className="font-black">₽</span>
                   </div>
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-800">
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block mb-1">Итого к оплате</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{order.totalAmount}</span>
                  <span className="text-xl font-black text-zinc-600">₽</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-center text-zinc-500 font-bold px-4">
              Создано: {order.createdAt ? format(new Date(order.createdAt), "d MMMM yyyy, HH:mm", { locale: ru }) : "—"} <br />
              Последнее обновление: {order.updatedAt ? format(new Date(order.updatedAt), "d MMMM yyyy, HH:mm", { locale: ru }) : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

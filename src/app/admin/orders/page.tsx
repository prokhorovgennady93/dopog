"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Truck, 
  CreditCard,
  User,
  Phone,
  Package,
  ChevronRight,
  MoreVertical,
  ArrowUpDown,
  X,
  Plus,
  Loader2,
  AlertCircle,
  Link,
  Table as TableIcon,
  Check
} from "lucide-react";
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
};

const statusMap: Record<string, { label: string; color: string; icon: any }> = {
  "NEW": { label: "Новая", color: "bg-blue-500", icon: Clock },
  "CONTACTED": { label: "Связались", color: "bg-purple-500", icon: Phone },
  "THINKING": { label: "Думает", color: "bg-yellow-500", icon: Clock },
  "ADDRESS_FILLED": { label: "Адрес получен", color: "bg-indigo-500", icon: Package },
  "SENT": { label: "Отправлено", color: "bg-orange-500", icon: Truck },
  "COMPLETED": { label: "Завершена", color: "bg-green-500", icon: CheckCircle2 },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "ALL",
    isPaid: "ALL",
    startDate: "",
    endDate: ""
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status !== "ALL") params.append("status", filters.status);
      if (filters.isPaid !== "ALL") params.append("isPaid", filters.isPaid);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const res = await fetch(`/api/orders?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const courseNames: Record<string, string> = {
    "base": "Базовый",
    "tanks": "Цистерны",
    "class1": "Класс 1",
    "class7": "Класс 7"
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-8">
      <AdminNotifyManager />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Управление <span className="text-orange-600">заявками</span></h1>
            <p className="text-zinc-500 font-medium">Всего найдено: {orders.length}</p>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-5 sm:p-6 mb-8 shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">Статус</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20"
              >
                <option value="ALL">Все статусы</option>
                {Object.entries(statusMap).map(([id, { label }]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">Оплата</label>
              <select 
                value={filters.isPaid}
                onChange={(e) => setFilters({...filters, isPaid: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20"
              >
                <option value="ALL">Любая</option>
                <option value="true">Оплачено</option>
                <option value="false">Не оплачено</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">От даты</label>
              <input 
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-2 xs:px-4 py-2.5 font-bold text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 text-zinc-500 min-w-0"
              />
            </div>

            <div className="col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">До даты</label>
              <input 
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-2 xs:px-4 py-2.5 font-bold text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 text-zinc-500 min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Orders Table/List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
            <p className="font-bold text-zinc-500">Загрузка заявок...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] py-20 text-center">
            <AlertCircle className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-1">Заявки не найдены</h3>
            <p className="text-zinc-500">Попробуйте изменить параметры фильтрации</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => {
              const status = statusMap[order.status] || statusMap["NEW"];
              const StatusIcon = status.icon;
              const ids: string[] = JSON.parse(order.courseIds);
              
              return (
                <div 
                  key={order.id}
                  onClick={() => window.location.href = `/admin/orders/${order.id}`}
                  className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-5 sm:p-6 transition-all hover:border-orange-500/20 hover:shadow-xl hover:shadow-black/5 cursor-pointer flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
                >
                  <div className="flex items-center justify-between sm:justify-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${status.color} bg-opacity-10 text-opacity-100 flex items-center justify-center shrink-0`}>
                      <StatusIcon className={`w-6 h-6 text-current`} style={{ color: status.color.replace('bg-', '') }} />
                    </div>
                    
                    <div className="flex sm:hidden items-center gap-2">
                      <div className={`px-2.5 py-1 rounded-full ${status.color} bg-opacity-10 text-[10px] font-black uppercase tracking-wider`}>
                        {status.label}
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-orange-600 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-2 sm:gap-x-4">
                    {/* Row 1, Col 1: Student */}
                    <div className="order-1 sm:order-none">
                      <span className="text-[9px] font-black text-zinc-400 uppercase block mb-1 tracking-widest">Курсант</span>
                      <p className="font-bold truncate text-sm text-zinc-900 dark:text-white leading-tight">{order.userName}</p>
                      <p className="text-[11px] text-zinc-500 font-medium">{order.userPhone}</p>
                    </div>

                    {/* Row 1, Col 2: Payment (Right aligned on mobile) */}
                    <div className="order-2 sm:order-none text-right sm:text-left">
                      <span className="text-[9px] font-black text-zinc-400 uppercase block mb-1 tracking-widest">Сумма / Оплата</span>
                      <div className="flex items-center justify-end sm:justify-start gap-1.5">
                        <p className="font-extrabold text-sm text-zinc-900 dark:text-white">{order.totalAmount} ₽</p>
                        {order.isPaid ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="w-2 h-2 text-white stroke-[3.5]" />
                          </div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        )}
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-tighter ${order.isPaid ? "text-green-500" : "text-amber-500"}`}>
                        {order.isPaid ? "Оплачено" : "Ожидает"}
                      </span>
                    </div>

                    {/* Row 2, Col 1: Date */}
                    <div className="order-3 sm:order-none">
                      <span className="text-[9px] font-black text-zinc-400 uppercase block mb-0.5 tracking-widest">Дата</span>
                      <p className="font-bold text-[11px] text-zinc-400 dark:text-zinc-500">
                        {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm", { locale: ru })}
                      </p>
                    </div>

                    {/* Row 2, Col 2: Courses (Right aligned on mobile) */}
                    <div className="order-4 sm:order-none text-right sm:text-left">
                      <span className="text-[9px] font-black text-zinc-400 uppercase block mb-1 tracking-widest">Курсы</span>
                      <div className="flex gap-1 flex-wrap justify-end sm:justify-start">
                        {ids.length > 0 ? ids.map(id => (
                          <span key={id} className="text-[8px] sm:text-[9px] bg-zinc-50 dark:bg-zinc-800/50 px-1.5 py-0.5 rounded-md font-black italic text-zinc-500 dark:text-zinc-600 border border-zinc-100 dark:border-zinc-700/50">
                            {courseNames[id] || id}
                          </span>
                        )) : <span className="text-[9px] text-zinc-300 font-bold uppercase italic">Пусто</span>}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex shrink-0 items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-full ${status.color} bg-opacity-10 text-xs font-black uppercase tracking-wider`}>
                      {status.label}
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-orange-600 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

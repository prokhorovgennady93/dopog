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
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
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

            <div>
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

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">От даты</label>
              <input 
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 text-zinc-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block px-1">До даты</label>
              <input 
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 text-zinc-500"
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
                  className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-5 sm:p-6 transition-all hover:border-orange-500/20 hover:shadow-xl hover:shadow-black/5 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6"
                >
                  <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${status.color} bg-opacity-10 text-opacity-100 flex items-center justify-center shrink-0`}>
                      <StatusIcon className={`w-6 h-6 text-current`} style={{ color: status.color.replace('bg-', '') }} />
                    </div>
                    
                    <div className="flex sm:hidden items-center gap-3">
                      <div className={`px-3 py-1.5 rounded-full ${status.color} bg-opacity-10 text-xs font-black uppercase tracking-wider`}>
                        {status.label}
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-orange-600 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 w-full">
                    <div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase block mb-1 tracking-widest">Курсант</span>
                      <p className="font-bold truncate text-sm sm:text-base text-zinc-900 dark:text-white">{order.userName}</p>
                      <p className="text-xs text-zinc-500 font-medium">{order.userPhone}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase block mb-1 tracking-widest">Курсы</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {ids.length > 0 ? ids.map(id => (
                          <span key={id} className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg font-black italic text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">{courseNames[id] || id}</span>
                        )) : <span className="text-[10px] text-zinc-400 font-bold uppercase">Не выбраны</span>}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase block mb-1 tracking-widest">Сумма / Оплата</span>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">{order.totalAmount} ₽</p>
                        {order.isPaid ? (
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                            <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-tighter ${order.isPaid ? "text-green-500" : "text-amber-500"}`}>
                        {order.isPaid ? "Оплачено" : "Ожидает"}
                      </span>
                    </div>

                    <div className="xs:block sm:hidden md:block">
                      <span className="text-[10px] font-black text-zinc-400 uppercase block mb-1 tracking-widest">Дата</span>
                      <p className="font-bold text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm", { locale: ru })}
                      </p>
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

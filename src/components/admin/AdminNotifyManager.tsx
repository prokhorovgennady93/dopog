"use client";

import { useEffect, useState, useRef } from "react";
import { Bell, CreditCard, X, Package } from "lucide-react";
import Link from "next/link";

interface NotificationStats {
  unreadCount: number;
  unpaidCount: number;
  totalBadgeCount: number;
  latestOrder: { id: string; userName: string } | null;
  latestPayment: { id: string; userName: string; totalAmount: number } | null;
}

export function AdminNotifyManager() {
  const [activeToast, setActiveToast] = useState<{
    id: string;
    type: "ORDER" | "PAYMENT";
    title: string;
    message: string;
    link: string;
  } | null>(null);
  
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const lastOrderIdRef = useRef<string | null>(null);
  const lastPaymentIdRef = useRef<string | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    // Load state
    const savedAudio = localStorage.getItem("admin_audio_enabled") === "true";
    setIsAudioEnabled(savedAudio);

    lastOrderIdRef.current = localStorage.getItem("admin_last_order_id");
    lastPaymentIdRef.current = localStorage.getItem("admin_last_payment_id");

    const checkNotifications = async () => {
      try {
        const res = await fetch("/api/admin/notifications/stats");
        if (!res.ok) return;
        const data: NotificationStats = await res.json();

        // 1. Update App Badge
        if ("setAppBadge" in navigator) {
          if (data.unreadCount > 0) {
            (navigator as any).setAppBadge(data.unreadCount);
          } else {
            (navigator as any).clearAppBadge();
          }
        }

        // 2. Check for NEW ORDER
        if (data.latestOrder && data.latestOrder.id !== lastOrderIdRef.current) {
          if (initRef.current) { 
            triggerNotification(
              data.latestOrder.id,
              "ORDER",
              "Новая заявка! 🚛",
              `От: ${data.latestOrder.userName}`,
              `/admin/orders/${data.latestOrder.id}`
            );
          }
          lastOrderIdRef.current = data.latestOrder.id;
          localStorage.setItem("admin_last_order_id", data.latestOrder.id);
        }

        // 3. Check for NEW PAYMENT
        if (data.latestPayment && data.latestPayment.id !== lastPaymentIdRef.current) {
          if (initRef.current) {
            triggerNotification(
              data.latestPayment.id,
              "PAYMENT",
              "Оплата получена! 💳",
              `${data.latestPayment.userName}: ${data.latestPayment.totalAmount} ₽`,
              `/admin/orders/${data.latestPayment.id}`
            );
          }
          lastPaymentIdRef.current = data.latestPayment.id;
          localStorage.setItem("admin_last_payment_id", data.latestPayment.id);
        }

        initRef.current = true;
      } catch (error) {
        console.error("[AdminNotify] Sync error:", error);
      }
    };

    const triggerNotification = (id: string, type: "ORDER" | "PAYMENT", title: string, message: string, link: string) => {
      setActiveToast({ id, type, title, message, link });
      
      // Play Sound only if enabled and unlocked
      if (localStorage.getItem("admin_audio_enabled") === "true") {
        const audio = new Audio("https://www.soundjay.com/buttons/beep-07a.mp3");
        audio.volume = 0.5;
        audio.play().catch(e => {
          console.warn("Audio play blocked by browser. User interaction required.");
          setIsAudioEnabled(false);
          localStorage.setItem("admin_audio_enabled", "false");
        });
      }

      // Auto hide after 10 seconds
      setTimeout(() => {
        setActiveToast(prev => prev?.id === id ? null : prev);
      }, 10000);
    };

    // Initial check
    checkNotifications();

    const interval = setInterval(checkNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const enableAudio = () => {
    // Unlock audio context for Safari
    const audio = new Audio("https://www.soundjay.com/buttons/beep-07a.mp3");
    audio.volume = 0; // Silent play to unlock
    audio.play().then(() => {
      setIsAudioEnabled(true);
      localStorage.setItem("admin_audio_enabled", "true");
    }).catch(console.error);
  };

  return (
    <>
      {/* Audio Unlock Button for iOS */}
      {!isAudioEnabled && (
        <button
          onClick={enableAudio}
          className="fixed bottom-6 right-6 z-[1001] flex items-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-2xl font-black text-xs shadow-2xl animate-bounce"
        >
          <Bell className="w-4 h-4" />
          Включить звук уведомлений
        </button>
      )}

      {activeToast && (
        <div className="fixed top-4 right-4 sm:right-8 z-[1000] animate-in slide-in-from-top-8 sm:slide-in-from-right-8 duration-500 w-full max-w-[calc(100%-2rem)] sm:w-[320px]">
          <div className="relative group overflow-hidden bg-white dark:bg-zinc-900 border-2 border-orange-500 shadow-2xl rounded-3xl p-5">
            {/* Glow effect */}
            <div className="absolute top-0 left-0 w-2 h-full bg-orange-500" />
            
            <button 
              onClick={() => setActiveToast(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-orange-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                activeToast.type === "ORDER" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
              }`}>
                {activeToast.type === "ORDER" ? <Package className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
              </div>
              <div className="flex-1 pr-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                  Админ-уведомление
                </h4>
                <h3 className="text-sm font-black text-zinc-900 dark:text-white leading-tight mb-1">
                  {activeToast.title}
                </h3>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-4">
                  {activeToast.message}
                </p>
                
                <Link 
                  href={activeToast.link}
                  onClick={() => setActiveToast(null)}
                  className="inline-flex items-center gap-2 text-xs font-black text-orange-600 hover:gap-3 transition-all"
                >
                  Открыть детали <Bell className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

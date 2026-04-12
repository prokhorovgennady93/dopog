"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, Loader2 } from "lucide-react";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export function PushManager() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      setIsSupported(true);
      setPermission(Notification.permission);
      
      // Check for existing subscription
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          setHasSubscription(!!sub);
        });
      });
    }
  }, []);

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribe = async () => {
    if (!VAPID_PUBLIC_KEY) {
      console.error("VAPID Public Key missing");
      return;
    }

    try {
      setIsSubscribing(true);
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== "granted") {
        setIsSubscribing(false);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      // Send to server
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      if (!res.ok) throw new Error("Failed to save subscription on server");

      setHasSubscription(true);
      setPermission(Notification.permission);
      console.log("Push subscription successful");
    } catch (err) {
      console.error("Push subscription error:", err);
    } finally {
      setIsSubscribing(false);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="flex flex-col gap-2 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${permission === 'granted' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
            {permission === 'granted' ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-sm font-black text-zinc-900 dark:text-white">Push-уведомления</h4>
            <p className="text-xs text-zinc-500">Получайте важные новости системы</p>
          </div>
        </div>
        
        <button
          onClick={subscribe}
          disabled={isSubscribing}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            hasSubscription 
              ? "bg-zinc-100 text-zinc-500 hover:bg-zinc-200" 
              : "bg-orange-600 hover:bg-orange-500 text-white shadow-lg active:scale-95"
          }`}
        >
          {isSubscribing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : hasSubscription ? (
            "Подключено"
          ) : (
            "Включить"
          )}
        </button>
      </div>
      
      {permission === 'denied' && (
        <p className="text-[10px] text-red-500 font-bold">
          Уведомления заблокированы в браузере. Пожалуйста, разрешите их в настройках сайта.
        </p>
      )}
    </div>
  );
}

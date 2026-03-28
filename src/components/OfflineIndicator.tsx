"use client";

import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };
    const handleOffline = () => {
      setIsOffline(true);
      setShowStatus(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    if (!navigator.onLine) {
      setIsOffline(true);
      setShowStatus(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showStatus) return null;

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 transform ${showStatus ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
      <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border ${
        isOffline 
        ? 'bg-red-600 border-red-500 text-white' 
        : 'bg-green-600 border-green-500 text-white'
      }`}>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
          {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest">{isOffline ? 'Работаем офлайн' : 'Снова в сети'}</h4>
          <p className="text-[10px] font-bold opacity-80">{isOffline ? 'Доступны скачанные темы' : 'Синхронизация...'}</p>
        </div>
      </div>
    </div>
  );
}

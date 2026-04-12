"use client";

import { useEffect } from "react";
import { syncAllOfflineData } from "@/lib/offline";

/**
 * Invisible component that triggers background offline data synchronization
 * when the application loads or the connection is restored.
 */
export function OfflineSync() {
  useEffect(() => {
    // Initial sync on mount
    syncAllOfflineData();

    // Re-sync when connection is restored
    const handleOnline = async () => {
      console.log("[Sync] Connection detected, verifying with heartbeat...");
      
      // Heartbeat: verify that packets are actually passing
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        await fetch(`/?hb=${Date.now()}`, { 
          method: 'HEAD', 
          mode: 'no-cors',
          cache: 'no-store',
          signal: controller.signal 
        });
        
        clearTimeout(timeoutId);
        console.log("[Sync] Heartbeat successful, triggering global update.");
        
        syncAllOfflineData();
        localStorage.setItem("last_sync_attempt", new Date().toISOString());
        
        // Notify UI components to re-check their state
        window.dispatchEvent(new CustomEvent('offline-status-changed'));
      } catch (e) {
        console.log("[Sync] Heartbeat failed or timed out. Connection is too weak.");
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return null; // This component has no UI
}

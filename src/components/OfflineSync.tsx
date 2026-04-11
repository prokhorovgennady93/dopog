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
    const handleOnline = () => {
      console.log("[Sync] Connection restored, starting background sync...");
      syncAllOfflineData();
      
      // Notify UI components to re-check their state (SSG snapshots might be stale)
      window.dispatchEvent(new CustomEvent('offline-status-changed'));
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return null; // This component has no UI
}

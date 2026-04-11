/**
 * Shared utility for handling offline data and route caching
 * Version 2: Added cache versioning and improved snapshot logic for SSG
 */

export const CURRENT_OFFLINE_VERSION = 2;

export async function checkTopicDownloaded(topicId: string): Promise<"missing" | "outdated" | "ok"> {
  if (typeof window === "undefined") return "missing";
  
  // 1. Check logical flag and version
  const isFlagged = localStorage.getItem(`topic_${topicId}_offline`) === "true";
  if (!isFlagged) return "missing";

  const cachedVersion = parseInt(localStorage.getItem(`topic_${topicId}_v`) || "1");
  if (cachedVersion < CURRENT_OFFLINE_VERSION) return "outdated";

  // 2. Physical Cache Verification (Source of Truth)
  if ("caches" in window) {
    try {
      const cache = await caches.open("dopog-cache-v2");
      const match = await cache.match(`/api/topics/${topicId}/questions`);
      return match ? "ok" : "missing";
    } catch (e) {
      return "missing";
    }
  }
  
  return "ok";
}

export async function downloadTopic(
  topicId: string, 
  courseId: string, 
  onProgress?: (p: number) => void
): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const response = await fetch(`/api/topics/${topicId}/questions`);
    if (!response.ok) throw new Error("Failed to fetch questions");
    const questions = await response.json();

    localStorage.setItem(`topic_${topicId}_data`, JSON.stringify(questions));
    localStorage.setItem(`topic_${topicId}_course`, courseId);
    localStorage.setItem(`topic_${topicId}_v`, CURRENT_OFFLINE_VERSION.toString());

    if ("caches" in window) {
      const cache = await caches.open("dopog-cache-v2");
      
      // Cache API response
      await cache.put(
        `/api/topics/${topicId}/questions`,
        new Response(JSON.stringify(questions), {
          headers: { 'Content-Type': 'application/json' }
        })
      );
      
      // Cache assets and route
      const studyUrl = `/study/${courseId}?topicId=${topicId}`;
      const assets = [
        studyUrl,
        `${studyUrl}&_rsc=1`,
        "/manifest.json",
        "/icon.png"
      ];

      // Add topic images
      questions.forEach((q: any) => {
        if (q.imageUrl) assets.push(q.imageUrl);
      });

      for (let i = 0; i < assets.length; i++) {
        try {
          const assetResponse = await fetch(assets[i]);
          if (assetResponse.ok) {
            await cache.put(assets[i], assetResponse);
          }
        } catch (e) {
          console.warn(`[Sync] Failed to cache: ${assets[i]}`, e);
        }
        if (onProgress) {
          onProgress(Math.round(((i + 1) / assets.length) * 100));
        }
      }
    }

    localStorage.setItem(`topic_${topicId}_offline`, "true");
  } catch (error) {
    console.error(`Download failed for topic ${topicId}:`, error);
    throw error;
  }
}

export async function downloadCourse(
  courseId: string,
  slug: string,
  themeIds: string[],
  onProgress?: (topicId: string, p: number) => void
): Promise<void> {
  if (typeof window === "undefined") return;

  if ("caches" in window) {
    const cache = await caches.open("dopog-cache-v2");
    
    // Snaphsot core routes
    const snapshots = [
      "/",
      `/course/${slug}`,
      `/study/${courseId}`
    ];
    
    // Critical App Assets (SSG support)
    const criticalAssets = [
      "/manifest.json",
      "/icon.png",
      "/_next/static/css/app/layout.css"
    ];

    const all = [...snapshots, ...criticalAssets];
    
    for (const route of all) {
      try {
        const res = await fetch(route);
        if (res.ok) await cache.put(route, res);

        // Snapshot RSC for static routing
        if (!route.includes(".") && !route.startsWith("/_next")) {
          const rscUrl = `${route}${route.includes("?") ? "&" : "?"}_rsc=1`;
          const rscRes = await fetch(rscUrl, { headers: { "RSC": "1" } });
          if (rscRes.ok) await cache.put(rscUrl, rscRes);
        }
      } catch (e) {
        console.warn(`[Snapshot] Error: ${route}`, e);
      }
    }
  }

  // Sequentially download topics
  for (const topicId of themeIds) {
    await downloadTopic(topicId, courseId, (p) => {
      if (onProgress) onProgress(topicId, p);
    });
  }
}

let isSyncing = false;

export async function syncAllOfflineData(): Promise<void> {
  if (typeof window === "undefined") return;
  
  // If we are online, check for outdated data
  if (navigator.onLine && !isSyncing) {
    const offlineTopics: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("topic_") && key?.endsWith("_offline")) {
        const topicId = key.replace("topic_", "").replace("_offline", "");
        offlineTopics.push(topicId);
      }
    }

    if (offlineTopics.length === 0) return;

    isSyncing = true;
    try {
      for (const topicId of offlineTopics) {
        const status = await checkTopicDownloaded(topicId);
        if (status !== "ok") {
          const courseId = localStorage.getItem(`topic_${topicId}_course`) || "base";
          console.log(`[Sync] Updating/Restoring topic ${topicId}...`);
          try {
            await downloadTopic(topicId, courseId);
          } catch (e) {}
        }
      }
    } finally {
      isSyncing = false;
    }
  }
}

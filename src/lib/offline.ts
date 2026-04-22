/**
 * Shared utility for handling offline data and route caching
 * Version 2: Added cache versioning and improved snapshot logic for SSG
 */

export const CURRENT_OFFLINE_VERSION = 4;
export const OFFLINE_CACHE_NAME = "dopog-cache-v4.3";

export async function checkTopicDownloaded(topicId: string): Promise<"missing" | "outdated" | "ok"> {
  if (typeof window === "undefined") return "missing";
  
  // 1. Initial logical check
  const isFlagged = localStorage.getItem(`topic_${topicId}_offline`) === "true";
  const cachedVersion = parseInt(localStorage.getItem(`topic_${topicId}_v`) || "0");
  
  // 2. Physical Cache Verification (The absolute source of truth)
  if (typeof window !== "undefined" && "caches" in window) {
    try {
      const cache = await caches.open(OFFLINE_CACHE_NAME);
      // We check for the most critical piece of data
      const dataMatch = await cache.match(`/api/topics/${topicId}/questions`);
      
      if (!dataMatch) {
        if (isFlagged) {
          console.log(`[Offline] Physical data missing for ${topicId}, clearing flag.`);
          localStorage.removeItem(`topic_${topicId}_offline`);
        }
        return "missing";
      }

      // If physical data exists but versions mismatch, it's outdated
      if (cachedVersion < CURRENT_OFFLINE_VERSION) return "outdated";

      return "ok";
    } catch (e) {
      console.error("[Offline] Cache check failed:", e);
      return "missing";
    }
  }
  
  return isFlagged ? (cachedVersion < CURRENT_OFFLINE_VERSION ? "outdated" : "ok") : "missing";
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
      const cache = await caches.open(OFFLINE_CACHE_NAME);
      
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
        "/icon.png",
        "/favicon.ico",
        "/images/courses/course-basic.png",
        "/images/courses/course-tanks.png",
        "/images/courses/course-class1.png",
        "/images/courses/course-class7.png"
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
          console.warn(`[Sync] Failed to cache asset: ${assets[i]}`);
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
    const cache = await caches.open(OFFLINE_CACHE_NAME);
    
    // Snaphsot core routes
    const snapshots = [
      "/",
      `/course/${slug}`,
      `/study/${courseId}`,
      `/exam/${courseId}` // Critical addition
    ];
    
    // Critical App Assets
    const criticalAssets = [
      "/manifest.json",
      "/icon.png",
      "/favicon.ico"
    ];

    const all = [...snapshots, ...criticalAssets];
    
    for (const route of all) {
      try {
        const res = await fetch(route);
        if (res.ok) {
          await cache.put(route, res.clone());
          
          // Also snapshot RSC for Next.js app router navigation
          if (!route.includes(".") && !route.startsWith("/_next")) {
            const rscUrl = `${route}${route.includes("?") ? "&" : "?"}_rsc=1`;
            const rscRes = await fetch(rscUrl, { headers: { "RSC": "1" } });
            if (rscRes.ok) await cache.put(rscUrl, rscRes);
          }
        }
      } catch (e) {
        console.warn(`[Snapshot] Error: ${route}`);
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

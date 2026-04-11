/**
 * Shared utility for handling offline data and route caching
 */

export async function checkTopicDownloaded(topicId: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  
  // 1. Check logical flag
  const isFlagged = localStorage.getItem(`topic_${topicId}_offline`) === "true";
  if (!isFlagged) return false;

  // 2. Physical Cache Verification (Source of Truth)
  if ("caches" in window) {
    try {
      const cache = await caches.open("dopog-cache-v2");
      const match = await cache.match(`/api/topics/${topicId}/questions`);
      return !!match;
    } catch (e) {
      return false;
    }
  }
  
  return true;
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
    localStorage.setItem(`topic_${topicId}_course`, courseId); // Keep track of parent course for re-sync

    if ("caches" in window) {
      const cache = await caches.open("dopog-cache-v2");
      
      // Cache the API response itself for physical verification by checkTopicDownloaded
      await cache.put(
        `/api/topics/${topicId}/questions`,
        new Response(JSON.stringify(questions), {
          headers: { 'Content-Type': 'application/json' }
        })
      );
      
      // Robust individual asset caching
      const studyUrl = `/study/${courseId}?topicId=${topicId}`;
      const assets = [
        studyUrl,
        `${studyUrl}&_rsc=1`, // RSC Data for this specific topic
        "/manifest.json",
        "/icon.png"
      ];

      // Add topic images
      questions.forEach((q: any) => {
        if (q.imageUrl) assets.push(q.imageUrl);
      });

      // Sequential cache put (avoiding addAll which fails on 1 error)
      for (let i = 0; i < assets.length; i++) {
        try {
          const assetResponse = await fetch(assets[i]);
          if (assetResponse.ok) {
            await cache.put(assets[i], assetResponse);
          }
        } catch (e) {
          console.warn(`[Sync] Failed to cache asset: ${assets[i]}`, e);
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

  // 1. Static Content Snapshots (HTML + Navigation Data)
  if ("caches" in window) {
    const cache = await caches.open("dopog-cache-v2");
    
    // Core routes to snapshot
    const snapshots = [
      "/",
      `/course/${slug}`,
      `/study/${courseId}`
    ];
    
    // Add common UI assets that might be missed
    const extraAssets = [
      "/manifest.json",
      "/icon.png",
      // Important to catch common CSS/JS if possible
      "/_next/static/css/app/layout.css", 
    ];

    const allToCache = [...snapshots, ...extraAssets];
    
    for (const route of allToCache) {
      try {
        // Fetch normally
        const res = await fetch(route);
        if (res.ok) await cache.put(route, res);

        // If it's a page, also cache the RSC version
        if (!route.includes(".") && !route.startsWith("/_next")) {
          const rscUrl = `${route}${route.includes("?") ? "&" : "?"}_rsc=1`;
          const rscRes = await fetch(rscUrl, { headers: { "RSC": "1" } });
          if (rscRes.ok) await cache.put(rscUrl, rscRes);
        }
      } catch (e) {
        console.warn(`[Snapshot] Failed to capture: ${route}`, e);
      }
    }
  }

  // 2. Download all topics sequentially
  for (const topicId of themeIds) {
    await downloadTopic(topicId, courseId, (p) => {
      if (onProgress) onProgress(topicId, p);
    });
  }
}

let isSyncing = false;

/**
 * Automagically verify all flagged topics and re-download if cache is missing.
 * Runs in background.
 */
export async function syncAllOfflineData(): Promise<void> {
  if (typeof window === "undefined" || !navigator.onLine || isSyncing) return;

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
  console.log(`[Sync] Checking ${offlineTopics.length} offline topics...`);

  try {
    for (const topicId of offlineTopics) {
      const isActuallyDownloaded = await checkTopicDownloaded(topicId);
      
      if (!isActuallyDownloaded) {
        const courseId = localStorage.getItem(`topic_${topicId}_course`) || "base";
        console.log(`[Sync] Restoring missing cache for topic ${topicId}...`);
        try {
          await downloadTopic(topicId, courseId);
        } catch (e) {
          console.error(`[Sync] Failed to restore topic ${topicId}`, e);
        }
      }
    }
  } finally {
    isSyncing = false;
    console.log(`[Sync] Finished background check.`);
  }
}

/**
 * Shared utility for handling offline data and route caching
 */

export async function checkTopicDownloaded(topicId: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`topic_${topicId}_offline`) === "true";
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

    if ("caches" in window) {
      const cache = await caches.open("dopog-cache-v1");
      
      // Robust individual asset caching
      const assets = [
        `/study/${courseId}?topicId=${topicId}`,
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

  // 1. Cache the Course Landing Page AND Home/Dashboard
  if ("caches" in window) {
    const cache = await caches.open("dopog-cache-v1");
    const routesToCache = [`/course/${slug}`, "/", "/dashboard"];
    
    for (const route of routesToCache) {
      try {
        await cache.add(route);
        console.log(`Cached route: ${route}`);
      } catch (e) {
        console.warn(`Failed to cache route: ${route}`, e);
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

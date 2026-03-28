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
    // 1. Fetch Question Data
    const response = await fetch(`/api/topics/${topicId}/questions`);
    if (!response.ok) throw new Error("Failed to fetch questions");
    const questions = await response.json();

    // 2. Cache Data in LocalStorage
    localStorage.setItem(`topic_${topicId}_data`, JSON.stringify(questions));

    // 3. Cache Images AND the Page Routes in CacheStorage
    if ("caches" in window) {
      const cache = await caches.open("dopog-cache-v1");
      
      // Cache the Study Page Route itself
      const studyUrl = `/study/${courseId}?topicId=${topicId}`;
      try {
        await cache.add(studyUrl);
        console.log(`Cached route: ${studyUrl}`);
      } catch (e) {
        console.warn(`Failed to cache route: ${studyUrl}`, e);
      }

      // Cache all images for this topic
      const imageUrls = questions
        .map((q: any) => q.imageUrl)
        .filter((url: string | null) => url && url.length > 0);

      for (let i = 0; i < imageUrls.length; i++) {
        try {
          await cache.add(imageUrls[i]);
        } catch (e) {
          console.warn(`Failed to cache image: ${imageUrls[i]}`, e);
        }
        if (onProgress) {
          onProgress(Math.round(((i + 1) / imageUrls.length) * 100));
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

  // 1. Cache the Course Landing Page itself
  if ("caches" in window) {
    const cache = await caches.open("dopog-cache-v1");
    const courseUrl = `/course/${slug}`;
    try {
      await cache.add(courseUrl);
      console.log(`Cached course route: ${courseUrl}`);
    } catch (e) {
      console.warn(`Failed to cache course route: ${courseUrl}`, e);
    }
  }

  // 2. Download all topics sequentially
  for (const topicId of themeIds) {
    await downloadTopic(topicId, courseId, (p) => {
      if (onProgress) onProgress(topicId, p);
    });
  }
}

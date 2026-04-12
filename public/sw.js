const CACHE_NAME = 'dopog-cache-v5';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/icon.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

async function updateCache(request, response) {
  if (response && response.status === 200 && response.type === 'basic') {
    const cache = await caches.open(CACHE_NAME);
    const url = new URL(request.url);
    const cleanUrl = url.origin + url.pathname;
    
    // Cache both exact and clean URLs
    await cache.put(cleanUrl, response.clone());
    if (request.url !== cleanUrl) {
       await cache.put(request, response.clone());
    }
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) return;

  // CRITICAL: Block any API or Auth requests from Service Worker caching
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/data/')) {
    return;
  }

  // 1. Navigation (HTML Snapshots)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then((response) => {
        updateCache(event.request, response.clone());
        return response;
      }).catch(async (err) => {
        console.log('[SW] Navigation fetch failed, searching cache for:', url.pathname);
        
        // Strategy: Match exact, then ignoreSearch, then clean path
        const strategy = [
          event.request,
          url.pathname,
          url.origin + url.pathname
        ];

        for (const target of strategy) {
          const match = await caches.match(target, { ignoreSearch: true });
          if (match) return match;
        }
        
        // Course specific fallback
        if (url.pathname.startsWith('/course/')) {
           const slug = url.pathname.split('/')[2];
           const courseMatch = await caches.match(`/course/${slug}`, { ignoreSearch: true });
           if (courseMatch) return courseMatch;
        }
        
        // Last resort: Home Page
        const homeMatch = await caches.match('/', { ignoreSearch: true });
        if (homeMatch) return homeMatch;

        // EMERGENCY: Safari crashes on undefined. Return a valid Response.
        return new Response(
          '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><div style="padding: 20px; font-family: sans-serif; text-align: center;"><h3>Вы в оффлайне</h3><p>Эта страница еще не была скачана для работы без интернета.</p><a href="/">На главную</a></div></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })
    );
    return;
  }

  // 2. Next.js RSC Data requests
  const isRSC = url.searchParams.has('_rsc') || event.request.headers.get('RSC') === '1';
  if (isRSC) {
    event.respondWith(
      fetch(event.request).then((response) => {
        updateCache(event.request, response.clone());
        return response;
      }).catch(async () => {
        return caches.match(event.request, { ignoreSearch: true });
      })
    );
    return;
  }

  // 3. Asset Interceptor
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        }).catch(() => null);

        return cached || fetchPromise;
      })
    );
    return;
  }
});

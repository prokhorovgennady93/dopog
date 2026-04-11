const CACHE_NAME = 'dopog-cache-v2';
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
  // Clear old caches
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

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) return;

  // 1. Navigation (HTML Snapshots)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        // Try exact match first
        let cached = await caches.match(event.request);
        // Try match without query params (CRITICAL for static pages on iOS)
        if (!cached) {
          cached = await caches.match(event.request, { ignoreSearch: true });
        }
        
        if (cached) return cached;
        
        // Final broad fallbacks for courses
        if (url.pathname.startsWith('/course/')) {
           const slug = url.pathname.split('/')[2];
           return caches.match(`/course/${slug}`, { ignoreSearch: true }) || caches.match('/');
        }
        
        return caches.match('/');
      })
    );
    return;
  }

  // 2. Next.js RSC Data requests (offline navigation data)
  const isRSC = url.searchParams.has('_rsc') || event.request.headers.get('RSC') === '1';
  if (isRSC) {
    event.respondWith(
      fetch(event.request).catch(async () => {
        // Find RSC data regardless of exact version token
        return caches.match(event.request, { ignoreSearch: true });
      })
    );
    return;
  }

  // 3. Asset Interceptor (Cache-First with Background Update)
  if (event.request.method === 'GET') {
    if (url.pathname.startsWith('/api/auth')) return;
    if (url.pathname.startsWith('/api/admin/notifications')) return;

    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        }).catch(() => null);

        // Always return cache first for offline stability
        return cached || fetchPromise;
      })
    );
    return;
  }
});

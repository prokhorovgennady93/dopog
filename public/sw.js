const CACHE_NAME = 'dopog-cache-v4';
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
    url.search = ''; 
    await cache.put(url.toString(), response.clone());
    if (request.url !== url.toString()) {
       await cache.put(request, response.clone());
    }
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) return;

  // CRITICAL: Block any API or Auth requests from Service Worker caching logic
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/data/')) {
    // Let these go directly to network
    return;
  }

  // 1. Navigation (HTML Snapshots)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then((response) => {
        updateCache(event.request, response.clone());
        return response;
      }).catch(async () => {
        let cached = await caches.match(event.request);
        if (!cached) {
          cached = await caches.match(event.request, { ignoreSearch: true });
        }
        
        if (cached) return cached;
        
        if (url.pathname.startsWith('/course/')) {
           const slug = url.pathname.split('/')[2];
           return caches.match(`/course/${slug}`, { ignoreSearch: true }) || caches.match('/');
        }
        
        return caches.match('/');
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

const CACHE_NAME = 'dopog-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/icon.png',
  '/images/articles/hero.png',
  '/images/articles/marking.png',
  '/images/articles/rules.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  // 1. Navigation Requests: Network-first, then cache, then '/' fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request) || caches.match('/');
        })
    );
    return;
  }

  // 2. GET Requests for Assets (Static, Chunks, Data)
  if (event.request.method === 'GET' && isSameOrigin) {
    if (url.pathname.startsWith('/api/auth')) return;

    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (
            networkResponse && 
            networkResponse.status === 200 && 
            (
              ASSETS_TO_CACHE.includes(url.pathname) ||
              url.pathname.startsWith('/_next/') ||
              url.pathname.startsWith('/course/') ||
              url.pathname.startsWith('/study/') ||
              url.pathname.endsWith('.json') ||
              url.pathname.endsWith('.js') ||
              url.pathname.endsWith('.css')
            )
          ) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Fallback for everything else
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

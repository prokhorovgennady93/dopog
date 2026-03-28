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
  // Intercept navigation requests to serve cached HTML
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request) || caches.match('/');
        })
    );
    return;
  }

  const url = new URL(event.request.url);

  // Stale-while-revalidate for static assets and specific routes
  if (
    ASSETS_TO_CACHE.includes(url.pathname) || 
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/study/') ||
    url.pathname.startsWith('/course/')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(() => null); // Ignore fetch errors in SWR
        
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Network-first for other requests (including API)
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

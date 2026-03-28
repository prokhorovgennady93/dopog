const CACHE_NAME = 'dopog-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/icon.png',
  '/_next/static/css/app/layout.css',
  '/images/articles/hero.png',
  '/images/articles/marking.png',
  '/images/articles/rules.png'
];

// Force immediate activation
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching core assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  // 1. Navigation Requests: Network-first, fallback to cache, then to '/'
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request).then(cached => {
            return cached || caches.match('/');
          });
        })
    );
    return;
  }

  // 2. GET Requests for Static Assets and Next.js internal data
  if (event.request.method === 'GET' && isSameOrigin) {
    if (url.pathname.startsWith('/api/auth')) return;

    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Update cache for assets, next.js internals, and downloaded routes
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
              url.pathname.endsWith('.css') ||
              url.pathname.endsWith('.png') ||
              url.pathname.endsWith('.jpg') ||
              url.pathname.endsWith('.svg')
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

  // 3. Simple Fallback for other requests
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

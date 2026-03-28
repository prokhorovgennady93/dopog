const CACHE_NAME = 'dopog-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/icon.png'
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

  // 2. Master Interceptor: Use Cache-First for all same-origin GET requests
  // This captures all JS, CSS, Images, and Next.js internal data (RSC)
  if (event.request.method === 'GET' && isSameOrigin) {
    if (url.pathname.startsWith('/api/auth')) return;

    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return from cache immediately if available, but also update in background
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(() => null);

        // For .json, .js, and next.js internal data, we prefer cache-first for speed
        if (cachedResponse) return cachedResponse;
        return fetchPromise;
      })
    );
    return;
  }

  // 3. Fallback for everything else (Cross-origin icons, etc.)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

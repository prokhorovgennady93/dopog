/**
 * Custom Service Worker for DOPOG Platform
 */

// This fix ensures TypeScript treats this as a module and doesn't complain about 'self'
export type {};
declare const self: ServiceWorkerGlobalScope;

// --- 1. Push Notifications ---

self.addEventListener('push', (event) => {
  console.log('[Worker] Push event received');
  
  let data = {
    title: 'ДОПОГ Экзамен 🔔',
    body: 'У вас новое уведомление',
    url: '/'
  };

  if (event.data) {
    try {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    } catch (err) {
      const text = event.data.text();
      if (text) data.body = text;
    }
  }

  const options: NotificationOptions = {
    body: data.body,
    icon: '/icon-192x192.png', // Main PWA icon
    badge: '/icon-192x192.png',
    data: { url: data.url },
    vibrate: [100, 50, 100],
    actions: (data as any).actions || []
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
      .then(() => console.log('[Worker] Notification shown'))
      .catch(err => console.error('[Worker] Push show error:', err))
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // If a window is already open with this URL, focus it
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});

// --- 2. Offline Stability Fallbacks (Safari/Yandex Fix) ---

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only handle navigation requests for our own origin
  if (event.request.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request).catch(async () => {
        // If fetch fails (offline), try to find a cached version of the page
        const cache = await caches.open('next-pwa-pages'); // Default cache name for @ducanh2912/next-pwa
        const match = await cache.match(event.request, { ignoreSearch: true });
        
        if (match) return match;
        
        // Final fallback document for uncached pages
        return new Response(
          '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="padding: 40px; font-family: system-ui, sans-serif; text-align: center; background: #fafafa; color: #555;"><div style="max-width: 400px; margin: 0 auto; background: white; padding: 30px; border-radius: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h3>Вы в оффлайне</h3><p>Эта страница еще не скачана для работы без интернета.</p><a href="/" style="display: inline-block; margin-top: 20px; background: #eab308; color: black; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold;">На главную</a></div></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })
    );
  }
});

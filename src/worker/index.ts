/// <reference lib="webworker" />

/**
 * Custom Service Worker for DOPOG Platform
 */

// This fix ensures TypeScript treats this as a module and uses the webworker library
export type {};
declare const self: ServiceWorkerGlobalScope;

// --- 1. Push Notifications ---

self.addEventListener('push', (event: any) => {
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

  // Use property assignment on any to bypass strict NotificationOptions check on server
  const options: any = {};
  options.body = data.body;
  options.icon = '/icon-192x192.png';
  options.badge = '/icon-192x192.png';
  options.data = { url: data.url };
  options.vibrate = [100, 50, 100];
  options.actions = data.actions || [];

  event.waitUntil(
    self.registration.showNotification(data.title, options)
      .then(() => console.log('[Worker] Notification shown'))
      .catch(err => console.error('[Worker] Push show error:', err))
  );
});

self.addEventListener('notificationclick', (event: any) => {
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

// NOTE: Manual fetch event handler is REMOVED.
// We now rely on standard Workbox (via next-pwa) for offline navigation fallbacks.
// This ensures full compatibility with precaching and avoids "offline not working" regressions.

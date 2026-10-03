const CACHE = 'tedx-intercom-v1';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js', '/manifest.webmanifest', '/icons/icon.svg'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.endsWith('/api.php')) return;
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match('/index.html'))));
});
self.addEventListener('push', event => {
  let data = {}; try { data = event.data?.json() ?? {}; } catch {}
  event.waitUntil(self.registration.showNotification(data.title || 'TEDx Intercom', {
    body: data.body || 'Yeni bir interkom bildirimi var.', icon: '/icons/icon.svg', badge: '/icons/icon.svg', tag: data.tag || 'tedx-intercom'
  }));
});
self.addEventListener('notificationclick', event => { event.notification.close(); event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list => { const client = list[0]; return client ? client.focus() : clients.openWindow('/'); })); });

/* Guarda la carcasa para abrir rápido. NO guarda los tableros: esos siempre se abren en vivo. apps.json y avisos.json se piden primero a la red. */
const V = 'jci-launcher-v4', ARCHIVOS = ['./', './index.html', './logo.png', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => Promise.all(ARCHIVOS.map(a => c.add(a).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (/(apps|avisos|notificaciones)\.json$/.test(u.pathname)) {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

/* Notificaciones al celular (nivel 2). Los tableros mandan solo «datos» (titulo, texto, enlace) y aquí se muestran. */
self.addEventListener('push', e => {
  let d = {};
  try { const j = e.data ? e.data.json() : {}; d = j.data || j; } catch (x) { d = {}; }
  const titulo = String(d.titulo || 'JCI Bogotá').slice(0, 80);
  e.waitUntil(self.registration.showNotification(titulo, {
    body: String(d.texto || '').slice(0, 180), icon: 'icon-192.png', badge: 'icon-192.png', lang: 'es-CO',
    tag: String(d.etiqueta || 'jci') + '-' + Date.now(), data: { enlace: String(d.enlace || '') }
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  let destino = './';
  try { const u = new URL(e.notification.data && e.notification.data.enlace); if (u.protocol === 'https:' && (u.hostname === 'script.google.com' || u.origin === location.origin)) destino = u.href; } catch (x) {}
  e.waitUntil(clients.openWindow(destino));
});

/* Guarda la carcasa para abrir sin conexión. NO guarda los tableros: esos siempre se abren en vivo. La página y los .json se piden primero a la red. */
const V = 'jci-launcher-v16', ARCHIVOS = ['./', './index.html', './logo.png', './logo-blanco.webp', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => Promise.all(ARCHIVOS.map(a => c.add(a).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V && x !== 'jci-bandeja').map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (/(apps|avisos|notificaciones)\.json$/.test(u.pathname)) {
    e.respondWith(fetch(e.request.url, { cache: 'no-cache' }).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
    return;
  }
  /* La página (index.html) se pide primero a la red para que las actualizaciones lleguen solas; sin conexión, la guardada. */
  if (e.request.mode === 'navigate' || u.pathname.endsWith('/') || u.pathname.endsWith('index.html')) {
    /* cache: 'no-cache' = siempre pregunta al servidor si hay versión nueva (la caché web de Chrome podía entregar la vieja hasta 10 minutos) */
    e.respondWith(fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

/* Notificaciones al celular (nivel 2). Los tableros mandan solo «datos» (titulo, texto, enlace) y aquí se muestran. */
self.addEventListener('push', e => {
  let d = {};
  try { const j = e.data ? e.data.json() : {}; d = j.data || j; } catch (x) { d = {}; }
  const titulo = String(d.titulo || 'JCI Bogotá').slice(0, 80);
  /* Bandeja: la notificación también queda en «Avisos» dentro de la app (últimos 60 días, máximo 30) */
  const item = { id: 'n-' + Date.now(), titulo, texto: String(d.texto || '').slice(0, 180), enlace: String(d.enlace || ''), fecha: Date.now() };
  const guardar = caches.open('jci-bandeja').then(c => c.match('bandeja').then(r => r ? r.json() : []).catch(() => []).then(l => {
    l = (l || []).filter(x => Date.now() - x.fecha < 60 * 864e5);
    if (l.some(x => x.titulo === item.titulo && x.texto === item.texto && item.fecha - x.fecha < 864e5)) return null;   // mismo mensaje en menos de un día: no se repite
    l = [item].concat(l).slice(0, 30);
    return l && c.put('bandeja', new Response(JSON.stringify(l), { headers: { 'Content-Type': 'application/json' } }));
  })).then(() => self.clients.matchAll({ includeUncontrolled: true })).then(cs => cs.forEach(c => c.postMessage({ tipo: 'bandeja' }))).catch(() => {});
  e.waitUntil(Promise.all([guardar, self.registration.showNotification(titulo, {
    body: String(d.texto || '').slice(0, 180), icon: 'icon-192.png', badge: 'icon-192.png', lang: 'es-CO',
    tag: String(d.etiqueta || 'jci') + '-' + Date.now(), data: { enlace: String(d.enlace || '') }
  })]));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  let destino = './';
  try { const u = new URL(e.notification.data && e.notification.data.enlace); if (u.protocol === 'https:' && (u.hostname === 'script.google.com' || u.origin === location.origin)) destino = u.href; } catch (x) {}
  e.waitUntil(clients.openWindow(destino));
});

const CACHE = 'agenda-voz-v2';
const ARCHIVOS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (evento) => {
  self.skipWaiting();
  evento.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ARCHIVOS)));
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nombres) => Promise.all(nombres.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// Siempre pide el archivo fresco a internet (sin usar la caché HTTP del navegador).
// Solo si no hay conexión, recurre a la última copia guardada.
self.addEventListener('fetch', (evento) => {
  evento.respondWith(
    fetch(evento.request, { cache: 'no-store' }).catch(() => caches.match(evento.request))
  );
});

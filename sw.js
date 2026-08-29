const CACHE = 'agenda-voz-v1';
const ARCHIVOS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (evento) => {
  self.skipWaiting();
  evento.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ARCHIVOS)));
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(self.clients.claim());
});

// La app siempre pide los datos del calendario en directo a Google;
// aquí solo cacheamos el "cascarón" de la app para que abra rápido y sea instalable.
self.addEventListener('fetch', (evento) => {
  evento.respondWith(
    fetch(evento.request).catch(() => caches.match(evento.request))
  );
});

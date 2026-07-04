const CACHE_NAME = 'liumgo-driver-pwa-v1.0.0';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './src/styles.css',
  './src/app.js',
  './data/demo.json',
  './assets/liumgo-logo.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/hero-image.jpg',
  './assets/ev-network.jpg',
  './assets/delhi-map.jpg',
  './assets/services-hero-3w.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached || caches.match('./index.html'));
      return cached || network;
    })
  );
});

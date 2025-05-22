// public/sw.js
const CACHE_NAME = 'zitacode-v3';
const urlsToCache = ['/', '/index.html', '/icons/icon-192x192.png',
  '/icons/icon-512x512.png', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
// public/sw.ts
const CACHE_NAME = 'zitacode-v1';
const urlsToCache: string[] = ['/', '/index.html', '/styles.css', '/main.js', '/icons/*'];

self.addEventListener('install', (event: InstallEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

// Type extensions for TypeScript
interface InstallEvent extends ExtendableEvent {
  waitUntil(promise: Promise<any>): void;
}

interface FetchEvent extends ExtendableEvent {
  readonly request: Request;
  respondWith(response: Promise<Response>): void;
}
// Service Worker for LIVING STONE SERVICE (LSS) - Version 5.0 (Network First Strategy)
const CACHE_NAME = 'lss-manager-cache-v5.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './logo.png'
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker v5.0] Installing new version');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker v5.0] Activating & Purging old caches');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Purging old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Pass non-GET or Supabase cloud API requests straight to network
  if (event.request.method !== 'GET' || event.request.url.includes('supabase.co')) {
    return;
  }

  // Network-First Strategy to guarantee immediate updates on Vercel
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      })
      .catch(() => {
        // Offline fallback from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

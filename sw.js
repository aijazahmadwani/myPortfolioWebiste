importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const cacheName = 'homepage';
const resourcesToPrecache = [
  '/',
  'index.html'
];

self.addEventListener('install', event => {
  console.log('service worker install event');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      return cache.addAll(resourcesToPrecache);
    })
);
})

self.addEventListener('fetch', event =>{
  event.respondWith(caches.match(event.request)
  .then(cachedResponse => {
    return cachedResponse || fetch(event.request);
  })
  );
});


workbox.routing.registerRoute(
    /assets/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-files',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          purgeOnQuotaError: true,
          maxEntries: 100
  
        })
      ]
    })
  )



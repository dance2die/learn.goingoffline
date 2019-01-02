const version = "0.0.15";
const staticCacheName = `staticfiles${version}`;

// Clean up caches here!
addEventListener("activate", function(event) {
  console.log(`The service worker is ACTIVATing`);
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== staticCacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => clients.claim())
  );
});

// Install caches here!
addEventListener("install", function(event) {
  console.log(`The service worker is INSTALLing`);
  skipWaiting();

  event.waitUntil(
    caches.open(staticCacheName).then(staticCache => {
      // nice to have
      // staticCache.addAll([]);

      return staticCache.addAll([`/img/linkedin.png`, `/offline.html`]);
    })
  );
});

addEventListener("fetch", fetchEvent => {
  //   const { request } = fetchEvent;
  const request = fetchEvent.request;
  console.log(`request`, request);

  fetchEvent.respondWith(
    caches
      .match(request)
      .then(
        cache =>
          cache || fetch(request).catch(error => caches.match(`/offline.html`))
      )
  );
});

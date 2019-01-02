const version = "0.0.1";
const staticCacheName = `staticfiles${version}`;

addEventListener("install", function(event) {
  console.log(`The service worker is INSTALLing`);
  skipWaiting();
  event.waitUntil(
    caches.open(staticCacheName).then(staticCache => {
      // nice to have
      staticCache.addAll([]);

      // must have
      return staticCache.addAll([]);
    })
  );
});

addEventListener("activate", function(event) {
  console.log(`The service worker is ACTIVATing`);
});

addEventListener("fetch", fetchEvent => {
  const { request } = fetchEvent;
  fetchEvent.respondWith(
    caches.match(request).then(cache => cache || fetch(request))
  );
});

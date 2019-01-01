addEventListener("install", function(event) {
  console.log(`The service worker is INSTALLing`);
});
addEventListener("activate", function(event) {
  console.log(`The service worker is ACTIVATing`);
});
addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(new Response("hello, world!"));
  //   console.log(fetchEvent.request);
});

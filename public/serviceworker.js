addEventListener("install", function(event) {
  console.log(`The service worker is INSTALLing`);
});
addEventListener("activate", function(event) {
  console.log(`The service worker is ACTIVATing`);
});
addEventListener("fetch", fetchEvent => {
  const { request } = fetchEvent;
  fetchEvent.respondWith(
    fetch(request)
      .then(response => response)
      .catch(
        error =>
          new Response(
            `<h1>Oop!</h1> <div>something went wrong!</div> <div>${error}</div>`,
            {
              headers: { "Content-type": "text/html;charset=utf-8" }
            }
          )
      )
  );
  //   console.log(fetchEvent.request);
});

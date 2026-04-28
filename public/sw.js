const CACHE = "habit-tracker-shell-v1.2";
const SHELL = ["/", "/login", "/signup", "/dashboard", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(SHELL))
      .catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches
      .open(CACHE)
      .then((cache) => {
        return cache.match(req).then((cachedResponse) => {
          const fetchPromise = fetch(req).then((networkResponse) => {
            cache.put(req, networkResponse.clone());
            return networkResponse;
          });

          return cachedResponse || fetchPromise;
        });
      })
      .catch(() => {
        return caches.match("/") || new Response("Offline", { status: 200 });
      }),
  );
});

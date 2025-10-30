self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("vk-cache").then(cache =>
      cache.addAll([
        "index.html",
        "dashboard.html",
        "add-entry.html",
        "style.css",
        "script.js",
        "db.js"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request)));
});

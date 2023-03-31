var CACHE_NAME = 'static-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/',
        '../html/index.html',
        '../html/catedral.html',
        '../html/mirante-javali.html',
        '../html/ponte-arcos.html',
        '../html/manifest.json',
        '../imagem/categral.png',
        '../imagem/david.png',
        '../imagem/icon.png',
        '../imagem/javali.png',
        '../imagem/ponte-arcos.png',
        '../css/index.css',
        '../css/pagina.css',
        '../css/reset.css'
      ]);
    })
  )
});

self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request).then(function (cachedResponse) {
        return cachedResponse || fetch(event.request);
      })
    );
  });
const STATIC_CACHE_NAME = "webApp.v1";
const modelList_CACHE_NAME = 'modellist';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/models/antilope.html',
                '/models/doggy.html',
                '/models/bee.html',
                '/models/cube.html',
                '/css/style.css',
                '/css/modele.css',
                '/js/BDRequest.js',
                '/js/controller.js',
                '/js/pwa.js',
                '/manifest.json',
                '/icon/antilope.glb',
                '/icon/Doggy.glb',
                '/icon/Bee.glb',
                '/icon/cubeLUT.glb',
                '/icon/stex.png',
                '/icon/saint_ex_16x16.png',
                '/icon/saint_ex_32x32.png',
                '/icon/saint_ex_60x60.png',
                '/icon/saint_ex_72x72.png',
                '/icon/saint_ex_96x96.png',
                '/icon/saint_ex_120x120.png',
                '/icon/saint_ex_144x144.png',
                '/icon/saint_ex_152x152.png',
                '/icon/saint_ex_180x180.png',
                '/icon/saint_ex_192x192.png',
                '/icon/saint_ex_512x512.png',
                'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js',
                'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
                'https://fonts.googleapis.com/icon?family=Material+Icons'
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith("http://localhost:5500/")) {
        event.respondWith(
            caches.open(STATIC_CACHE_NAME).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    const fetchPromise = fetch(event.request).then(function (networkResponse) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                    return response || fetchPromise;
                });
            }),
        );
    }
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    if (cacheName !== STATIC_CACHE_NAME)
                    {
                        return true;
                    }
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.url.startsWith("http://localhost:7000/")) {
        event.respondWith(
            caches.open(modelList_CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
        );
    }
});
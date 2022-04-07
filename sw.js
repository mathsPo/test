const STATIC_CACHE_NAME = "webApp.v1";
const todoList_CACHE_NAME = 'todolist';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/models/modele1.html',
                '/models/modele2.html',
                '/models/modele3.html',
                '/models/modele4.html',
                '/css/style.css',
                '/js/apiRequest.js',
                '/js/controller.js',
                '/js/ihm.js',
                '/js/pwa.js',
                '/manifest.json',
                '/icon/antilope.glb',
                '/icon/Doggy.glb',
                '/icon/stex.png',
                '/icon/icon-512x512.png',
                '/icon/apple-icon-120x120-seochecker-manifest-5510.png',
                '/icon/android-icon-192x192-seochecker-manifest-5510.png',
                '/icon/apple-icon-57x57-seochecker-manifest-5510.png',
                '/icon/apple-icon-72x72-seochecker-manifest-5510.png',
                '/icon/apple-icon-114x114-seochecker-manifest-5510.png',
                '/icon/apple-icon-76x76-seochecker-manifest-5510.png',
                '/icon/apple-icon-60x60-seochecker-manifest-5510.png',
                '/icon/favicon-96x96-seochecker-manifest-5510.png',
                '/icon/favicon-32x32-seochecker-manifest-5510.png',
                '/icon/favicon-16x16-seochecker-manifest-5510.png',
                '/icon/apple-icon-152x152-seochecker-manifest-5510.png',
                '/icon/apple-icon-144x144-seochecker-manifest-5510.png',
                '/icon/apple-icon-180x180-seochecker-manifest-5510.png',
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
            caches.open(todoList_CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
        );
    }
});
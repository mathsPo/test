const STATIC_CACHE_NAME = "todosApp.v1";
const todoList_CACHE_NAME = 'todolist';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/css/background.css',
                '/icon/icon-512x512.png',
                '/js/apiRequest.js',
                '/js/controller.js',
                '/js/ihm.js',
                '/js/pwa.js',
                '/manifest.json',
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
                '/icon/apple-icon-180x180-seochecker-manifest-5510.png'
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    // Nous voulons seulement répondre aux requêtes concernant notre application en testant l'URL de la requête
    if (event.request.url.startsWith("http://localhost:3000/")) {
        // Tente de produire une réponse à la requête fetch interceptée
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

self.addEventListener('fetch', function(event) {
    if (event.request.url.startsWith("http://localhost:3000/")) {
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

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    if (cacheName !== STATIC_CACHE_NAME)
                    {
                        return true;
                    }
                    // Return true if you want to remove this cache,
                    // but remember that caches are shared across
                    // the whole origin
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
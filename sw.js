const STATIC_CACHE_NAME = "webApp.v1";
const modelList_CACHE_NAME = 'modelelist';

// https://0a10d708-0299-414b-ae54-aff5c9f16148-bluemix.cloudant.com/dashboard.html

this.addEventListener('install', function(event) {     
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '/',
            ]);
        })
    );
    console.log('service worker installé');
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
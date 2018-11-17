var staticCacheName = 'restaurant-v1';
var cacheFiles = [
    '/',
    'index.html',
    'restaurant.html',
    'js/main.js',
    'js/restaurant_info.js',
    'js/dbhelper.js',
    'css/styles.css',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
];
self.addEventListener('install', function(event) {
    console.log('Service Worker Installed');
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true}).then(function(response) {
            return (
                response || fetch(event.request).then(function(response) {
                    var clonedResposne = response.clone();
                    return caches.open(staticCacheName).then(function(cache) {
                        cache.put(event.request, clonedResposne);
                        return response;
                    })
                    
                }).catch(function(error) {
                    console.log(error, 'ERROR IN SW FETCH REQUEST')
                })
            );
        })
    );
});

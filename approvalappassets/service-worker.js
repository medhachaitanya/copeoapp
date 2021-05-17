//importScripts('/cache-polyfill.js');


// // // example usage:
// self.addEventListener('install', function(event) {
//   console.log('Install:', event);
//     event.waitUntil(
//       caches.open('airhorner').then(function(cache) {
//         return cache.put('/', new Response("Loaded from cache"));  
        
//       })
//     );
//   });
  
//   self.addEventListener('fetch', function(event) {
//     console.log('Fetching:', event.request.url);
//     // event.respondWith(
//     //   caches.match(event.request).then(function(response) {
//     //     return response || new Response("Nothing in the cache for this request");
//     //   })
//     // );
//   });

self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('copeoapproval').then(function(cache) {
        return cache.addAll([
         //  '/Component.js',
         //  '/Component-preload.js',
         //  '/i18n/i18n_en_US.properties',       
        ]).catch(error => console.error('Oops! ' + error));;
      })
    );
   });
   
   self.addEventListener('fetch', function(event) {
       //console.log(event.request.url);
      
       event.respondWith(
         caches.match(event.request).then(function(response) {
           //console.log(response)
           return response || fetch(event.request);
         })
       );
      });
   
   
      self.addEventListener('activate', function(event) {
       event.waitUntil(
         caches.keys().then(function(cacheNames) {
           return Promise.all(
             cacheNames.filter(function(cacheName) {
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
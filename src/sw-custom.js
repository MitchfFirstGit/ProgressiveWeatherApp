/* eslint-disable */
if ("function" === typeof importScripts) {
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

    if (workbox) {
        console.log("Workbox is loaded");
        workbox.precaching.precacheAndRoute([]);

        workbox.routing.registerRoute(
            /\.(?:woff2|woff|ttf)$/,
            workbox.strategies.CacheFirst({
              cacheName: "icons",
              plugins: [
                new workbox.expiration.Plugin({
                  maxEntries: 60,
                  maxAgeSeconds: 20 * 24 * 60 * 60 // 20 Days
                })
              ]
            })
          );

        workbox.routing.registerRoute(
            /\.(?:|js|css|png|gif|jpg|jpeg|svg)$/,
            workbox.strategies.staleWhileRevalidate({
                cacheName: "cashe-resources",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 80,
                        maxAgeSeconds: 30 * 24 * 60 * 60
                    })
                ]
            })
        );

    } else {
        console.error("Workbox could not be loaded. No offline support");
    }
}
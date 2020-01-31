/* eslint-disable */
if ("function" === typeof importScripts) {
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

    if (workbox) {
        console.log("Workbox is loaded");
        workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "0c9499e3133d87d890bf340a5ac135b2"
  },
  {
    "url": "logo192.png",
    "revision": "581fa1d82b7152e685510b51d48edd3e"
  },
  {
    "url": "logo512.png",
    "revision": "260d57586012b0ed1ae78accc0bf7083"
  },
  {
    "url": "precache-manifest.005bf37bdb61ed0d1980771db73dda29.js",
    "revision": "005bf37bdb61ed0d1980771db73dda29"
  },
  {
    "url": "service-worker.js",
    "revision": "85345bac2f20bd31bda765590928db82"
  },
  {
    "url": "static/css/main.5c46fca8.chunk.css",
    "revision": "ccc798898ad2968a359c8ae680ad4870"
  },
  {
    "url": "static/js/2.8a25c74a.chunk.js",
    "revision": "3858b9bd0de76c0593e55e7bad06830d"
  },
  {
    "url": "static/js/main.db2f92b0.chunk.js",
    "revision": "e3101e5866e23a8fe542d4d98b52aab2"
  },
  {
    "url": "static/js/runtime-main.8aff1fc4.js",
    "revision": "e72f3acef871d6ef7cc1b340bf35a0f5"
  },
  {
    "url": "static/media/weathericons-regular-webfont.ecaf8b48.svg",
    "revision": "ecaf8b481729b18f6a8494d9f691cdae"
  }
]);

        workbox.routing.registerRoute(
            /\.(?:js|css|png|gif|jpg|jpeg|svg)$/,
            workbox.strategies.staleWhileRevalidate({
                cacheName: "static-resources",
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
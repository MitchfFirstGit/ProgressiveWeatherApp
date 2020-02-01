/* eslint-disable */
if ("function" === typeof importScripts) {
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

    if (workbox) {
        console.log("Workbox is loaded");
        workbox.precaching.precacheAndRoute([
  {
    "url": "img/Icon-120.png",
    "revision": "e68fdc591dcf0f5cd35f516f4b641263"
  },
  {
    "url": "img/Icon-144.png",
    "revision": "618388d4ba0a2e79408e5a9e5fd39d37"
  },
  {
    "url": "img/Icon-152.png",
    "revision": "45034f0d5903cd1d87518eb3d676da22"
  },
  {
    "url": "img/Icon-16.png",
    "revision": "3d367e22397272759f21025bf8a6c316"
  },
  {
    "url": "img/Icon-167.png",
    "revision": "bebbe4c4177c285fbc149874fcff80be"
  },
  {
    "url": "img/Icon-180.png",
    "revision": "d9bd48b86303db732971d69a80f7be7c"
  },
  {
    "url": "img/Icon-192.png",
    "revision": "a64d16c2da3b3421d44b362efb3b32f0"
  },
  {
    "url": "img/Icon-256.png",
    "revision": "1a7020405d078b51ee165a6cb7aee11f"
  },
  {
    "url": "img/Icon-32.png",
    "revision": "3c6b89a5871d43b5a3e1f10e1a9bd928"
  },
  {
    "url": "img/Icon-48.png",
    "revision": "460d5400ec09fda5f8143c77080d2a69"
  },
  {
    "url": "img/Icon-512.png",
    "revision": "053100468475df6114610f876c4e1dbf"
  },
  {
    "url": "img/Icon-96.png",
    "revision": "4ab48d2c4da1d6a675e9a8c7dcccc2c9"
  },
  {
    "url": "index.html",
    "revision": "3c877312d3281f8892cb8455ffd92cf3"
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
    "url": "precache-manifest.5fc695904164b6edf3fa7b8c7cb72f2e.js",
    "revision": "5fc695904164b6edf3fa7b8c7cb72f2e"
  },
  {
    "url": "service-worker.js",
    "revision": "9dc9927999bf097b70fccf459e5b40aa"
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
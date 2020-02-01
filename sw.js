/* eslint-disable */
if ("function" === typeof importScripts) {
  importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

  if (workbox) {
    console.log("Workbox is loaded");

    workbox.setConfig({ debug: false });

    workbox.precaching.precacheAndRoute([
  {
    "url": "asset-manifest.json",
    "revision": "a83865fa29fad95a4cbb58ea0e315bae"
  },
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
    "revision": "5ff152eb53424e71f70e216109208e82"
  },
  {
    "url": "manifest.json",
    "revision": "59d485adfbd8d6606a4a475041612360"
  },
  {
    "url": "precache-manifest.18e662cad2313744146a57d9461937d2.js",
    "revision": "18e662cad2313744146a57d9461937d2"
  },
  {
    "url": "service-worker.js",
    "revision": "e55c79850c5c70221038ecfe90bdb1cb"
  },
  {
    "url": "splashscreens/ipad_splash.png",
    "revision": "81d30f92d0a2b0bc49143fe7bf156654"
  },
  {
    "url": "splashscreens/ipadpro1_splash.png",
    "revision": "0b5c3df1c7fa51baeccae9124e740afb"
  },
  {
    "url": "splashscreens/ipadpro2_splash.png",
    "revision": "8df15c25c48492fe7065546bd43f611d"
  },
  {
    "url": "splashscreens/ipadpro3_splash.png",
    "revision": "0f869392d901dda068cdea357a88d2e0"
  },
  {
    "url": "splashscreens/iphone5_splash.png",
    "revision": "230cbd2934f501e9e3f248d42faad9c4"
  },
  {
    "url": "splashscreens/iphone6_splash.png",
    "revision": "22655f97707fcbfbb90329718b6fa270"
  },
  {
    "url": "splashscreens/iphoneplus_splash.png",
    "revision": "69ad8e7c5e85f5acff795a9e31f5213c"
  },
  {
    "url": "splashscreens/iphonex_splash.png",
    "revision": "9fb80e2f231692374ba6c24266c507e1"
  },
  {
    "url": "splashscreens/iphonexr_splash.png",
    "revision": "31e5375d7848e165aef72d6ad9ba0a89"
  },
  {
    "url": "splashscreens/iphonexsmax_splash.png",
    "revision": "ec20592b0ecdc15848f7c263cf6e2446"
  },
  {
    "url": "static/css/main.5c46fca8.chunk.css",
    "revision": "ccc798898ad2968a359c8ae680ad4870"
  },
  {
    "url": "static/js/2.783f24fe.chunk.js",
    "revision": "47529bcc551eeca49f6b4341d9b82e09"
  },
  {
    "url": "static/js/main.fe7f5f05.chunk.js",
    "revision": "66e92fc94d82ac136cd8596a3d191276"
  },
  {
    "url": "static/js/runtime-main.8aff1fc4.js",
    "revision": "e72f3acef871d6ef7cc1b340bf35a0f5"
  },
  {
    "url": "static/media/weathericons-regular-webfont.1cd48d78.woff2",
    "revision": "1cd48d78f06d33973d9d761d426e69bf"
  },
  {
    "url": "static/media/weathericons-regular-webfont.4618f0de.ttf",
    "revision": "4618f0de2a818e7ad3fe880e0b74d04a"
  },
  {
    "url": "static/media/weathericons-regular-webfont.8cac70eb.woff",
    "revision": "8cac70ebda3f23ce472110d9f21e8593"
  },
  {
    "url": "static/media/weathericons-regular-webfont.ecaf8b48.svg",
    "revision": "ecaf8b481729b18f6a8494d9f691cdae"
  }
]);

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
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
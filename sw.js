// file service worker

// menggunakan workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// memeriksa ketersediaan workbox
if (workbox) {
  console.log(`[Workbox]: Workbox tersedia`);

  // debug mode
  workbox.setConfig({
    debug: false,
  });

  // menggunakan sw versi terbaru
  workbox.core.skipWaiting();

  // menggunakan sw sesegera mungkin
  workbox.core.clientsClaim();

  // mengatur nama cache
  workbox.core.setCacheNameDetails({
    prefix: 'football',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime',
  });

  // mengatur file precaching
  const revision = '1';
  workbox.precaching.precacheAndRoute([
    // assets css
    { url: '/assets/css/_error.css', revision },
    { url: '/assets/css/_page_index.css', revision },
    { url: '/assets/css/_page_match.css', revision },
    { url: '/assets/css/_page_team.css', revision },
    { url: '/assets/css/_vector.css', revision },
    { url: '/assets/css/main.css', revision },

    // assets image
    { url: '/assets/img/icon/iconfinder_Soccer_192x192.png', revision },
    { url: '/assets/img/icon/iconfinder_Soccer_512x512.png', revision },
    { url: '/assets/img/img/undraw_Choose_bwbs.svg', revision },
    { url: '/assets/img/img/undraw_server_down_s4lk.svg', revision },
    { url: '/assets/img/img/undraw_warning_cyit.svg', revision },
    { url: '/assets/img/vector/ellipse1.svg', revision },
    { url: '/assets/img/vector/ellipse2.svg', revision },
    { url: '/assets/img/vector/ellipse3.svg', revision },

    // assets js
    { url: '/assets/js/api.js', revision },
    { url: '/assets/js/component-error.js', revision },
    { url: '/assets/js/indexed-db.js', revision },
    { url: '/assets/js/loading.js', revision },
    { url: '/assets/js/navbar.js', revision },
    { url: '/assets/js/notification.js', revision },
    { url: '/assets/js/register-sw.js', revision },
    
    // vendor
    { url: '/vendor/css/materialize.min.css', revision },
    { url: '/vendor/js/materialize.min.js', revision },
    { url: '/vendor/js/idb.js', revision },
    
    // manifest
    { url: '/manifest.json', revision },
    
    // icon
    { url: '/favicon.ico', revision },
    
    // pages
    { url: '/match.html', revision },
    { url: '/myteam.html', revision },
    { url: '/team.html', revision },
    { url: '/index.html', revision },
  ], {
    // mengabaikan query search pada url
    ignoreURLParametersMatching: [/.*/]
  });

  // membuat data api offline
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50, // jumlah cache list
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
          purgeOnQuotaError: true, // hapus cache jika sudah melebihi quota
        }),
      ],
    })
  );

} else 
  console.log(`[Workbox]: Workbox tidak tersedia`);

// event push
self.addEventListener('push', event => {
  let body = 'Push manager tidak memiliki pesan';
  if (event.data) 
    body = event.data.text();

  // mengatur notifikasi
  const options = {
    body,
    icon: './assets/img/icon/iconfinder_Soccer_512x512.png',
    vibrate: [100, 50, 50],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    // menampilkan notifikasi
    self.registration.showNotification('EPL News', options)
  );
});
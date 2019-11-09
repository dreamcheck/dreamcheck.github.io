// file service worker

const CACHE_NAME = 'football-app';
const OFFILE_ASSETS = [
  '/assets/css/main.css',
  '/assets/img/icon/iconfinder_Soccer_512x512.png',
  '/assets/img/icon/iconfinder_Soccer_192x192.png',
  '/assets/js/api.js',
  '/assets/js/navbar.js',
  '/assets/js/register-sw.js',
  '/assets/js/indexed-db.js',
  '/assets/js/loading.js',
  '/vendor/css/materialize.min.css',
  '/vendor/js/materialize.min.js',
  '/vendor/js/idb.js',
  '/manifest.json',
  '/index.html',
  '/team.html',
  '/',
];

// event install
self.addEventListener('install', event => {
  
  // cache semua offline asset yang diperlukan
  const preCache = async () => {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(OFFILE_ASSETS);
  };
  
  console.log('[Service Worker]: event install');
  event.waitUntil(preCache());

  // selalu menggunakan service worker versi terbaru
  self.skipWaiting();
});

// event active
self.addEventListener('activate', event => {
  
  // menghapus chache lain agar tidak banyak memakan storage
  const deleteOtherCache = async () => {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName != CACHE_NAME) {
          console.log(`[Service Worker]: hapus cache '${cacheName}'`);  
          return caches.delete(cacheName);
        }
      })
    );
  };

  console.log('[Service Worker]: event activate');
  event.waitUntil(Promise.all([
    deleteOtherCache(),
    clients.claim(),
  ]));
});

// event fetch
self.addEventListener('fetch', event => {
  const BASE_URL = 'https://api.football-data.org/v2';

  // ganti http dengan https pada url
  const safeUrl = url => url.replace(/^http:\/\//i, 'https://');

  // menambahkan ke cache dari server
  const addToCache = async () => {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch(event.request);
    cache.put(event.request.url, response.clone());
    console.log(`[Service Worker]: caching ${event.request.url}`);
    return response;
  };

  // cek di cache
  const checkOnCache = async () => {
    const response = await caches.match(event.request, { ignoreSearch: true });
    return response || fetch(event.request);
  }

  event.respondWith(
    safeUrl(event.request.url).includes(BASE_URL)
      ? addToCache()
      : checkOnCache()
  );
});
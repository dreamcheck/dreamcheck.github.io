if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('[Service Worker]: berhasil didaftarkan');
    } catch (error) {
      console.log('[Service Worker]: gagal didaftarkan');
    }
  });
} else {
  console.log('browser ini tidak mendukung service worker');
}
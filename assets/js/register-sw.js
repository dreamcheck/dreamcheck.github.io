// menjalankan callback setelah service worker terdaftar
const registerServiceWorker = async (callback = () => {}) => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        console.log('[Service Worker]: berhasil didaftarkan');
        const registration = await navigator.serviceWorker.ready; 
        if (registration) {
          console.log('[Service Worker]: berhasil dijalankan');
          callback();
        };
      } catch (error) {
        console.log(`[Service Worker]: gagal didaftarkan ${error}`);
      }
    });
  } else {
    console.log('browser ini tidak mendukung service worker');
    callback();
  }
}
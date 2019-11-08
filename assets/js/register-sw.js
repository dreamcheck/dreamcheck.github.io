// menjalankan callback setelah service worker terdaftar
const registerServiceWorker = async (callback = () => {}) => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('[Service Worker]: berhasil didaftarkan');
        registration && callback();
      } catch (error) {
        console.log('[Service Worker]: gagal didaftarkan');
      }
    });
  } else {
    console.log('browser ini tidak mendukung service worker');
    callback();
  }
}
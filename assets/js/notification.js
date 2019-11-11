// fungsi mengubah string ke uint8array
const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// fungsi mengubah uint8array ke string
const uInt8ArrayToStr = (uInt8Array) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(uInt8Array)));
}

// fungsi untuk meminta akses notifikasi pada user
const permissionNotification = async () => {

  // cek dukungan notifikasi pada browser
  if ('Notification' in window) {
    
    // menunggu jawaban user
    const result = await Notification.requestPermission();
    
    // jawaban user
    if (result === 'denied') {
      console.log('[Notification]: akses ditolak');
      return;
    } else if (result === 'default') {
      console.log('[Notification]: user menutup modal permintaan akses');
      return;
    } else {

      // notitikasi diizinkan
      if ('PushManager' in window) {

        try {
          // mengambil registrasi service worker
          const registration = await navigator.serviceWorker.getRegistration();
          
          // subscribe ke FCM
          const subsctription = await registration.pushManager.subscribe({
            applicationServerKey: urlB64ToUint8Array('BCx0bq4YKYXpCxcvkghNiOzSHnga6jO3Q3xrX5zcyHtgYqBKSQOhZGZFhJx5K0-pSk6aITwxRh1VZkDkuFff68c'),
            userVisibleOnly: true,
          });
          
          // menampilkan push subscription
          console.log(`[Push Manager]: enpoint: ${subsctription.endpoint}`);
          console.log(`[Push Manager]: p256dh key: ${uInt8ArrayToStr(subsctription.getKey('p256dh'))}`);
          console.log(`[Push Manager]: auth key: ${uInt8ArrayToStr(subsctription.getKey('auth'))}`);

        } catch (error) {
          console.error(`[Push Manager]: ${error}`);
        }
      }
    }
  }
}
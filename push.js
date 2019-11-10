const webPush = require('web-push');

// Properti push subscription bisa diganti sesuai client 
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/e3krWPDwcgA:APA91bELheLcyTaLB8kZg9Z4TRw5ncTuKnTmIikY6ERVLF7Q3xEtmIbwaX4a-FueioUj_Z5b3OlW8aJxZYmoiFeDpQXQJIMUnw_rK80pbzk_Rrz8jTxoFy-O05Uu88xm3RH56yC8i-DX',
  keys: {
    p256dh: 'BMnjbyd63wMw34jIRNzf+15ho9DgPe+aqVEl5213RTK4Pma/xRf20FGZ1vBAtJfE/0WoRfxa1SpOZh4PjRmM+q8=',
    auth: 'BIdDOhXRrV695mc3SZtk0w==',
  },
};

const payload = 'Hallo Pengguna EPL App';

const options = {
  gcmAPIKey: 'AAAAhmG5xsw:APA91bEcgO-Ob8o_u5xKbkCM22YUoqc96fMI-vdpXop9vvfY_ghcUE3Aph6LH69MRM_sJtPgQPlA10uycJiauGu4yp_gKMW3tWvPUDcP3DJezCwtiFHwz9ykyoEd11ZGn9ngiev__gE6',
  TTL: 60,
  vapidDetails: {
    subject: 'mailto:main.dreamcheck@gmail.com',
    publicKey: 'BCx0bq4YKYXpCxcvkghNiOzSHnga6jO3Q3xrX5zcyHtgYqBKSQOhZGZFhJx5K0-pSk6aITwxRh1VZkDkuFff68c',
    privateKey: 'QHCcdyKTVyW9slvu4dZAaNmo3ehvdJY8sEWcUE6RLnE',
  }
};

(async () => {
  try {
    console.log(await webPush.sendNotification(pushSubscription, payload, options));
  } catch (error) {
    console.log(error);
  }
})();


// NB: file ini perlu menggunakan package npm
// - web-push

// Run:
// node main.js
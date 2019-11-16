const webPush = require('web-push');

// Properti push subscription bisa diganti sesuai client 
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/cnH7LYJgSns:APA91bGX4ZFDClAewAg607gCw4cLS5x7O_dUlNNL3hF5lNBhc2yviMBEOwp0fuKp2w0LyTnQL2GgAeX762hEl6x1xEtW0luUxz3UXI63HXtiX7UpRvcxMQRa8Av922rEng4FJnJo_bRd',
  keys: {
    p256dh: 'BGpHnSwCg3fPWOKjCdANSHB7bNyeQJUlj4Z97xL48xIYdbNrIRJVLq/qBnH6lyqHRiKq7swcBndAGuUHA2OXF84=',
    auth: 'oH2hubsL5Avoij+6SrYYrw==',
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
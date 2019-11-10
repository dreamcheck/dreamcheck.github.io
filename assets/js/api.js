// setting url
const BASE_URL = 'https://api.football-data.org/v2';

// option pada fetch
const headers = {
  'X-Auth-Token': '8e4451c2e3714fb095f3762553f7578a',
};

// ganti http dengan https pada url
const safeUrl = url => url.replace(/^http:\/\//i, 'https://');

// setting untuk GET request
const getRequest = async (url, queryParams = null) => {

  // jika menggunakan query params
  if (queryParams) {
    url = `${url}?${ new URLSearchParams(queryParams)}`;
  } 

  url = safeUrl(url);
  try {
    // cek browser mendukung cache
    if ('caches' in window) {

      // load data dari cache
      const cacheResponse = await caches.match(url);
      
      // data dari cache tersedia
      if (cacheResponse) {
        const cacheData = await cacheResponse.clone().json();

        // cek user online
        if (navigator.onLine) {
          
          // cek data terbaru di API
          const serverResponse = await fetch(url, { headers });
          const serverData = await serverResponse.clone().json();

          // bandingkan dengan data di cache
          // jika data server & cache tak sama, gunakan data server
          if (JSON.stringify(cacheData) != JSON.stringify(serverData)) {
            console.log(`[Fetch]: update dari ${url}`);
            return serverData;
          }
        } 
        // load data dari cache
        console.log(`[Fetch]: load cache ${url}`);
        return cacheData; 
      }
    }
    // load dari API
    const response = await fetch(url, { headers });
    console.log(`[Fetch]: load server ${url}`);
    return response.json();

  } catch (error) {
    console.error(`[Fetch]: ${error}`);
    return null;
  }
}

// get klasemen liga 
const getKlasemen = async () => getRequest(`${BASE_URL}/competitions/PL/standings`);

// get single team
const getTeam = async (teamId) => getRequest(`${BASE_URL}/teams/${teamId}`);

// get match per team
const getTeamMatches = async (teamId, queryParams = null) => 
  getRequest(`${BASE_URL}/teams/${teamId}/matches`, queryParams);

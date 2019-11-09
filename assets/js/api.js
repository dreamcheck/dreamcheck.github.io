// setting url
const BASE_URL = 'https://api.football-data.org/v2';

// option pada fetch
const headers = {
  'X-Auth-Token': '8e4451c2e3714fb095f3762553f7578a',
};

// ganti http dengan https pada url
const safeUrl = url => url.replace(/^http:\/\//i, 'https://');

// setting untuk GET request
const getRequest = async (url) => {
  url = safeUrl(url);
  
  if ('caches' in window) {
    // load data dari cache
    const response = await caches.match(url);
    if (response) {
      
      // jika user online, maka cek data server lalu bandingkan
      if (navigator.onLine) {
        const serverResponse = await fetch(url, { headers });
        const serverData = await serverResponse.clone().json();
        const cacheData = await response.clone().json();
        
        // jika data tidak sama maka gunakan data dari server
        if (JSON.stringify(serverData) != JSON.stringify(cacheData)){
          console.log(`[Service Worker]: update from server ${url}`);
          return serverResponse.json();
        }
      }

      console.log(`[Service Worker]: load cache ${url}`);
      return response.json();
    }
  }

  // load data dari server
  const response = await fetch(url, { headers });
  console.log(`[Service Worker]: load server ${url}`);
  return response.json();
}

// get klasemen liga 
const getKlasemen = async () => getRequest(`${BASE_URL}/competitions/PL/standings`);

// get single team
const getTeam = async (teamId) => getRequest(`${BASE_URL}/teams/${teamId}`);

// get match per team
const getTeamMatches = async (teamId) => getRequest(`${BASE_URL}/teams/${teamId}/matches`);

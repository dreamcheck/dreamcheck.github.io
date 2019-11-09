const errorPage = ({ title, text, imgPath}) => `
  <div class="network-error">
    <h4 class="center-align">${title}</h4>
    <br>
    <img class="responsive-img" src="${imgPath}" alt="error"/>
    <br>
    <p class="grey-text darken-4 center-align">${text}<p>
  </div>`; 

// ketika user offline
const offlinePage = () => errorPage({
  title: 'Anda sedang offline',
  text: 'Pastikan anda terhubung internet lalu refresh halaman',
  imgPath: '/assets/img/img/undraw_warning_cyit.svg',
});

// ketika server error
const serverErrorPage = () => errorPage({
  title: 'Server gangguan',
  text: 'Mohon maaf atas kesalahan ini, silahkan coba akses halaman ini nanti',
  imgPath: '/assets/img/img/undraw_server_down_s4lk.svg',
});

// NB: style pada component ini adalah file: _error.css
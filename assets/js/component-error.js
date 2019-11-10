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
  title: `You're offline`,
  text: 'Ensure you connected to internet, then refresh the page',
  imgPath: '/assets/img/img/undraw_warning_cyit.svg',
});

// ketika server error
const serverErrorPage = () => errorPage({
  title: 'Server Error',
  text: 'Sorry for this error, please try again later',
  imgPath: '/assets/img/img/undraw_server_down_s4lk.svg',
});

// NB: style pada component ini adalah file: _error.css
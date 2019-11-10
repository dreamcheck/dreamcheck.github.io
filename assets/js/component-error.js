const errorPage = ({ title, text, imgPath, additionalHTML = ''}) => `
  <div class="network-error">
    <h4 class="center-align">${title}</h4>
    <br>
    <img class="responsive-img" src="${imgPath}" alt="error"/>
    <br>
    <span class="grey-text darken-4 center-align">${text}<span><br>
    ${additionalHTML 
    ||`<br>
      <button 
        onclick="window.history.back()" 
        class="blue lighten-2 z-depth-0 waves-effect waves-light btn"
        >
        or back to previous page
      </button>`
    }
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

// ketika user belum memiliki 'my-team' nya
const userDontHaveTeam = () => errorPage({
  title: 'No Team',
  imgPath: '/assets/img/img/undraw_Choose_bwbs.svg',
  text: `You're not choose your team yet, please choose one in standing page`,
  additionalHTML: `
    <br>
    <a href="/" class="blue lighten-2 z-depth-0 waves-effect waves-light btn">Go to standing page</a>`,
});

// NB: style pada component ini adalah file: _error.css
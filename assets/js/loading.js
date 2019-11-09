const loading = (isLoading = true) => {
  document.querySelector('#loading').style.display =  (isLoading ? 'flex' : 'none');
};
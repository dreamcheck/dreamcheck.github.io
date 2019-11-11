const loading = (isLoading = true) => {
  try {
    const loadingComponent = document.querySelector('#loading');
    if (loadingComponent)
      loadingComponent.style.display =  (isLoading ? 'flex' : 'none');
  } catch (error) {
    console.error(`[Loading]: ${error}`);
  }
};
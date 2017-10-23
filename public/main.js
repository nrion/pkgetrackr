window.onload = () => {
  const bodyContent = document.getElementById('bodyContent');

  // links
  const homeViewLink = document.getElementById('homeViewLink');
  const customerRegistrationViewLink = document.getElementById('customerRegistrationViewLink');
  const packageRegistrationViewLink = document.getElementById('packageRegistrationViewLink');
  const allCustomersViewLink = document.getElementById('allCustomersViewLink');
  const customerSearchViewLink = document.getElementById('customerSearchViewLink');

  // templates
  const homeView = document.getElementById('homeView');
  const customerRegistrationView = document.getElementById('customerRegistrationView');
  const packageRegistrationView = document.getElementById('packageRegistrationView');

  function setContentView(view) {
      bodyContent.innerHTML = view.innerHTML;
  }

  function prepairLinkForSwitchingView(link, view) {
    link.onclick = (event) => {
      event.preventDefault();
      setContentView(view);
    }
  }

  setContentView(packageRegistrationView);
  prepairLinkForSwitchingView(customerRegistrationViewLink, customerRegistrationView);
  prepairLinkForSwitchingView(homeViewLink, homeView);

  doAjax(`/getPackages/59e649e8110f0b163a701e8d`, (packages) => {
    const addedPackagesContainer = document.getElementById('addedPackagesContainer');
    addedPackagesContainer.innerHTML = '';

    for (const package of packages) {
      addedPackagesContainer.innerHTML += `
        <div><i class="fa fa-archive" aria-hidden="true"></i> package id: ${package._id}</div>
      `
    } 
  });
}
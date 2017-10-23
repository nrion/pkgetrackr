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

  setContentView(homeView);
  prepairLinkForSwitchingView(customerRegistrationViewLink, customerRegistrationView);
  prepairLinkForSwitchingView(homeViewLink, homeView);
}
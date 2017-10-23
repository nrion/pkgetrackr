window.onload = () => {
  const bodyContent = document.getElementById('bodyContent');

  // links
  const homeViewLink = document.getElementById('homeViewLink');
  const customerRegistrationViewLink = document.getElementById('customerRegistrationViewLink');
  const packageRegistrationViewLink = document.getElementById('packageRegistrationViewLink');
  const allCustomersViewLink = document.getElementById('allCustomersViewLink');
  const customerSearchViewLink = document.getElementById('customerSearchViewLink');

  // templates
  const customerRegistrationView = document.getElementById('customerRegistrationView');

  function setContentView(view) {
      bodyContent.innerHTML = view.innerHTML;
  }

  function prepairLinkForSwitchingView(link, view) {
    link.onclick = (event) => {
      event.preventDefault();
      setContentView(view);
    }
  }

  setContentView(customerRegistrationView);
  prepairLinkForSwitchingView(customerRegistrationViewLink, customerRegistrationView);
}
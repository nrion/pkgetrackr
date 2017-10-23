window.onload = () => {
  const bodyContent = document.getElementById('bodyContent');

  // links
  const homeViewLink = document.getElementById('homeViewLink');
  const customerRegistrationViewLink = document.getElementById('customerRegistrationViewLink');
  const packageRegistrationViewLink = document.getElementById('packageRegistrationViewLink');
  const allCustomersViewLink = document.getElementById('allCustomersViewLink');
  const customerSearchViewLink = document.getElementById('customerSearchViewLink');

  // templates
  const adminLoginView = document.getElementById('adminLoginView');
  const homeView = document.getElementById('homeView');
  const customerRegistrationView = document.getElementById('customerRegistrationView');
  const packageRegistrationView = document.getElementById('packageRegistrationView');
  const allCustomersView = document.getElementById('allCustomersView');

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

  doAjax(`/getPackages/59e649e8110f0b163a701e8d`, (packages) => {
    const addedPackagesContainer = document.getElementById('addedPackagesContainer');
    addedPackagesContainer.innerHTML = '';

    for (const package of packages) {
      addedPackagesContainer.innerHTML += `
        <div><i class="fa fa-archive" aria-hidden="true"></i> package id: ${package._id}</div>
      `
    } 
  });

  document.getElementById('allCustomersViewLink').onclick = (event) => {
    event.preventDefault();
    setContentView(allCustomersView);

    doAjax(`/getCustomers`, (customers) => {
      const customersContainer = document.getElementById('customersContainer');
      customersContainer.innerHTML = '';

      for (const customer of customers) {
        customersContainer.innerHTML += `
          <div><i class="fa fa-user-o" aria-hidden="true"></i> ${customer.name}</div>
          <span style="text-indent :1.5em;">
            <i class="fa fa-envelope-o" aria-hidden="true"></i> ${customer.email}
            <i class="fa fa-mobile" aria-hidden="true"></i> ${customer.mobileNumber}
            <i class="fa fa-address-book-o" aria-hidden="true"></i> ${customer.address}
          </span>
          <hr>
        `;
      }
    })
  }
}
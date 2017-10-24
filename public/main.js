window.onload = () => {
  const bodyContent = document.getElementById('bodyContent');

  // links
  const homeViewLink = document.getElementById('homeViewLink');
  const customerRegistrationViewLink = document.getElementById('customerRegistrationViewLink');
  const packageRegistrationViewLink = document.getElementById('packageRegistrationViewLink');
  const allCustomersViewLink = document.getElementById('allCustomersViewLink');
  const customerSearchViewLink = document.getElementById('customerSearchViewLink');
  const packageTrackViewLink = document.getElementById('packageTrackViewLink');

  // templates
  const adminLoginView = document.getElementById('adminLoginView');
  const homeView = document.getElementById('homeView');
  const customerRegistrationView = document.getElementById('customerRegistrationView');
  const packageRegistrationView = document.getElementById('packageRegistrationView');
  const allCustomersView = document.getElementById('allCustomersView');
  const customerSearchView = document.getElementById('customerSearchView');
  const packageTrackView = document.getElementById('packageTrackView');

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
  // prepairLinkForSwitchingView(packageTrackViewLink, packageTrackView);

  doAjax(`/getPackages/59e649e8110f0b163a701e8d`, (packages) => {
    const addedPackagesContainer = document.getElementById('addedPackagesContainer');
    addedPackagesContainer.innerHTML = '';

    for (const package of packages) {
      addedPackagesContainer.innerHTML += `
        <div><i class="fa fa-archive" aria-hidden="true"></i> package id: ${package._id}</div>
      `
    } 
  });

  document.getElementById('customerSearchViewLink').onclick = (event) => {
    event.preventDefault();
    setContentView(customerSearchView);
    
    const findCustomerInput = document.getElementById('findCustomerInput');
    
    findCustomerInput.onkeyup = () => {
      const url = '/findCustomer/' + encodeURIComponent(findCustomerInput.value); 

      console.log(url)

      doAjax(url, (customers) => {
        const findCustomersContainer = document.getElementById('findCustomersContainer'); 
        findCustomersContainer.innerHTML = '';

        for (const customer of customers) {
          findCustomersContainer.innerHTML += `
            <div><h5><i class="fa fa-user-o" aria-hidden="true"></i> <strong>${customer.name}</strong></h5></div>
            <div class="row">
              <div class="col-lg-3"><i class="fa fa-envelope-o" aria-hidden="true"></i> ${customer.email}</div>
              <div class="col-md-2"><i class="fa fa-mobile" aria-hidden="true"></i> ${customer.mobileNumber}</div>
              <div class="col-md-auto"><i class="fa fa-address-book-o" aria-hidden="true"></i> ${customer.address}</div>
            </div>
            <hr>
          `;
        }
      })
    }
  }
  
  document.getElementById('packageTrackViewLink').onclick = (event) => {
    event.preventDefault();
    setContentView(packageTrackView);
    
    const findPackageInput = document.getElementById('findPackageInput');
    findPackageInput.onkeyup = () => {
      const url = '/findPackage/' + encodeURIComponent(findPackageInput.value); 

      doAjax(url, (packages) => {
        const packagesContainer = document.getElementById('packagesContainer'); 
        packagesContainer.innerHTML = '';

        for (const package of packages) {
          packagesContainer.innerHTML += `
            <div><h5>package id: <i class="fa fa-archive" aria-hidden="true"></i> <strong>${package._id}</strong></h5></div>
            <!-- owner desc here -->
            <div><i class="fa fa-globe" aria-hidden="true"></i> ${package.origin}</div>
            <div><i class="fa fa-plane" aria-hidden="true"></i> ${package.destination}</div>
            <div><i class="fa fa-map-signs" aria-hidden="true"></i> ${package.routes}</div>
            <div><i class="fa fa-map-marker" aria-hidden="true"></i> ${package.currentLocation}</div>
            <div><i class="fa fa-spinner" aria-hidden="true"></i> ${package.status}</div>
            <div><i class="fa fa-shopping-cart" aria-hidden="true"></i> ${package.paymode}</div>
            <div><i class="fa fa-balance-scale aria-hidden="true"></i> ${package.size}</div>
            <div><i class="fa fa-money" aria-hidden="true"></i> P ${package.price}</div>
            <div><i class="fa fa-calendar" aria-hidden="true"></i>${package.transactionDate}</div>
            <hr>
          `;
        }
      })
    }
  }

  document.getElementById('allCustomersViewLink').onclick = (event) => {
    event.preventDefault();
    setContentView(allCustomersView);

    doAjax(`/getCustomers`, (customers) => {
      const customersContainer = document.getElementById('customersContainer');
      customersContainer.innerHTML = '';

      for (const customer of customers) {
        customersContainer.innerHTML += `
          <div><h5><i class="fa fa-user-o" aria-hidden="true"></i> <strong>${customer.name}</strong></h5></div>
          <div class="row">
            <div class="col-lg-3"><i class="fa fa-envelope-o" aria-hidden="true"></i> ${customer.email}</div>
            <div class="col-md-2"><i class="fa fa-mobile" aria-hidden="true"></i> ${customer.mobileNumber}</div>
            <div class="col-md-auto"><i class="fa fa-address-book-o" aria-hidden="true"></i> ${customer.address}</div>
          </div>
          <hr>
        `;
      }
    })
  }
}

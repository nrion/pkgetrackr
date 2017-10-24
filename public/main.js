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

  function prepairLinkForSwitchingView(link, view, command) { // command is a function
    link.onclick = (event) => {
      event.preventDefault();
      setContentView(view);

      command()
    }
  }
 
  setContentView(packageRegistrationView);
  
  prepairLinkForSwitchingView(customerRegistrationViewLink, customerRegistrationView, () => {
    console.log('switched to customer registration view')
  });

  prepairLinkForSwitchingView(homeViewLink, homeView, () => {
    console.log('switched to home view');
  });
  
  prepairLinkForSwitchingView(packageTrackViewLink, packageTrackView, () => {
    console.log('switched to package track view');

    const findPackageInput = document.getElementById('findPackageInput');

    findPackageInput.onkeyup = () => {
    doAjax(`/findPackage/${encodeURIComponent(findPackageInput.value)}`, (package) => {
        const packageContainer = document.getElementById('packageContainer'); 

        packageContainer.innerHTML = '';
        packageContainer.innerHTML += `
          <div><h5>package id: <i class="fa fa-archive" aria-hidden="true"></i> <strong>${package._id}</strong></h5></div>
          <!-- owner desc here -->
          <div class="row">
            <div class="col-sm-2"><i class="fa fa-globe" aria-hidden="true"></i> origin</div>
            <div class="col"><b>${package.origin}</b></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><i class="fa fa-plane" aria-hidden="true"></i> destination</div>
            <div class="col"><b>${package.destination}</b></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><i class="fa fa-map-signs" aria-hidden="true"></i> areas to pass</div>
            <div class="col"><b>${package.areasToPass}</b></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><i class="fa fa-map-marker" aria-hidden="true"></i> current location</div>
            <div class="col"><b>${package.currentLocation}</b></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><i class="fa fa-spinner" aria-hidden="true"></i> status</div>
            <div class="col"><b>${package.status}</b></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><i class="fa fa-shopping-cart" aria-hidden="true"></i> paymode</div>
            <div class="col"><b>${package.paymode}</b></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><i class="fa fa-balance-scale aria-hidden="true"></i> size</div>
            <div class="col"><b>${package.boxSize}</b></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><i class="fa fa-money" aria-hidden="true"></i> price</div>
            <div class="col"><b>P ${package.price}</b></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><i class="fa fa-calendar" aria-hidden="true"></i> transaction date</div>
            <div class="col"><b>${package.transactionDate}</b></div>
          </div>
          <hr>
        `;
      })
    }
  });

  prepairLinkForSwitchingView(allCustomersViewLink, allCustomersView, () => {
    console.log('switched to all customers view');
    
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
  });
  
  prepairLinkForSwitchingView(customerSearchViewLink, customerSearchView, () => {
    console.log('switched to customer search view view');
    
    findCustomerInput.onkeyup = () => {
      const findCustomerInput = document.getElementById('findCustomerInput');

      doAjax(`/findCustomer/${encodeURIComponent(findCustomerInput.value)}`, (customers) => {
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
  });

  // for package registration view
  if (bodyContent.innerHTML == packageRegistrationView.innerHTML) {
    const originInput = document.getElementById('originInput');
    const destinationInput = document.getElementById('destinationInput');
    
    doAjax('/getCoveredAreas', (areas) => {
      originInput.innerHTML = '';
      destinationInput.innerHTML = '';

      for (const area of areas) {
        const optionTag = `<option value="${area.address}">${area.address}</option>`;

        originInput.innerHTML += optionTag; 
        destinationInput.innerHTML += optionTag; 
      }
    })

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
}

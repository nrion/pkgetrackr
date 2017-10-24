window.onload = () => {
  const bodyContent = document.getElementById('bodyContent');

  // links
  const homeViewLink = document.getElementById('homeViewLink');
  const customersViewLink = document.getElementById('customersViewLink');
  const packagesViewLink = document.getElementById('packagesViewLink');

  // templates
  const adminLoginView = document.getElementById('adminLoginView');
  const homeView = document.getElementById('homeView');
  const customersView = document.getElementById('customersView');
  const packagesView = document.getElementById('packagesView');

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
 
  setContentView(homeView);

  prepairLinkForSwitchingView(homeViewLink, homeView, () => {
    console.log('switched to home view');
  });

  prepairLinkForSwitchingView(customersViewLink, customersView, () => {
    console.log('switched to customers view');

    // getting all registered customers
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

    // finding a certain customer
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

  prepairLinkForSwitchingView(packagesViewLink, packagesView, () => {
    // for package registration from
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

    // for finding packages
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
  })
}

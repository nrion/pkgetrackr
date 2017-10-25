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

    function loopCustomers(customers, container) {
      for (const customer of customers) {
        container.innerHTML += `
          <div class="row">
            <div class="col-sm-8"><h5><i class="fa fa-user-o" aria-hidden="true"></i> <strong>${customer.name}</strong></h5></div>
            <div class="col-md-auto ml-auto mb-1">
              <button type="button" class="btn btn-light btn-sm">view packages</button>
              <button type="button" class="btn btn-light btn-sm">edit</button>
              <button type="button" class="btn btn-light btn-sm">delete</button>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3"><i class="fa fa-envelope-o" aria-hidden="true"></i> ${customer.email}</div>
            <div class="col-lg-2"><i class="fa fa-mobile" aria-hidden="true"></i> ${customer.mobileNumber}</div>
            <div class="col-md-auto"><i class="fa fa-address-book-o" aria-hidden="true"></i> ${customer.address}</div>
          </div>
          <hr>
        `;
      }
    }

    // getting all registered customers
    doAjax(`/getCustomers`, (customers) => {
      const customersContainer = document.getElementById('customersContainer');
      customersContainer.innerHTML = '';

      loopCustomers(customers, customersContainer); 
    }, 'GET')

    // finding a certain customer
    findCustomerInput.onkeyup = () => {
      const findCustomerInput = document.getElementById('findCustomerInput');

      doAjax(`/findCustomer/${encodeURIComponent(findCustomerInput.value)}`, (customers) => {
        const findCustomersContainer = document.getElementById('findCustomersContainer'); 
        findCustomersContainer.innerHTML = '';

        loopCustomers(customers, findCustomersContainer)
      }, 'GET')
    }
  });

  prepairLinkForSwitchingView(packagesViewLink, packagesView, () => {
    // for package registration from
    const originInput = document.getElementById('originInput');
    const destinationInput = document.getElementById('destinationInput');
    const distanceInKmInput = document.getElementById('distanceInKmInput');
    const currentLocationInput = document.getElementById('currentLocationInput');
    const statusInput = document.getElementById('statusInput');
    const paymodeInput = document.getElementById('paymodeInput');
    const boxSizeInput = document.getElementById('boxSizeInput');

    doAjax('/getCoveredAreas', (areas) => {
      originInput.innerHTML = '';
      destinationInput.innerHTML = '';

      for (const area of areas) {
        const optionTag = `<option value="${area.address}">${area.address}</option>`;

        originInput.innerHTML += optionTag; 
        destinationInput.innerHTML += optionTag; 
      }
    }, 'GET')

      // for routes
      const areasToPassInputs = document.getElementById('areasToPassInputs');
      const addAreaBtn = document.getElementById('addAreaBtn');
      const removeAreaBtn = document.getElementById('removeAreaBtn');
      
      let areaAddedCount = 0; 

      addAreaBtn.onclick = () => {
        areaAddedCount++;

        areasToPassInputs.innerHTML += `
          <div class="input-group mt-1" id="areaInputGroup${areaAddedCount}">
            <span class="input-group-addon" id="basic-addon3">${areaAddedCount}</span>
            <input type="text" class="form-control" id="areaToPassInput${areaAddedCount}" name="areaToPass" placeholder="where should it pass?">
          </div>
        `;
      }

      // removing a route input
      removeAreaBtn.onclick = () => {
        if (areaAddedCount !== 0) {
          $(`#areaInputGroup${areaAddedCount}`).remove();
          areaAddedCount--; 
        }
        else {
          alert('no more area to remove!');
        }
      }

    document.getElementById('addPackageButton').onclick = () => {
      const origin = originInput.value; 
      const destination = destinationInput.value; 
      const distanceInKm = distanceInKmInput.value; 
      const currentLocation = currentLocationInput.value; 
      const status = statusInput.value; 
      const paymode = paymodeInput.value; 
      const boxSize = boxSizeInput.value; 
      const areasToPassArray = [];

      if (areaAddedCount !== 0) {
        for (let i = 1; i <= areaAddedCount; i++) {
          const areaToPassInput = document.getElementById(`areaToPassInput${i}`);
          areasToPassArray.push(areaToPassInput.value);
        }
      }

      console.log(areasToPassArray)

      const zomeURL = `/createPackage/${encodeURIComponent('59e649e8110f0b163a701e8d')}/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}/${encodeURIComponent(areasToPassArray)}/${encodeURIComponent(distanceInKm)}/${encodeURIComponent(currentLocation)}/${encodeURIComponent(status)}/${encodeURIComponent(paymode)}/${encodeURIComponent(boxSize)}`;
      console.log(zomeURL)

      doAjax(zomeURL, (result) => { alert(`attempted to add`) }, 'POST');
    }

    doAjax(`/getPackages/${encodeURIComponent('59e649e8110f0b163a701e8d')}`, (packages) => {
      const addedPackagesContainer = document.getElementById('addedPackagesContainer');
      addedPackagesContainer.innerHTML = '';

      for (const package of packages) {
        addedPackagesContainer.innerHTML += `
          <div><i class="fa fa-archive" aria-hidden="true"></i> package id: ${package._id}</div>
        `
      } 
    }, 'GET');
 
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
      }, 'GET')
    }
  })
}

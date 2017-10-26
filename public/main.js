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
          <div class="card border-dark mb-3" style="max-width: 40rem;">
            <div class="card-body text-dark">
              <h5><i class="fa fa-user-o" aria-hidden="true"></i> <strong>${customer.name}</strong></h5>
              <div><i class="fa fa-envelope-o" aria-hidden="true"></i> ${customer.email}</div>
              <div><i class="fa fa-mobile" aria-hidden="true"></i> ${customer.mobileNumber}</div>
              <div><i class="fa fa-address-book-o" aria-hidden="true"></i> ${customer.address}</div>
            </div>
            <div class="card-footer text-right">
              <button type="button" class="btn btn-dark btn-sm">packages</button>
              <button type="button" class="btn btn-dark btn-sm">edit</button>
              <button type="button" class="btn btn-dark btn-sm delButtons" value="${customer._id}">delete</button>
            </div>
          </div>
        `;  
      }
    }

    // getting all registered customers
    doAjax(`/getCustomers`, (customers) => {
      const customersContainer = document.getElementById('customersContainer');
      customersContainer.innerHTML = '';

      loopCustomers(customers, customersContainer); 
      prepareDelButton()
    }, 'GET')

    // finding a certain customer
    findCustomerInput.onkeyup = () => {
      const findCustomerInput = document.getElementById('findCustomerInput');

      doAjax(`/findCustomer/${encodeURIComponent(findCustomerInput.value)}`, (customers) => {
        const findCustomersContainer = document.getElementById('findCustomersContainer'); 
        findCustomersContainer.innerHTML = '';

        loopCustomers(customers, findCustomersContainer)
        prepareDelButton()
      }, 'GET')
    }

    function prepareDelButton() {
      const deleteButtons = document.getElementsByClassName('delButtons'); 

      if (deleteButtons.length > 0) {
        for (let i = 0; i < deleteButtons.length; i++) {
          console.log('here here')
          deleteButtons[i].onclick = () => {
            doAjax(`/removePackagesOfCustomer/${encodeURIComponent(deleteButtons[i].value)}`, (result) => {
              alert('from packages of customer')
            }, 'GET')

            doAjax(`/removeCustomer/${encodeURIComponent(deleteButtons[i].value)}`, (result) => {
              alert('delete successful')
            }, 'GET')
          }
        }
      }
    }
  });

  prepairLinkForSwitchingView(packagesViewLink, packagesView, () => {
    // for creating packages - enumerating covered areas
    const customerInput = document.getElementById('customerInput');
    const originInput = document.getElementById('originInput');
    const destinationInput = document.getElementById('destinationInput');

    customerInput.oninput = () => {
      getPackages()
    }

    doAjax('/getCustomers', (customers) => {
      customerInput.innerHTML = '';

      for (const customer of customers) {
        customerInput.innerHTML += `<option value="${customer._id}">${customer.name}</option>`; 
      }
    }, 'GET')

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

    // inserting a package into the db
    document.getElementById('addPackageButton').onclick = () => {
      const customerId = customerInput.value; 
      const origin = originInput.value; 
      const destination = destinationInput.value; 
      const distanceInKm = document.getElementById('distanceInKmInput').value;
      const currentLocation = document.getElementById('currentLocationInput').value; 
      const status = document.getElementById('statusInput').value; 
      const paymode = document.getElementById('paymodeInput').value; 
      const boxSize = document.getElementById('boxSizeInput').value; 
      const areasToPassArray = [];

      if (areaAddedCount !== 0) {
        for (let i = 1; i <= areaAddedCount; i++) {
          const areaToPassInput = document.getElementById(`areaToPassInput${i}`);
          areasToPassArray.push(areaToPassInput.value);
        }
      }

      const zomeURL = `/createPackage/${encodeURIComponent(customerId)}/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}/${encodeURIComponent(areasToPassArray)}/${encodeURIComponent(distanceInKm)}/${encodeURIComponent(currentLocation)}/${encodeURIComponent(status)}/${encodeURIComponent(paymode)}/${encodeURIComponent(boxSize)}`;
      doAjax(zomeURL, (result) => { alert(`attempted to add`) }, 'POST');
    }

    // for package registration form - enumerating packages
    function getPackages() {
        doAjax(`/getPackages/${encodeURIComponent(customerInput.value)}`, (packages) => {
          const addedPackagesContainer = document.getElementById('addedPackagesContainer');
          addedPackagesContainer.innerHTML = '';

          for (const package of packages) {
            addedPackagesContainer.innerHTML += `
              <div><i class="fa fa-archive" aria-hidden="true"></i> package id: ${package._id}</div>
            `
          } 
        }, 'GET');
    }

    function displayPackages(whichObject, whichContainer) {
      whichContainer.innerHTML = '';

      for (const package of whichObject) {
        let areaList = '';

        for (const area of package.areasToPass) {
          areaList += `
            <li id="areaList" class="list-group-item"><i class="fa fa-hand-o-right" aria-hidden="true"></i> ${area}</li>
          `;package
        }

        whichContainer.innerHTML += `
          <div class="card border-dark mb-3">
            <div class="card-body text-dark">
              <div><h5>package id: <i class="fa fa-archive" aria-hidden="true"></i> <strong>${package._id}</strong></h5></div>
              <ul class="list-group">
                <li id="activeArea" class="list-group-item list-group-item-action list-group-item-dark" >description</li>
                <li class="list-group-item">
                  ${displayAttribute('globe', 'origin', `${package.origin}`)}
                  ${displayAttribute('plane', 'destination', `${package.destination}`)}
                  ${displayAttribute('map-marker', 'current', `${package.currentLocation}`)}
                  ${displayAttribute('spinner', 'status', `${package.status}`)}
                  ${displayAttribute('shopping-cart', 'paymode', `${package.paymode}`)}
                  ${displayAttribute('balance-scale', 'size', `${package.boxSize}`)}
                  ${displayAttribute('money', 'price', `&#8369 ${package.price}`)}
                </li>
                <li id="activeArea" class="list-group-item list-group-item-action list-group-item-dark"><i class="fa fa-map-signs" aria-hidden="true"></i> areas to pass</li>
                ${areaList}
                <li class="list-group-item">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  transaction date
                  <br> ${package.transactionDate}
                </li>
              </ul>
            </div>
            <div class="card-footer text-right">
              <button type="button" class="btn btn-dark btn-sm">packages</button>
              <button type="button" class="btn btn-dark btn-sm">edit</button>
              <button toriginype="button" value="${package._id}" class="btn btn-dark btn-sm removePackageButtons">delete</button>
            </div>
          </div>
        `;  
      }
    }

    // displaying all packages
    doAjax(`/getAllPackages`, (packages) => {
      const packagesContainer = document.getElementById('allPackagesContainer');

      displayPackages(packages, packagesContainer);
      armPkgeDelButton()
    }, 'GET')
 
    // for finding packages
    const findPackageInput = document.getElementById('findPackageInput');

    function displayAttribute(glyphicon, attributeName, attribute) {
      return `
        <div class="row">
          <div class="col-6"><i class="fa fa-${glyphicon}" aria-hidden="true"></i> ${attributeName}</div>
          <div class="col-auto"><b>${attribute}</b></div>
        </div>`
    }

    findPackageInput.onkeyup = () => {
    doAjax(`/findPackage/${encodeURIComponent(findPackageInput.value)}`, (packagesFound) => {
        const packagesFoundContainer = document.getElementById('packageContainer'); 

        displayPackages(packagesFound, packagesFoundContainer);
        armPkgeDelButton()
      }, 'GET')
    }

    function armPkgeDelButton() {
      const deleteButtons = document.getElementsByClassName('removePackageButtons'); 

      if (deleteButtons.length > 0) {
        for (let i = 0; i < deleteButtons.length; i++) {
          deleteButtons[i].onclick = () => {
            doAjax(`/removePackage/${encodeURIComponent(deleteButtons[i].value)}`, (result) => {
              alert('delete successful')
            }, 'GET')
          }
        }
      }
    }
  })
}

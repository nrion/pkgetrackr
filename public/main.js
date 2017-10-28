window.onload = () => {
  const bodyContent = document.getElementById('bodyContent');

  // links
  const homeViewLink = document.getElementById('homeViewLink');
  const registrationViewLink = document.getElementById('registrationViewLink');
  const databaseViewLink = document.getElementById('databaseViewLink');

  // templates
  const adminLoginView = document.getElementById('adminLoginView');
  const homeView = document.getElementById('homeView');
  const registrationView = document.getElementById('registrationView');
  const databaseView = document.getElementById('databaseView');

  function setContentView(view) {
    bodyContent.innerHTML = view.innerHTML;
  }

  function prepairLinkForSwitchingView(link, view, command) { // command is a function
    link.onclick = (event) => {
      event.preventDefault();
      setContentView(view);

      command();
    }
  }

  function simulatePageRefresh(viewLink, whichPillId) {
    viewLink.click();
    $(`#myTab a[href="${whichPillId}"]`).tab('show')
  }
 
  setContentView(homeView);

  prepairLinkForSwitchingView(homeViewLink, homeView, () => {
    console.log('switched to home view');
  });

  prepairLinkForSwitchingView(registrationViewLink, registrationView, () => {
    console.log('switched to registration view');

    /* for customer registration */
    // inserting customer into db
    document.getElementById('registerCustomerBtn').onclick = (event) => {
      event.preventDefault()
      const name = document.getElementById('nameInput').value;
      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;
      const mobileNumber = document.getElementById('mobileNumberInput').value;
      const address = document.getElementById('addressInput').value;
  
      const createCustomerUrl = `/createCustomer/${encodeURIComponent(name)}/${encodeURIComponent(email)}/${encodeURIComponent(password)}/${encodeURIComponent(mobileNumber)}/${encodeURIComponent(address)}`;
      doAjax(createCustomerUrl, (result) => { 
        alert(`ADDED SUCCESSFULY!`); 
        simulatePageRefresh(registrationViewLink, '#customerRegistration') 
      }, 'POST');
    }

    /* for package registration */
    const customerInput = document.getElementById('customerInput');
    const originInput = document.getElementById('originInput');
    const destinationInput = document.getElementById('destinationInput');
    
    // for customers dropdown
    doAjax('/getCustomers', (customers) => {
      customerInput.innerHTML = '';

      for (const customer of customers) {
        customerInput.innerHTML += `<option value="${customer._id}">${customer.name}</option>`; 
      }
    }, 'GET')

    customerInput.oninput = () => {
      doAjax(`/getPackagesOfCustomer/${encodeURIComponent(customerInput.value)}`, (packages) => {
        const addedPackagesContainer = document.getElementById('addedPackagesContainer');
        addedPackagesContainer.innerHTML = '';

        for (const package of packages) {
          console.log(typeof package)
          addedPackagesContainer.innerHTML += `
            <div><i class="fa fa-archive" aria-hidden="true"></i> package id: ${package._id}</div>
          `
        } 
      }, 'GET');
    }

    // for origin & destination dropdowns
    doAjax('/getCoveredAreas', (areas) => {
      originInput.innerHTML = '';
      destinationInput.innerHTML = '';

      for (const area of areas) {
        const optionTag = `<option value="${area.address}">${area.address}</option>`;

        originInput.innerHTML += optionTag; 
        destinationInput.innerHTML += optionTag; 
      }
    }, 'GET')
    
    // for adding area input field
    let areaAddedCount = 0; 

    document.getElementById('addAreaBtn').onclick = () => {
      areaAddedCount++;

      document.getElementById('routeInputsContainer').innerHTML += `
        <div class="input-group mt-1" id="areaInputGroup${areaAddedCount}">
          <span class="input-group-addon" id="basic-addon3">${areaAddedCount}</span>
          <input type="text" class="form-control" id="areaToPassInput${areaAddedCount}" name="areaToPass" placeholder="where should it pass?">
        </div>
      `;
    }

    // for removing area input field
    document.getElementById('removeAreaBtn').onclick = () => {
      if (areaAddedCount !== 0) {
        $(`#areaInputGroup${areaAddedCount}`).remove();
        areaAddedCount--; 
      }
      else {
        alert('no more area input to remove!');
      }
    }

    // inserting package into db
    document.getElementById('addPackageButton').onclick = () => {
      const customerId = customerInput.value; 
      const origin = originInput.value; 
      const destination = destinationInput.value; 
      const distanceInKm = document.getElementById('distanceInKmInput').value;
      const currentLocation = document.getElementById('currentLocationInput').value; 
      const status = document.getElementById('statusInput').value; 
      const paymode = document.getElementById('paymodeInput').value; 
      const boxSize = document.getElementById('boxSizeInput').value; 
      const declaredValue = document.getElementById('declaredValueInput').value; 
      const areasToPassArray = [];

      if (areaAddedCount !== 0) {
        for (let i = 1; i <= areaAddedCount; i++) {
          const areaToPassInput = document.getElementById(`areaToPassInput${i}`);
          areasToPassArray.push(areaToPassInput.value);
        }
      }

      const zomeURL = `/createPackage/${encodeURIComponent(customerId)}/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}/${encodeURIComponent(areasToPassArray)}/${encodeURIComponent(distanceInKm)}/${encodeURIComponent(currentLocation)}/${encodeURIComponent(status)}/${encodeURIComponent(paymode)}/${encodeURIComponent(boxSize)}/${encodeURIComponent(declaredValue)}`;
      doAjax(zomeURL, (result) => { 
        alert(`PACKAGE ADDED SUCCESSFULLY!`) 
        simulatePageRefresh(databaseViewLink, '#packageRegistration') 
      }, 'POST');
    }
  });

  prepairLinkForSwitchingView(databaseViewLink, databaseView, () => {
    console.log('switched to customers view');

    function displayButtons(isModal, data, viewButtonName, delButtonName) {
      console.log(delButtonName + ' - ' + data._id)
      if (!isModal) {
        return `<div class="card-footer text-right">
          <button type="button" class="btn btn-dark btn-sm ${viewButtonName[0]}" value="${data._id}">${viewButtonName[1]}</button>
          <button type="button" class="btn btn-dark btn-sm">edit</button>
          <button toriginype="button" class="btn btn-dark btn-sm ${delButtonName}" value="${data._id}">delete</button>
        </div>`
      }
      else {
        return '';
      }
    }

    function loopCustomers(customers, container, isModal) {
      container.innerHTML = '';

      for (const customer of customers) {
        container.innerHTML += `
          <div class="card border-dark mb-3" style="max-width: 40rem;">
            <div class="card-body text-dark">
              <h5><i class="fa fa-user-o" aria-hidden="true"></i> <strong>${customer.name}</strong></h5>
              <div><i class="fa fa-envelope-o" aria-hidden="true"></i> ${customer.email}</div>
              <div><i class="fa fa-mobile" aria-hidden="true"></i> ${customer.mobileNumber}</div>
              <div><i class="fa fa-address-book-o" aria-hidden="true"></i> ${customer.address}</div>
            </div>
            ${displayButtons(isModal, customer, ['packagesButton', 'packages'], 'delCustomerBtn')}
          </div>
        `;  
      }
    }

    function displayAttribute(glyphicon, attributeName, attribute) {
      return `
        <div class="row">
          <div class="col-6"><i class="fa fa-${glyphicon}" aria-hidden="true"></i> ${attributeName}</div>
          <div class="col-auto"><b>${attribute}</b></div>
        </div>`
    }

    function displayPackages(whichObject, whichContainer, isModal) {
      whichContainer.innerHTML = '';

      for (const package of whichObject) {
        let areaList = '';

        for (const area of package.areasToPass) {
          areaList += `
            <li id="areaList" class="list-group-item"><i class="fa fa-map-signs" aria-hidden="true"></i> ${area}</li>
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
                </li>
                <li id="activeArea" class="list-group-item list-group-item-action list-group-item-dark">value</li>
                <li class="list-group-item">
                  ${displayAttribute('money', 'declared', `&#8369 ${package.declaredValue}`)}
                  ${displayAttribute('money', 'price', `&#8369 ${package.price}`)}
                </li>
                <li id="activeArea" class="list-group-item list-group-item-action list-group-item-dark">areas to pass</li>
                ${areaList}
                <li class="list-group-item">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  transaction date
                  <br> ${package.transactionDate}
                </li>
              </ul>
            </div>
            ${displayButtons(isModal, package, ['ownerButton', 'owner'], 'delPackageBtn')}
          </div>
        `;  
      }
    }

    function prepareBtnForClick(whichNavpill, routes, whichButtons, doWhat) { // do what is a function
      const buttons = document.getElementsByClassName(whichButtons); 

      if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].onclick = (event) => {
            event.preventDefault()
            for (const route of routes) {
              console.log(buttons[i].value)
              doAjax(`/${route}/${encodeURIComponent(buttons[i].value)}`, (result) => {
                doWhat(result)
                // console.log(`/${route} successful!`)
              }, 'GET')
            }
            // alert('SUCCESS!')
            console.log(`${routes} operations successful!`);
            simulatePageRefresh(databaseViewLink, whichNavpill)
          }
        }
      }
    }

    // all customers
    doAjax(`/getCustomers`, (customers) => {
      const allCustomersContainer = document.getElementById('allCustomersContainer');
      allCustomersContainer.innerHTML = '';

      loopCustomers(customers, allCustomersContainer); 
      prepareBtnForClick('#allCustomers', ['bulkRemovePackages', 'removeCustomer'], 'delCustomerBtn', () => {
        console.log('customer deleted')
      })
      prepareBtnForClick('#allCustomers', ['getPackagesOfCustomer'], 'packagesButton', (packages) => {
        console.log(`showing owner...`)
        console.log(packages)

        if (packages.length == undefined || packages.length == 0) {
          alert(`This guy ain't got no package!`)
        }
        else {
          displayPackages(packages, packagesModalContent, true);
          $('#packagesModal').modal('show')
        }
      })
    }, 'GET')

    // all packages
    doAjax(`/getAllPackages`, (packages) => {
      const packagesContainer = document.getElementById('allPackagesContainer');

      displayPackages(packages, packagesContainer, false);
      prepareBtnForClick('#allPackages', ['removePackageReference', 'removePackage'], 'delPackageBtn', () => {
        console.log('package deleted')
      })
      prepareBtnForClick('#allPackages', ['getOwnerOfPackage'], 'ownerButton', (owner) => {
        console.log(`showing packages...`)
        console.log(owner)

        loopCustomers(owner, ownerModalContent, true)
        $('#ownerModal').modal('show')
      })
    }, 'GET')

    // find customer
    const findCustomerInput = document.getElementById('findCustomerInput');

    findCustomerInput.onkeyup = () => {
      doAjax(`/findCustomer/${encodeURIComponent(findCustomerInput.value)}`, (customers) => {
        const findCustomerContainer = document.getElementById('findCustomerContainer'); 
        findCustomerContainer.innerHTML = '';

        loopCustomers(customers, findCustomerContainer)
        prepareBtnForClick('#findCustomer', ['bulkRemovePackages', 'removeCustomer'], 'delCustomerBtn', () => {
          console.log('customer deleted')
        })
         prepareBtnForClick('#allCustomers', ['getPackagesOfCustomer'], 'packagesButton', (packages) => {
          console.log(`showing owner...`)
          console.log(packages)

          if (packages.length == undefined || packages.length == 0) {
            alert(`This guy ain't got no package!`)
          }
          else {
            displayPackages(packages, packagesModalContent, true);
            $('#packagesModal').modal('show')
          }
        })
      }, 'GET')
    }

    // for finding packages
    const findPackageInput = document.getElementById('findPackageInput');

    findPackageInput.onkeyup = () => {
      doAjax(`/findPackage/${encodeURIComponent(findPackageInput.value)}`, (packagesFound) => {
        const packagesFoundContainer = document.getElementById('findPackageContainer'); 

        displayPackages(packagesFound, packagesFoundContainer, false);
        prepareBtnForClick('#findPackage', ['removePackageReference', 'removePackage'], 'delPackageBtn', () => {
          console.log('package deleted')
        })
        prepareBtnForClick('#allPackages', ['getOwnerOfPackage'], 'ownerButton', (owner) => {
        console.log(`showing packages...`)
        console.log(owner)

        loopCustomers(owner, ownerModalContent, true)
        $('#ownerModal').modal('show')
      })
      }, 'GET')
    }
  })
}

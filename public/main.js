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

  function upsertCustomer(button, url, viewLink, navpill, performTask) { // display is an array, performTask is a callback
    document.getElementById(button).onclick = (event) => {
      event.preventDefault()
      const name = document.getElementById('nameInput').value;
      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;
      const mobileNumber = document.getElementById('mobileNumberInput').value;
      const address = document.getElementById('addressInput').value;
  
      const upsertUrl = `/${url}/${encodeURIComponent(name)}/${encodeURIComponent(email)}/${encodeURIComponent(password)}/${encodeURIComponent(mobileNumber)}/${encodeURIComponent(address)}`;
      doAjax(upsertUrl, (result) => { 
        performTask(); 
        simulatePageRefresh(viewLink, `#${navpill}`) 
      }, 'POST');
    }
  }

  function upsertPackage(button, url, viewLink, navpill, performTask) {
    document.getElementById(button).onclick = () => {
      const areaInputs = document.getElementsByClassName('areaToPassInput'); 

      const customerId = document.getElementById('customerInput').value; 
      const origin = document.getElementById('originInput').value; 
      const destination = document.getElementById('destinationInput').value; 
      const distanceInKm = document.getElementById('distanceInKmInput').value;
      const currentLocation = document.getElementById('currentLocationInput').value; 
      const status = document.getElementById('statusInput').value; 
      const paymode = document.getElementById('paymodeInput').value; 
      const boxSize = document.getElementById('boxSizeInput').value; 
      const declaredValue = document.getElementById('declaredValueInput').value; 
      const areasToPassArray = [];

      for (const areaInput of areaInputs) {
        areasToPassArray.push(areaInput.value);
      }

      const upsertUrl = `/${url}/${encodeURIComponent(customerId)}/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}/${encodeURIComponent(areasToPassArray)}/${encodeURIComponent(distanceInKm)}/${encodeURIComponent(currentLocation)}/${encodeURIComponent(status)}/${encodeURIComponent(paymode)}/${encodeURIComponent(boxSize)}/${encodeURIComponent(declaredValue)}`;
      doAjax(upsertUrl, (result) => { 
        performTask();
        // alert(`PACKAGE ADDED SUCCESSFULLY!`) 
        simulatePageRefresh(viewLink, `#${navpill}`) 
      }, 'POST');
    }
  }

  // for origin & destination dropdowns
  function fillAreasDropdown() {
    const destinationInput = document.getElementById('destinationInput');
    const originInput = document.getElementById('originInput');
    
    doAjax('/getCoveredAreas', (areas) => {
      originInput.innerHTML = '';
      destinationInput.innerHTML = '';

      for (const area of areas) {
        const optionTag = `<option value="${area.address}">${area.address}</option>`;

        originInput.innerHTML += optionTag; 
        destinationInput.innerHTML += optionTag; 
      }
    }, 'GET')
  }

  // for adding area input field
  function addRouteButton() {
    document.getElementById('addAreaBtn').onclick = () => {
      $(`#routeInputsContainer`).append(`
        <div class="input-group mt-1 areaInputGroup">
          <input type="text" class="form-control areaToPassInput" name="areaToPass" placeholder="where should it pass?">
        </div>
      `);
    }
  }

  // for removing area input field
  function removeRouteButton() {
    document.getElementById('removeAreaBtn').onclick = () => {
      const areas = document.getElementsByClassName('areaInputGroup'); 

      if (areas.length !== 0) {
        $(areas[0]).remove();
      }
      else {
        alert('no more area input to remove!');
      }
    }
  }

  prepairLinkForSwitchingView(registrationViewLink, registrationView, () => {
    console.log('switched to registration view');

    /* for customer registration */
    // inserting customer into db
    upsertCustomer('registerCustomerBtn', 'createCustomer', 
      registrationViewLink, 'customerRegistration', () => {
        alert('CUSTOMER ADDED!')
    })

    /* for package registration */
    const customerInput = document.getElementById('customerInput');
    
    
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

    fillAreasDropdown(); 
    addRouteButton(); 
    removeRouteButton(); 

    // inserting package into db
    upsertPackage('addPackageButton', 'createPackage', 
      registrationViewLink, 'packageRegistration', () => {
        alert('PACKAGE ADDED!')
    })

  });

  prepairLinkForSwitchingView(databaseViewLink, databaseView, () => {
    console.log('switched to customers view');
  
    function displayButtons(data, viewButtonNames, editButtonName, delButtonName) {
      return `
        <div class="card-footer text-right">
          <button type="button" class="btn btn-dark btn-sm ${viewButtonNames[0]}" value="${data._id}">${viewButtonNames[1]}</button>
          <button type="button" class="btn btn-dark btn-sm ${editButtonName}" value="${data._id}">edit</button>
          <button toriginype="button" class="btn btn-dark btn-sm ${delButtonName}" value="${data._id}">delete</button>
        </div>
      `;
    }

    function displayAttribute(glyphicon, attributeName, attribute) {
      return `
        <div class="row">
          <div class="col-6"><i class="fa fa-${glyphicon}" aria-hidden="true"></i> ${attributeName}</div>
          <div class="col-auto"><b>${attribute}</b></div>
        </div>`
    }

    function displayCustomer(datum) {
      return `
        <div class="card border-dark mb-3" style="max-width: 40rem;">
          <div class="card-body text-dark">
            <h5><i class="fa fa-user-o" aria-hidden="true"></i> <strong>${datum.name}</strong></h5>
            <div><i class="fa fa-envelope-o" aria-hidden="true"></i> ${datum.email}</div>
            <div><i class="fa fa-mobile" aria-hidden="true"></i> ${datum.mobileNumber}</div>
            <div><i class="fa fa-address-book-o" aria-hidden="true"></i> ${datum.address}</div>
          </div>
          ${displayButtons(datum, ['packagesButton', 'packages'], 'editCustomerBtn', 'delCustomerBtn')}
        </div>
      `;
    }

    function displayPackage(datum) {
      let areaList = '';

      for (const area of datum.areasToPass) {
        areaList += `
          <li id="areaList" class="list-group-item"><i class="fa fa-map-signs" aria-hidden="true"></i> ${area}</li>
        `;
      }

      return `
        <div class="card border-dark mb-3">
          <div class="card-body text-dark">
            <div><h5>package id: <i class="fa fa-archive" aria-hidden="true"></i> <strong>${datum._id}</strong></h5></div>
            <ul class="list-group">
              <li id="activeArea" class="list-group-item list-group-item-action list-group-item-dark" >description</li>
              <li class="list-group-item">
                ${displayAttribute('globe', 'origin', `${datum.origin}`)}
                ${displayAttribute('plane', 'destination', `${datum.destination}`)}
                ${displayAttribute('map-marker', 'current', `${datum.currentLocation}`)}
                ${displayAttribute('spinner', 'status', `${datum.status}`)}
                ${displayAttribute('shopping-cart', 'paymode', `${datum.paymode}`)}
                ${displayAttribute('balance-scale', 'size', `${datum.boxSize}`)}
              </li>
              <li id="activeArea" class="list-group-item list-group-item-action list-group-item-dark">value</li>
              <li class="list-group-item">
                ${displayAttribute('money', 'declared', `&#8369 ${datum.declaredValue}`)}
                ${displayAttribute('money', 'price', `&#8369 ${datum.price}`)}
              </li>
              <li id="activeArea" class="list-group-item list-group-item-action list-group-item-dark">areas to pass</li>
              ${areaList}
              <li class="list-group-item">
                <i class="fa fa-calendar" aria-hidden="true"></i>
                transaction date
                <br> ${datum.transactionDate}
              </li>
            </ul>
          </div>
          ${displayButtons(datum, ['ownerButton', 'owner'], 'editPackageBtn', 'delPackageBtn')}
        </div>
      `;  
    }

    function loopData(data, container, htmlToDisplay) {
      container.innerHTML = ''

      for (const datum of data) {
        container.innerHTML += `
          ${htmlToDisplay(datum)}
        `;
      }
    } 

    function loopModalData(data, htmlToDisplay) {
      console.log('here you go')
      let htmlToReturn = '';

      for (const datum of data) {
        htmlToReturn += `
          ${htmlToDisplay(datum)}
        `;
      }

      return htmlToReturn;
    }

    function setupModal(title, performTask) {
      const modal = document.getElementById('universalModalContainer'); 

      modal.innerHTML = ''
      modal.innerHTML += `
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ${performTask()}
        </div>
      `;

      $('#universalModal').modal('show')
    }
    
    function prepareBtnForClick(whichNavpill, routes, whichButtons, method, doWhat) { // do what is a function
      const buttons = document.getElementsByClassName(whichButtons); 

      if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].onclick = (event) => {
            event.preventDefault()
            for (const route of routes) {
              console.log(buttons[i].value)
              doAjax(`/${route}/${encodeURIComponent(buttons[i].value)}`, (result) => {
                doWhat(result)
              }, method)
            }
            console.log(`${routes} operations successful!`);
            simulatePageRefresh(databaseViewLink, whichNavpill)
          }
        }
      }
    }

    function fillEditCustomerModal(data) {
      return `
        <div class="form-group">
          <label for="nameInput">name</label>
          <input type="text" class="form-control" id="nameInput" value="${data.name}" name="name" placeholder="full name">
        </div>
        <div class="form-group">
          <label for="emailInput">email</label>
          <input type="email" class="form-control" id="emailInput" value="${data.email}" name="email" placeholder="email">
        </div>
        <div class="form-group">
          <label for="passwordInput">password</label>
          <input type="password" class="form-control" id="passwordInput" value="${data.password}" name="password" placeholder="choose a password">
        </div>
        <div class="form-group">
          <label for="mobileNumberInput">mobile number</label>
          <input type="number" class="form-control" id="mobileNumberInput" value="${data.mobileNumber}" name="mobileNumber" placeholder="mobile number">
        </div>
        <div class="form-group">
          <label for="addressInput">address</label>
          <textarea rows="2" class="form-control" id="addressInput" name="address" placeholder="address">${data.address}</textarea>
        </div>
        <button id="updateCustomerBtn" class="btn btn-outline-dark">save edit</button>
      `;
    }

    function fillEditPackageModal(data) {
      return `
        <div class="form-group">
          <label for="originInput">origin</label>
          <select id="originInput" class="form-control" name="origin">
            <!-- doAjax here -->
          </select>
        </div>
        <div class="form-group">
          <label for="destinationInput">destination</label>
          <select id="destinationInput" class="form-control" name="destination">
            <!-- doAjax here -->
          </select>
        </div>
        <div class="form-group">
          <label>areas to pass</label>
          <button type="button" id="addAreaBtn" class="btn btn-light btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> add</button>
          <button type="button" id="removeAreaBtn" class="btn btn-light btn-sm"><i class="fa fa-minus" aria-hidden="true"></i> remove</button>
          <div id="routeInputsContainer">
            <!-- put something here from js -->
          </div>
        </div> 
        <div class="form-group">
          <label for="distanceInKmInput">distance</label>
          <input value="${data.distanceInKm}" type="number" min="1" max="18" class="form-control" id="distanceInKmInput" name="distanceInKm" placeholder="how far is it? (in km)">
        </div>
        <div class="form-group">
          <label for="currentLocationInput">current location</label>
          <input value="${data.currentLocation}" type="text" class="form-control" id="currentLocationInput" name="currentLocation" placeholder="where is it right now?">
        </div>
        <div class="form-group">
          <label for="declaredValueInput">declared value</label>
          <input value="${data.declaredValue}" type="number" min="1" class="form-control" id="declaredValueInput" name="declaredValue" placeholder="how much is it worth?">
        </div>
        <div class="form-group">
          <label for="statusInput">status</label>
          <select id="statusInput" class="form-control" name="status">
            <option value="pending">pending</option>
            <option value="moving">moving</option>
            <option value="arrived">arrived</option>
          </select>
        </div>
        <div class="form-group">
          <label for="paymodeInput">paymode</label>
          <select id="paymodeInput" class="form-control" name="paymode">
            <option value="prepaid">prepaid</option>
            <option value="freight collect">freight collect</option>
          </select>
        </div>
        <div class="form-group">
          <label for="boxSizeInput">box size</label>
          <select id="boxSizeInput" class="form-control" name="boxSize">
            <option value="extra small">extra small</option>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </div>
        <button id="updatePackageBtn" type="submit" class="btn btn-outline-dark">update package</button>
      `;
    }

    function readyCustomerOperations(customers, whichContainer, whichNavpill) {
      whichContainer.innerHTML = '';
      loopData(customers, whichContainer, displayCustomer); 
      
      // delete button
      prepareBtnForClick(`#${whichNavpill}`, 
        ['bulkRemovePackages', 'removeCustomer'], 'delCustomerBtn', 'POST', () => {
          console.log('customer deleted')
      })

      // edit button
      prepareBtnForClick(`#${whichNavpill}`, 
        ['getCustomerById'], 'editCustomerBtn', 'GET', (customer) => {
          setupModal('edit customer', () => {
            return fillEditCustomerModal(customer[0])
          })
          // put here
          upsertCustomer('updateCustomerBtn', `updateCustomer/${customer[0]._id}`, 
            databaseViewLink, `${whichNavpill}`, () => {
              $('#universalModal').modal('hide')
              alert('CUSTOMER UPDATED!')
          })
      })

      // view packages button
      prepareBtnForClick(`#${whichNavpill}`, 
        ['getPackagesOfCustomer'], 'packagesButton', 'GET', (packages) => {
          console.log(`showing owner...`)

          if (packages.length == undefined || packages.length == 0) {
            alert(`This guy ain't got no package!`)
          }
          else {
            setupModal('packages', () => {
              return loopModalData(packages, displayPackage)
            })
          }
      })
    }

    function readyPackageOperations(packages, whichContainer, whichNavpill) {
      loopData(packages, whichContainer, displayPackage)
      
      // delete button
      prepareBtnForClick(`#${whichNavpill}`, ['removePackageReference', 'removePackage'], 'delPackageBtn', 'POST', () => {
        console.log('package deleted')
      })

      // edit button
      prepareBtnForClick(`#${whichNavpill}`, 
        ['getPackageById'], 'editPackageBtn', 'GET', (package) => {
          setupModal('edit package', () => {
            return fillEditPackageModal(package[0])
          })

          fillAreasDropdown(); 
          addRouteButton(); 
          removeRouteButton(); 

          upsertPackage('updatePackageBtn', `updatePackage/${package[0]._id}`, 
            databaseViewLink, `${whichNavpill}`, () => {
              $('#universalModal').modal('hide')
              alert('PACKAGE UPDATED!')
          })
      })

      // view owner button
      prepareBtnForClick(`#${whichNavpill}`, ['getOwnerOfPackage'], 'ownerButton', 'GET', (owner) => {
        console.log(`showing packages...`)
        console.log(owner)

        setupModal('package owner', () => {
          return displayCustomer(owner[0]);
        })
      })
    }

    // all customers
    doAjax(`/getCustomers`, (customers) => {
      const allCustomersContainer = document.getElementById('allCustomersContainer');

      readyCustomerOperations(customers, allCustomersContainer, 'allCustomers')
    }, 'GET')

    // all packages
    doAjax(`/getAllPackages`, (packages) => {
      const packagesContainer = document.getElementById('allPackagesContainer');

      readyPackageOperations(packages, allPackagesContainer, 'allPackages')
    }, 'GET')

    // find customer
    const findCustomerInput = document.getElementById('findCustomerInput');

    findCustomerInput.onkeyup = () => {
      doAjax(`/findCustomer/${encodeURIComponent(findCustomerInput.value)}`, (customers) => {
        const findCustomerContainer = document.getElementById('findCustomerContainer'); 

        readyCustomerOperations(customers, findCustomerContainer, 'findCustomer')
      }, 'GET')
    }

    // for finding packages
    const findPackageInput = document.getElementById('findPackageInput');

    findPackageInput.onkeyup = () => {
      doAjax(`/findPackage/${encodeURIComponent(findPackageInput.value)}`, (packagesFound) => {
        const packagesFoundContainer = document.getElementById('findPackageContainer'); 

        readyPackageOperations(packagesFound, findPackageContainer, 'findPackage')
      }, 'GET')
    }
  })
}
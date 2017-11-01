function fillAreasDropdown(taskForEdit) {
  const destinationInput = document.getElementById('destinationInput');
  const originInput = document.getElementById('originInput');
  
  doAjax('/getCoveredAreas', 'GET', null, (areas) => {
    originInput.innerHTML = '';
    destinationInput.innerHTML = '';

    for (const area of areas) {
      const optionTag = `
        <option value="${area.address}">${area.address}</option>
      `;

      originInput.innerHTML += optionTag; 
      destinationInput.innerHTML += optionTag; 
    }

    if (taskForEdit) { taskForEdit() }
  })
}


function addRouteTrigger() {
  document.getElementById('addAreaBtn').onclick = () => {
    $(`#routeInputsContainer`).append(`
      <div class="input-group mt-1 areaInputGroup">
        <input type="text" class="form-control areaToPassInput" 
          name="areaToPass" placeholder="where should it pass?">
      </div>
    `);
  }
}

function removeRouteTrigger() {
  document.getElementById('removeAreaBtn').onclick = () => {
    const areas = document.getElementsByClassName('areaInputGroup'); 

    if (areas.length !== 0) {
      $(areas[areas.length - 1]).remove();
    }
    else {
      alert('no more area input to remove!');
    }
  }
}

function getRegistrationViewPkges(customerId) {
  doAjax(`/getPackagesOfCustomer/${customerId}`, 
    'GET', null, (packages) => {
      fillCustomerPackageIds(packages);
    }); 
}

function fillCustomerPackageIds(packages) {
  const addedPkgesContainer = document.getElementById('addedPackagesContainer');
  addedPkgesContainer.innerHTML = '';

  for (const package of packages) {
    addedPkgesContainer.innerHTML += `
      <div><i class="fa fa-archive" aria-hidden="true"></i>   
        package id: ${package._id}</div>
    `
  } 
} 

function getPackageInputs() {
  const areaInputs = document.getElementsByClassName('areaToPassInput'); 
  const areasToPassArray = [];

  for (const areaInput of areaInputs) {
    areasToPassArray.push(areaInput.value);
  }

  const package = {
      origin: document.getElementById('originInput').value,
      destination: document.getElementById('destinationInput').value, 
      distanceInKm: document.getElementById('distanceInKmInput').value,
      currentLocation: document.getElementById('currentLocationInput').value, 
      status: document.getElementById('statusInput').value,
      paymode: document.getElementById('paymodeInput').value, 
      boxSize: document.getElementById('boxSizeInput').value,
      declaredValue: document.getElementById('declaredValueInput').value, 
      areasToPass: areasToPassArray,
  }

  return package; 
}

function insertPackageTrigger() {
  const addPkgeBtn = document.getElementById('addPackageButton'); 

  console.log('i reached insert pacakge')

  addPkgeBtn.onclick = () => {
    console.log('i reached on click')
    const customerId = document.getElementById('customerInput').value; 
    const package = getPackageInputs();

    doAjax(`/createPackage/${customerId}`, 
      'POST', package, () => {
        alert('PACKAGE ADDED SUCCESSFULLY!')

        // const registrationViewLink = document.getElementById('registrationViewLink')
        simulatePageRefresh(registrationViewLink, '#packageRegistration'); 
      })
  }
}

function displayAttribute(glyphicon, attributeName, attribute) {
  return `
    <div class="row">
      <div class="col-6"><i class="fa fa-${glyphicon}" aria-hidden="true"></i> ${attributeName}</div>
      <div class="col-auto"><b>${attribute}</b></div>
    </div>`; 
}

function getPackageCardHtml(package) {
  let areaList = '';

  for (const area of package.areasToPass) {
    areaList += `
      <li id="areaList" class="list-group-item">
        <i class="fa fa-map-signs" aria-hidden="true"></i> ${area}</li>
    `;
  }

  return `
    <div class="card border-dark mb-3">
      <div class="card-body text-dark">
        <div><h5>package id: <i class="fa fa-archive" aria-hidden="true"></i> 
          <strong>${package._id}</strong></h5></div>
        <ul class="list-group">
          <li id="activeArea" class="list-group-item list-group-item-action 
            list-group-item-dark" >description</li>
          <li class="list-group-item">
            ${displayAttribute('globe', 'origin', `${package.origin}`)}
            ${displayAttribute('plane', 'destination', `${package.destination}`)}
            ${displayAttribute('map-marker', 'current', `${package.currentLocation}`)}
            ${displayAttribute('spinner', 'status', `${package.status}`)}
            ${displayAttribute('shopping-cart', 'paymode', `${package.paymode}`)}
            ${displayAttribute('balance-scale', 'size', `${package.boxSize}`)}
          </li>
          <li id="activeArea" class="list-group-item list-group-item-action 
            list-group-item-dark">value</li>
          <li class="list-group-item">
            ${displayAttribute('money', 'declared', `&#8369 ${package.declaredValue}`)}
            ${displayAttribute('money', 'price', `&#8369 ${package.price}`)}
          </li>
          <li id="activeArea" class="list-group-item list-group-item-action 
            list-group-item-dark">areas to pass</li>
          ${areaList}
          <li class="list-group-item">
            <i class="fa fa-calendar" aria-hidden="true"></i>
            transaction date
            <br> ${package.transactionDate}
          </li>
        </ul>
      </div>
      <div class="card-footer text-right">
        <button type="button" class="btn btn-dark btn-sm" value="${package._id}" 
          onclick="getPackageOwner(this)">owner</button>
        <button type="button" class="btn btn-dark btn-sm" value="${package._id}" 
          onclick="editPackage(this)">edit</button>
        <button toriginype="button" class="btn btn-dark btn-sm" value="${package._id}" 
          onclick="deletePackage(this)">delete</button>
      </div>
    </div>
  `;  
}

function getAllPackages(whichContainer, whichHtml) {
  doAjax('/getAllPackages', 
    'GET', null, (packages) => {
      whichContainer.innerHTML = '';

      for (const package of packages) {
        whichContainer.innerHTML += whichHtml(package);
      }
    })
}

function getPackageOwner(button) {
  const packageId = encodeURIComponent(button.value);

  doAjax(`/getOwnerOfPackage/${packageId}`, 
    'GET', null, (owner) => {
      setupModal('package owner', 
        getCustomerCardHtml(owner))
        console.log(owner);
    })
}

function getEditPackageModalHtml(package) {
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
      <button type="button" id="addAreaBtn" class="btn btn-light btn-sm">
        <i class="fa fa-plus" aria-hidden="true"></i> add</button>
      <button type="button" id="removeAreaBtn" class="btn btn-light btn-sm">
        <i class="fa fa-minus" aria-hidden="true"></i> remove</button>
      <div id="routeInputsContainer">
        <!-- put something here from js -->
      </div>
    </div> 
    <div class="form-group">
      <label for="distanceInKmInput">distance</label>
      <input value="${package.distanceInKm}" type="number" min="1" max="18" 
        class="form-control" id="distanceInKmInput" name="distanceInKm" 
          placeholder="how far is it? (in km)">
    </div>
    <div class="form-group">
      <label for="currentLocationInput">current location</label>
      <input value="${package.currentLocation}" type="text" class="form-control" 
        id="currentLocationInput" name="currentLocation" 
        placeholder="where is it right now?">
    </div>
    <div class="form-group">
      <label for="declaredValueInput">declared value</label>
      <input value="${package.declaredValue}" type="number" min="1" 
        class="form-control" id="declaredValueInput" name="declaredValue" 
        placeholder="how much is it worth?">
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
    <button id="updatePackageBtn" type="submit"
      class="btn btn-outline-dark" value="${package._id}" 
      onclick="updatePackage(this)">update package</button>
  `;
}

function editPackage(button) {
  const packageId = encodeURIComponent(button.value);

  doAjax(`/getPackageById/${packageId}`, 
    'GET', null, (package) => {
      setupModal('edit package',
        getEditPackageModalHtml(package)); 

        addRouteTrigger(); 
        removeRouteTrigger(); 
        
        completeFillPackageFields(package);
    })
}

function completeFillPackageFields(package) {
  // filling areas dropdown
  fillAreasDropdown(() => {
    document.getElementById('originInput').value = package.origin;
    document.getElementById('destinationInput').value = package.destination;
  }); 

  // adding predefined area input fields
  const addAreaBtn = document.getElementById('addAreaBtn'); 
  for (const area of package.areasToPass) {
    addAreaBtn.click(); 
  }

  // filling those area fields
  const areas = document.getElementsByClassName('areaToPassInput'); 
  for (let i = 0; i < package.areasToPass.length; i++) {
    console.log(areas[i].value)
    console.log(package.areasToPass[i])

    areas[i].value = package.areasToPass[i]; 
  }

  document.getElementById('statusInput').value = package.status;
  document.getElementById('paymodeInput').value = package.paymode;
  document.getElementById('boxSizeInput').value = package.boxSize;
}

function updatePackage(button) {
  const packageId = encodeURIComponent(button.value);
  const package = getPackageInputs(); 

  console.log(packageId);

  doAjax(`/updatePackage/${packageId}`, 
    'POST', package, (result) => {
      console.log(result)
      alert('PACKAGE UPDATED SUCCESSFULLY!')
      $('#universalModal').modal('hide');
      const dbViewLink = document.getElementById('databaseViewLink')
      simulatePageRefresh(dbViewLink, '#allPackages'); 
    })
}

function deletePackage(button) {
  const id = { packageId: encodeURIComponent(button.value) };
  const urlArray = [ 'removePackageReference', 'removePackage' ];
  
  for (const url of urlArray) {
    doAjax(`/${url}`, 'POST', id, (result) => {
        console.log(result); 
        console.log('successfully deleted!')
      })
  }

  const dbViewLink = document.getElementById('databaseViewLink');
  simulatePageRefresh(dbViewLink, '#allPackages')
}

function getPackagesModalHtml(packages) {
  let htmlToReturn = '';

  for (const package of packages) {
    htmlToReturn += getPackageCardHtml(package);
  }

  return htmlToReturn;
}

function getCustomerPackages(button) {
  const customerId = encodeURIComponent(button.value);

  doAjax(`/getPackagesOfCustomer/${customerId}`, 
    'GET', null, (packages) => {
      if (packages.length == undefined || packages.length == 0) {
        alert(`This guy ain't got no package!`)
      } else {
        setupModal('packages', getPackagesModalHtml(packages));
      }
    }) 
}

function findPackage(packageId) {
  const findPackageContainer = 
    document.getElementById('findPackageContainer'); 

  doAjax(`/findPackage/${encodeURIComponent(packageId)}`, 
    'GET', null, (package) => {
      findPackageContainer.innerHTML = '';
      findPackageContainer.innerHTML += getPackageCardHtml(package);
    })
}

function findCustomer(customerName) {
  const findCustomerContainer = 
    document.getElementById('findCustomerContainer');

  doAjax(`/findCustomer/${encodeURIComponent(customerName)}`, 
    'GET', null, (customers) => {
      findCustomerContainer.innerHTML = '';

      for (const customer of customers) {
        findCustomerContainer.innerHTML += getCustomerCardHtml(customer);
      }
    })
}
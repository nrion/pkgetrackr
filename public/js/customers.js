// gets customer inputs from input fields
function getCustomerInputs() {
  const customer = {
    name: document.getElementById('nameInput').value,
    email: document.getElementById('emailInput').value,
    password: document.getElementById('passwordInput').value,
    mobileNumber: document.getElementById('mobileNumberInput').value,
    address: document.getElementById('addressInput').value,
  }

  return customer; 
}

// inserts customer if the register btn is clicked
function insertCustomerTrigger() {
  const registerCustomerBtn = document.getElementById('registerCustomerBtn'); 

  registerCustomerBtn.onclick = () => {
    const customer = getCustomerInputs();

    doAjax(`/createCustomer`, 'POST', customer, (result) => {
      if (result.isSuccessful) {
        alert('CUSTOMER ADDED SUCCESSFULLY!')

        const registrationViewLink = document.getElementById('registrationViewLink')
        simulatePageRefresh(registrationViewLink, '#customerRegistration'); 
      }
      else {
        alert(result.message);
      }
    })
  }
}

// html for the customer dropdown
function getCustomerDropdownHtml(customer) {
  return `<option value="${customer._id}">${customer.name}</option>`;
}

// html for a single customer card
function getCustomerCardHtml(customer) {
  console.log(customer)
  return `
    <div class="card border-dark mb-3" style="max-width: 40rem;">
      <div class="card-body text-dark">
        <h5><i class="fa fa-user-o" aria-hidden="true"></i> 
          <strong>${customer.name}</strong></h5>
        <div><i class="fa fa-envelope-o" aria-hidden="true"></i> 
          ${customer.email}</div>
        <div><i class="fa fa-mobile" aria-hidden="true"></i> 
          ${customer.mobileNumber}</div>
        <div><i class="fa fa-address-book-o" aria-hidden="true"></i> 
          ${customer.address}</div>
      </div>
      <div class="card-footer text-right">
        <button type="button" class="btn btn-dark btn-sm" 
          value="${customer._id}" onclick="getCustomerPackages(this)">packages</button>
        <button type="button" class="btn btn-dark btn-sm" 
          value="${customer._id}" onclick="editCustomer(this)">edit</button>
        <button toriginype="button" class="btn btn-dark btn-sm" 
          value="${customer._id}" onclick="deleteCustomer(this)">delete</button>
      </div>
    </div>
  `;
}

// displays the chosen html to the chosen container
function getAllCustomers(whichContainer, whichHtml) {
  doAjax('/getCustomers', 'GET', null, (customers) => {
    whichContainer.innerHTML = '';

    console.log(typeof customers)
    for (const customer of customers) {
      whichContainer.innerHTML += whichHtml(customer);
    }
  })
}

// html for the edit customer modal
function getEditCustomerModalHtml(customer) {
  return `
    <div class="form-group">
      <label for="nameInput">name</label>
      <input type="text" class="form-control" id="nameInput" 
        value="${customer.name}" name="name" placeholder="full name">
    </div>
    <div class="form-group">
      <label for="emailInput">email</label>
      <input type="email" class="form-control" id="emailInput" 
        value="${customer.email}" name="email" placeholder="email">
    </div>
    <div class="form-group">
      <label for="passwordInput">password</label>
      <input type="password" class="form-control" id="passwordInput" 
        name="password" placeholder="you can't edit your password. please choose a new one">
    </div>
    <div class="form-group">
      <label for="mobileNumberInput">mobile number</label>
      <input type="number" class="form-control" id="mobileNumberInput" 
        value="${customer.mobileNumber}" name="mobileNumber" placeholder="mobile number">
    </div>
    <div class="form-group">
      <label for="addressInput">address</label>
      <textarea rows="2" class="form-control" id="addressInput" 
        name="address" placeholder="address">${customer.address}</textarea>
    </div>
    <button class="btn btn-outline-dark" value="${customer._id}" 
      onclick="updateCustomer(this)">save edit</button>
    <!-- <button id="updateCustomerBtn" class="btn btn-outline-dark">save edit</button> -->
  `
}

// displays prefilled customer form modal for editing
function editCustomer(button) {
  const customerId = encodeURIComponent(button.value); 

  doAjax(`/getCustomerById/${customerId}`, 
    'GET', null, (customer) => {
      setupModal('edit customer', 
        getEditCustomerModalHtml(customer));
    })
}


// updates the customer if the update btn is clicked
function updateCustomer(button) {
  const customerId = encodeURIComponent(button.value);
  const customer = getCustomerInputs(); 

  doAjax(`/updateCustomer/${customerId}`, 
    'POST', customer, (result) => {
      if (result.isSuccessful) {
        $('#universalModal').modal('hide')
        alert('customer updated!')

        const dbViewLink = document.getElementById('databaseViewLink');
        simulatePageRefresh(dbViewLink, '#allCustomers')
      }
      else {
        alert(result.message);
      }
    })
}

// deletes the customer if the del btn is clicked
function deleteCustomer(button) {
  const id = { customerId: encodeURIComponent(button.value) }
  const urlArray = [ 'bulkRemovePackages', 'removeCustomer' ]; 

  for (const url of urlArray) { 
    doAjax(`/${url}`, 
      'POST', id, (result) => {
        console.log('successfully deleted!')
      })
  }

  const dbViewLink = document.getElementById('databaseViewLink')
  simulatePageRefresh(dbViewLink, '#allCustomers')
}

// displays the customers found
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
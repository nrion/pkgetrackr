window.onload = () => {
  const bodyContent = document.getElementById('bodyContent');

  // links
  const homeViewLink = document.getElementById('homeViewLink');
  const registrationViewLink = document.getElementById('registrationViewLink');
  const dbViewLink = document.getElementById('databaseViewLink');

  // templates
  const adminLoginView = document.getElementById('adminLoginView');
  const homeView = document.getElementById('homeView');
  const registrationView = document.getElementById('registrationView');
  const dbView = document.getElementById('databaseView');

  // setting of views upon opening/refresh
  if (localStorage.getItem('theJwt')) {
    setContentView(homeView);
  }
  else {
    setContentView(adminLoginView);
    hideNavbar(); 
  }
  
  // trigger for sign in button
  const signinBtn = document.getElementById('signinBtn');
  if (signinBtn) {
    signinBtn.onclick = (event) => {
      event.preventDefault(); 
      login();
    }
  }
  
  // trigger for home view
  homeViewLink.onclick = (event) => {
    event.preventDefault();
    setContentView(homeView);
  }

  // trigger for registration view
  registrationViewLink.onclick = (event) => {
    event.preventDefault();
    setContentView(registrationView);

    insertCustomerTrigger(); 

    // filling of customer dropdown dropdowns
    const customerDropdown = document.getElementById('customerInput');
    getAllCustomers(customerDropdown, (customer) => {
      return getCustomerDropdownHtml(customer);
    }); 

    // filling of packages container upon dropdown input
    customerDropdown.oninput = () => {
      const customerId = customerDropdown.value; 
      getRegistrationViewPkges(customerId); 
    }

    fillAreasDropdown(null);
    addRouteTrigger();
    removeRouteTrigger();
    insertPackageTrigger(); 
  }

  // trigger for db view
  dbViewLink.onclick = (event) => {
    event.preventDefault();
    setContentView(dbView);

    /* customer transactions */
    // filling of customers to main body
    const allCustomersContainer = document.getElementById('allCustomersContainer');
    getAllCustomers(allCustomersContainer, (customer) => {
      return getCustomerCardHtml(customer)
    }); 
    
    // finding customer
    const findCustomerInput = document.getElementById('findCustomerInput');
    findCustomerInput.onkeyup = () => {
      const customerName = findCustomerInput.value;
      findCustomer(customerName);
    }

    /* package transactions */
    // filling of packages to main body
    const allPackagesContainer = document.getElementById('allPackagesContainer');
    getAllPackages(allPackagesContainer, (package) => {
      return getPackageCardHtml(package)
    });

    // finding package
    const findPackageInput = document.getElementById('findPackageInput');
    findPackageInput.onkeyup = () => {
      const packageid = findPackageInput.value; 
      findPackage(packageid);
    }
  }

  // methods
  function hideNavbar() {
      document.getElementById('theNavbar').style.display = 'none';
  }

  function showNavbar() {
      document.getElementById('theNavbar').style.display = 'block';
  }

  function setContentView(view) {
    bodyContent.innerHTML = view.innerHTML;
  }

  function login() {
    const loginData = {
      username: document.getElementById('usernameInput').value,
      password: document.getElementById('passwordInput').value,
    }

    doAjax('/login', 'POST', loginData, (result) => {
      if (!result.isFailure) {
        localStorage.setItem('theJwt', result.jwtToken)
        setContentView(homeView)
        showNavbar();
      }
      else {
        alert(result.message);
      }
    })
  }
}

function logout() {
  localStorage.removeItem('theJwt');
  location.reload(); 
}

function simulatePageRefresh(viewLink, whichPillId) {
  viewLink.click();
  $(`#myTab a[href="${whichPillId}"]`).tab('show')
}

function setupModal(title, modalBodyHtml) { // modalBodyHtml returns a string
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
      ${modalBodyHtml}
    </div>
  `;

  $('#universalModal').modal('show')
}
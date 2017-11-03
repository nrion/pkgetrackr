const ObjectId = require('mongodb').ObjectID; 
const bcrypt = require('bcrypt');
const authenticate = require('./authentication-controller')

function handleCustomerTasks(app, db) {
  app.post(`/createCustomer`, (request, response) => {
    const customer = request.body; 

    if (isCustomerValid(customer)) {
      encryptPassword(customer.password, (hashedPass) => {
        customer.password = hashedPass; 
        customer.packages = [];

        db.collection('customers').insertOne(customer, (insertErr, result) => {
            if (insertErr) {
              console.log('/createCustomer err ', insertErr);
            }
            response.json({ isSuccessful: true, result })
          })
      })
    }
    else {
      response.json({ isSuccessful: false, message: 'invalid form' })
    }
  })

  app.post(`/updateCustomer/:customerId`, (request, response) => {
    const customer = request.body; 

    if (isCustomerValid(customer)) {
      encryptPassword(customer.password, (hashedPass) => {
        customer.password = hashedPass; 
        
        db.collection('customers').update(
          { _id: ObjectId(request.params.customerId) },
          { $set: customer }, (updateErr, result) => {
            if (updateErr) {
              console.log('/updateCustomer err ', updateErr)
            }
            response.json({ isSuccessful: true, result })
          }
        )
      })
    }
    else {
      response.json({ isSuccessful: false, message: 'invalid form' })
    }
  })

  app.get('/getCustomerById/:customerId', (request, response) => {
    db.collection('customers').findOne({ 
      _id: ObjectId(request.params.customerId) 
    }, (readErr, result) => {
      if (readErr) {
        console.log('/getCustmerById err ', readErr)
      }
      response.json(result)
    })
  })

  app.get('/getCustomers', (request, response) => {
    authenticate(request, response, (decoded) => {
      db.collection('customers').find().toArray((readErr, customers) => {
        if (readErr) { 
          console.log('/getCustomers err ', readErr) 
        }
        response.json(customers)
      })
    })
  })

  app.get('/findCustomer/:customerName', (request, response) => {
    const nameRegex = new RegExp(`${request.params.customerName}`, 'i');

    db.collection('customers').find({ 
      name: { $regex: nameRegex } 
    }).toArray((readErr, customers) => {
      if (readErr) { 
        console.log('/findCustomer err ', readErr) 
      }
      response.json(customers)
    })
  })

  app.post('/removeCustomer', (request, response) => {
    db.collection('customers').deleteOne({ 
      _id: ObjectId(request.body.customerId) 
    }, (deleteError, result) => {
      if (deleteError) { 
        console.log('/removeCustomer err ', deleteError) 
      }
      response.json(result)
    })
  })

  app.get('/getPackagesOfCustomer/:customerId', (request, response) => {
    db.collection('customers').findOne(
      { _id: ObjectId(request.params.customerId) }, 
      { packages: 1 }, (findErr, result) => {
        if (findErr) {
          console.log('/getPackages findErr ', findErr)
        }
        else {
          if (result.packages !== undefined) {
            db.collection('packages').find({
              _id: { $in: result.packages }
            }).toArray((findPackagesErr, packages) => {
              if (findPackagesErr) {
                console.log('/getPackage findPackagesErr ', findPackagesErr);
              }
              else {
                response.json(packages);
              }
            })
          }
          else {
            response.json(result); 
          }
        }
      }
    )
  })
}

function encryptPassword(password, insert) {
  bcrypt.genSalt(12, (saltErr, salt) => {
    if (saltErr) { 
      console.log('err generating salt ', saltErr);
    }
    else {
      bcrypt.hash(password, salt, (hashErr, hashedPass) => {
        if (hashErr) {
          console.log('err hashing pw ', hashErr);
        }
        else {
          insert(hashedPass); 
        }
      })
    }
  })
}

function isCustomerValid(customer) {
  const numberOfAttribs = Object.keys(customer).length; 

  if (typeof customer !== 'object' || numberOfAttribs !== 5) {
    return false; 
  }
  else {
    const { name, email, mobileNumber, address } = customer;
    let isValid = {
      name: false, 
      email: false, 
      mobileNumber: false, 
      address: false, 
    }

    const nameRegex = /^[A-Za-z]+[A-Za-z\s\,\.\-]+[A-Za-z\.]$/; 
    const emailRegex = /^[\w-\.]+@[a-z]+\.[a-z]{2,3}$/;
    const numberRegex = /^(\+?63|0)?9\d{9}$/;
    const addressRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9\s\.\,\-]+[a-zA-Z]$/;

    if (nameRegex.test(name)) {
      isValid.name = true; 
    }
    if (emailRegex.test(email)) {
      isValid.email = true; 
    }
    if (numberRegex.test(mobileNumber)) {
      isValid.mobileNumber = true; 
    } 
    if (addressRegex.test(address)) {
      isValid.address = true; 
    }

    return Object.values(isValid).every(item => item === true);
  }
}

module.exports = handleCustomerTasks; 
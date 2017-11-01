const ObjectId = require('mongodb').ObjectID; 
const authenticate = require('./authentication-controller')

function handleCustomerTasks(app, db) {
  app.post(`/createCustomer`, (request, response) => {
    db.collection('customers').insertOne({
      name: request.body.name, 
      email: request.body.email, 
      password: request.body.password, 
      mobileNumber: request.body.mobileNumber,
      address: request.body.address,
      packages: []
    }, (insertErr, result) => {
      if (insertErr) {
        console.log('/createCustomer err ', insertErr);
      }
      response.json(result)
    })
  })

  app.post(`/updateCustomer/:customerId`, (request, response) => {
    db.collection('customers').update(
      { _id: ObjectId(request.params.customerId) },
      { $set: request.body }, (updateErr, result) => {
        if (updateErr) {
          console.log('/updateCustomer err ', updateErr)
        }
        response.json(result)
      }
    )
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
      console.log('decoded ', decoded)
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

// function isCustomerValid(customer) {
//   const { name, email, password, address, mobileNumber } = customer;

//   if (typeof name === string && name.len)
// }

module.exports = handleCustomerTasks; 
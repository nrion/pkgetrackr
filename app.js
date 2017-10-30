const express = require('express'); 
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID; 
const jwt = require('jsonwebtoken');

const app = express(); 
const port = 8084; 
const url = `mongodb://localhost:27017/tracker`;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))


MongoClient.connect(url, (error, db) => {
  if (error) { console.log('db cannot be created!', error) }
  else { 
    console.log('db created!');
    // collections: 
    // admins
    // customers
    // packages
    // coveredAreas

    // const loginUrl = `/login/:username/:password`
    app.post('/login', (request, response) => {
      const user = request.body.username; 
      const pass = request.body.password; 

      db.collection('admins').findOne({
        username: user, 
        password: pass
      }, (error, result) => {
        if (error) { 
          console.log('could not find admin') 
        }
        else {
          if (result !== null) {
            console.log(result)
            jwt.sign({ user }, 'iamasecret', (error, token) => {
              response.json({ jwtToken: token, isFailure: false })
            })
          }
          else {
            response.json({ isFailure: true })
          }
        }
      })
    })

    const customerUrl = `/:name/:email/:password/:mobileNumber/:address`
    
    app.post(`/createCustomer${customerUrl}`, (request, response) => {
      db.collection('customers').insertOne({
        name: request.params.name, 
        email: request.params.email, 
        password: request.params.password, 
        mobileNumber: request.params.mobileNumber, 
        address: request.params.address,
        packages: []
      }, (insertErr, result) => {
        if (insertErr) {
          console.log('/createCustomer err ', insertErr);
        }
        response.json(result)
      })
    })

    app.post(`/updateCustomer/:customerId${customerUrl}`, (request, response) => {
      db.collection('customers').update(
        { _id: ObjectId(request.params.customerId) },
        { $set: { 
          name: request.params.name, 
          email: request.params.email, 
          password: request.params.password, 
          mobileNumber: request.params.mobileNumber, 
          address: request.params.address
         }
        }, (updateErr, result) => {
          if (updateErr) {
            console.log('/updateCustomer err ', updateErr)
          }
          response.json(result)
        }
      )
    })

    app.get('/getCustomerById/:customerId', (request, response) => {
      db.collection('customers').find({ 
        _id: ObjectId(request.params.customerId) 
      }).toArray((readErr, result) => {
        if (readErr) {
          console.log('/getCustmerById err ', readErr)
        }
        response.json(result)
      })
    })

    app.get('/getPackageById/:packageId', (request, response) => {
      db.collection('packages').find({ 
        _id: ObjectId(request.params.packageId) 
      }).toArray((readErr, result) => {
        if (readErr) {
          console.log('/getPackageById err ', readErr)
        }
        response.json(result)
      })
    })

    app.get('/getCustomers', (request, response) => {
      db.collection('customers').find().toArray((readErr, customers) => {
        if (readErr) { 
          console.log('/getCustomers err ', readErr) 
        }
        response.json(customers)
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

    app.post('/removeCustomer/:customerId', (request, response) => {
      db.collection('customers').deleteOne({ 
        _id: ObjectId(request.params.customerId) 
      }, (deleteError, result) => {
        if (deleteError) { 
          console.log('/removeCustomer err ', deleteError) 
        }
        response.json(result)
      })
    })

    app.post('/bulkRemovePackages/:customerId', (request, response) => {
      db.collection('customers').findOne(
        { _id: ObjectId(request.params.customerId) }, 
        { packages: 1 }, (findErr, result) => {
          if (findErr) {
            console.log('/bulkRemovePackages findErr ', findErr)
          }
          else {
            if (result.packages !== undefined) {
              db.collection('packages').deleteMany({
                _id: { $in: result.packages }
              }, (deleteErr, deleteResult) => {
                if (deleteErr) {
                  console.log('/bulkRemovePackages deleteErr ', deleteErr)
                }
                else {
                  response.json(deleteResult)
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

    const packageUrl = '/:origin/:destination/:areasToPass' 
      + '/:distanceInKm/:currentLocation/:status/:paymode/:boxSize/:declaredValue';
    
    app.post(`/createPackage/:customerId${packageUrl}`, (request, response) => {
      const routes = request.params.areasToPass; 
      const areasToPassArray = routes.split(',');
      const computedPrice = computePrice(request.params.distanceInKm, request.params.boxSize);

      db.collection('packages').insertOne({ 
        origin: request.params.origin, 
        destination: request.params.destination, 
        areasToPass: areasToPassArray, 
        distanceInKm: request.params.distanceInKm,
        currentLocation: request.params.currentLocation, 
        status: request.params.status,
        paymode: request.params.paymode,
        boxSize: request.params.boxSize, 
        declaredValue: request.params.declaredValue,
        price: computedPrice,
        transactionDate: new Date()
      }, (insertErr, result) => {
        if (insertErr) { 
          console.log('/createPackage err ', insertErr) 
        }
        else {
          db.collection('customers').update({ 
            _id: ObjectId(`${request.params.customerId}`)
          }, {
            $addToSet: { packages: result.insertedId }
          }, (insertIdErr, insertIdResult) => {
            if (insertIdErr) {
              console.log('package > customer err ', insertIdErr)
            }
            else {
              response.json(result)
            }
          })
        }
      })
    });

    app.post(`/updatePackage/:packageId${packageUrl}`, (request, response) => {
      const routes = request.params.areasToPass; 
      const areasToPassArray = routes.split(',');
      const computedPrice = computePrice(request.params.distanceInKm, request.params.boxSize);
      
      db.collection('packages').update(
        { _id: ObjectId(request.params.packageId) },
        { $set: { 
          origin: request.params.origin, 
          destination: request.params.destination, 
          areasToPass: areasToPassArray, 
          distanceInKm: request.params.distanceInKm,
          currentLocation: request.params.currentLocation, 
          status: request.params.status,
          paymode: request.params.paymode,
          boxSize: request.params.boxSize, 
          declaredValue: request.params.declaredValue,
          price: computedPrice
         }
        }, (updateErr, result) => {
          if (updateErr) {
            console.log('/updatePackage err ', updateErr)
          }
          response.json(result)
        }
      )
    })

    app.get('/getOwnerOfPackage/:packageId', (request, response) => {
      db.collection('customers').find({
        packages: ObjectId(request.params.packageId)
      }).toArray((readErr, result) => {
        if (readErr) {
          console.log('/getOwnerOfPackage err ', readerr)
        }
        response.json(result);
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
              console.log(result)
              response.json(result); 
            }
          }
        }
      )
    })

    app.get('/getAllPackages', (request, response) => {
      db.collection('packages').find().toArray((readErr, packages) => {
        if (readErr) { 
          console.log('/getAllPackages err ', readErr) 
        }
        response.json(packages)
      })
    })

    app.get('/findPackage/:packageId', (request, response) => {
      db.collection('packages').find({ 
        _id: ObjectId(request.params.packageId) 
      }).toArray((readErr, packages) => {
        if (readErr) { 
          console.log('/findPackage err ', readErr) 
        }
        response.json(packages)
      })
    })

    app.post('/removePackageReference/:packageId', (request, response) => {
      const packageId = ObjectId(request.params.packageId);

      db.collection('customers').update(
        { packages: packageId }, 
        { $pull: { packages: packageId } }, 
        (updateErr, result) => {
          if (updateErr) {
            console.log('/removePackageReference failed ', updateErr)
          }
          response.json(result)
        }
      )
    })

    app.post('/removePackage/:packageId', (request, response) => {
      db.collection('packages').deleteOne({ 
        _id: ObjectId(request.params.packageId) 
      }, (deleteError, result) => {
        if (deleteError) { 
          console.log('/removePackage err ', deleteError) 
        }
        response.json(result)
      })
    })

    app.get('/getCoveredAreas', (request, response) => {
      db.collection('coveredAreas').find().toArray((readErr, areas) => {
        if (readErr) { 
          console.log('error retrieving covered areas ', readErr) 
        }
        response.json(areas)
      })
    })
    
    app.listen(port, () => { console.log(`Server @ http://localhost:${port}`) }); 
  }
})

function extractJwt(authHeader) {
  return authHeader.slice(7)
}

function computePrice(distanceInKm, boxSize) {
  const ratePerKm = 5;
  let boxPrice = 0; 

  switch (boxSize) {
    case 'extra small': 
      boxPrice = 245; 
      break; 
    case 'small':
      boxPrice = 380; 
      break; 
    case 'medium': 
      boxPrice = 750; 
      break; 
    case 'large': 
      boxPrice = 1300; 
      break; 
  }

  return (distanceInKm * 5) + boxPrice; 
}
const express = require('express'); 
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID; 

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
    
    app.post('/createCustomer', (request, response) => {
      db.collection('customers').insertOne({ 
        name: request.body.name, 
        email: request.body.email, 
        password: request.body.password, 
        mobileNumber: request.body.mobileNumber, 
        address: request.body.address,
      }, (insertErr, result) => {
        if (insertErr) { console.log('customer cannot be inserted!', error) }
        else { response.end(); }
      })
    });

    app.get('/getCustomers', (request, response) => {
      db.collection('customers').find().toArray((readErr, customers) => {
        if (readErr) { console.log('error viewing all customers!', error) }
        else { response.json(customers) }
      })
    })

    app.get('/findCustomer/:customerName', (request, response) => {
      const nameRegex = new RegExp(`${request.params.customerName}`, 'i');

      db.collection('customers').find({ 
        name: { $regex: nameRegex } 
      }).toArray((readErr, customers) => {
        if (readErr) { console.log('error finding a customer!', error) }
        else { response.json(customers) }
      })
    })

    app.post('/createPackage/:customerId', (request, response) => {
      const computedPrice = computePrice(
        request.body.distanceInKm, request.body.boxSize);

      db.collection('packages').insertOne({ 
        customerId: request.params.customerId,
        origin: request.body.origin, 
        destination: request.body.destination, 
        areasToPass: request.body.routes, 
        distanceInKm: request.body.distanceInKm,
        currentLocation: request.body.currentLocation, 
        status: request.body.status,
        paymode: request.body.paymode,
        boxSize: request.body.boxSize, 
        price: computedPrice,
        transactionDate: new Date()
      }, (insertErr, result) => {
        if (insertErr) { console.log('package cannot be inserted!', error) }
        else { response.end(); }
      })
    });

    app.get('/getPackages/:customerId', (request, response) => {
      db.collection('packages').find({
        customerId: request.params.customerId
      }).toArray((readErr, packages) => {
        if (readErr) { console.log('package cannot be read!', error) }
        else { response.json(packages) }
      })
    })

     app.get('/findPackage/:packageId', (request, response) => {
      db.collection('packages').findOne({ 
        _id: ObjectId(request.params.packageId) 
      }, (readErr, package) => {
        if (readErr) { console.log('error finding a package!', error) }
        else { response.json(package) }
      })
    })

    app.get('/getCoveredAreas', (request, response) => {
      db.collection('coveredAreas').find().toArray((readErr, areas) => {
        if (readErr) { console.log('error retrieving covered areas ', error) }
        else { response.json(areas) }
      })
    })
    
    app.listen(port, () => { console.log(`Server @ http://localhost:${port}`) }); 
  }
})

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
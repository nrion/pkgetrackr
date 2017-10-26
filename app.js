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
        if (insertErr) { console.log('customer cannot be inserted!', insertErr) }
        else { response.end(); }
      })
    });

    app.get('/getCustomers', (request, response) => {
      db.collection('customers').find().toArray((readErr, customers) => {
        if (readErr) { console.log('error viewing all customers!', readErr) }
        else { response.json(customers) }
      })
    })

    app.get('/findCustomer/:customerName', (request, response) => {
      const nameRegex = new RegExp(`${request.params.customerName}`, 'i');

      db.collection('customers').find({ 
        name: { $regex: nameRegex } 
      }).toArray((readErr, customers) => {
        if (readErr) { console.log('error finding a customer!', readErr) }
        else { response.json(customers) }
      })
    })

    app.get('/removeCustomer/:customerId', (request, response) => {
      db.collection('customers').deleteOne({ _id: ObjectId(request.params.customerId) }, 
      (deleteError, result) => {
        if (deleteError) { console.log('error delete a customer ', deleteError) }
        else { response.json(result) }
      })
    })

    app.get('/removePackagesOfCustomer/:customerId', (request, response) => {
      db.collection('packages').deleteMany({ customerId: ObjectId(request.params.customerId) }, 
      (deleteError, result) => {
        if (deleteError) { console.log('error delete packages ', deleteError) }
        else { response.json(result) }
      })
    })

    const createPackageUrl = '/createPackage/:customerId/:origin/:destination/:areasToPass' 
      + '/:distanceInKm/:currentLocation/:status/:paymode/:boxSize';

    app.post(createPackageUrl, (request, response) => {
      const routes = request.params.areasToPass; 
      const areasToPassArray = routes.split(',');
      const computedPrice = computePrice(
        request.params.distanceInKm, request.params.boxSize);

      console.log(areasToPassArray)

      db.collection('packages').insertOne({ 
        customerId: ObjectId(request.params.customerId),
        origin: request.params.origin, 
        destination: request.params.destination, 
        areasToPass: areasToPassArray, 
        distanceInKm: request.params.distanceInKm,
        currentLocation: request.params.currentLocation, 
        status: request.params.status,
        paymode: request.params.paymode,
        boxSize: request.params.boxSize, 
        price: computedPrice,
        transactionDate: new Date()
      }, (insertErr, result) => {
        if (insertErr) { console.log('package cannot be inserted!', insertErr) }
        else { response.json(result) }
      })
    });

    app.get('/getPackages/:customerId', (request, response) => {
      db.collection('packages').find({
        customerId: ObjectId(request.params.customerId)
      }).toArray((readErr, packages) => {
        if (readErr) { console.log('package cannot be read!', readErr) }
        else { response.json(packages) }
      })
    })

    app.get('/getAllPackages', (request, response) => {
      db.collection('packages').find().toArray((readErr, packages) => {
        if (readErr) { console.log('error viewing all customers!', readErr) }
        else { response.json(packages) }
      })
    })

    app.get('/removePackage/:packageId', (request, response) => {
      db.collection('packages').deleteOne({ _id: ObjectId(request.params.packageId) }, 
      (deleteError, result) => {
        if (deleteError) { console.log('error delete a package ', deleteError) }
        else { response.json(result) }
      })
    })

    app.get('/findPackage/:packageId', (request, response) => {
      db.collection('packages').find({ 
        _id: ObjectId(request.params.packageId) 
      }).toArray((readErr, packages) => {
        if (readErr) { console.log('error finding a package!', readErr) }
        else { response.json(packages) }
      })
    })

    app.get('/getCoveredAreas', (request, response) => {
      db.collection('coveredAreas').find().toArray((readErr, areas) => {
        if (readErr) { console.log('error retrieving covered areas ', readErr) }
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
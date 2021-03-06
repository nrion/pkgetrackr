const ObjectId = require('mongodb').ObjectID; 
const computePrice = require('./price-calculator')

function handlePackageTasks(app, db) {
  app.get('/getPackageById/:packageId', (request, response) => {
    db.collection('packages').findOne({ 
      _id: ObjectId(request.params.packageId) 
    }, (readErr, result) => {
      if (readErr) {
        console.log('/getPackageById err ', readErr)
      }
      response.json(result)
    })
  })

  app.post('/bulkRemovePackages', (request, response) => {
    db.collection('customers').findOne(
      { _id: ObjectId(request.body.customerId) }, 
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

  app.post(`/createPackage/:customerId`, (request, response) => {
    const package = request.body; 
    const { distanceInKm, boxSize } = package; 
    
    package.price = computePrice(distanceInKm, boxSize);
    package.transactionDate = new Date();      

    db.collection('packages').insertOne(package, (insertErr, result) => {
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

  app.post(`/updatePackage/:packageId`, (request, response) => {
    const package = request.body; 
    const { distanceInKm, boxSize } = package; 

    package.price = computePrice(distanceInKm, boxSize);
    
    db.collection('packages').update(
      { _id: ObjectId(request.params.packageId) },
      { $set: package }, (updateErr, result) => {
        if (updateErr) {
          console.log('/updatePackage err ', updateErr)
        }
        response.json(result)
      }
    )
  })

  app.get('/getOwnerOfPackage/:packageId', (request, response) => {
    db.collection('customers').findOne({
      packages: ObjectId(request.params.packageId)
    }, (readErr, result) => {
      if (readErr) {
        console.log('/getOwnerOfPackage err ', readerr)
      }
      response.json(result);
    })
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
    db.collection('packages').findOne({ 
      _id: ObjectId(request.params.packageId) 
    }, (readErr, packages) => {
      if (readErr) { 
        console.log('/findPackage err ', readErr) 
      }
      response.json(packages)
    })
  })

  app.post('/removePackageReference', (request, response) => {
    const packageId = ObjectId(request.body.packageId);

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

  app.post('/removePackage', (request, response) => {
    db.collection('packages').deleteOne({ 
      _id: ObjectId(request.body.packageId) 
    }, (deleteError, result) => {
      if (deleteError) { 
        console.log('/removePackage err ', deleteError) 
      }
      response.json(result)
    })
  })
}

module.exports = handlePackageTasks; 
const express = require('express'); 
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');


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
        else {
          // response.writeHead(302, { 'Location': '/' });
          response.end(); 
        }
      })
    });
    
    app.listen(port, () => { console.log(`Server @ http://localhost:${port}`) }); 
  }
})


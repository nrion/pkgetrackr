const express = require('express'); 
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');

const handleCoveredAreasTasks = require('./covered-areas-controller')
const handleCustomerTasks = require('./customer-controller');
const handleLogin = require('./login-controller');
const handlePackageTasks = require('./package-controller');

const app = express(); 
const port = process.env.PORT || 8084; 
// const url = `mongodb://nrion:ronnaronna@ds245715.mlab.com:45715/pkgetrackr`;
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/tracker`;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))

MongoClient.connect(url, (error, db) => {
  if (error) { 
    console.log('db cannot be created!', error) 
  }
  else { 
    console.log('db created!');

    handleCoveredAreasTasks(app, db);
    handleCustomerTasks(app, db);
    handleLogin(app, db);
    handlePackageTasks(app, db);
    
    app.listen(port, () => { console.log(`Server @ http://localhost:${port}`) }); 
  }
})
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function verifyPassword(passFromInput, passFromDb, doWhat) {
  bcrypt.compare(passFromInput, passFromDb, (comparisonErr, result) => {
    if (comparisonErr) {
      console.log('pw comparison err ', comparisonErr);
    }
    else {
      doWhat(result);
    }
  })
}

function handleLogin(app, db) {
  const secret = '4RI27OC12AT'; 

  app.post('/login', (request, response) => {
    const { username, password } = request.body;

    db.collection('admins').findOne({ username: username }, (error, found) => {
      if (error) { 
        throw error
      } 
      else {
        console.log('found ', found)
        if (found !== null) {
          console.log('input ', password)
          console.log('found ', found.password)
          verifyPassword(password, found.password, (verified) => {
            console.log('verifed? ', verified);
            if (verified) {
              jwt.sign({ username }, secret, (error, token) => {
                response.json({ jwtToken: token, message: 'user verified', isFailure: false })
              })
            }
            else {
              response.json({ message: 'incorrect password', isFailure: true })
            }
          })
        } 
        else {
          response.json({ message: 'user not found', isFailure: true });
        }
      }
    })
  })
}

module.exports = handleLogin; 
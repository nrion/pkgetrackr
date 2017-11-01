const jwt = require('jsonwebtoken');

function handleLogin(app, db) {
  const secret = '4RI27OC12AT'; 

  app.post('/login', (request, response) => {
    const user = request.body.username; 
    const pass = request.body.password; 

    db.collection('admins').findOne({
      username: user, 
      password: pass
    }, (error, result) => {
      if (error) { 
        throw error
      }
      else {
        console.log(result)
        if (result !== null) {
          console.log(result)
          jwt.sign({ user }, secret, (error, token) => {
            response.json({ jwtToken: token, userSent: user, isFailure: false })
          })
        }
        else { response.json({ isFailure: true }) }
      }
    })
  })
}

module.exports = handleLogin; 
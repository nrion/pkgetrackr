const jwt = require('jsonwebtoken');
const secret = '4RI27OC12AT';

function extractJwt(authHeader) {
  return authHeader.slice(7)
}

function authenticate(request, response, dohere) {
  const authHeader = request.header('Authorization'); 
  
  jwt.verify(extractJwt(authHeader), secret, (error, decoded) => {
    console.log('ERROR: ', error)
    if (error) {
      response.statusCode = 403; 
      response.json({ accessGranted: false })
    }
    else {
      dohere(decoded)
    }
  })
}

module.exports = authenticate; 
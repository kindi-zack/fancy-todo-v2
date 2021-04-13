const jwt = require('jsonwebtoken')

function generateToken(payload){
    return jwt.sign(payload, process.env.SECRET)
}

// console.log(generateToken({
//     username: 'admin',
//     pswd: 'admin'
// }))

module.exports = {generateToken}
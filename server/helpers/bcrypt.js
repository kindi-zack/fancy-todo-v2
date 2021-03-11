const bcrypt = require('bcryptjs')

function hashPass(pswd){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pswd, salt)
}

function comparePass(pswd, hashedPass){
    return bcrypt.compareSync(pswd, hashedPass)
}

module.exports = {hashPass, comparePass}


const {User} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt') 

class UserController{
    static register(req, res, next){
        const {email, password} = req.body

        User.create({
            email,
            password
        })
        .then(user=>{
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        })
        .catch(err=>{
            // res.status(400).json(err)
            next(err)
        })
    }

    static login(req, res, next){
        const {email, password} = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then(user=>{
            if(!user) throw {msg: 'wrong password / email'}
            const checkPass = comparePass(password, user.password,)
            if(!checkPass) throw {msg: 'wrong password / email'}

            const access_token = generateToken({
                id: user.id,
                email: user.email
            })

            res.status(200).json({
                access_token
            })
        })
        .catch(err=>{
            // res.status(400).json(err)
            next(err)
        })
    }
}

module.exports = UserController
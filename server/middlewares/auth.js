const jwt = require('jsonwebtoken')
const {Todo} = require('../models')

function authenticate(req, res, next){
    try{   
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET)
        req.decoded = decoded
        next()
    }catch(err){
        err.name = 'Token Invalid'
        // res.status(400).json(err)
        next(err)
    }
}

function authorize(req, res, next){
    Todo.findByPk(req.params.id)
    .then(todo=>{
        console.log(todo.UserId, req.decoded.id)
        if(todo.UserId === req.decoded.id){
            next()
        }else{
            throw {msg: 'you are not Authorized'}
        }
    })
    .catch(err=>{
        // res.status(400).json(err)
        next(err)
    })
}

module.exports = {authenticate, authorize}
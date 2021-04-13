const {Todo, User} = require('../models')

class todoController{
    static getTodos(req, res, next){
        Todo.findAll({
            order : [['id', 'ASC']],
            include : [User],
            where: {
                // due_date: '2021-04-22'
            }
        })
        .then(todos=>{
            if(todos.length > 0){
                res.status(200).json(todos)
            }else{
                // res.status(200).json('DATABASE IS EMPTRY')
                throw {name: 'DATABASE IS EMPTY'}
            }
        })
        .catch(err=>{
            next(err)
            // res.status(400).json(err)
        })
    }

    static createTodo(req, res, next){
        let {title, description, status, due_date} = req.body
        let data = {
            title,
            description,
            status : status || false,
            due_date,
            UserId : req.decoded.id
        }

        Todo.create(data)
        .then(todo=>{
            res.status(201).json({msg: 'data Creaated Successfully'})
        })
        .catch(err=>{
            // res.status(400).json(err.errors[0].message)
            // res.status(400).json(err)
            next(err)
        })
    }

    static getTodoById(req, res, next){
        Todo.findByPk(req.params.id)
        .then(todo=>{
            // if(!todo) throw {status: 404, name: 'Data Not Found'}
            // console.log('<<<<<<<<<<<<<<<<<<<<<')
            res.status(200).json(todo)
        })
        .catch(err=>{
            // err.name = 
            next(err)
            // RESPON TIDAK JELAS !!
            // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
            // res.status(404).json(err)
            
        })
    }

    static modifyMany(req, res, next){
        const {title, description, status, due_date} = req.body
        const id = +req.params.id

        Todo.update({
            title, description, status, due_date
        },{
            where: {
                id
            },
            returning: true
        })
        .then(todo =>{
            if(todo[0] !== 0){
                res.status(200).json(todo[1][0])
            }else{
                throw {
                    msg: 'Todo is Not Found',
                    status: 404
                }
            }
        })
        .catch(err=>{
            if(err.status){
                res.status(err.status).json(err.msg)
                // next(err)
            }else if(err.name === 'SequelizeValidationError'){
                // res.status(400).json(err)
                next(err)
            }else{
                // res.status(500).json(err)
                next(err)
            }
            // next(err)
        })
    }

    static deleteTodo(req, res, next){
        Todo.destroy({
            where : {
                id : req.params.id
            },
        })
        .then(data=>{
            if(data !== 0){
                res.status(200).json({msg: 'Todo success to delete'})
            }else{
                throw {
                    msg: 'Todo is Not Found',
                    status: 404
                }
            }
            // res.status(200).json(data)

        })
        .catch(err=>{
            if(err.status){
                // res.status(err.status).json(err.msg)
                next(err)
            }else{
                // res.status(400).json(err)
                next(err)
            }
        })
    }

    static modifyOne(req, res, next){
        
        Todo.update({
            status : req.body.status,
        },{
            where : {
                id : req.params.id
            },
            returning : true
        })
        .then(todo=>{
            if(todo[0] !== 0){
                res.status(200).json(todo)
            }else{
                throw {
                    msg: 'Todo is Not Found',
                    status: 404
                }
            }
        })
        .catch(err=>{
            if(err.status){
                // res.status(err.status).json(err.msg)
                next(err)
            }else if(err.name === 'SequelizeDatabaseError'){
                // res.status(400).json(err)
                next(err)
            }else{
                // res.status(500).json(err)
                next(err)
            }
        })
    }
}

module.exports = todoController
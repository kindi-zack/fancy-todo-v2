const {Todo} = require('../models')

class todoController{
    static getTodos(req, res){
        Todo.findAll({
            order : [['id', 'ASC']]
        })
        .then(todos=>{
            if(todos.length > 0){
                res.status(200).json(todos)
            }else{
                res.status(200).json('DATABASE IS EMPTRY')
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static createTodo(req, res){
        let {title, description, status, due_date} = req.body
        let data = {
            title,
            description,
            status : status || false,
            due_date
        }

        Todo.create(data)
        .then(todo=>{
            res.status(201).json({msg: 'data Creaated Successfully'})
        })
        .catch(err=>{
            // res.status(400).json(err.errors[0].message)
            res.status(400).json(err)
        })
    }

    static getTodoById(req, res){
        Todo.findByPk(req.params.id)
        .then(todo=>{
            res.status(200).json(todo)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static modifyMany(req, res){
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
            }else if(err.name === 'SequelizeValidationError'){
                res.status(400).json(err)
            }else{
                res.status(500).json(err)
            }
            // next(err)
        })
    }

    static deleteTodo(req, res){
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
                res.status(err.status).json(err.msg)
            }else{
                res.status(400).json(err)
            }
        })
    }

    static modifyOne(req, res){
        
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
                res.status(err.status).json(err.msg)
            }else if(err.name === 'SequelizeDatabaseError'){
                res.status(400).json(err)
            }else{
                res.status(500).json(err)
            }
        })
    }
}

module.exports = todoController
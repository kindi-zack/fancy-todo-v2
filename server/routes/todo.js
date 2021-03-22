const todoRouter = require('express').Router()
const todoController = require('../controllers/todoController')
const todo = require('../models/todo')
const {authorize} = require('../middlewares/auth')

// todoRouter.use(authenticate)
todoRouter.get('/todos',todoController.getTodos)
todoRouter.post('/todos',todoController.createTodo)
todoRouter.get('/todos/:id', todoController.getTodoById)
todoRouter.patch('/todos/:id', authorize, todoController.modifyMany)
todoRouter.delete('/todos/:id', authorize, todoController.deleteTodo)
todoRouter.put('/todos/:id', authorize, todoController.modifyOne)
module.exports = todoRouter
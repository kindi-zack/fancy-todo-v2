const todoRouter = require('express').Router()
const todoController = require('../controllers/todoController')
const todo = require('../models/todo')

todoRouter.get('/todos',todoController.getTodos)
todoRouter.post('/todos',todoController.createTodo)
todoRouter.get('/todos/:id',todoController.getTodoById)
todoRouter.patch('/todos/:id',todoController.modifyMany)
todoRouter.delete('/todos/:id',todoController.deleteTodo)
todoRouter.put('/todos/:id',todoController.modifyOne)
module.exports = todoRouter
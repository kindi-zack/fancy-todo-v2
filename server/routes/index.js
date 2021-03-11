const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')
const {authenticate} = require('../middlewares/auth')

router.get('/', (req, res)=>{
    res.send('FANCY TODO')
})
router.use(userRouter)
router.use(authenticate)
router.use(todoRouter)

module.exports = router
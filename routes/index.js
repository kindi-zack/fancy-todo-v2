const router = require('express').Router()
const todoRouter = require('./todo')

router.get('/', (req, res)=>{
    res.send('FANCY TODO')
})
router.use(todoRouter)

module.exports = router
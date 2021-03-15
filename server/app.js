// if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
// }
const express = require('express')
const app = express()
const port = 7000
const router = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(router)
app.use(errorHandler)

app.listen(port, ()=> console.log(`app is running on ==> http:localhost:${port}`))



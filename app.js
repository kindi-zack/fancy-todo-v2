const express = require('express')
const app = express()
const port = 7000
const router = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(router)

app.listen(port, ()=> console.log(`app is running on ==> http:localhost:${port}`))



require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080
const db = require('./db')

app.use(express.static('client'))

app.use(express.json())

app.get('/test', (req, res) => {
    
    res.send('servo API')
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
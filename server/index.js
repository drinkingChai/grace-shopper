const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', require('./api'))
app.get('/*', (req, res, next)=> {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'))
})

app.listen(port, ()=> console.log(`listening on port ${port}`))

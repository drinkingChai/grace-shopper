const products = require('express').Router()

products.get('/', (req, res, next)=> {
  res.sendStatus(200)
})

module.exports = products

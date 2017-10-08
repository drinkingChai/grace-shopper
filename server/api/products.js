const products = require('express').Router();
const { Product } = require('../../db').models

products.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
});

products.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next)
})

module.exports = products;

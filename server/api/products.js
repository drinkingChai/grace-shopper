const router = require('express').Router();
const { Product } = require('../db').models;

router.get('/', (req, res, next) => {
  Product.findProducts()
    .then(products => res.send(products))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next)
});

module.exports = router;

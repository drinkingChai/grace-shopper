const router = require('express').Router();
const { Product } = require('../db').models;
const { requireAdmin } = require('./middlewares')

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

router.post('/', requireAdmin, (req, res, next) => {
  Product.createProduct(req.body)
    .then(() => res.sendStatus(202))
    .catch(next)
})

module.exports = router;

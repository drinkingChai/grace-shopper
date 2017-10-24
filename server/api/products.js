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

router.put('/:id', requireAdmin, (req, res, next) => {
  console.log('body', req.body);
  Product.updateProduct(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router;

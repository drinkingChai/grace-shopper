const router = require('express').Router();
const { Category, Product } = require('../db').models;

router.get('/', (req, res, next) => {
  Category.findAll({ include: [{ model: Product, as: 'products' }]})
    .then(categories => res.send(categories))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id, { include: [{ model: Product, as: 'products' }]})
    .then(category => res.send(category))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next);
});

router.post('/:id/products/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      Category.findById(req.params.id)
        .then(category => category.addProduct(product))
    })
    .then(() => res.sendStatus(201))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => {
      let updatedCat = Object.assign(category, req.body);
      return updatedCat.save();
    })
    .then(category => res.status(202).send(category))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => category.destroy())
    .then(() => res.sendStatus(202))
    .catch(next);
});

router.delete('/:id/products/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      Category.findById(req.params.id)
        .then(category => category.removeProduct(product))
    })
    .then(() => res.sendStatus(202))
    .catch(next);
});


module.exports = router;

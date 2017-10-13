const router = require('express').Router();
const { Order, LineItem, Product } = require('../db').models;
const { updateSessionCart } = require('./helpers/session-helper')
const options = [{ model: LineItem, include: [ Product ] }];

router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    return res.send([req.session.cart])
  }
  Order.findAll({
    where: { userId: req.session.userId },
    include: options,
    order: [[ LineItem, 'createdAt', 'ASC' ]]
  })
    .then(orders => res.send(orders))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { include: options })
    .then(order => res.send(order))
    .catch(next)
});

router.get('/filter', (req, res, next) => {
  Order.findAll({ where: { userId: req.session.userId, status: req.query.status }})
    .then(orders => res.send(orders))
    .catch(next)
});

router.put('/check-out', (req, res, next) => {
  Order.checkOut(req.session.userId, req.body)
    .then(newCart => {
      req.session.cart = newCart
      res.sendStatus(201);
    })
    .catch(next);
});

router.put('/products/:productId', (req, res, next) => {
  if (!req.session.userId) {
    updateSessionCart(req.session.cart, req.params.productId, req.body)
      .then(cart => {
        req.session.cart = cart
        res.sendStatus(201)
      })
      .catch(next)
  } else {
    Order.updateCart(req.session.userId, req.params.productId * 1, req.body)
      .then(() => res.sendStatus(201))
      .catch(next);
  }
});

router.delete('/:id/products/:productId', (req, res, next) => {
  Order.removeLineItem(req.params.id * 1, req.params.productId * 1)
    .catch(next);
});

module.exports = router;

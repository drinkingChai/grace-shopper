const router = require('express').Router();
const { Order } = require('../db').models;

router.get('/', (req, res, next) => {
  Order.findOrders(req.session.data.userId)
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findOrder(req.params.id)
    .then(order => res.send(order))
    .catch(next);
});

router.get('/filter', (req, res, next) => {
  Order.findFiltered(req.session.data.userId, req.query.status)
    .then(orders => res.send(orders))
    .catch(next);
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
  Order.updateCart(req.session.userId, req.params.productId * 1, req.body)
    .then(() => Order.findCart(req.session.userId))
    .then(cart => {
      req.session.cart = cart
      res.sendStatus(201)
    })
    .catch(next);
});

router.delete('/:id/products/:productId', (req, res, next) => {
  Order.removeLineItem(req.params.id * 1, req.params.productId * 1)
    .catch(next);
});

module.exports = router;

const router = require('express').Router();
const { Order } = require('../db').models;
const { updateSessionCart } = require('./helpers/session-helper');
const { clearOnLogout } = require('./helpers/session-helper')

router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    return res.send([req.session.cart]);
  }
  Order.findOrders(req.session.userId)
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findOrder(req.params.id)
    .then(order => res.send(order))
    .catch(next);
});

router.get('/filter', (req, res, next) => {
  Order.findFiltered(req.session.userId, req.query.status)
    .then(orders => res.send(orders))
    .catch(next);
});

router.put('/check-out', (req, res, next) => {
  if (!req.session.userId) {
    Order.guestCheckOut(req.session.cart.lineitems, req.body)
      .then(newCart => {
        req.session = clearOnLogout()
        res.sendStatus(201);
      })
      .catch(next);
  } else {
    Order.checkOut(req.session.userId, req.body)
      .then(newCart => {
        req.session.cart = newCart;
        res.sendStatus(201);
      })
      .catch(next);
  }
});

router.put('/products/:productId', (req, res, next) => {
  if (!req.session.userId) {
    updateSessionCart(req.session.cart, req.params.productId, req.body)
      .then(cart => {
        req.session.cart = cart;
        res.sendStatus(201);
      })
      .catch(next);
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

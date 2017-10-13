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
  if (!req.session.userId) {
    let { cart } = req.session
    const { productId } = req.params
    Product.findById(productId)
      .then(product => {
        let lineItem = cart.lineitems.find(li => li.productId === productId) ||
          LineItem.build({ productId });
        Object.assign(lineItem, req.body);
        lineItem.product = product

        if (cart.lineitems.findIndex(li => li.productId == productId) < 0) cart.lineitems.push(lineItem)
        req.session.cart = cart
        return res.sendStatus(201)
      })
  } else {
    Order.updateCart(req.session.userId, req.params.productId * 1, req.body)
      .then(() => Order.findCart(req.session.userId))
      .then(cart => {
        req.session.cart = cart
        res.sendStatus(201)
      })
      .catch(next);
  }
});

router.delete('/:id/products/:productId', (req, res, next) => {
  Order.removeLineItem(req.params.id * 1, req.params.productId * 1)
    .catch(next);
});

module.exports = router;

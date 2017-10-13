const router = require('express').Router();
const { Order, LineItem, Product } = require('../db').models;
const options = [{ model: LineItem, include: [ Product ] }];

router.get('/', (req, res, next) => {
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
  }

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

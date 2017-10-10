const router = require('express').Router();
const { Order, LineItem, Product } = require('../../db').models

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{ model: LineItem, include: [ Product ] }]
  })
    .then(orders => res.send(orders))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { include: [{ model: LineItem, include: [ Product ] }] })
    .then(order => res.send(order))
    .catch(next)
});

router.put('/products/:productId', (req, res, next) => {
  // for DB team - to be replaced with findCart to reduce logic in api
  Order.findOne({
    where: { isCart: true },
    include: [ LineItem ]
  })
    .then(order => {
      if (order) return order;
      return Order.create();
    })
    .then(order => {
      let lineItem = order.lineitems && order.lineitems.find(li => li.productId === req.params.productId) ||
        LineItem.build({ orderId: order.id, productId: req.params.productId });
      Object.assign(lineItem, req.body);
      return lineItem.save();
    })
    .then(() => res.sendStatus(201))
    .catch(next)
});

router.delete('/:id/products/:productId', (req, res, next) => {
  // for DB team - to be replaced to reduce logic in api
  Order.findOne({
    where: { id: req.params.id },
    include: [{
      model: LineItem,
      where: { productId: req.params.productId }
    }]
  })
    .then(order => {
      if (order) {
        order.lineitems[0].destroy();
        return res.sendStatus(200);
      }
      res.sendStatus(404);
    })
    .catch(next)
});

module.exports = router;

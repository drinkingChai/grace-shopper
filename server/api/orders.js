const router = require('express').Router();
const { Order, LineItem, Product } = require('../../db').models;
const options = [{ model: LineItem, include: [ Product ] }];

router.get('/', (req, res, next) => {
  Order.findAll({
    where: { userId: req.session.data.userId },
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
  Order.findAll({ where: { userId: req.session.data.userId, status: req.query.status }})
    .then(orders => res.send(orders))
    .catch(next)
});

router.put('/check-out', (req, res, next) => {
  Order.findOne({
    where: { isCart: true, userId: req.session.data.userId }
  })
    .then(order => {
      if (!order) return res.sendStatus(404)
      Object.assign(order, { isCart: false, status: 'CREATED' });
      return order.save()
        .then(() => res.sendStatus(200));
    })
    .catch(next);
})

router.put('/products/:productId', (req, res, next) => {
    Order.updateCart(req.session.data.userId, req.params.productId * 1, req.body)
      .then(() => res.sendStatus(201))
      .catch(next);
});

router.delete('/:id/products/:productId', (req, res, next) => {
  Order.removeLineItem(req.params.id * 1, req.params.productId * 1)
    .catch(next);
});

module.exports = router;

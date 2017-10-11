const router = require('express').Router();
const { Order, LineItem, Product } = require('../../db').models;

router.get('/', (req, res, next) => {
  Order.findAll({
    where: { userId: req.session.data.userId },
    include: [{ model: LineItem, include: [ Product ] }],
    order: [
      [ LineItem, 'createdAt', 'ASC' ]
    ]
  })
    .then(orders => res.send(orders))
    .catch(next)
})

router.get('/filter', (req, res, next) => {
  Order.findAll({
    where: { userId: req.session.data.userId, status: req.query.status }
  })
    .then(orders => {
      res.send(orders)
    })
})

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { include: [{ model: LineItem, include: [ Product ] }] })
    .then(order => res.send(order))
    .catch(next)
})

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
  const { userId } = req.session.data;
    Order.addToCart(userId, req.params.productId * 1, req.body)
      .then(() => res.sendStatus(201))
      .catch(next);
});
  // Order.findOne({
  //   where: { isCart: true, userId: req.session.data.userId },
  //   include: [ LineItem ]
  // })
  //   .then(order => {
  //     if (order) return order
  //     return Order.create({ userId: req.session.data.userId })
  //   })
  //   .then(order => {
  //     let lineItem = order.lineitems && order.lineitems.find(li => li.productId == req.params.productId) ||
  //       LineItem.build({ orderId: order.id, productId: req.params.productId });

  //     if (req.body.quantity <= 0) return lineItem.destroy()
  //     Object.assign(lineItem, req.body);
  //     return lineItem.save();
  //   })

router.delete('/:id/products/:productId', (req, res, next) => {
  // for DB team - to be replaced to reduce logic in api
  Order.findOne({
    where: { id: req.params.id, userId: req.session.data.userId },
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
    .catch(next);
})

module.exports = router;

const orders = require('express').Router();
const { Order, LineItem } = require('../../db').models

orders.get('/', (req, res, next) => {
  Order.findAll({
    include: [{ model: LineItem, include: [ Product ] }]
  })
    .then(orders => res.send(orders))
    .catch(next)
})

orders.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { include: [{ model: LineItem, include: [ Product ] }] })
    .then(order => res.send(order))
    .catch(next)
})

orders.put('/products/:productId', (req, res, next) => {
  // replace with findCart
  Order.findOne({
    where: { isCart: true },
    include: [ LineItem ]
  })
    .then(order => {
      if (order) return order
      return Order.create()
    })
    .then(order => {
      let lineItem = order.lineitems && order.lineitems.find(li => li.productId == req.params.productId) ||
        LineItem.build({ orderId: order.id, productId: req.params.productId })
      Object.assign(lineItem, req.body)
      return lineItem.save()
    })
    .then(() => res.sendStatus(201))
    .catch(next)
})

orders.delete('/:id/products/:productId', (req, res, next) => {
  Order.findOne({
    where: { id: req.params.id },
    include: [{
      model: LineItem,
      where: { productId: req.params.productId }
    }]
  })
    .then(order => {
      if (order) {
        order.lineitems[0].destroy()
        return res.sendStatus(200)
      }
      res.sendStatus(404)
    })
    .catch(next)
})

module.exports = orders

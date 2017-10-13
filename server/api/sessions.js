const router = require('express').Router()
const { User, Order, LineItem } = require('../db').models

router.get('/', (req, res, next) => {
  res.send(req.session)
})

router.put('/', (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ where: { email, password } })
    .then(user => {
      if (!user) return res.sendStatus(401)

      req.session.userId = user.id
      return Order.findCart(user.id)
    })
    .then(cart => {
      /* if there are items in session
        and user cart is empty,
        create those line items and delete them from session */
      if (!cart.lineitems.length) {
        return Promise.all(
          req.session.cart.lineitems.map(lineItem => (
            LineItem.create({ orderId: cart.id, ...lineItem })
          )))
      }
    })
    .then(() => {
      delete req.session.cart
      res.sendStatus(200)
    })
})

router.delete('/', (req, res, next) => {
  delete req.session.userId
  req.session.cart = Order.build()
  res.sendStatus(200)
})

module.exports = router

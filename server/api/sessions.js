const router = require('express').Router()
const { User, Order, LineItem } = require('../db').models

router.get('/', (req, res, next) => {
  res.send(req.session)
})

router.put('/', (req, res, next) => {
  const { email, password } = req.body
  User.logIn(email, password, req.session.cart.lineitems)
    .then(userId => {
      req.session.userId = userId
      delete req.session.cart
      res.sendStatus(200)
    })
    .catch(() => res.sendStatus(401))
})

router.delete('/', (req, res, next) => {
  delete req.session.userId
  req.session.cart = Order.build()
  res.sendStatus(200)
})

module.exports = router

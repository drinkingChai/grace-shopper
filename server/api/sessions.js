const router = require('express').Router()
const { User, Order } = require('../db').models

router.get('/', (req, res, next) => {
  res.send(req.session)
})

router.put('/', (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ where: { email, password } })
    .then(user => {
      if (!user) return res.sendStatus(401)
      Order.findCart(user.id)
        .then(cart => {
          req.session.userId = user.id
          req.session.cart = cart 
          res.sendStatus(202)
        })
    })
})

router.delete('/', (req, res, next) => {
  delete req.session.userId
  req.session.cart = Order.build()
  res.sendStatus(200)
})

module.exports = router

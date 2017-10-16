const router = require('express').Router()
const { User, Order, LineItem } = require('../db').models
const { loadDataOnLogin, clearOnLogout } = require('./helpers/session-helper')

router.get('/', (req, res, next) => {
  res.send(req.session)
})

router.put('/', (req, res, next) => {
  const { email, password } = req.body
  User.logIn(email, password, req.session.cart.lineitems)
    .then(user => {
      req.session = loadDataOnLogin(user)
      res.sendStatus(200)
    })
    .catch(() => res.sendStatus(401))
})

router.delete('/', (req, res, next) => {
  req.session = clearOnLogout()
  res.sendStatus(200)
})

module.exports = router

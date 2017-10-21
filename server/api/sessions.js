const router = require('express').Router()
const { User, Order, LineItem } = require('../db').models
const { loadDataOnLogin, clearOnLogout } = require('./helpers/session-helper')

router.get('/', (req, res, next) => {
  if (!req.session.userId) return res.send(req.session)

  User.findById(req.session.userId)
    .then(user => {
      req.session = loadDataOnLogin(user)
      res.send(req.session)
    })
    .catch(next)
})

router.put('/guest-to-user', (req, res, next) => {
  const { email, name, password } = req.body
  User.convertGuestoUser(req.session.guestUserId, email, name, password)
    .then(user => {
      req.session = loadDataOnLogin(user)
      res.sendStatus(200)
    })
    .catch(err => res.status(401).send(err))
})

router.put('/', (req, res, next) => {
  const { email, password } = req.body
  User.logIn(email, password, req.session.cart.lineitems)
    .then(user => {
      req.session = loadDataOnLogin(user)
      if (user.passwordChange) return Promise.reject('password change required')
      res.sendStatus(200)
    })
    .catch(err => res.status(401).send(err))
})

router.delete('/', (req, res, next) => {
  req.session = clearOnLogout()
  res.sendStatus(200)
})

module.exports = router

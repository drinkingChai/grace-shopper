const users = require('express').Router()
const { User } = require('../db').models
const { requireAdmin } = require('./middlewares')

users.get('/', requireAdmin, (req, res, next) => {
  User.findUsers()
    .then(users => res.send(users))
    .catch(next)
})

users.post('/add-user', requireAdmin, (req, res, next) => {
  User.createUser(req.body)
    .then(() => res.sendStatus(201))
    .catch(next)
})

users.put('/update-user/:id', requireAdmin, (req, res, next) => {
  User.updateUser(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

users.put('/disable-user/:id', requireAdmin, (req, res, next) => {
  User.updateUser(req.params.id, { isDisabled: true })
    .then(() => res.sendStatus(200))
    .catch(next)
})

users.put('/enable-user/:id', requireAdmin, (req, res, next) => {
  User.updateUser(req.params.id, { isDisabled: false })
    .then(() => res.sendStatus(200))
    .catch(next)
})

users.delete('/delete-user/:id', requireAdmin, (req, res, next) => {
  User.deleteUser(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

users.post('/', (req, res, next) => {
  User.createUser(req.body)
    .then(() => res.sendStatus(201))
    .catch(next)
})

users.put('/update-password', (req, res, next) => {
  User.updatePassword(req.session.userId, req.body)
    .then(() => res.sendStatus(202))
    .catch(next)
})

users.put('/', (req, res, next) => {
  User.updateUser(req.session.userId, req.body)
    .then(() => res.sendStatus(202))
    .catch(next)
})

module.exports = users

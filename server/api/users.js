const users = require('express').Router()
const { User } = require('../db').models

users.post('/', (req, res, next) => {
  User.createUser(req.body)
    .then(() => res.sendStatus(202))
    .catch(next)
})

module.exports = users

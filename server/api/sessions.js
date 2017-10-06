const sessions = require('express').Router()
const { Session, User } = require('../../db').models

sessions.post('/', (req, res, next) => {
})

sessions.delete('/', (req, res, next) => {
})

module.exports = sessions

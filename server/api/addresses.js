const router = require('express').Router()
const { Address } = require('../db').models

router.get('/all', requireAdmin, (req, res, next) => {
  Address.findAll()
    .then(addresses => res.send(addresses))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Address.findByUserId(req.session.userId)
    .then(addresses => res.send(addresses))
    .catch(next);
})

router.post('/', (req, res, next) => {
  if (!req.session.userId) return res.sendStatus(401)

  Address.createOne(req.session.userId, req.body)
    .then(address => res.send(address))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Address.updateOne(req.params.id, req.session.userId, req.body)
    .then(address => res.send(address))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Address.deleteOne(req.params.id, req.session.userId )
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router

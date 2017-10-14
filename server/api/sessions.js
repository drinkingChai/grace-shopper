const router = require('express').Router();
const { Session } = require('../db').models;

router.get('/', (req, res, next) => {
  Session.findSession(req.session.id)
    .then(session => {
      if (!session) return res.sendStatus(401);
      res.send(session.data);
    })
    .catch(next);
});

router.put('/', (req, res, next) => {
  Session.updateSession(req.body, req.session)
    .then(session => {
      if (!session) return res.sendStatus(404);
      return res.sendStatus(202);
    })
    .catch(next);
});

router.delete('/', (req, res, next) => {
  return Session.deleteSession(req.session.id)
    .then(() => res.sendStatus(201))
    .catch(next);
});

module.exports = router;

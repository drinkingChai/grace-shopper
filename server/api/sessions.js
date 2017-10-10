const sessions = require('express').Router();
const { Session, User } = require('../../db').models;

sessions.get('/', (req, res, next) => {
  if (req.session && req.session.id) {
    Session.findById(req.session.id)
      .then(session => {
        if (!session) {
          delete req.session.id
          // can change sendStatus to status(200).send('session not found')?
          return res.sendStatus(401)
        }
        res.send(session.data);
      })
  } else res.sendStatus(401)
})

sessions.put('/', (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ where: { email, password }, include: [ Session ]})
    .then(user => {
      if (user) {
        // data to store
        req.session.data = {
          userId: user.id,
          name: user.name,
          email: user.email
        }
        
        const sessionData = user.sessions.find(sess => sess.isActive) || Session.build({ userId: user.id });
        Object.assign(sessionData, { data: req.session.data });

        return sessionData.save()
          .then(session => {
            req.session.id = session.id
            res.sendStatus(202)
          })
      } else next();
    })
    .catch(next);
})

sessions.delete('/', (req, res, next) => {
  if (req.session && req.session.id) {
    Session.findById(req.session.id)
      .then(session => {
        if (session) Object.assign(session, { isActive: false })
        else return next()
        session.save()
          .then(() => {
            delete req.session.id
            delete req.session.data
            res.sendStatus(200)
          })
      })
  } else next();
})

module.exports = sessions

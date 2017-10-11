const { Session } = require('../../../db').models

const checkSession = (req, res, next) => {
  Session.findById(req.session.id)
    .then(session => {
      if (!session) {
        delete req.session.id;
        delete req.session.data;
        res.sendStatus(401)
      }
      req.session.data = session.data;
      next()
    })
}

module.exports = {
  checkSession
}

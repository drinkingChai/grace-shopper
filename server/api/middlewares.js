/* we won't need more than this
 * but we can refactor to a folder if we need */
const { User } = require('../db').models

module.exports.requireAdmin = (req, res, next) => {
  if (!req.session.userId) return res.sendStatus(401)

  User.findById(req.session.userId)
    .then(user => {
      if (!user || !user.isAdmin) return res.sendStatus(401)
      next()
    })
}

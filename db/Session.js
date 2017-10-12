const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Session = conn.define('session', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    validate: { notEmpty: true }
  },
  data: {
    type: Sequelize.JSON
  }
});

Session.findSession = function(id) {
  return Session.findById(id)
    .then(session => {
      if (!session) return id.destroy();
      return session;
    })
};


// sessions.get('/', (req, res, next) => {
//   if (req.session && req.session.id) {
//     Session.findById(req.session.id)
//       .then(session => {
//         if (!session) {
//           delete req.session.id
//           // can change sendStatus to status(200).send('session not found')?
//           return res.sendStatus(401)
//         }
//         res.send(session.data);
//       })
//   } else res.sendStatus(401)
// })

module.exports = Session;

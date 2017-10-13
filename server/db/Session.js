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
      if (!session) return Session.destroy({ where: { id }});
      return session;
    })
};

Session.deleteSession = function(id) {
  return Session.findById(id)
    .then(session => {
      if (session) Object.assign(session, { isActive: false });
      else return;
    })
};


module.exports = Session;

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
        console.log('found: ', session)
        if (!session) return Session.destroy({ where: { id }});
        return session;
      })
};



module.exports = Session;

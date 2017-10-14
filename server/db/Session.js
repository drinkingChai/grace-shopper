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
      if (!session) return;
      return session;
    })
};

Session.updateSession = function(reqBody, reqSession) {
  return conn.models.user.findOne({ where: reqBody, include: [ Session ]})
    .then(user => {
      if (!user) return;
      reqSession.data = { userId: user.id, name: user.name, email: user.email };
      const sessionData = user.sessions.find(sess => sess.isActive) || Session.build({ userId: user.id });
      Object.assign(sessionData, { data: reqSession.data });
      return sessionData.save()
        .then(session => {
          reqSession.id = session.id;
          return reqSession;
        })
    })
};

Session.deleteSession = function(id) {
  return Session.findById(id)
    .then(session => {
      if (!session) return;
      return session.destroy();
    })
};

module.exports = Session;

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
})

module.exports = Session;

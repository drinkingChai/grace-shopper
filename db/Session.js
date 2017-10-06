const Sequelize = require('sequelize')
const conn = require('./conn')

const Session = conn.define('session', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    validate: { notEmpty: true }
  }
})

module.exports = Session

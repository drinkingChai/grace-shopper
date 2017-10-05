const Sequelize = require('sequelize');
const conn = require('./conn');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  }
});

module.exports = User;

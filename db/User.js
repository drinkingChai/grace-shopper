const Sequelize = require('sequelize');
const conn = require('./conn');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    validate: { notEmpty: { msg: 'User name is required.' }}
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      unique: true,
      validate: { notEmpty: { msg: 'Email is required.' }}
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: { notEmpty: { msg: 'Password is required.' }}
  }
});

module.exports = User;

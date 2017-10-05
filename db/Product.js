const Sequelize = require('sequelize');
const conn = require('./conn');

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Product;

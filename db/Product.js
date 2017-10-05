const Sequelize = require('sequelize');
const conn = require('./conn');

const Product = conn.define('product', {
  name: Sequelize.STRING
});

module.exports = Product;

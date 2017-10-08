const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'Product name is required.' }}
  },
  description: {
    type: Sequelize.TEXT,
    validate: { notEmpty: { msg: 'Product description is required.' }}
  },
  price: {
    type: Sequelize.FLOAT,
    validate: { notEmpty: { msg: 'Price is required.' }}
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://placekitten.com/g/450/300'
  }
});

module.exports = Product;

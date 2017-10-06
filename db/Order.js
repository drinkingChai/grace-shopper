const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Order = conn.define('order', {
  address: {
    type: Sequelize.STRING,
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Order;

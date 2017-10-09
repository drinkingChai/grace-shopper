const conn = require('./conn');
const Sequelize = conn.Sequelize;

const LineItem = conn.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = LineItem;

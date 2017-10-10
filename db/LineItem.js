const conn = require('./conn');
const Sequelize = conn.Sequelize;

const LineItem = conn.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = LineItem;

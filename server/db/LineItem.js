const conn = require('./conn');
const Sequelize = conn.Sequelize;

const LineItem = conn.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    set (value) {
      if (value < 1) return this.destroy()
      return this.setDataValue('quantity', value)
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = LineItem;

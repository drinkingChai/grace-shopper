const conn = require('./conn');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');

// associations here

Order.hasMany(LineItem);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

const sync = () => conn.sync();

module.exports = {
  sync,
  models: {
    Product,
    Order,
    LineItem
  }
}

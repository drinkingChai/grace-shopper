const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');

// Associations

Order.belongsTo(User);
User.hasMany(Order)
Order.hasMany(LineItem);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

Review.belongsTo(User);
Review.belongsTo(Product);

const sync = () => conn.sync();

module.exports = {
  sync,
  models: {
    User,
    Product,
    Order,
    LineItem,
    Review
  }
}

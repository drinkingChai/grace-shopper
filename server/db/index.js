const conn = require('./conn');
const Session = require('./Session');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');

// Associations

Order.belongsTo(User);
Order.hasMany(LineItem);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

Review.belongsTo(User);
Review.belongsTo(Product);

Session.belongsTo(User);
User.hasMany(Session);

const sync = () => conn.sync();

module.exports = {
  sync,
  models: {
    Session,
    User,
    Product,
    Order,
    LineItem,
    Review
  }
}

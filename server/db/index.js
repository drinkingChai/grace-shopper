const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');
const Category = require('./Category');
const Address = require('./Address');

// Associations

Order.belongsTo(User);
User.hasMany(Order)
Order.hasMany(LineItem);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

Review.belongsTo(User);
Review.belongsTo(Product);
Product.hasMany(Review);

Address.belongsTo(User);
User.hasMany(Address);

Product.belongsToMany(Category, { as: 'categories', through: 'catalog', foreignKey: 'productId' });
Category.belongsToMany(Product, { as: 'products', through: 'catalog', foreignKey: 'categoryId' });

const sync = () => conn.sync();

module.exports = {
  sync,
  models: {
    User,
    Product,
    Order,
    LineItem,
    Review,
    Category
  }
}

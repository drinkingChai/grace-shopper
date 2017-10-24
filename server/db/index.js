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

// join table
const Catalog = conn.define('catalog', { status: conn.Sequelize.DataTypes.STRING });

Product.belongsToMany(Category, { through: 'Catalog' });
Category.belongsToMany(Product, { through: 'Catalog' });

const sync = () => conn.sync();

module.exports = {
  sync,
  models: {
    User,
    Product,
    Order,
    LineItem,
    Review,
    Category,
    Catalog
  }
}

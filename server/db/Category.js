const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Category = conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Category;

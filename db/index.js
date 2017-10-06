const conn = require('./conn');
const Product = require('./Product');
const Session = require('./Session');
const User = require('./User');

// associations here

Session.belongsTo(User)
User.hasMany(Session)

const sync = () => conn.sync();

module.exports = {
  sync,
  models: {
    Product,
    Session,
    User
  }
}

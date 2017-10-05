const conn = require('./conn');
const Product = require('./Product');

// associations here

const sync = () => conn.sync();

module.exports = {
  sync,
  models: {
    Product
  }
}

const conn = require('./conn');
const Product = require('./Product');

// associations here
// test
const sync = () => conn.sync();

module.exports = {
  sync,
  models: {
    Product
  }
}

const conn = require('./conn')
const Product = require('./Product')
const seed = require('./seed')

// associations here

const sync = () => conn.sync()

module.exports = {
  sync,
  models: {
    Product
  }
}

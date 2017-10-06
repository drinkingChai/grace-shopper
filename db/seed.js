const conn = require('./conn');
const { Product, LineItem, Order } = require('./index').models;

const seed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        Product.create({ name: 'foooooo' }),
        Product.create({ name: 'barrrr' })
      ])
    })
}

seed()
  .then(() => console.log('database seeded'))
  .then(() => conn.close())

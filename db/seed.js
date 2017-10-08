const conn = require('./conn');
const { User, Product, LineItem, Order } = require('./index').models;

const seed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ name: 'fooo', email: 'foo@bar.baz', password: 'a' }),
        Product.create({ name: 'foooooo' }),
        Product.create({ name: 'barrrr' })
      ])
    })
}

seed()
  .then(() => console.log('database seeded'))
  .then(() => conn.close())

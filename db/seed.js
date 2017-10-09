const conn = require('./conn');
const { User, Product, LineItem, Order } = require('./index').models;

const seed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ name: 'FooUser1', email: 'foo1@foo.com', password: 'foo1' }),
        User.create({ name: 'FooUser2', email: 'foo2@foo.com', password: 'foo2' }),
        User.create({ name: 'BarUser', email: 'bar@bar.com', password: 'bar1' }),
        User.create({ name: 'BazzUser', email: 'bazz@bazz.com', password: 'bazz1' }),
        User.create({ name: 'QugUser', email: 'qug@qug.com', password: 'qug1' }),
        Product.create({ name: 'Foo 1', description: 'A great foo product.', price: '10', inventoryQuantity: '5' }),
        Product.create({ name: 'Foo 2', description: 'A great foo product.', price: '5', inventoryQuantity: '20' }),
        Product.create({ name: 'Bar 1', description: 'A great bar product.', price: '5', inventoryQuantity: '10' }),
        Product.create({ name: 'Bar 2', description: 'A great bar product.', price: '7', inventoryQuantity: '4' }),
        Product.create({ name: 'Bazz 1', description: 'A great bazz product.', price: '20', inventoryQuantity: '2' }),
        Product.create({ name: 'Bazz 2', description: 'A great bazz product.', price: '10', inventoryQuantity: '20' }),
        Product.create({ name: 'Qug', description: 'A great qug product.', price: '15', inventoryQuantity: '5' })
      ])
    })
}

seed()
  .then(() => console.log('database seeded'))
  .then(() => conn.close())

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
        Product.create({ name: 'Headphones', description: 'Very hip.', price: '300', inventoryQuantity: '50', photo: 'https://static.pexels.com/photos/373918/pexels-photo-373918.jpeg' }),
        Product.create({ name: 'Skateboard', description: 'On fleek.', price: '90', inventoryQuantity: '30', photo: 'https://static.pexels.com/photos/4787/feet-hipster-longboard-skateboard.jpg' }),
        Product.create({ name: 'MacBook', description: 'Laptop.', price: '1000', inventoryQuantity: '100', photo: 'https://static.pexels.com/photos/434346/pexels-photo-434346.jpeg' }),
        Product.create({ name: 'Green Bike', description: 'Bike.', price: '200', inventoryQuantity: '5', photo: 'https://static.pexels.com/photos/2242/wall-sport-green-bike.jpg' }),
        Product.create({ name: 'Camera', description: 'Photos.', price: '250', inventoryQuantity: '20', photo: 'https://static.pexels.com/photos/6103/woman-hand-legs-camera.jpg' }),
        Product.create({ name: 'Banjo', description: 'Be that guy!', price: '70', inventoryQuantity: '5', photo: 'https://static.pexels.com/photos/387/man-person-wall-music.jpg' })
      ])
    })
}

seed()
  .then(() => console.log('database seeded'))
  .then(() => conn.close())

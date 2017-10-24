const conn = require('./conn');
const { User, Product, LineItem, Order, Category } = require('./index').models;

const users = [
  { name: 'Wasif', email: 'wasif@gs.com', password: 'foo', isAdmin: true },
  { name: 'Dan', email: 'dan@gs.com', password: 'foo', isAdmin: true },
  { name: 'Anthony', email: 'anthony@gs.com', password: 'foo' },
  { name: 'Burcu', email: 'burcu@gs.com', password: 'foo' },
  { name: 'Prof', email: 'prof@gs.com', password: 'foo' }
];

const seed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        Product.create({ name: 'Headphones I', description: 'Very hip.', price: '300', inventoryQuantity: '50', photo: '../../public/images/headphones-1.jpg' }),
        Product.create({ name: 'Headphones II', description: 'Coolest.', price: '500', inventoryQuantity: '50', photo: '../../public/images/headphones-2.jpg' }),
        Product.create({ name: 'Skateboard', description: 'On fleek.', price: '90', inventoryQuantity: '30', photo: '../../public/images/skateboard.jpg' }),
        Product.create({ name: 'MacBook Air', description: '13-inch Apple laptop.', price: '1000', inventoryQuantity: '100', photo: '../../public/images/macbook-air.jpg' }),
        Product.create({ name: 'Bike I', description: 'Color: Green', price: '200', inventoryQuantity: '5', photo: '../../public/images/green-bike.jpg' }),
        Product.create({ name: 'Bike II', description: 'Color: Blue', price: '300', inventoryQuantity: '15', photo: '../../public/images/blue-bike.jpg' }),
        Product.create({ name: 'Bike III', description: 'Color: Black', price: '350', inventoryQuantity: '10', photo: '../../public/images/black-bike.jpg' }),
        Product.create({ name: 'Camera I', description: 'Type: Vintage', price: '250', inventoryQuantity: '20', photo: '../../public/images/camera-1.jpg' }),
        Product.create({ name: 'Camera II', description: 'Type: Vintage', price: '150', inventoryQuantity: '10', photo: '../../public/images/camera-2.jpg' }),
        Product.create({ name: 'Banjo', description: 'Be that guy!', price: '70', inventoryQuantity: '5', photo: '../../public/images/banjo.jpg' }),
        Product.create({ name: 'Guitar', description: 'Classic.', price: '100', inventoryQuantity: '30', photo: '../../public/images/guitar.jpg' }),
        Product.create({ name: 'iPhone', description: 'Apple iPhone 6s.', price: '600', inventoryQuantity: '25', photo: '../../public/images/iphone.jpg' }),
        Category.create({ name: 'Electronics' }),
        Category.create({ name: 'Photography' }),
        Category.create({ name: 'Bikes' }),
        Category.create({ name: 'Music' }),
      ])
    })
    .then(([ headphones1, headphones2, skateboard, macbookAir, bike1, bike2, bike3, camera1, camera2, banjo, guitar, iphone, electronics, photography, bikes, music ]) => {
      return Promise.all([
        electronics.setProducts([ headphones1, headphones2, macbookAir, iphone ]),
        photography.setProducts([ camera1, camera2 ]),
        bikes.setProducts([ bike1, bike2, bike3 ]),
        music.setProducts([ headphones1, headphones2, banjo, guitar ])
      ])
    })
    .then(() => Promise.all(users.map(user => User.createUser(user))))
};

seed()
  .then(() => console.log('database seeded without any t-shirts'))
  .then(() => conn.close());

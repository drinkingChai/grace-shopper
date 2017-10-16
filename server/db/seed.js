const conn = require('./conn');
const { User, Product, LineItem, Order } = require('./index').models;

const products = [
  { name: 'Headphones I', description: 'Very hip.', price: '300', inventoryQuantity: '50', photo: '../../public/images/headphones-1.jpg' },
  { name: 'Headphones II', description: 'Coolest.', price: '500', inventoryQuantity: '50', photo: '../../public/images/headphones-2.jpg' },
  { name: 'Skateboard', description: 'On fleek.', price: '90', inventoryQuantity: '30', photo: '../../public/images/skateboard.jpg' },
  { name: 'MacBook Air', description: '13-inch Apple laptop.', price: '1000', inventoryQuantity: '100', photo: '../../public/images/macbook-air.jpg' },
  { name: 'Bike I', description: 'Color: Green', price: '200', inventoryQuantity: '5', photo: '../../public/images/green-bike.jpg' },
  { name: 'Bike II', description: 'Color: Blue', price: '300', inventoryQuantity: '15', photo: '../../public/images/blue-bike.jpg' },
  { name: 'Bike III', description: 'Color: Black', price: '350', inventoryQuantity: '10', photo: '../../public/images/black-bike.jpg' },
  { name: 'Camera I', description: 'Type: Vintage', price: '250', inventoryQuantity: '20', photo: '../../public/images/camera-1.jpg' },
  { name: 'Camera II', description: 'Type: Vintage', price: '150', inventoryQuantity: '10', photo: '../../public/images/camera-2.jpg' },
  { name: 'Banjo', description: 'Be that guy!', price: '70', inventoryQuantity: '5', photo: '../../public/images/banjo.jpg' },
  { name: 'Guitar', description: 'Classic.', price: '100', inventoryQuantity: '30', photo: '../../public/images/guitar.jpg' },
  { name: 'iPhone', description: 'Apple iPhone 6s.', price: '600', inventoryQuantity: '25', photo: '../../public/images/iphone.jpg' }
];

const users = [
  { name: 'Wasif', email: 'wasif@gs.com', password: 'foo' },
  { name: 'Dan', email: 'dan@gs.com', password: 'foo' },
  { name: 'Anthony', email: 'anthony@gs.com', password: 'foo' },
  { name: 'Burcu', email: 'burcu@gs.com', password: 'foo' },
  { name: 'Prof', email: 'prof@gs.com', password: 'foo' }
];

const seed = () => {
  return conn.sync({ force: true })
    .then(() => Promise.all(products.map(product => Product.create(product))))
    .then(() => Promise.all(users.map(user => User.createUser(user))))
};

seed()
  .then(() => console.log('database seeded'))
  .then(() => conn.close());

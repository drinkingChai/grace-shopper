const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'Product name is required.' }}
  },
  description: {
    type: Sequelize.TEXT,
    validate: { notEmpty: { msg: 'Product description is required.' }}
  },
  price: {
    type: Sequelize.FLOAT,
    validate: { notEmpty: { msg: 'Price is required.' }}
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://placekitten.com/g/450/300'
  }
});

Product.findProducts = function() {
  return Product.findAll({
    // include users that wrote the review but only include their names
    include: [ {
      model: conn.models.review,
        include: [{
          model: conn.models.user,
          attributes: ['name']
        }]

    }]
  })
}

Product.checkInventory = function(productId, quantity) {
  return Product.findById(productId)
    .then(product => {
      if (product.inventoryQuantity + quantity < 0) return Promise.reject(new Error('Not enough items'))
    })
}

Product.updateInventoryBy = function(productId, quantity) {
  return Product.findById(productId)
    .then(product => {
      const inventoryQuantity = product.inventoryQuantity + quantity

      Object.assign(product, { inventoryQuantity })
      return product.save()
    })
}

Product.createProduct = function(params){
  return Product.create(params)
}

module.exports = Product;

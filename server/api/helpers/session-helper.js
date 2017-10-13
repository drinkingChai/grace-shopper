const { Product, LineItem } = require('../../db').models

const updateSessionCart = (cart, productId, reqBody) => {
  return Product.findById(productId)
    .then(product => {
      // doing a product query to add product data to lineItem
      if (!product) Promise.reject(new Error('Product not found'))

      // build lineItem object //
      let lineItem = LineItem.build({ productId });
      Object.assign(lineItem, reqBody);

      /* can't add properties to lineItem because it's constructed by Sequelize
      without serialization and deserialization */
      lineItem = JSON.parse(JSON.stringify(lineItem))
      lineItem.product = product
      // ==== //

      // find or push
      const liIndex = cart.lineitems.findIndex(li => li.productId == productId)
      liIndex < 0 ? cart.lineitems.push(lineItem) : cart.lineitems[liIndex] = lineItem
      
      // update session
      return cart
    })
    .catch(err => err)
}

module.exports = {
  updateSessionCart
}

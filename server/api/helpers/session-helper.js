const { Product, LineItem } = require('../../db').models

const updateSessionCart = (cart, productId, updateData) => {
  return Product.findById(productId)
    .then(product => {
      if (!product) return Promise.reject('Product not found')

      if (updateData.quantity <= 0) return cart.lineitems.filter(li => li.productId != productId)

      // ==== build lineitem object ==== //
      let lineItem = LineItem.build({ productId: product.id });
      Object.assign(lineItem, updateData);

      /* can't add properties to lineItem because it's constructed by Sequelize
        without serialization and deserialization */
      lineItem = JSON.parse(JSON.stringify(lineItem))
      lineItem.product = product
      // =============================== //

      // find or push
      const liIndex = cart.lineitems.findIndex(li => li.productId == product.id)
      liIndex < 0 ? cart.lineitems.push(lineItem) : cart.lineitems[liIndex] = lineItem

      return cart
    })
}

module.exports = {
  updateSessionCart
}

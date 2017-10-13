const { Product, LineItem } = require('../../db').models

const updateSessionCart = (cart, productId, updateData) => {
  // Promise resolve to make it thenable
  if (updateData.quantity <= 0) return Promise.resolve(cart.lineitems.filter(li => li.productId != productId))

  return Product.findById(productId)
    .then(product => {
      if (!product) return res.sendStatus(404)

      // build lineitem object //
      let lineItem = LineItem.build({ productId: product.id });
      Object.assign(lineItem, updateData);

      /* can't add properties to lineItem because it's constructed by Sequelize
        without serialization and deserialization */
      lineItem = JSON.parse(JSON.stringify(lineItem))
      lineItem.product = product
      // ==== //

      // find or push
      const liIndex = cart.lineitems.findIndex(li => li.productId == product.id)
      liIndex < 0 ? cart.lineitems.push(lineItem) : cart.lineitems[liIndex] = lineItem

      return cart
    })
}

module.exports = {
  updateSessionCart
}

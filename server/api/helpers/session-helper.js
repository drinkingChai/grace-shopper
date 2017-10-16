const { Order, Product, LineItem } = require('../../db').models

const loadDataOnLogin = user => {
  return {
    userId: user.id,
    name: user.name,
  }
}

const clearOnLogout = () => {
  const cart = JSON.parse(JSON.stringify(Order.build()))
  cart.lineitems = []
  return { cart }
}

const updateSessionCart = (cart, productId, updateData) => {
  return Product.findById(productId)
    .then(product => {
      if (!product) return Promise.reject('Product not found')

      // if removing item
      if (updateData.quantity <= 0) {
        cart.lineitems = cart.lineitems.filter(li => li.productId != product.id)
        return cart
      }

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
  updateSessionCart,
  loadDataOnLogin,
  clearOnLogout
}

const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Order = conn.define('order', {
  address: {
    type: Sequelize.STRING,
    validate: { notEmpty: { msg: 'Address is required.' }}
  },
  paymentInfo: {
    type: Sequelize.STRING,
    validate: { notEmpty: { msg: 'Payment info is required.' }}
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  status: {
    type: Sequelize.STRING
  }
});

// methods
Order.findCart = function(userId) {
  return Order.findOne({
    where: { isCart: true, userId },
    include: [{
      model: conn.models.lineitem,
      include: [ conn.models.product ]
    }]
  })
    .then(order => {
      if (order) return order;
      //return Order.create({ userId });
    })
};

Order.checkOut = function(userId, body) {
  return this.findCart(userId)
    .then(order => {
      console.log(order)
      const { address, paymentInfo } = body
      return order.changeCartToOrder(address, paymentInfo)
    })
    .then(() => Order.create({ userId }))
};

Order.updateCart = function(userId, productId, updateData) {
  return this.findCart(userId)
    .then(order => {
      let lineItem = order.lineitems && order.lineitems.find(li => li.productId === productId) ||
        conn.models.lineitem.build({ orderId: order.id, productId });

      if (reqBody.quantity < 1) return lineItem.destroy();
      Object.assign(lineItem, updateData);
      return lineItem.save();
    })
};

Order.removeLineItem = function(orderId, id) {
  console.log('here')
  return conn.models.lineitem.destroy({ where: { id, orderId }});
};

Order.prototype.changeCartToOrder = function(address, paymentInfo) {
  // if number of items in cart is empty, return error
  if (!this.lineitems.length) return Promise.reject('Cart is empty')

  // REMOVE THE HARDCODED ADDRESS AND CC INFO BELOW!!
  // if falsy, set to empty string to use Sequelize validation error
  Object.assign(this, {
    address: address || 'New York',
    paymentInfo: paymentInfo || 'Credit Cart',
    isCart: false,
    status: 'CREATED' })
  return this.save()
}

module.exports = Order;

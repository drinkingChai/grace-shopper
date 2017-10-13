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
      const { address, paymentInfo } = body
      return order.changeCartToOrder(address, paymentInfo)
    })
    .then(() => Order.create({ userId }))
    //.then(order => {
      //if (!order.lineitems.length) return null;
      //Object.assign(order, { isCart: false, status: 'CREATED' });
      //return order.save();
    //})
};

Order.updateCart = function(userId, productId, reqBody) {
  return this.findCart(userId)
    .then(order => {
      let lineItem = order.lineitems && order.lineitems.find(li => li.productId === productId) ||
        conn.models.lineitem.build({ orderId: order.id, productId });

      if (reqBody.quantity < 1) return lineItem.destroy();
      Object.assign(lineItem, reqBody);
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

  // if falsy, set to empty string to use Sequelize validation error
  Object.assign(this, {
    address: address || '',
    paymentInfo: paymentInfo || '',
    isCart: false,
    status: 'CREATED' })
  return this.save()
}

module.exports = Order;

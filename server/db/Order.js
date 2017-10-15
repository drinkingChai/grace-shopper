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

// Class Methods:

Order.findOrders = function(userId) {
  return Order.findAll({
    where: { userId },
    include: [{ model: conn.models.lineitem, include: [ conn.models.product ] }],
    order: [[ conn.models.lineitem, 'createdAt', 'ASC' ]]
  })
};

Order.findOrder = function(id) {
  return Order.findById(id, {
    include: [{ model: conn.models.lineitem, include: [ conn.models.product ] }]
  });
};

Order.findFiltered = function(userId, status) {
  return Order.findAll({ where: { userId, status }});
};

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
    })
};

Order.checkOut = function(userId, body) {
  // TODO: guest does not have userId. ask guest to create an account.
  return this.findCart(userId)
    .then(order => {
      const { address, paymentInfo } = body;
      return order.changeCartToOrder(address, paymentInfo);
    })
    .then(() => Order.create({ userId }))
};

Order.updateCart = function(userId, productId, updateData) {
  return this.findCart(userId)
    .then(order => {
      let lineItem = order.lineitems && order.lineitems.find(li => li.productId === productId) ||
        conn.models.lineitem.build({ orderId: order.id, productId });

      if (updateData.quantity < 1) return lineItem.destroy();
      Object.assign(lineItem, updateData);
      return lineItem.save();
    })
};

Order.removeLineItem = function(orderId, id) {
  return conn.models.lineitem.destroy({ where: { id, orderId }});
};

// Instance Methods:

Order.prototype.changeCartToOrder = function(address, paymentInfo) {
  // if number of items in cart is empty, return error
  if (!this.lineitems.length) return Promise.reject('Cart is empty');

  // if falsy, set to empty string to use Sequelize validation error
  Object.assign(this, {
    address: address || '',
    paymentInfo: paymentInfo || '',
    isCart: false,
    status: 'CREATED' });
  return this.save();
};

module.exports = Order;

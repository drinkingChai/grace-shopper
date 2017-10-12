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

Order.findCart = function (userId) {
  return Order.findOne({
    where: { isCart: true, userId },
    include: [ conn.models.lineitem ]
  })
    .then(order => {
      if (order) return order;
      return Order.create({ userId });
    })
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

module.exports = Order;

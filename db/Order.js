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

Order.findCart = function(userId, productId, reqBody) {
  return Order.findOne({
    where: { isCart: true, userId },
    include: [ conn.models.lineitem ]
  })
    .then(order => {
      if (order) return order
      return Order.create({ userId })
    })
    .then(order => {
      let lineItem = order.lineitems && order.lineitems.find(li => li.productId === productId) ||
        conn.models.lineitem.build({ orderId: order.id, productId });

      if (reqBody.quantity <= 0) return lineItem.destroy()
      Object.assign(lineItem, reqBody);
      return lineItem.save();
    })
}


module.exports = Order;

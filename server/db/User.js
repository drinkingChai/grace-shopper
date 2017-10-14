const conn = require('./conn');
const Sequelize = conn.Sequelize;

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    validate: { notEmpty: { msg: 'User name is required.' }}
  },
  email: {
    type: Sequelize.STRING,
    isUnique: true,
    validate: {
      isEmail: true,
      notEmpty: { msg: 'Email is required.' }
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: { notEmpty: { msg: 'Password is required.' }}
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

User.createUser = function(params) {
  return User.create(params)
    .then(user => conn.models.order.create({ userId: user.id }))
}

User.logIn = function(email, password, sessionCartItems) {
  return this.findOne({ where: { email, password } })
    .then(user => {
      return conn.models.order.findCart(user.id)
        .then(cart => {
          /* if there are items in session
              and user cart is empty,
              create those line items and delete them from session */
          if (!cart.lineitems.length) {
            return Promise.all(
              sessionCartItems.map(lineitem => (
                conn.models.lineitem.create({ orderId: cart.id, ...lineitem })))
            )
          }
        })
        .then(() => user.id)
    })
}

module.exports = User;

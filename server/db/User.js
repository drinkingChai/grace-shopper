const faker = require('faker')
const conn = require('./conn');
const Sequelize = conn.Sequelize;

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'User name is required.' }}
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: { msg: 'Email is required.' }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'Password is required.' }}
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isDisabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

User.createUser = function(params) {
  return User.create(params)
    .then(user => {
      return conn.models.order.create({ userId: user.id })
        .then(() => user)
    })
}

User.createGuest = function(params) {
  let user = User.build({
    ...params,
    /* create random password using faker
     * maybe a better randomizer later */
    password: faker.internet.password(),
    name: 'guest'
  })

  return user.save()
    .then(user => {
      return conn.models.order.create({ userId: user.id })
        .then(() => user)
    })
}

User.logIn = function(email, password, sessionCartItems) {
  return this.findOne({ where: { email, password, isDisabled: false } })
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
        .then(() => user)
    })
}

User.updatePassword = function(userId, passwordData) {
  const { oldPassword, password } = passwordData
  return User.findById(userId)
    .then(user => {
      if (user.password !== oldPassword) return Promise.reject('Password error!')
      Object.assign(user, { password })
      return user.save()
    })
}

// admin functions

User.findUsers = function() {
  // high cost query?
  return User.findAll({
    include: [{
      model: conn.models.order,
      include: [{
        model: conn.models.lineitem,
        include: [ conn.models.product ]
      }]
    }]
  })
}

User.updateUser = function(userId, userData) {
  return User.findById(userId)
    .then(user => {
      Object.assign(user, { ...userData })
      return user.save()
    })
}

User.deleteUser = function(userId) {
  return User.findById(userId)
    .then(user => user.destroy())
}

module.exports = User;

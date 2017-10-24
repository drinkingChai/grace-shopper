const crypto = require('crypto')
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
  salt: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isDisabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isGuest: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  passwordChange: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  googleId: {
    type: Sequelize.STRING  
  }
});


User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

User.createUser = function(params) {
  return User.create(params)
    .then(user => {
      return conn.models.order.create({ userId: user.id })
        .then(() => user)
    })
}

User.createGuest = function(params) {
  let user = User.build(
    Object.assign({
      password: faker.internet.password(),
      name: 'guest',
      isGueset: true
    },
    params
    /* create random password using faker
     * maybe a better randomizer later */
    )
    
  )

  return user.save()
    .then(user => {
      return conn.models.order.create({ userId: user.id })
        .then(() => user)
    })
}

User.convertGuestoUser = function(id, email, name, password) {
  return this.findOne({ where: { id, email } })
    .then(user => {
      Object.assign(user, { name, password, isGueset: false })
      return user.save()
    })
}

User.logIn = function(email, password, sessionCartItems) {
  return this.findOne({ where: { email, isDisabled: false } })
    .then(user => {
      if (!user || User.encryptPassword(password, user.salt) !== user.password) {
        return Promise.reject('Login error! unrecognzied username/password')
      }

      return conn.models.order.findCart(user.id)
        .then(cart => {
          /* if there are items in session
              and user cart is empty,
              create those line items and delete them from session */
          if (!cart.lineitems.length) {
            return Promise.all(
              sessionCartItems.map(lineitem => (
                conn.models.lineitem.create(Object.assign({ orderId: cart.id }, lineitem ))))
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
      Object.assign(user, { password, passwordChange: false })
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
      Object.assign(user, userData)
      return user.save()
    })
}

User.deleteUser = function(userId) {
  return User.findById(userId, { include: [ conn.models.order ] })
    .then(user => {
      if (user.orders.filter(order => !order.isCart).length) return Promise.reject('user made orders and cannot be deleted')
      return user.destroy()
    })
}

module.exports = User;

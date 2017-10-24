const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Address = conn.define('address', {
  content: {
    type: Sequelize.STRING,
    unique: true
  },
});

Address.findByUserId = function(userId) {
  return this.findAll({ where: { userId } })
}

Address.createOne = function(userId, addressData) {
  return this.create({ where: { userId } }, addressData)
}

Address.updateOne = function(id, userId, addressData) {
  return this.findOne({ where: { id, userId } })
    .then(address => {
      Object.assign(address, addressData)
      return address.save()
    })
}

Address.deleteOne = function(id, userId) {
  return this.findOne({ where: { id, userId } })
    .then(address => address.destroy())
}

module.exports = Address;

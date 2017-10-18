const conn = require('./conn');
const Sequelize = conn.Sequelize;

const LineItem = conn.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    set (value) {
      if (value < 1) return this.destroy()
      return this.setDataValue('quantity', value)
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

// class methods :

// admin methods: 

LineItem.updateLineItem = function(id, updateData) {
  return this.findById(id)
    .then(lineitem => {
      Object.assign(lineitem, { ...updateData })
      return lineitem.save()
    })
}

module.exports = LineItem;

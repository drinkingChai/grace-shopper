const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Review = conn.define('review', {
  rating: {
    type: Sequelize.INTEGER
  },
  blurb: {
    type: Sequelize.TEXT,
    validate: {
      len: [50, 500],
      msg: 'Review must be at least 50 characters'
    }
  }
});

module.exports = Review;

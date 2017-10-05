const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Review = conn.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      len: [50, 500]
    }
  },
  blurb: {
    type: Sequelize.TEXT
  }
});

module.exports = Review;

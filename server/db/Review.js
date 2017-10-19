const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Review = conn.define('review', {
  // limit rating to min 1 and max 5?
  rating: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  blurb: {
    type: Sequelize.TEXT,
    validate: {
      len: {
        args: [50, 500],
        msg: 'Review must be at least 50 characters'
      }
    }
  }
});

Review.addReview = function(productId, userId, content) {
  return conn.models.order.verifyPurchase(userId, productId)
    .then(purchased => {
      if (!purchased) return Promise.reject('User has not purchased this product');
      
      if(!content.title){
         content.title = `${content.blurb.slice(0, 15)}...`
      }
      content.date = new Date();
      return Review.create({ productId, userId, ...content });
    })
}

Review.updateReview = function(id, userId, content) {
  return Review.findOne({ where: { id, userId } })
    .then(review => {
      content.date = new Date();
      Object.assign(review, { ...content });
      return review.save();
    })
}

Review.deleteReview = function(id, userId) {
  return Review.findOne({ where: { id, userId } })
    .then(review => review.destroy());
}

module.exports = Review;

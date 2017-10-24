const router = require('express').Router()
const { Review } = require('../db').models

router.post('/:productId', (req, res, next) => {
  Review.addReview(req.params.productId, req.session.userId, req.body)
    .then(review => res.send(review))
    .catch(err => {
      console.log(`HERE BE ERRORS ${err}`);
      res.send(err);
    });
})

router.put('/:id', (req, res, next) => {
  Review.updateReview(req.params.id, req.session.userId, req.body)
    .then(review => res.send(review))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Review.deleteReview(req.params.id, req.session.userId)
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router

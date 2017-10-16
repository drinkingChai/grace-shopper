const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/sessions', require('./sessions'));
router.use('/reviews', require('./reviews'));

module.exports = router;

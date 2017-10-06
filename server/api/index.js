const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/sessions', require('./sessions'));

module.exports = router;

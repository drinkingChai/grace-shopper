const router = require('express').Router();
const sessions = require('./middlewares').sessions

router.use('/products', require('./products'));
router.use('/orders', sessions.checkSession, require('./orders'));
router.use('/users', require('./users'));
router.use('/sessions', require('./sessions'));

module.exports = router;

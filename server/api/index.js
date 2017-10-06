const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

module.exports = router;

//orders.put('/:id/products/:productId', (req, res, next) => {
  // replace with findCart
  // req.body = { quantity: x }
  //Order.findOne({ where: { isCart: true }, include: [{ model: LineItem, include: [ Product ] }] })
    //.then(order => {
      //order = order ? order : Order.build()
      //let lineItem
      //if (order.lineItems) {
        //lineItem = order.lineItems.find(li => li.product.id == req.params.productId) || LineItem.build()
      //}
    //})
//})

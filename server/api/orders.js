const router = require('express').Router();
const { Order, LineItem, Product } = require('../db').models;
//const { updateSessionCart } = require('./helpers/session-helper')
const options = [{ model: LineItem, include: [ Product ] }];

router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    return res.send([req.session.cart])
  }
  Order.findAll({
    where: { userId: req.session.userId },
    include: options,
    order: [[ LineItem, 'createdAt', 'ASC' ]]
  })
    .then(orders => res.send(orders))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { include: options })
    .then(order => res.send(order))
    .catch(next)
});

router.get('/filter', (req, res, next) => {
  Order.findAll({ where: { userId: req.session.userId, status: req.query.status }})
    .then(orders => res.send(orders))
    .catch(next)
});

router.put('/check-out', (req, res, next) => {
  Order.checkOut(req.session.userId, req.body)
    .then(newCart => {
      req.session.cart = newCart
      res.sendStatus(201);
    })
    .catch(next);
});

router.put('/products/:productId', (req, res, next) => {
  if (!req.session.userId) {
    let { cart } = req.session
    const { productId } = req.params

    if (req.body.quantity <= 0) {
      // remove escape hatch
      cart.lineitems = cart.lineitems.filter(li => li.productId != productId)
      req.session.cart = cart
      return res.sendStatus(200)
    }

    // attempted this but it a got a little messy with error handling
    //updateSessionCart(cart, productId, req.body)
      //.then(cart => {
        //req.session.cart = cart
        //return res.sendStatus(201)
      //})
      //.catch(next)

    Product.findById(productId)
      .then(product => {
        // doing a product query to add product data to lineItem
        if (!product) return res.sendStatus(404)

        // build lineItem object //
        let lineItem = LineItem.build({ productId });
        Object.assign(lineItem, req.body);

        /* can't add properties to lineItem because it's constructed by Sequelize
          without serialization and deserialization */
        lineItem = JSON.parse(JSON.stringify(lineItem))
        lineItem.product = product
        // ==== //

        // find or push
        const liIndex = cart.lineitems.findIndex(li => li.productId == productId)
        liIndex < 0 ? cart.lineitems.push(lineItem) : cart.lineitems[liIndex] = lineItem
        
        // update session
        req.session.cart = cart
        return res.sendStatus(201)
      })

  } else {

    Order.updateCart(req.session.userId, req.params.productId * 1, req.body)
      .then(() => res.sendStatus(201))
      .catch(next);
  }
});

router.delete('/:id/products/:productId', (req, res, next) => {
  Order.removeLineItem(req.params.id * 1, req.params.productId * 1)
    .catch(next);
});

module.exports = router;

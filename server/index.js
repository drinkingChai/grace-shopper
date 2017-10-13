const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const db = require('./db');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/', express.static(path.join(__dirname, '..', 'node_modules')));

app.use(session({
  cookieName: 'session',
  secret: process.env.SESSIONSECRET,
  maxAge: 30 * 60 * 1000
app.use((req, res, next) => {
  req.session.cart = req.session.cart || db.models.Order.build()
  req.session.cart.lineitems = req.session.cart.lineitems || []
  next()
})
app.use('/api', require('./api'));
app.get('/*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).send(err);
});

const port = process.env.PORT || 3000;

db.sync()
  .then(() => app.listen(port, () => console.log(`DarknessCouch shopper! listening on port ${port}`)));

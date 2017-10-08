const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions')
const db = require('../db');
const env = require('./env')

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.use(session({
  cookieName: 'session',
  secret: env.sessionSecret,
  maxAge: 30 * 60 * 1000
}))
app.use((req, res, next) => {
  // session logger
  console.log(req.session)
  next()
})
app.use('/api', require('./api'));
app.get('/*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
})

const port = process.env.PORT || 3000;

db.sync()
  .then(() => app.listen(port, () => console.log(`DJ shopper! listening on port ${port}`)));

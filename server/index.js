const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const db = require('./db');
const passport = require('passport');
const { User } = require('./db').models;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const secrets = require('./secrets');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/', express.static(path.join(__dirname, '..', 'node_modules')));

app.use(session({
  cookieName: 'session',
  secret: process.env.SESSIONSECRET,
  maxAge: 30 * 60 * 1000
}));

/* ------ OAuth ------- */
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', {
	scope: 'email'
}));

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID || secrets.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || secrets.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK || secrets.GOOGLE_CALLBACK
};

//passport sends back 'done' method
const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done)=> {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;
  
  console.log("AM I RUNNING!");
  
  User.find({ where: googleId })
    .then(user => user ? 
          done(null, user) :
          User.create({ name, email, googleId })
            .then(user => done(null, user))
         )
    .catch(err=> {
      console.log('WHERE ARE YOU', err);
      done(err);
    });
}); 

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(function (err) {
    done(err);
  });
});

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

/* ---- OAuth done ----*/

app.use((req, res, next) => {
  req.session.cart = req.session.cart || db.models.Order.build();
  req.session.cart.lineitems = req.session.cart.lineitems || [];
  next();
});

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
  .then(() => app.listen(port, () => console.log(`DJ shopper! listening on port ${port}`)));

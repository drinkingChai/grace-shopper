const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const db = require('./db');
const passport = require('passport');
const { User } = require('./db').models;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//const secrets = require('./secrets');


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

//const googleConfig = {
//  clientID: process.env.GOOGLE_CLIENT_ID || secrets.GOOGLE_CLIENT_ID,
//  clientSecret: process.env.GOOGLE_CLIENT_SECRET || secrets.GOOGLE_CLIENT_SECRET,
//  callbackURL: process.env.GOOGLE_CALLBACK || secrets.GOOGLE_CALLBACK
//};

//passport sends back a 'done' method
passport.use(
  new GoogleStrategy({
    clientID: "68973371542-57pafacf42tacirqoakn7mhf0e3du6nj.apps.googleusercontent.com",
    clientSecret: "ty_hCuM_Hd_xSjQXqX0ZRB7f",
    callbackURL: "http://localhost:3000/auth/google/callback"
  }, (token, refreshToken, profile, done)=> {
  
      let info = {
          name: profile.displayName || 'bobby',
          email: profile.emails[0].value,
          googleId: profile.id,
          password: 'password'
      };

      console.log(info, info.name);
      
      User.findOne({ where: { googleId: profile.id} })
        .then(user => {
            if(user){
              done(null, user);
            } else {
              User.createUser(info)
                .then(user => done(null, user))
                .catch(err => {
                  console.log('Error on user create:', err)
                  done(err);
              })
            }
      })
        .catch(err=> {
          console.log('ERROR FOR USER FIND:', err);
          return done(err);
        });
    })
)


passport.serializeUser((user, done)=> done(null, user.id));

passport.deserializeUser((id, done)=> {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/test',
  failureRedirect: '/'
}));

const { loadDataOnLogin } = require('./api/helpers/session-helper')
app.get('/test', (req, res, next) => {
  req.session = loadDataOnLogin(req.user)
  delete req.user
  res.redirect('/account')
})

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

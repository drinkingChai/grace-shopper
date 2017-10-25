const faker = require('faker')
const router = require('express').Router()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { User } = require('../db').models;
const { loadDataOnLogin } = require('./helpers/session-helper')

router.use(passport.initialize());
router.use(passport.session());

router.get('/google', passport.authenticate('google', { scope: 'email' }));

//passport sends back a 'done' method
passport.use(
  new GoogleStrategy({
    clientID: "272013755870-phnqd16q4bptjo6gt46rcrvae16dqcrc.apps.googleusercontent.com",
    clientSecret: "a2GH4fRrVR0OMDYJOKRTwHfi",
    callbackURL: "https://boiling-lowlands-96195.herokuapp.com/api/auth/google/callback"
  }, (token, refreshToken, profile, done)=> {
  
    let info = {
        name: profile.displayName || 'Google User',
        email: profile.emails[0].value,
        googleId: profile.id,
        password: 'temp'
    };

    User.findOne({ where: { googleId: profile.id} })
      .then(user => {
        if(user) return done(null, user);
        User.createUser(info)
          .then(user => done(null, user))
          .catch(done)
    })
      .catch(done);
  })
)

passport.serializeUser((user, done)=> done(null, user.id));

passport.deserializeUser((id, done)=> {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/api/auth/success',
  failureRedirect: '/'
}));

router.get('/success', (req, res, next) => {
  const { email, password } = req.user
  User.logIn(email, 'temp', req.session.cart.lineitems)
    .then(user => {
      req.session = loadDataOnLogin(user)
      delete req.user
      res.redirect('/account')
    })
})

module.exports = router

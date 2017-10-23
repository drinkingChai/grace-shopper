const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../../db').models;

module.exports = router;

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID || '68973371542-57pafacf42tacirqoakn7mhf0e3du6nj.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'ty_hCuM_Hd_xSjQXqX0ZRB7f',
  callbackURL: process.env.GOOGLE_CALLBACK || '/'
};

//passport sends back 'done' method
const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done)=> {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;
  
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

router.get('/login/google', passport.authenticate('google', {
	scope: 'email'
}));

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));
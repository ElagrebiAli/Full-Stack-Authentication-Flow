const passport = require('passport');

// strategy require
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

// using implicit Oauth flow:I wanted frontend and backend to be totally separate,
// so with (passport-google-plus-token) and(passport-facebook-token) ,
// we can kick start it on the frontend, gain access to accessToken and then just send it to backend
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

// Extracting the JWT from the request
const { ExtractJwt } = require('passport-jwt');

const { User } = require('../../api/user/user.repository');

// JwtStrategy:to be aware of from where this token will be coming and is also aware of
// what secret should be used to decode it thanks to passport
// JWTSTRATEGY:Protected requests (allows only requests with valid tokens
// to access some special routes needing authentication)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.eid);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

// LOCAL STRATEGY:authentication for user when logs in
// by default this passpor-local strategy assumes  you authenticate using a username and password.
// we assign 'email' to usernaField to treat the email like treat username
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findByCredentials(email, password);
        if (!user) return done(null, false); // unauthorize
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

// Google OAUTH V2 STARTEGY
// handle the user acess_token that already have set some permissions  to extract the user profile
// Google service provider
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_Client_ID,
      clientSecret: process.env.GOOGLE_Client_Secret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOrCreate(profile.id, profile.emails[0].value, true);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

// Facebook OAUTH V2 STRATEGY
// handle the user acess_token that already have set some permissions  to extract the user profile
// Facebook service provider
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_Client_ID,
      clientSecret: process.env.FACEBOOK_Client_Secret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOrCreate(profile.id, profile.emails[0].value, false);
        return done(null, user);
      } catch (err) {
        done(err, false);
      }
    },
  ),
);

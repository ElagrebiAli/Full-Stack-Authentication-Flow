require('../../common/config/passport.config');
const express = require('express');
const passport = require('passport');

const router = express.Router();

const { validateUser } = require('../../common/middlewares/expressMiddlewares/validate.middleware');
const userController = require('./user.controller');

router.post('/signup', validateUser, userController.signUp);
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn);
router.post(
  '/oauth/google',
  passport.authenticate('google-plus-token', { session: false }),
  userController.signIn,
);
router.post(
  '/oauth/facebook',
  passport.authenticate('facebook-token', { session: false }),
  userController.signIn,
);
router.get('/secret', passport.authenticate('jwt', { session: false }), userController.secret);

module.exports = { router };

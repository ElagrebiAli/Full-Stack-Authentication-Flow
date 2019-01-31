const express = require('express');

const router = express.Router();

const { validateUser } = require('../../common/middlewares/expressMiddlewares/validate.middleware');
const userController = require('./user.controller');

router.post('/signup', validateUser, userController.signUp);
router.post('/signin', userController.signIn);
router.get('/secret', userController.secret);

module.exports = { router };

const express = require('express');

const router = express.Router();

const userApi = require('./user/user.route');

router.use('/user', userApi.router);

module.exports = { router };

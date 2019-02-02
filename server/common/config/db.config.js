const mongoose = require('mongoose');
const bcrypt = require('../middlewares/mongooseMiddlewares/bcrypt.middleware');

console.log(process.env.MONGODB_URI);
mongoose.promise = global.promise;
mongoose.plugin(bcrypt);
// enable mongoose Debug mode
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

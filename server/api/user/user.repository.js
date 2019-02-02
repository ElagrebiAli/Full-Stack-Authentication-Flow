// require dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userEntity = require('./user.entity');

const Schema = mongoose.Schema;
// create schema
const userSchema = new Schema(userEntity, { versionKey: false });

// create statics for Model
userSchema.statics.findByCredentials = (email, password) => {
  return User.findOne({ 'local.email': email }).then(user => {
    console.log(user);
    if (!user) return null;
    return bcrypt.compare(password, user.local.password).then(isMatch => {
      if (isMatch) {
        return user;
      }
      return null;
    });
  });
};

userSchema.statics.findOrCreate = (id, email, distinguishStrategy) => {
  const data = distinguishStrategy ? { 'google.id': id } : { 'facebook.id': id };
  // this varibale using for Computed property names
  const strategyType = distinguishStrategy ? 'google' : 'facebook';
  return User.findOne(data).then(user => {
    if (user) return user;
    const newUser = new User({
      method: distinguishStrategy ? 'google' : 'facebook',
      [strategyType]: {
        id,
        email,
      },
    });
    return newUser.save();
  });
};
// create model
const User = mongoose.model('User', userSchema);
// export the model
module.exports = { User };

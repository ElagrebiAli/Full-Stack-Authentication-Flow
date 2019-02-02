const { User } = require('./user.repository');
const { sign } = require('../../common/helpers/jwt.helper');

module.exports = {
  create: ({ email, password }) => {
    console.log('email', email);
    console.log('password', password);
    return User.findOne({ 'local.email': email })
      .then(doc => {
        if (doc) {
          throw new Error('Email alredy exist');
        }
        return User.create({
          method: 'local',
          local: {
            email,
            password,
          },
        });
      })
      .then(newUser => {
        const token = sign(newUser.id);
        return { newUser, token };
      });
  },
};

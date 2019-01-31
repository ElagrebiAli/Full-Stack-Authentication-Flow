module.exports = {
  signUp: (req, res, next) => {
    console.log('userController.signUp called');
  },
  signIn: (req, res, next) => {
    console.log('userController.signIn called');
  },
  secret: (req, res, next) => {
    console.log('userController.secret called');
  },
};

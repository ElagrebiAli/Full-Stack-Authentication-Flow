const Joi = require('joi');
// First define schema for the object
const schema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W])/)
    .max(10)
    .required(),
});

module.exports = {
  validateUser: (req, res, next) => {
    // Then validate request body agains schema
    // Btw. There are callback-based and promised based versions. I prefer promises.
    schema
      .validate(req.body, { abortEarly: false }) // abortEarly - collect all errors not just the first one
      .then(validatedUser => {
        req.validated = Object.assign({}, validatedUser);
        next();
      })
      .catch(validationError => {
        res.status(400).send(validationError.details.map(d => d.message));
      });
  },
};

const jwt = require('jsonwebtoken');

const sign = id => {
  return jwt.sign({ eid: id }, process.env.JWT_SECRET, {
    algorithm: process.env.JWT_ALGO,
    issuer: process.env.JWT_ISS,
    expiresIn: '1d',
  });
};

module.exports = { sign };

const bcrypt = require('bcryptjs');

module.exports = schema => {
  schema.pre('save', async function(next) {
    // In async/await functions it is common to use try/catch blocks to catch such errors.
    try {
      // only hash the password if it exist(exist only in the local method)
      if (this.method !== 'local') next();
      // only hash the password if it has been modified (or is new)
      if (!this.isModified('local.password')) return next();
      // Generate a salt:Salts create unique passwords,
      // even in the instance of two users choosing the same passwords
      // this helps us mitigate greatly rainbow table attacks.
      // 10:represent the cost or work factor.
      const salt = await bcrypt.genSalt(10);
      // Generate a password hash (salt + hash)
      const passwordHash = await bcrypt.hash(this.local.password, salt);
      // Re-assign hashed version over original, plain text password
      this.local.password = passwordHash;
      return next();
    } catch (error) {
      return next(error);
    }
  });
};

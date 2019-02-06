module.exports = {
  method: { type: String, enum: ['local', 'google', 'facebook'], required: true },
  local: { email: { type: String, lowercase: true,trim:true}, password: { type: String } },
  google: { id: { type: String }, email: { type: String, lowercase: true } },
  facebook: { id: { type: String }, email: { type: String, lowercase: true } },
};

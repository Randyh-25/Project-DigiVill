const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
});

module.exports = mongoose.model('Login', loginSchema);
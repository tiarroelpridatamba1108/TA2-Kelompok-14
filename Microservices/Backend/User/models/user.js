const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'U'],
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  role: {
    type: String,
    enum: ['C', 'A'],
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);

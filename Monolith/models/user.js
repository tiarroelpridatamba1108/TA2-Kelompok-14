const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["M", "F", "U"],
    default: "U",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  role: {
    type: String,
    enum: ["C", "A", "O"],
  },
});

module.exports = mongoose.model("User", userSchema);

// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
  }
}, { timestamps: true });
const User = mongoose.model('User',userSchema)
//module.exports = mongoose.model('user', userSchema);
module.exports= User;
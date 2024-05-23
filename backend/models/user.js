const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    maxlength: 15
  },
  name: {
    type: String,
    unique : true,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    unique: true,
    minlength: 5
  },
   token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
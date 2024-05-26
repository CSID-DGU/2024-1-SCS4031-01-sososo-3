const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // userId: {
  //   required: true,
  //   type: String,
  //   maxlength: 15
  // },
  name: {
    type: String,
    required: true,
    // unique : true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // unique: true,
    minlength: 5
  },
  roomId: { // 자신의 개인 방
    required: true,
    type: String, 
    unique: true
  },
  groupCode: { // 자신이 어느팀인지
    required: true,
    type: String
  },
  userlevel: { // 직급
    required: true,
    type: String
  }
  
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
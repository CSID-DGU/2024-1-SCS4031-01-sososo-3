const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  employeeNumber: {
    type: String,
    required: true,
    unique: true
  },
  groupCode: {
    type: String,
    unique: true
  },
  employeeName: {
    type: String,
    maxlength: 50
  }
});

module.exports = mongoose.model('Member', memberSchema);
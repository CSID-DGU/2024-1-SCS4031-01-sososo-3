const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupCode: { type: String, 
    // required: true, unique:1
  },
  groupName: { type: String },
  groupLevel: { type: String },
  parentGroupCode: { type: String },
  leaderEmployeeNumber: { type: String }
});

module.exports = mongoose.model('Group', groupSchema);
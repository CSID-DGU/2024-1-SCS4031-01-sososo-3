const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupCode: { type: String, 
  // required: true, 
  // unique:1
  },
  groupName: { type: String },
  groupLevel: { type: String }, // 팀:1, 본부:2, 대표이사:3
  parentGroupCode: { type: String }, // 상위조직 groupCode
  leaderRoomId: { type: String } // 리더 roomId 
});

const Group = mongoose.models.Group || mongoose.model('Group', groupSchema);
module.exports = Group;

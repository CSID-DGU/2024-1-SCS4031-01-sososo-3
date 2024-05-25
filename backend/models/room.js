const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({

  roomId: { 
    type: String, 
    required: true,
    // unique:1
    },
  businessNum: {type: String}, //사업 번호
  groupCode: { 
        type: String,
        // unique:1
    }, //조직코드
  roomName: {
    type: String,
    maxlength:50
    }, //공간명
  parentRoom_id: {type: String}, //상위공간
  groupLevel: {type: Number}, //조직레벨
  ownerBusinessNumber: {type: String} //공간소유사업번호

});

module.exports = mongoose.model('Room', roomSchema);
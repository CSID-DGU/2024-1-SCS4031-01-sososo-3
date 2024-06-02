const { Attachment } = require('@material-ui/icons');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskId: { 
    type: String, 
    //required: true,
    // unique:true
 },
  roomId: { 
    type: String,
    // unique:true
 },
  businessNumber: { type: String },
  groupCode: { 
    type: String, 
    // unique:true
},
  taskAuthor: { type: String },
  taskTitle: {
     type: String,
      maxlength:100 
    },
  taskDescription: { type: String },
  taskAssignee: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String },
  writeDate : { type: Date, default: Date.now },
  attachment: { type: String } // 첨부 파일 경로 또는 URL 필드 추가
});

const Task= mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;

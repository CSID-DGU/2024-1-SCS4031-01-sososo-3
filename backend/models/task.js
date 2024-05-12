const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskId: { 
    type: String, 
    required: true,
    unique:true
 },
  roomId: { 
    type: String,
    unique:true
 },
  businessNumber: { type: String },
  groupCode: { 
    type: String, 
    unique:true
},
  taskAuthor: { type: Number },
  taskTitle: {
     type: String,
      maxlength:100 
    },
  taskContent: { type: String },
  taskAssignee: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  stateCode: { type: Number }
});

module.exports = mongoose.model('Task', taskSchema);
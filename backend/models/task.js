const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskId: { 
    type: String, 
    required: true,
    unique:1
 },
  roomId: { 
    type: String,
    unique:1
 },
  businessNumber: { type: String },
  groupCode: { 
    type: String, 
    unique:1 
},
  taskAuthor: { type: Number },
  taskTitle: {
     type: String,
      maxlength:100 
    },
  taskContent: { type: String },
  phoneNumber: { 
    type: String, 
    unique:1 
},
  taskAssignee: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  stateCode: { type: Number }
});

module.exports = mongoose.model('Task', taskSchema);
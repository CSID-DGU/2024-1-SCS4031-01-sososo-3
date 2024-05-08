const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  scheduled: { type: Number },
  inProgress: { type: Number },
  completed: { type: Number },
  awaitingApproval: { type: Number },
  approved: { type: Number },
  rejected: { type: Number }
});

module.exports = mongoose.model('State', stateSchema);
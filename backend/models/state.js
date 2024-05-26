const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  state:{type: String} //scheduled:01, inProgress:02, completed:03
});

module.exports = mongoose.model('State', stateSchema);
const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  firstLevelGroupCode: { type: String },
  secondLevelGroupCode: { type: String },
  thirdLevelGroupCode: { type: String }
});

module.exports = mongoose.model('Level', levelSchema);
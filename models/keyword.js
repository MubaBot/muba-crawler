const mongoose = require('mongoose');

// Define Schemes
const keywordSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true, unique: true }
  },
  {
    collection: 'keyword'
  }
);

// Create Model & Export
module.exports = mongoose.model('keyword', keywordSchema);

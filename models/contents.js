const mongoose = require('mongoose');

// Define Schemes
const contentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    title: { type: String },
    content: { type: String, required: true },
    comments: { type: String },
  },
  {
    timestamps: true,
    collection: 'contents'
  }
);

// Create Model & Export
module.exports = mongoose.model('contents', contentSchema);
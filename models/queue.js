const mongoose = require('mongoose');

// Define Schemes
const crawlQueueSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    referer: { type:String }
  },
  {
    timestamps: true,
    collection: 'crawlQueue'
  }
);

// Create Model & Export
module.exports = mongoose.model('crawlQueue', crawlQueueSchema);
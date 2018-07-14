const mongoose = require('mongoose');

// Define Schemes
const crawlQueueSchema = new mongoose.Schema(
    {
        url: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: 'crawlQueue'
    }
);

// Create Model & Export
module.exports = mongoose.model('crawlQueue', crawlQueueSchema);
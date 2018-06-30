const mongoose = require('mongoose');

// Define Schemes
const worksSchema = new mongoose.Schema(
    {
        searchEngine: { type: String, required: true },
        mode: { type: String, required: false },
        keyword: { type: String, required: true },
        pages: { type: Number, required: true, default: 0 }
    },
    {
        timestamps: true,
        collection: 'works'
    }
);

// Create Model & Export
module.exports = mongoose.model('works', worksSchema);
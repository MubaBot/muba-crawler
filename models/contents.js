const mongoose = require("mongoose");

// Define Schemes
const contentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    title: { type: String, trim: true },
    content: { type: String, trim: true, required: true },
    comments: { type: String, trim: true }
  },
  {
    timestamps: true,
    collection: "contents"
  }
);

contentSchema.index({ updatedAt: 1 });

// Create Model & Export
module.exports = mongoose.model("contents", contentSchema);

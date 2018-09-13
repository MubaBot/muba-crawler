const mongoose = require("mongoose");

// Define Schemes
const contentConfigSchema = new mongoose.Schema(
  {
    domain: { type: String, required: true, unique: true },
    title: { type: String, require: true },
    content: { type: String, require: true },
    comment: { type: String, require: true }
  },
  {
    collection: "contentConfig"
  }
);

// Create Model & Export
module.exports = mongoose.model("contentConfig", contentConfigSchema);

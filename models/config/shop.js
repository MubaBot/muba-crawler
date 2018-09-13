const mongoose = require("mongoose");

// Define Schemes
const shopConfigSchema = new mongoose.Schema(
  {
    domain: { type: String, required: true, unique: true },
    // title: { type: String, require: true },
    // content: { type: String, require: true },
    // comments: { type: String, require: true }
  },
  {
    collection: "shopConfig"
  }
);

// Create Model & Export
module.exports = mongoose.model("shopConfig", shopConfigSchema);

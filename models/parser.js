const mongoose = require("mongoose");

// Define Schemes
const parserSchema = new mongoose.Schema(
  {
    domain: { type: String, required: true, unique: true },
    callback: { type: String }, // input : { html, title, content, comment }, output : { title, content, comment }
    options: [
      {
        skins: { type: String, required: true, unique: true },
        title: { type: String, require: true },
        content: { type: String, require: true },
        comments: { type: String, require: true }
      }
    ]
  },
  {
    timestamps: true,
    collection: "parser"
  }
);

// Create Model & Export
module.exports = mongoose.model("parser", parserSchema);

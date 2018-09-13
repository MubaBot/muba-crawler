const mongoose = require("mongoose");

const modeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  param: { type: String, required: true },
  value: { type: String, required: true }
});

const pageSchema = new mongoose.Schema({
  param: { type: String, required: true },
  count: { type: Number, required: true },
  start: { type: Number, required: true }
});

// Define Schemes
const searchConfigSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
    query: { type: String, required: true },
    tag: { type: String, required: true },
    mode: [modeSchema],
    page: { type: pageSchema, required: true }
  },
  {
    collection: "searchConfig"
  }
);

// Create Model & Export
module.exports = mongoose.model("searchConfig", searchConfigSchema);

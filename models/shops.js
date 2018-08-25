const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  postcode: { type: Number },
  state: { type: String },
  city: { type: String },
  address1: { type: String },
  address2: { type: String },
  options: { type: String }
});

const timeSchema = new mongoose.Schema({
  hour: { type: Number, min: 0, max: 24, required: true },
  minute: { type: Number, min: 0, max: 60, required: true }
});

const dayTimeSchema = new mongoose.Schema({
  day: { type: String, required: true },
  open: timeSchema,
  close: timeSchema
});

// Define Schemes
const shopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    place: placeSchema,
    times: [dayTimeSchema],
    tel: { type: String },
    menus: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true, default: 0, min: 0 }
      }
    ]
  },
  {
    timestamps: true,
    collection: "shops"
  }
);

// Create Model & Export
module.exports = mongoose.model("shops", shopSchema);

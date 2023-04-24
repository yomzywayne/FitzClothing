/* eslint-disable */
const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
    {
      userId: {type: String, required: true},
      addressLine1: {type: String, required: true},
      addressLine2: {type: String, required: false},
      city: {type: String, required: true},
      postcode: {type: String, required: true},
      country: {type: String, default: "United Kingdom", required: true},
      type: {type: String, required: true},
    },
    {timestamps: true},
);

module.exports = mongoose.model("Address", AddressSchema);
/* eslint-disable */
const mongoose = require("mongoose");

const ClotheMeasurementSchema = new mongoose.Schema(
    {
      productId: {type: String, required: true, unique: true},
      clotheType: {type: String, required: false},
      head: {type: String, required: false},
      neck: {type: String, required: false},
      shoulder: {type: String, required: false},
      bust: {type: String, required: false},
      stomach: {type: String, required: false},
      waist: {type: String, required: false},
      hip: {type: String, required: false},
      thigh: {type: String, required: false},
      ankle: {type: String, required: false},
      legHeight: {type: String, required: false},
      overallHeight: {type: String, required: false},
      armLength: {type: String, required: false},
      skirtLength: {type: String, required: false},
      trouserLength: {type: String, required: false},
    },
    {timestamps: true},
);

module.exports = mongoose.model("ClotheMeasurement", ClotheMeasurementSchema);
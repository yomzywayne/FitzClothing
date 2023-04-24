/* eslint-disable */
const mongoose = require("mongoose");

const UserMeasurementSchema = new mongoose.Schema(
    {
      userId: {type: String, required: true, unique: true},
      head: {type: String, required: true},
      neck: {type: String, required: true},
      shoulder: {type: String, required: true},
      bust: {type: String, required: true},
      stomach: {type: String, required: true},
      waist: {type: String, required: true},
      hip: {type: String, required: true},
      thigh: {type: String, required: true},
      ankle: {type: String, required: true},
      legHeight: {type: String, required: true},
      overallHeight: {type: String, required: true},
      armLength: {type: String, required: true},
      skirtLength: {type: String, required: false},
      trouserLength: {type: String, required: false},
      gender: {type: String, required: false},
    },
    {timestamps: true},
);

module.exports = mongoose.model("UserMeasurement", UserMeasurementSchema);
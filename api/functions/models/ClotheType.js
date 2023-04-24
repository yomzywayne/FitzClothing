/* eslint-disable */
const mongoose = require("mongoose");

const ClotheType = new mongoose.Schema(
    {
      clotheType: {type: String, required: true, unique: true},
    },
    {timestamps: true},
);

module.exports = mongoose.model("ClotheType", ClotheType);
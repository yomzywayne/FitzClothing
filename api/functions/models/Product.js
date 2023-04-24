/* eslint-disable */
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
      title: {type: String, required: true},
      desc: {type: String, required: true},
      img: {type: String, required: false},
      categories: {type: Array},
      color: {type: Array},
      price: {type: Number, required: true},
      inStock: {type: Boolean, default: true},
      product3dFilename: {type: String, required: false},
      product3dCatwalkFilename: {type: String, required: false},
      hasMeasurement: {type: Boolean, required: false, default: false},
      clotheType: {type: String, required: true},
    },
    {timestamps: true},
);

module.exports = mongoose.model("Product", ProductSchema);
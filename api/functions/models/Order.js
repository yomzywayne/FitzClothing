/* eslint-disable */
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
      userId: {type: String, required: true},
      addressId: {type: String, required: true},
      orderNumber: {type: String, required: true},
      cardId: {type: String, required: true},
      cardLast4Digits: {type: Number, required: true},
      products: {type: Array, required: true},
      status: {type: String, default: "pending", required: false},
    },
    {timestamps: true},
);

module.exports = mongoose.model("Order", OrderSchema);
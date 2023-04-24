/* eslint-disable */
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order({
      userId: req.body.userId,
      addressId: req.body.addressId,
      cardId: req.body.cardId,
      cardLast4Digits: req.body.cardLast4Digits,
      orderNumber: req.body.orderNumber,
      products: req.body.products,
      status: req.body.status,
    });

    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific order by id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Delete a specific order by id
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
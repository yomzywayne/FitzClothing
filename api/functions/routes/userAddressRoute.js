/* eslint-disable */
const express = require('express');
const router = express.Router();
const Address = require('../models/UserAddress');

// Create address
router.post('/', async (req, res) => {
  try {
    const address = new Address({
      userId: req.body.userId,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      postcode: req.body.postcode,
      country: req.body.country,
      type: req.body.type
    });

    await address.save();
    res.status(201).send(address);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read address
router.get('/:userId', async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId});

    if (!addresses) {
      return res.status(404).send({ message: 'Address not found' });
    }

    res.send(addresses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update address
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'userId',
    'addressLine1',
    'addressLine2',
    'city',
    'postcode',
    'country',
    'type'
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).send({ message: 'Address not found' });
    }

    updates.forEach(update => {
      address[update] = req.body[update];
    });

    await address.save();
    res.send(address);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
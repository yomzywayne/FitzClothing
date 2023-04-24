/* eslint-disable */
const express = require('express');
const router = express.Router();
const UserMeasurement = require('../models/UserMeasurement');

// Create user measurement
router.post('/', async (req, res) => {
    try {
      const userMeasurement = new UserMeasurement({
        userId: req.body.userId,
        head: req.body.head,
        neck: req.body.neck,
        shoulder: req.body.shoulder,
        bust: req.body.bust,
        stomach: req.body.stomach,
        waist: req.body.waist,
        hip: req.body.hip,
        thigh: req.body.thigh,
        ankle: req.body.ankle,
        legHeight: req.body.legHeight,
        overallHeight: req.body.overallHeight,
        armLength: req.body.armLength,
        skirtLength: req.body.skirtLength,
        trouserLength: req.body.trouserLength,
        gender: req.body.gender
      });

      console.log("API - userMeasurement:", userMeasurement);
  
      await userMeasurement.save();
      res.status(201).send(userMeasurement);
    } catch (error) {
        console.log(error)
      res.status(400).send(error);
    }
  });
    
  // GET all user measurements
  router.get("/", async (req, res) => {
    try {
      const userMeasurements = await UserMeasurement.find();
      res.json(userMeasurements);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  });

  // Read user measurement
  router.get('/:userId', async (req, res) => {
    try {
      const userMeasurement = await UserMeasurement.findOne({
        userId: req.params.userId
      });
  
      res.send(userMeasurement);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Update user measurement
  router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'userId',
      'head',
      'neck',
      'shoulder',
      'bust',
      'stomach',
      'waist',
      'hip',
      'thigh',
      'ankle',
      'legHeight',
      'overallHeight',
      'armLength',
      'skirtLength',
      'trouserLength',
      'gender'
    ];
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }
  
    try {
      const userMeasurement = await UserMeasurement.findById(req.params.id);  
      if (!userMeasurement) {
        return res.status(404).send({ message: 'User measurement not found' });
      }
  
      updates.forEach(update => {
        userMeasurement[update] = req.body[update];
      });
  
      await userMeasurement.save();
      res.send(userMeasurement);
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;
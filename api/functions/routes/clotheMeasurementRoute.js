/* eslint-disable */
const express = require('express');
const router = express.Router();
const ClotheMeasurement = require('../models/ClotheMeasurement');

// Create clothe measurement
router.post('/', async (req, res) => {
    try {
      console.log("Create user measurement:", req.body);

      const clotheMeasurement = new ClotheMeasurement({        
        productId: req.body.productId,
        clotheType: req.body.clotheType,
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
      });
  
      await clotheMeasurement.save();
      res.status(201).send(clotheMeasurement);
    } 
    catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  });
  
  // GET all clothe measurements
router.get("/", async (req, res) => {
  try {
    const clotheMeasurements = await ClotheMeasurement.find();
    res.json(clotheMeasurements);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});
  
  router.get("/:productId", async (req, res) => {
    
    let clotheMeasurement;
    try {
      clotheMeasurement = await ClotheMeasurement.findOne({productId: req.params.productId});
      res.send(clotheMeasurement);
    } 
    catch (err) {
      return res.status(500).json({ message: err.message });
    }    
  });
  
  // Read clothe measurement
  async function getClotheMeasurement(req, res, next) {
    let clotheMeasurement;
    try {
      clotheMeasurement = await ClotheMeasurement.findOne({productId: req.params.productId});
      if (clotheMeasurement == null) {
        return res.status(404).json({ message: "ClotheMeasurement not found" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.clotheMeasurement = clotheMeasurement;
    next();
  }

  // DELETE a clothe measurement by product id
router.delete("/:productId", getClotheMeasurement, async (req, res) => {
  try {
    await res.clotheMeasurement.deleteOne();
    res.json({ message: "Clothe measurement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});
  
  // Update clothe measurement
    router.patch("/:productId", getClotheMeasurement, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'clotheType',
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
      'trouserLength'
    ];
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }
  
    try {
      const clotheMeasurement = await ClotheMeasurement.findOne({productId: req.params.productId});  
      if (!clotheMeasurement) {
        return res.status(404).send({ message: 'Clothe measurement not found' });
      }
  
      updates.forEach(update => {
        clotheMeasurement[update] = req.body[update];
      });
  
      await clotheMeasurement.save();
      res.send(clotheMeasurement);
    } 
    catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;
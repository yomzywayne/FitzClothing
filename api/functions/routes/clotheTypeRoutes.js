/* eslint-disable */
const express = require("express");
const router = express.Router();
const ClotheType = require("../models/ClotheType");

// GET all clothe types
router.get("/", async (req, res) => {
  try {
    const clotheTypes = await ClotheType.find();
    res.json(clotheTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a clothe type by id
router.get("/:id", getClotheType, (req, res) => {
  res.json(res.clotheType);
});

// CREATE a clothe type
router.post("/", async (req, res) => {
  const clotheType = new ClotheType({
    title: req.body.clotheType,
  });
  try {
    const newClotheType = await clotheType.save();
    res.status(201).json(newClotheType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a product by id
router.patch("/:id", getClotheType, async (req, res) => {
  if (req.body.clotheType != null) {
    res.clotheType.clotheType = req.body.clotheType;
  }
  try {
    const updatedClotheType = await res.clotheType.save();
    res.json(updatedClotheType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a clothe type by id
router.delete("/:id", getClotheType, async (req, res) => {
  try {
    await res.clotheType.deleteOne();
    res.json({ message: "Clothe type deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

// Middleware function to get a clothe type by id
async function getClotheType(req, res, next) {
  let clotheType;
  try {
    clotheType = await ClotheType.findById(req.params.id);
    if (clotheType == null) {
      return res.status(404).json({ message: "clothe type not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = clotheType;
  next();
}

module.exports = router;

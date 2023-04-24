/* eslint-disable */
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a product by id
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

// CREATE a product
router.post("/", async (req, res) => {
  const product = new Product({
    title: req.body.title,
    desc: req.body.desc,
    categories: req.body.categories,
    color: req.body.color,
    price: req.body.price,
    inStock: req.body.inStock,
    clotheType: req.body.clotheType,
    product3dFilename: req.body.product3dFilename,
    product3dCatwalkFilename: req.body.product3dCatwalkFilename,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a product by id
router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.title != null) {
    res.product.title = req.body.title;
  }
  if (req.body.desc != null) {
    res.product.desc = req.body.desc;
  }
  if (req.body.img != null) {
    res.product.img = req.body.img;
  }
  if (req.body.categories != null) {
    res.product.categories = req.body.categories;
  }
  if (req.body.color != null) {
    res.product.color = req.body.color;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.inStock != null) {
    res.product.inStock = req.body.inStock;
  }
  if (req.body.hasMeasurement != null) {
    res.product.hasMeasurement = req.body.hasMeasurement;
  }
  if (req.body.clotheType != null) {
    res.product.clotheType = req.body.clotheType;
  }
  if (req.body.product3dFilename != null) {
    res.product.product3dFilename = req.body.product3dFilename;
  }
  if (req.body.product3dCatwalkFilename != null) {
    res.product.product3dCatwalkFilename = req.body.product3dCatwalkFilename;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a product by id
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

// Middleware function to get a product by id
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
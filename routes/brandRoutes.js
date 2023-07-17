const express = require('express');
const router = express.Router();
const { Brand, Product } = require('../models');

// Get products by brand
router.get('/:brandId/products', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.brandId);
    console.log(brand)
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    const products = await Product.find({ brand: brand._id });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific brand
router.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new brand
router.post('/', async (req, res) => {
  try {
    const { name, category } = req.body;
    const brand = await Brand.create({ name, category });
    res.status(201).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a brand
router.put('/:id', async (req, res) => {
  try {
    const { name, category } = req.body;
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true }
    );
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a brand
router.delete('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

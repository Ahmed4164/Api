const express = require('express');
const router = express.Router();
const { Category, Brand, Product, Item } = require('../models');
const sampleData = require('../data/sampleData');

// Seed route to populate the database with sample data
router.get('/seed', async (req, res) => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Brand.deleteMany();
    await Product.deleteMany();
    await Item.deleteMany();

    // Create categories
    const categories = await Category.insertMany(sampleData.categories);

    // Create brands
    const brands = [];
    for (const brandData of sampleData.brands) {
      const category = categories.find(
        (category) => category.name === brandData.category
      );
      const brand = await Brand.create({ ...brandData, category: category._id });
      brands.push(brand);
    }

    // Create products
    const products = [];
    for (const productData of sampleData.products) {
      const brand = brands.find((brand) => brand.name === productData.brand);
      const product = await Product.create({ ...productData, brand: brand._id });
      products.push(product);
    }

    // Create items
    for (const itemData of sampleData.items) {
      const product = products.find((product) => product.name === itemData.product);
      await Item.create({ ...itemData, product: product._id });
    }

    res.json({ message: 'Sample data populated successfully!' });
  } catch (err) {
    console.error('Failed to populate sample data:', err);
    res.status(500).json({ error: 'Failed to populate sample data' });
  }
});

// Add more routes as needed
const categoryRoutes = require('./categoryRoutes');
const brandRoutes = require('./brandRoutes');
const productRoutes = require('./productRoutes');
const itemRoutes = require('./itemRoutes');

router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/products', productRoutes);
router.use('/items', itemRoutes);

module.exports = router;

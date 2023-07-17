const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

// Brand Schema
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  }
});

// Item Schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);
const Brand = mongoose.model('Brand', brandSchema);
const Product = mongoose.model('Product', productSchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = {
  Category,
  Brand,
  Product,
  Item
};

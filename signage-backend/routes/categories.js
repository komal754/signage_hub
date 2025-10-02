const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Create category
router.post('/', async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json(category);
});

// Update category
router.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
});

// Delete category
router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items (populate category)
router.get('/', async (req, res) => {
  const items = await Item.find().populate('category');
  res.json(items);
});

// Get item by id
router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id).populate('category');
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// Add new item
router.post('/', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).json(item);
});

// Update item
router.put('/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete item
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;

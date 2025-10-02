const express = require('express');
const router = express.Router();
const SubItem = require('../models/SubItem');

// Get all subitems (optionally filter by item or category)
console.log("Subitems2 route loaded");

router.get('/', async (req, res) => {
  const { item, category } = req.query;
  const filter = {};
  if (item) filter.item = item;
  if (category) filter.category = category;
  const subitems = await SubItem.find(filter).populate('item category');
  res.json(subitems);
});

// Create subitem
router.post('/', async (req, res) => {
  const subitem = new SubItem(req.body);
  await subitem.save();
  res.status(201).json(subitem);
});

// Update subitem
router.put('/:id', async (req, res) => {
  const subitem = await SubItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(subitem);
});

// Delete subitem
router.delete('/:id', async (req, res) => {
  await SubItem.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;

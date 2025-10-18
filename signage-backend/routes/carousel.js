const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// CarouselItem model
const CarouselItemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String },
}, { timestamps: true });

const CarouselItem = mongoose.models.CarouselItem || mongoose.model('CarouselItem', CarouselItemSchema);

// GET all carousel items
router.get('/', async (req, res) => {
  try {
    const items = await CarouselItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new carousel item
router.post('/', async (req, res) => {
  try {
    const { url, title } = req.body;
    const item = await CarouselItem.create({ url, title });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT update carousel item
router.put('/:id', async (req, res) => {
  try {
    const { url, title } = req.body;
    console.log('PUT /api/carousel/:id', {
      id: req.params.id,
      url,
      title,
      body: req.body
    });
    const item = await CarouselItem.findByIdAndUpdate(
      req.params.id,
      { url, title },
      { new: true }
    );
    if (!item) {
      console.error('No item found for update:', req.params.id);
      return res.status(404).json({ error: 'Carousel item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('Error updating carousel item:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE carousel item
router.delete('/:id', async (req, res) => {
  try {
    await CarouselItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

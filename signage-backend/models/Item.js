const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Cloudinary URL
  category: { type: String, required: true },
  bestseller: { type: Boolean, default: false },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Item', ItemSchema);

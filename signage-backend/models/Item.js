const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Cloudinary URL (optional, not used for items)
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  bestseller: { type: Boolean, default: false },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);

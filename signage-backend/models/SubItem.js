const mongoose = require('mongoose');

const SubItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

module.exports = mongoose.model('SubItem', SubItemSchema);
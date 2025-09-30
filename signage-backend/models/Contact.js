const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number']
  },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', ContactSchema);

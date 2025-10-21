const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { notifyAdmin } = require('../utils/notify');

// Get all contact submissions
router.get('/', async (req, res) => {
  const contacts = await Contact.find().sort({ date: -1 });
  res.json(contacts);
});

// Add new contact submission
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Name, email, phone, and message are required.' });
  }
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format.' });
  }
  try {
    const contact = new Contact({ name, email, phone, message });
    await contact.save();
    // Notify admin and customer (email only)
    const customerTemplate = `Dear Customer,\n\nThank you for reaching out to Signage & Printing Workshop.\nWe have successfully received your inquiry and our team will review it shortly.\n\nOur representative will get back to you within 24–48 hours with the details you requested.\nIn the meantime, if you have any urgent queries, feel free to call us at +91-9772801733.\n\nWe truly appreciate your interest in our signage, printing, and painting services,\nand we look forward to assisting you with the best solutions.\n\nBest Regards,\nNarendra Add Agency\nSignage & Printing Workshop\nWebsite: www.yourwebsite.com\nPhone: +91-9772801733`;
    try {
      await notifyAdmin(contact);
      await notifyCustomer(contact, customerTemplate);
    } catch (notifyErr) {
      // Log notification error but don't block contact creation
      console.error('Notification error:', notifyErr);
    }
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save contact.' });
  }
});

module.exports = router;

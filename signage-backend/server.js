require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Signage backend API running');
});


// Import and use routes
const itemRoutes = require('./routes/items');
const categoryRoutes = require('./routes/categories');
const subitemRoutes = require('./routes/subitems2');
const contactRoutes = require('./routes/contact');
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subitems', subitemRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

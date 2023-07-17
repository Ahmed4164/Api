const express = require('express');
const app = express();
const PORT = 3000; // or any other port you prefer
const mongoose = require('mongoose');
const routes = require('./routes');

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

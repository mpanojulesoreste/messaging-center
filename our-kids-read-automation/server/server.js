const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
console.log('Attempting to connect to MongoDB...');
const mongoURI = process.env.MONGODB_URI;
console.log('MongoDB URI structure:', mongoURI.replace(/\/\/(.*)@/, '//[HIDDEN_CREDENTIALS]@'));

mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.log('MongoDB connection error:');
    console.log('Error name:', err.name);
    console.log('Error message:', err.message);
    if (err.reason) console.log('Error reason:', err.reason);
    console.log('Full error object:', JSON.stringify(err, null, 2));
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Our Kids Read SMS/Email Automation API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    app.listen(PORT + 1);
  } else {
    console.error('Server error:', err);
  }
});

module.exports = app;
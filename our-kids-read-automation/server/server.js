const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connetion error:', err));

// Routes
app.get('/api/auth', require('./routes/auth'));
app.get('/api/messages', require('./routes/messages'));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Our Kids Read SMS/Email Automation API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', err => {
    if (err.code === 'EADDRINUSE') {
        console.log('Port ${PORT} is already in use. Trying port ${PORT + 1}...');
        app.listen(PORT + 1);
    } else {
        console.error('Server error:', err);
    }
});   
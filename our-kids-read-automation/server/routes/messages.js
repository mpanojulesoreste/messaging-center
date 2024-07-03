// server/routes/messages.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// Create a new message
router.post('/', auth, async (req, res) => {
  try {
    const { content, phoneNumber, email, sessionTime, reminders } = req.body;

    const newMessage = new Message({
      user: req.user.id,
      content,
      phoneNumber,
      email,
      sessionTime,
      reminders
    });

    const message = await newMessage.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all messages for a user
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a message
router.put('/:id', auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) return res.status(404).json({ msg: 'Message not found' });

    // Make sure user owns the message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Cancel a message
router.delete('/:id', auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) return res.status(404).json({ msg: 'Message not found' });

    // Make sure user owns the message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Message.findByIdAndUpdate(req.params.id, { status: 'cancelled' });

    res.json({ msg: 'Message cancelled' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
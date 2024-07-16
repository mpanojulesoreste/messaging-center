const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const { sendSMS } = require('../utils/twilioClient');

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
      reminders,
      status: reminders && reminders.length > 0 ? 'scheduled' : 'sent' // Set status based on reminders
    });

    // Send SMS
    try {
      const twilioResponse = await sendSMS(phoneNumber, content);
      newMessage.smsSid = twilioResponse.sid;
      newMessage.smsStatus = twilioResponse.status;
      newMessage.twilioMessageData = {
        sid: twilioResponse.sid,
        status: twilioResponse.status,
        dateCreated: twilioResponse.dateCreated,
        dateSent: twilioResponse.dateSent,
        direction: twilioResponse.direction,
        numSegments: twilioResponse.numSegments,
        price: twilioResponse.price,
        priceUnit: twilioResponse.priceUnit
      };
    } catch (smsError) {
      console.error('Failed to send SMS:', smsError);
      newMessage.status = 'failed';
      newMessage.smsStatus = 'failed';
    }

    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).send('Server Error');
  }
});

// Get all messages for a user
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a specific message
router.get('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    // Make sure user owns the message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    res.json(message);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Update a message
router.put('/:id', auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    // Make sure user owns the message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    const { content, phoneNumber, email, sessionTime, reminders, status } = req.body;
    message = await Message.findByIdAndUpdate(
      req.params.id,
      { content, phoneNumber, email, sessionTime, reminders, status },
      { new: true }
    );
    res.json(message);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Delete a message
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    // Make sure user owns the message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await message.remove();
    res.json({ msg: 'Message removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Get SMS status
router.get('/:id/status', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    res.json({ smsStatus: message.smsStatus });
  } catch (err) { 
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
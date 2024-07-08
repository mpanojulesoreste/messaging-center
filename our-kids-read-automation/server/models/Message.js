const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: String,
  sessionTime: Date,
  reminders: [{
    type: String,
    enum: ['24h', '1h', '5min']
  }],
  status: {
    type: String,
    enum: ['scheduled', 'sent', 'cancelled', 'failed'],
    default: 'scheduled'
  },
  smsSid: String,
  smsStatus: String,
  twilioMessageData: {
    sid: String,
    status: String,
    dateCreated: Date,
    dateSent: Date,
    direction: String,
    numSegments: String,
    price: String,
    priceUnit: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
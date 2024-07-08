const cron = require('node-cron');
const Message = require('../models/Message');
const { sendSMS } = require('./twilioClient');

const scheduleReminders = () => {
  // Check for reminders every minute
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const messages = await Message.find({ status: 'scheduled' });

    for (let message of messages) {
      const sessionTime = new Date(message.sessionTime);
      const timeDiff = sessionTime.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      if (message.reminders.includes('24h') && hoursDiff <= 24 && hoursDiff > 23) {
        await sendReminder(message, '24 hours');
      } else if (message.reminders.includes('1h') && hoursDiff <= 1 && hoursDiff > 0) {
        await sendReminder(message, '1 hour');
      } else if (message.reminders.includes('5min') && timeDiff <= 5 * 60 * 1000 && timeDiff > 0) {
        await sendReminder(message, '5 minutes');
      }
    }
  });
};

const sendReminder = async (message, timeFrame) => {
  try {
    const reminderText = `Reminder: Your reading session is in ${timeFrame}.`;
    const smsSid = await sendSMS(message.phoneNumber, reminderText);
    message.smsSid = smsSid;
    message.smsStatus = 'sent';
    await message.save();
  } catch (error) {
    console.error(`Failed to send ${timeFrame} reminder:`, error);
    message.smsStatus = 'failed';
    await message.save();
  }
};

module.exports = { scheduleReminders };
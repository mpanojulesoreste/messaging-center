const cron = require('node-cron');
const moment = require('moment-timezone');
const Message = require('../models/Message');
const { sendSMS } = require('./twilioClient');

const scheduleReminders = () => {
  cron.schedule('* * * * *', async () => {
    const now = moment().tz('America/New_York');
    console.log('Checking for reminders:', now.format());

    try {
      const messages = await Message.find({ status: 'scheduled' });
      console.log(`Found ${messages.length} scheduled messages`);

      for (let message of messages) {
        const sessionTime = moment(message.sessionTime).tz('America/New_York');
        const timeDiff = sessionTime.diff(now, 'minutes');

        console.log(`Message ID: ${message._id}`);
        console.log(`Session time: ${sessionTime.format()}`);
        console.log(`Current time: ${now.format()}`);
        console.log(`Time difference: ${timeDiff} minutes`);
        console.log(`Reminders: ${message.reminders}`);

        if (message.reminders.includes('24h') && timeDiff > 1435 && timeDiff <= 1440) {
          await sendReminder(message, '24 hours');
        } else if (message.reminders.includes('1h') && timeDiff > 55 && timeDiff <= 60) {
          await sendReminder(message, '1 hour');
        } else if (message.reminders.includes('5min') && timeDiff > 4 && timeDiff <= 5) {
          await sendReminder(message, '5 minutes');
        }
      }
    } catch (error) {
      console.error('Error in scheduleReminders:', error);
    }
  });
};

const sendReminder = async (message, timeFrame) => {
  try {
    const reminderText = `Reminder: Your reading session is in ${timeFrame}.`;
    console.log(`Sending ${timeFrame} reminder for session at ${moment(message.sessionTime).format()}`);
    const smsSid = await sendSMS(message.phoneNumber, reminderText);
    message.smsSid = smsSid;
    message.smsStatus = 'sent';
    await message.save();
    console.log(`${timeFrame} reminder sent successfully for session at ${moment(message.sessionTime).format()}`);
  } catch (error) {
    console.error(`Failed to send ${timeFrame} reminder for session at ${moment(message.sessionTime).format()}:`, error);
    message.smsStatus = 'failed';
    await message.save();
  }
};

module.exports = { scheduleReminders };
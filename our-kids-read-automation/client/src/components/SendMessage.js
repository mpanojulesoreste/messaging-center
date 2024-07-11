import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import { sendMessage } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';

function SendMessage() {
  const [content, setContent] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [reminders, setReminders] = useState({
    '24h': false,
    '1h': false,
    '5min': false
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reminderArray = Object.entries(reminders)
      .filter(([_, isChecked]) => isChecked)
      .map(([time]) => time);

    try {
      await sendMessage({
        content,
        phoneNumber,
        email,
        sessionTime,
        reminders: reminderArray
      });
      navigate('/dashboard');  // Redirect to dashboard after sending message
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleReminderChange = (event) => {
    setReminders({
      ...reminders,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <AppLayout>
      <Typography variant="h4" gutterBottom>
        Send Message
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '600px' }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Message Content"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Session Time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          value={sessionTime}
          onChange={(e) => setSessionTime(e.target.value)}
        />
        <Typography variant="subtitle1" gutterBottom>
          Set Reminders:
        </Typography>
        <Box>
          <FormControlLabel
            control={<Checkbox checked={reminders['24h']} onChange={handleReminderChange} name="24h" />}
            label="24 hours before"
          />
          <FormControlLabel
            control={<Checkbox checked={reminders['1h']} onChange={handleReminderChange} name="1h" />}
            label="1 hour before"
          />
          <FormControlLabel
            control={<Checkbox checked={reminders['5min']} onChange={handleReminderChange} name="5min" />}
            label="5 minutes before"
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          SEND MESSAGE
        </Button>
      </Box>
    </AppLayout>
  );
}

export default SendMessage;
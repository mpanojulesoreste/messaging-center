import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Our Kids Read Dashboard
      </Typography>
      <Button
        component={Link}
        to="/send-message"
        variant="contained"
        color="primary"
        fullWidth
      >
        Send SMS/Email
      </Button>
      <Button
        component={Link}
        to="/message-list"
        variant="contained"
        color="secondary"
        fullWidth
        style={{ marginTop: '20px' }}
      >
        View Messages
      </Button>
    </Container>
  );
}

export default Dashboard;
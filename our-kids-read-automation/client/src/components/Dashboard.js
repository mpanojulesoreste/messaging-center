import React from 'react';
import { Typography } from '@mui/material';
import AppLayout from './AppLayout';

function Dashboard() {
  return (
    <AppLayout>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {/* Will add dashboard content here */}
    </AppLayout>
  );
}

export default Dashboard;
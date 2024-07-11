import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#01474f',
    color: 'white',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    marginLeft: '250px',
    padding: '20px',
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#025d67',
    },
  },
  listItemText: {
    color: 'white',
  },
  footer: {
    marginTop: 'auto',
    padding: '20px',
  },
};

function AppLayout({ children }) {
  return (
    <Box display="flex">
      <Box sx={styles.sidebar}>
        <Typography variant="h6" sx={{ padding: '20px' }}>
          Our Kids Read
        </Typography>
        <List>
          <ListItem button component={Link} to="/dashboard" sx={styles.listItem}>
            <ListItemText primary="Dashboard" sx={styles.listItemText} />
          </ListItem>
          <ListItem button component={Link} to="/send-message" sx={styles.listItem}>
            <ListItemText primary="Send SMS" sx={styles.listItemText} />
          </ListItem>
          <ListItem button component={Link} to="/message-list" sx={styles.listItem}>
            <ListItemText primary="View Messages" sx={styles.listItemText} />
          </ListItem>
          <ListItem button disabled sx={styles.listItem}>
            <ListItemText primary="Placeholder" sx={styles.listItemText} />
          </ListItem>
          <ListItem button disabled sx={styles.listItem}>
            <ListItemText primary="Placeholder" sx={styles.listItemText} />
          </ListItem>
          <ListItem button disabled sx={styles.listItem}>
            <ListItemText primary="Placeholder" sx={styles.listItemText} />
          </ListItem>
        </List>
        <Box sx={styles.footer}>
          <Typography variant="body2">
            Software Documentation and Guide
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.content}>
        {children}
      </Box>
    </Box>
  );
}

export default AppLayout;
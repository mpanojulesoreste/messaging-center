import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';
import { getMessages } from '../utils/api';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Message List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Session Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message._id}>
                <TableCell>{message.content}</TableCell>
                <TableCell>{message.phoneNumber}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{new Date(message.sessionTime).toLocaleString()}</TableCell>
                <TableCell>{message.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MessageList;
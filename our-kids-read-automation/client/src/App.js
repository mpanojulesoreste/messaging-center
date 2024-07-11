import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SendMessage from './components/SendMessage';
import MessageList from './components/MessageList';
import AppLayout from './components/AppLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#01474f',
    },
  },
});

function AuthenticatedRoute({ children }) {
  // The authentication logic can be added here if needed
  // For now, let me just render the children
  return <AppLayout>{children}</AppLayout>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            } />
            <Route path="/send-message" element={
              <AuthenticatedRoute>
                <SendMessage />
              </AuthenticatedRoute>
            } />
            <Route path="/message-list" element={
              <AuthenticatedRoute>
                <MessageList />
              </AuthenticatedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { login } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const styles = {
  pageBackground: {
    background: 'rgb(1,71,79)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: '100px',
    height: 'auto',
    marginBottom: '1rem',
  },
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Box sx={styles.pageBackground}>
      <Container maxWidth="xs" sx={styles.formContainer}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img src="https://ourkidsread.org/public/new/assets/images/logo.svg" alt="Company Logo" style={styles.logo} />
          <Typography variant="h5" align="center" gutterBottom>
            OKR - Messaging Tools - Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default Login;
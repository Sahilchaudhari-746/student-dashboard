import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.id);
      localStorage.setItem('Role', res.data.role);
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000); // ⏱️ 2 seconds = 2000ms
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{}}
      >
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 3,
            width: '100%',
            maxWidth: 450,
            backgroundColor: '#ffffffdd',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
            Welcome Back
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
              color: '#fff',
              fontWeight: 'bold',
              py: 1.5,
              borderRadius: '10px',
              '&:hover': {
                background: 'linear-gradient(90deg, #ff4b2b, #ff416c)',
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" mt={2}>
            Don’t have an account?{' '}
            <Link component={RouterLink} to="/signup" underline="hover" sx={{ fontWeight: 600 }}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

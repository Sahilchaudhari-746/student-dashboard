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
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        ...form,
        role: 'user', // Explicitly set role as 'user'
      });
      console.log(res.data);
      toast.success('Signup successful! You can now login.');
      navigate('/');
    } catch (err) {
      console.error(err);
       toast.error('Signup failed. Try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{
        
          py: 6,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 3,
            width: '100%',
            maxWidth: 450,
            backgroundColor: '#ffffffee',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
            Create Account
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            name="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
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
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #ff512f, #dd2476)',
              '&:hover': {
                background: 'linear-gradient(90deg, #dd2476, #ff512f)',
              },
              borderRadius: 2,
            }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        <Typography variant="body2" align="center" mt={2}>
  Already have an account?{' '}
  <Link component={RouterLink} to="/" underline="hover" sx={{ fontWeight: 600 }}>
    Login
  </Link>
</Typography>
        </Paper>
      </Box>
    </Container>
  );
}

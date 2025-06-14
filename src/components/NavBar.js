import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  let role = localStorage.getItem('Role');
  if (role === 'user') role = 'student';
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logout successful!');
    setTimeout(() => {
      navigate('/');
    }, 2000); // ⏱️ 2 seconds = 2000ms

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar>
          {/* <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>

          {isLoggedIn && (
            <>
              <Typography variant="body2" sx={{ mr: 3 }}>
                Role: <strong>{role}</strong>
              </Typography>
              <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
import Dashboard from './components/pages/Dashboard';
import Navbar from './components/NavBar';
import Signup from './components/Auth/Signup';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarOn = ['/','/signup']; // Add '/signup' if needed

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1581090700227-1e8e0f0b12d9?auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(4px)',
      }}
    >
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
       <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;

import React, {  useState } from 'react';
import {
  Container, Typography, Paper, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StudentList from '../Students/StudentList';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({ name: '', email: '', course: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStudent({ name: '', email: '', course: '',status:'active' });
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const role = localStorage.getItem('Role'); // 🟡 Get role here

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://student-dashboard-backend-omega.vercel.app/api/students', student, {
        headers: { Authorization: `Bearer ${token}` }
      });
toast.success('Student created successful!');

      handleClose();
      setTimeout(() => {
        window.location.reload();
}, 3000); // ⏱️ 2 seconds = 2000ms

      // Optionally refresh student list if required
    } catch (error) {
      console.error('Add student failed:', error);
       toast.error('Error for creating student');
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={3}>Student Dashboard</Typography>
      <Paper sx={{ mt: 3, p: 2 }}>
        <StudentList />
      </Paper>

      {/* Floating Add Button */}
        {role !== 'user' && (
      <Fab color="primary" aria-label="add" onClick={handleOpen} sx={{ position: 'fixed', bottom: 40, right: 40 }}>
        <AddIcon />
      </Fab>
 )}
      {/* Add Student Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus margin="dense" name="name" label="Name" fullWidth value={student.name} onChange={handleChange}
          />
          <TextField
            margin="dense" name="email" label="Email" fullWidth value={student.email} onChange={handleChange}
          />
          <TextField
            margin="dense" name="course" label="Course" fullWidth value={student.course} onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

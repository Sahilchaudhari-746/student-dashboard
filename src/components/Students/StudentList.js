import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions, Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({ id: '', name: '', email: '', course: '' });

  const fetchStudents = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('https://student-dashboard-backend-omega.vercel.app/api/students', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  const role = localStorage.getItem('Role'); // 🟡 Get role here

  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`https://student-dashboard-backend-omega.vercel.app/api/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success('Student deleted successfully!');
    fetchStudents();
  } catch (err) {
    toast.error('Failed to delete student.');
  }
};

  const handleEditOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setSelectedStudent({ id: '', name: '', email: '', course: '' });
  };

  const handleUpdate = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`https://student-dashboard-backend-omega.vercel.app/api/students/${selectedStudent.id}`, selectedStudent, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success('Student updated successfully!');
    handleEditClose();
    fetchStudents();
      setTimeout(() => {
        window.location.reload();
}, 3000); // ⏱️ 2 seconds = 2000ms

  } catch (err) {
    toast.error('Failed to update student.');
  }
};

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
             <TableCell>Roll No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Course</TableCell>
              {role !== 'user' && (
            <TableCell>Actions</TableCell>
             )}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s.id}>
            <TableCell>{s.id}</TableCell> 
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.course}</TableCell>
                {role !== 'user' && (
                <TableCell>
                  <IconButton onClick={() => handleEditOpen(s)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(s.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={selectedStudent.name}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            value={selectedStudent.email}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Course"
            value={selectedStudent.course}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, course: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

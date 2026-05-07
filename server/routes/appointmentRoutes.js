const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllAppointments
} = require('../controllers/appointmentController');

// Patient routes
router.post('/book', protect, authorizeRoles('patient'), bookAppointment);
router.get('/my', protect, authorizeRoles('patient'), getMyAppointments);
router.put('/cancel/:id', protect, authorizeRoles('patient'), cancelAppointment);

// Doctor routes
router.get('/doctor', protect, authorizeRoles('doctor'), getDoctorAppointments);
router.put('/status/:id', protect, authorizeRoles('doctor'), updateAppointmentStatus);

// Admin routes
router.get('/admin/all', protect, authorizeRoles('admin'), getAllAppointments);

module.exports = router;
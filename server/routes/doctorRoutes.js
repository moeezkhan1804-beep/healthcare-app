const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const {
  getAllDoctors,
  getDoctorById,
  createDoctorProfile,
  updateDoctorProfile,
  approveDoctor,
  getAllDoctorsAdmin
} = require('../controllers/doctorController');

// Public routes
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);

// Doctor routes
router.post('/profile/create', protect, authorizeRoles('doctor'), createDoctorProfile);
router.put('/profile/update', protect, authorizeRoles('doctor'), updateDoctorProfile);

// Admin routes
router.get('/admin/all', protect, authorizeRoles('admin'), getAllDoctorsAdmin);
router.put('/admin/approve/:id', protect, authorizeRoles('admin'), approveDoctor);

module.exports = router;
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// Get all approved doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ approved: true }).populate('userId', 'name email');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single doctor
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create doctor profile
exports.createDoctorProfile = async (req, res) => {
  try {
    const { specialization, experience, fees, phone, address, availableSlots } = req.body;
    const existing = await Doctor.findOne({ userId: req.user.id });
    if (existing) return res.status(400).json({ message: 'Doctor profile already exists' });

    const doctor = await Doctor.create({
      userId: req.user.id,
      specialization,
      experience,
      fees,
      phone,
      address,
      availableSlots
    });
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update doctor profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin - approve doctor
exports.approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor approved successfully', doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin - get all doctors
exports.getAllDoctorsAdmin = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};